'use client';

import { useState, useRef } from 'react';
import { useUIBuilder } from '../../context/UIBuilderContext';

const TextElement = ({ element, onDragStart }) => {
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

  const handleChange = (field, value) => {
    updateElement(element.id, { ...element, [field]: value });
  };

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseDown={handleMouseDown}
      style={{
        cursor: 'move',
        backgroundColor: element.backgroundColor || 'transparent',
        border: element.showBorder ? `1px solid ${element.borderColor || '#d1d5db'}` : 'none',
        borderRadius: element.borderRadius || '0px',
        color: element.textColor || '#1f2937',
        padding: '6px',
      }}
    >
      <p
        className="w-full h-full break-words whitespace-pre-wrap text-sm"
        style={{
          lineHeight: element.lineHeight || '1.5',
          textAlign: element.textAlign || 'center',
        }}
      >
        {element.text || '텍스트'}
      </p>

      {isEditing && (
        <div
          ref={popupRef}
          className="absolute z-[999] bg-white p-3 rounded shadow top-full left-0 mt-1 w-64"
        >
          <label className="block mb-1 text-sm font-medium">텍스트</label>
          <textarea
            value={element.text || ''}
            onChange={(e) => handleChange('text', e.target.value)}
            className="border px-2 py-1 mb-2 w-full h-12 text-sm resize-none rounded-md"
            rows={4}
          />

          <label className="block mb-1 text-sm font-medium">글자 색상</label>
          <input
            type="color"
            value={element.textColor || '#1f2937'}
            onChange={(e) => handleChange('textColor', e.target.value)}
            className="mb-2 w-full rounded-md"
          />

          <label className="block mb-1 text-sm font-medium">배경 색상</label>
          <input
            type="color"
            value={element.backgroundColor || '#ffffff'}
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
            className="mb-1 w-full rounded-md"
          />
          <div
            className="text-xs text-right text-gray-500 cursor-pointer mb-2"
            onClick={() => handleChange('backgroundColor', 'transparent')}
          >
            투명하게 설정
          </div>

          <label className="block mb-1 text-sm font-medium">모서리 둥글기</label>
          <input
            type="range"
            min="0"
            max="40"
            value={parseInt(element.borderRadius || 0)}
            onChange={(e) => handleChange('borderRadius', `${e.target.value}px`)}
            className="mb-2 w-full"
          />

          <label className="block mb-1 text-sm font-medium">줄 간격</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={parseFloat(element.lineHeight || 1.5)}
            onChange={(e) => handleChange('lineHeight', e.target.value)}
            className="mb-2 w-full"
          />

          <label className="block mb-1 text-sm font-medium">정렬</label>
          <select
            value={element.textAlign || 'center'}
            onChange={(e) => handleChange('textAlign', e.target.value)}
            className="mb-2 w-full border px-2 py-1 text-sm rounded-md"
          >
            <option value="left">왼쪽</option>
            <option value="center">가운데</option>
            <option value="right">오른쪽</option>
          </select>

          {/* ✅ 테두리 여부 설정 */}
          <div className="flex justify-between items-center text-sm mt-2 mb-2">
            <span>테두리 표시</span>
            <input
              type="checkbox"
              checked={element.showBorder || false}
              onChange={(e) => handleChange('showBorder', e.target.checked)}
            />
          </div>

          {/* ✅ 테두리 색상 설정 (조건부 렌더링) */}
          {element.showBorder && (
            <div className="mb-2">
              <label className="block mb-1 text-sm font-medium">테두리 색상</label>
              <input
                type="color"
                value={element.borderColor || '#d1d5db'}
                onChange={(e) => handleChange('borderColor', e.target.value)}
                className="w-full"
              />
            </div>
          )}

          <div className="flex justify-end text-sm mt-3">
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextElement;