import { useState } from "react";

export default function HorizontalScroll({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"div">) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTouchStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 1;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!e.shiftKey) {
      e.preventDefault();
      e.currentTarget.scrollLeft += e.deltaY * 0.225;
    }
  };

  return (
    <div
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onWheel={handleMouseWheel}
      {...props}
    >
      {children}
    </div>
  );
}
