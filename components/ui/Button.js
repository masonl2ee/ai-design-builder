'use client';
import { useState, useRef } from 'react';
import { useUIBuilder } from '../../context/UIBuilderContext';

const Button = ({ element, onDragStart }) => {
  const { updateElement } = useUIBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(element.text);
  const [color, setColor] = useState(element.color || '#3b82f6');
  const wasDragged = useRef(false);
  const popupRef = useRef(null);

  const handleMouseDown = (e) => {
    // 편집창 위에서 클릭한 경우 => 무시
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

      // 클릭(= 드래그 안 한 경우)일 때만 토글
      if (!wasDragged.current) {
        setIsEditing((prev) => !prev);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // 요소 드래그 처리
    onDragStart(e, element.id);
  };

  const handleSave = () => {
    updateElement(element.id, { text, color }); // ✅ 업데이트
    setIsEditing(false);
  };

  return (
    <div onMouseDown={handleMouseDown} className="w-full h-full relative select-none">
      <button
        className="w-full h-full rounded text-white transition transform duration-150 active:scale-95"
        style={{ backgroundColor: color }}
      >
        {text}
      </button>

      {isEditing && (
        <div
          ref={popupRef}
          className="absolute z-[999] bg-white p-3 rounded shadow top-full left-0 mt-1 w-48"
        >
          <input
            className="border w-full px-2 py-1 mb-2 text-sm rounded-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="버튼 텍스트"
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mb-2 w-full rounded-md"
          />
          <div className="flex justify-end gap-2 ">
            <button className="text-sm text-gray-500 " onClick={() => setIsEditing(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;