'use client';

import { useState, useRef } from 'react';
import { useUIBuilder } from '../../context/UIBuilderContext';

const Divider = ({ element, onDragStart }) => {
  const { updateElement } = useUIBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [color, setColor] = useState(element.color || '#9ca3af'); // default: gray-400
  const [thickness, setThickness] = useState(element.thickness || 4); // px 단위
  const wasDragged = useRef(false);
  const popupRef = useRef(null);

  const handleMouseDown = (e) => {
    if (popupRef.current && popupRef.current.contains(e.target)) return;

    wasDragged.current = false;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent) => {
      if (
        Math.abs(moveEvent.clientX - startX) > 3 ||
        Math.abs(moveEvent.clientY - startY) > 3
      ) {
        wasDragged.current = true;
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (!wasDragged.current) {
        setIsEditing((prev) => !prev);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    onDragStart(e, element.id);
  };

  const handleSave = () => {
    updateElement(element.id, { color, thickness });
    setIsEditing(false);
  };

  return (
    <div onMouseDown={handleMouseDown} className="w-full h-full relative select-none">
      <hr
        className="w-full"
        style={{
          borderTop: `${thickness}px solid ${color}`,
          cursor: 'move'
        }}
      />

      {isEditing && (
        <div
          ref={popupRef}
          className="absolute z-[999] bg-white p-3 rounded shadow top-full left-0 mt-1 w-52"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">색상</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mb-3 w-full rounded-md"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">두께: {thickness}px</label>
          <input
            type="range"
            min="1"
            max="20"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            className="w-full mb-3"
          />

          <div className="flex justify-end gap-2">
            <button className="text-sm text-gray-500" onClick={() => setIsEditing(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Divider;