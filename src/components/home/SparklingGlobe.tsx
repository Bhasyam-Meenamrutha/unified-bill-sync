import { useEffect, useRef } from 'react';

export const SparklingGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const resize = () => {
      const size = Math.min(window.innerWidth * 0.4, 400);
      canvas.width = size;
      canvas.height = size;
    };

    resize();
    window.addEventListener('resize', resize);

    // Globe and sparkle configuration
    const centerX = () => canvas.width / 2;
    const centerY = () => canvas.height / 2;
    const radius = () => canvas.width * 0.35;
    
    // Create sparkles
    const sparkles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      opacity: number;
      speed: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      sparkles.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    // Grid lines for globe
    const createGridLines = () => {
      const lines = [];
      const segments = 16;
      
      // Latitude lines
      for (let i = 0; i <= segments; i++) {
        const lat = (i / segments) * Math.PI;
        const line = [];
        for (let j = 0; j <= segments * 2; j++) {
          const lon = (j / (segments * 2)) * Math.PI * 2;
          line.push({
            x: Math.sin(lat) * Math.cos(lon),
            y: Math.cos(lat),
            z: Math.sin(lat) * Math.sin(lon),
          });
        }
        lines.push(line);
      }
      
      // Longitude lines
      for (let i = 0; i <= segments * 2; i++) {
        const lon = (i / (segments * 2)) * Math.PI * 2;
        const line = [];
        for (let j = 0; j <= segments; j++) {
          const lat = (j / segments) * Math.PI;
          line.push({
            x: Math.sin(lat) * Math.cos(lon),
            y: Math.cos(lat),
            z: Math.sin(lat) * Math.sin(lon),
          });
        }
        lines.push(line);
      }
      
      return lines;
    };

    const gridLines = createGridLines();

    const rotatePoint = (point: { x: number; y: number; z: number }, rotY: number) => {
      const cos = Math.cos(rotY);
      const sin = Math.sin(rotY);
      return {
        x: point.x * cos - point.z * sin,
        y: point.y,
        z: point.x * sin + point.z * cos,
      };
    };

    const project = (point: { x: number; y: number; z: number }) => {
      const distance = 4;
      const scale = distance / (distance + point.z);
      return {
        x: centerX() + point.x * radius() * scale,
        y: centerY() + point.y * radius() * scale,
        scale,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        centerX(), centerY(), 0,
        centerX(), centerY(), radius() * 1.5
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotation += 0.005;

      // Draw globe grid
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
      ctx.lineWidth = 1;
      
      gridLines.forEach(line => {
        ctx.beginPath();
        let first = true;
        
        line.forEach(point => {
          const rotated = rotatePoint(point, rotation);
          const projected = project(rotated);
          
          if (rotated.z > -1) {
            const alpha = (rotated.z + 1) * 0.5;
            ctx.globalAlpha = alpha * 0.6;
            
            if (first) {
              ctx.moveTo(projected.x, projected.y);
              first = false;
            } else {
              ctx.lineTo(projected.x, projected.y);
            }
          }
        });
        
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw sparkles
      sparkles.forEach(sparkle => {
        const rotated = rotatePoint(sparkle, rotation);
        
        if (rotated.z > -1) {
          const projected = project(rotated);
          const alpha = ((rotated.z + 1) * 0.5) * sparkle.opacity;
          
          // Update sparkle opacity
          sparkle.opacity += sparkle.speed;
          if (sparkle.opacity > 1) sparkle.opacity = 0;
          
          // Sparkle effect
          const gradient = ctx.createRadialGradient(
            projected.x, projected.y, 0,
            projected.x, projected.y, sparkle.size * projected.scale
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 0.8})`);
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(projected.x, projected.y, sparkle.size * projected.scale, 0, Math.PI * 2);
          ctx.fill();
          
          // Add cross sparkle effect
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(projected.x - sparkle.size, projected.y);
          ctx.lineTo(projected.x + sparkle.size, projected.y);
          ctx.moveTo(projected.x, projected.y - sparkle.size);
          ctx.lineTo(projected.x, projected.y + sparkle.size);
          ctx.stroke();
        }
      });

      // Outer glow
      const outerGradient = ctx.createRadialGradient(
        centerX(), centerY(), radius() * 0.8,
        centerX(), centerY(), radius() * 1.2
      );
      outerGradient.addColorStop(0, 'rgba(139, 92, 246, 0.0)');
      outerGradient.addColorStop(1, 'rgba(139, 92, 246, 0.3)');
      
      ctx.fillStyle = outerGradient;
      ctx.beginPath();
      ctx.arc(centerX(), centerY(), radius() * 1.2, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animate-pulse"
      style={{
        filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))',
      }}
    />
  );
};