'use client';

import { useState, useRef } from 'react';
import { useUIBuilder } from '../../context/UIBuilderContext';

const Card = ({ element, onDragStart }) => {
  const { updateElement } = useUIBuilder();
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseDown={handleMouseDown}
    >
      <div
        className="shadow-md rounded border border-gray-200 p-2 w-full h-full flex flex-col items-center justify-center overflow-hidden text-center"
        style={{
          backgroundColor: element.bgColor || '#ffffff',
          color: element.textColor || '#000000',
          cursor: 'move'
        }}
      >
        <h3 className="text-sm font-semibold break-words mb-1">
          {element.title || '카드 제목'}
        </h3>
        <p className="text-xs break-words">{element.text || '텍스트'}</p>
      </div>

      {isEditing && (
        <div
          ref={popupRef}
          className="absolute z-[999] bg-white p-3 rounded shadow top-full left-0 mt-1 w-60"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
          <input
            className="border w-full px-2 py-1 mb-2 text-sm rounded-md"
            value={element.title || ''}
            onChange={(e) => updateElement(element.id, { ...element, title: e.target.value })}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
          <textarea
            className="border w-full px-2 py-1 mb-2 text-sm resize-none rounded-md"
            value={element.text || ''}
            onChange={(e) => updateElement(element.id, { ...element, text: e.target.value })}
            rows={3}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">배경색</label>
          <input
            type="color"
            value={element.bgColor || '#ffffff'}
            onChange={(e) => updateElement(element.id, { ...element, bgColor: e.target.value })}
            className="mb-2 w-full rounded-md"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">글자 색상</label>
          <input
            type="color"
            value={element.textColor || '#000000'}
            onChange={(e) => updateElement(element.id, { ...element, textColor: e.target.value })}
            className="mb-3 w-full rounded-md"
          />

          <div className="flex justify-end gap-2">
            <button className="text-sm text-gray-500" onClick={() => setIsEditing(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;