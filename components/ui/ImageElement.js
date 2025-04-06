'use client';

import { useState, useRef, useEffect } from 'react';
import { useUIBuilder } from '../../context/UIBuilderContext';

const ImageElement = ({ element, onDragStart }) => {
  const { updateElement } = useUIBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState('');
  const popupRef = useRef(null);
  const wasDragged = useRef(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 이전 파일명이 있을 경우 설정
    if (element.src && !fileName) {
      const parsedName = element.src?.split('/')?.pop()?.split('?')[0];
      if (parsedName) setFileName(parsedName);
    }
  }, [element.src]);

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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateElement(element.id, { ...element, src: reader.result });
        setFileName(file.name); // ✅ 파일명 저장
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field, value) => {
    updateElement(element.id, { ...element, [field]: value });
  };

  const showFallback = !element.src;

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: element.borderRadius || '0px',
    border: element.showBorder ? `2px solid ${element.borderColor || '#000000'}` : 'none',
    cursor: 'move',
  };

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseDown={handleMouseDown}
    >
      {showFallback ? (
        <div
          className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100 text-sm px-2"
          style={imageStyle}
        >
          <div className="flex items-center gap-1 text-sm">
            <span className="text-xl">🎆</span>
            <span className="text-xs">이미지</span>
          </div>
        </div>
      ) : (
        <img
          src={element.src}
          alt="사용자 이미지"
          style={imageStyle}
          onError={() => handleChange('src', '')}
        />
      )}

      {isEditing && (
        <div
          ref={popupRef}
          className="absolute z-[999] bg-white p-3 rounded shadow top-full left-0 mt-1 w-64"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">이미지 업로드</label>
          <input
            key={element.src}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-xs file:text-xs file:mr-3 file:py-1 file:px-4
                       file:rounded-md file:border file:border-gray-300
                       file:bg-white file:text-gray-700 hover:file:bg-gray-50
                       transition w-full mb-1"
          />
          <p className="text-[11px] text-gray-500 mb-3">
            선택된 파일: <span className="font-medium">{fileName || '없음'}</span>
          </p>

          <label className="block text-sm font-medium text-gray-700 mb-1">모서리 둥글기</label>
          <input
            type="range"
            min="0"
            max="40"
            value={parseInt(element.borderRadius || 0)}
            onChange={(e) => handleChange('borderRadius', `${e.target.value}px`)}
            className="w-full mb-3"
          />

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">테두리 표시</span>
            <input
              type="checkbox"
              checked={element.showBorder || false}
              onChange={(e) => handleChange('showBorder', e.target.checked)}
            />
          </div>

          {element.showBorder && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">테두리 색상</label>
              <input
                type="color"
                value={element.borderColor || '#000000'}
                onChange={(e) => handleChange('borderColor', e.target.value)}
                className="w-full"
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              className="text-sm text-gray-500 hover:text-gray-800"
              onClick={() => setIsEditing(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageElement;