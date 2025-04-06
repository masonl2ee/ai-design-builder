'use client';
import { useState, useRef } from 'react';
import { useUIBuilder } from '../../context/UIBuilderContext';

const Input = ({ element, onDragStart }) => {
  const { updateElement } = useUIBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(element.text);
  const [textColor, setTextColor] = useState(element.color || '#1f2937'); // 기본 색상: text-gray-800
  const wasDragged = useRef(false);
  const popupRef = useRef(null);

  const handleMouseDown = (e) => {
    // 편집창 클릭 시 무시
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
    updateElement(element.id, { text, color: textColor });
    setIsEditing(false);
  };

  return (
    <div onMouseDown={handleMouseDown} className="w-full h-full relative select-none">
      <input
        type="text"
        placeholder={text}
        className="w-full h-full border border-gray-300 rounded py-2 px-3 text-sm"
        style={{
          cursor: 'move',
          color: textColor
        }}
        readOnly
      />

      {isEditing && (
        <div
          ref={popupRef}
          className="absolute z-[999] bg-white p-3 rounded shadow top-full left-0 mt-1 w-48"
        >
          <input
            className="border w-full px-2 py-1 mb-2 text-sm rounded-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="입력창 텍스트"
          />
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="mb-2 w-full rounded-md"
          />
          <div className="flex justify-end gap-2">
            <button className="text-sm text-gray-500" onClick={() => setIsEditing(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;