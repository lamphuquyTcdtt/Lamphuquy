import React, { useRef, useEffect, useState } from 'react';

interface ImageAnnotationProps {
  src: string;
  dimensions: { width: number; height: number };
  onSelectionChange: (selection: { x: number; y: number; width: number; height: number; } | null) => void;
  selection: { x: number; y: number; width: number; height: number; } | null;
  disabled: boolean;
}

const ImageAnnotation: React.FC<ImageAnnotationProps> = ({ src, dimensions, onSelectionChange, selection, disabled }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): { x: number, y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (selection) {
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 3;
        ctx.strokeRect(selection.x, selection.y, selection.width, selection.height);
        
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.fillRect(selection.x, selection.y, selection.width, selection.height);
      }
    };
  }, [src, dimensions, selection]);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const pos = getMousePos(e);
    if (pos) {
      setIsDrawing(true);
      setStartPos(pos);
      onSelectionChange(null);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return;
    const currentPos = getMousePos(e);
    if (currentPos) {
      const x = Math.min(startPos.x, currentPos.x);
      const y = Math.min(startPos.y, currentPos.y);
      const width = Math.abs(startPos.x - currentPos.x);
      const height = Math.abs(startPos.y - currentPos.y);
      
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        const img = new Image();
        img.src = src;
        // Redraw image to clear previous rect
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.fillRect(x, y, width, height);
      }
    }
  };
  
  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!startPos) return;
    const finalPos = getMousePos(e);
    if (finalPos) {
        const x = Math.min(startPos.x, finalPos.x);
        const y = Math.min(startPos.y, finalPos.y);
        const width = Math.abs(startPos.x - finalPos.x);
        const height = Math.abs(startPos.y - finalPos.y);

        if (width > 5 && height > 5) { // Threshold to prevent tiny selections
            onSelectionChange({ x, y, width, height });
        }
    }
    setIsDrawing(false);
    setStartPos(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDrawing(false)}
      className={`w-full h-auto rounded-lg ${disabled ? 'cursor-not-allowed' : 'cursor-crosshair'}`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default ImageAnnotation;
