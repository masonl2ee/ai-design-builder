'use client';

import { useState, useRef, useEffect } from 'react';
import { useUIBuilder } from '../../context/UIBuilderContext';

const VideoElement = ({ element, onDragStart }) => {
  const { updateElement } = useUIBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileName, setFileName] = useState('');
  const popupRef = useRef(null);
  const wasDragged = useRef(false);
  const videoRef = useRef(null);

  const handleMouseDown = (e) => {
    if (popupRef.current?.contains(e.target)) return;
    if (e.target.dataset?.type === 'play-button') return;

    wasDragged.current = false;
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent) => {
      if (Math.abs(moveEvent.clientX - startX) > 3 || Math.abs(moveEvent.clientY - startY) > 3) {
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

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    updateElement(element.id, { ...element, src: objectUrl });
    setFileName(file.name);
  };

  const handleChange = (field, value) => {
    updateElement(element.id, { ...element, [field]: value });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: element.borderRadius || '0px',
    border: element.showBorder ? `2px solid ${element.borderColor || '#000000'}` : 'none',
    cursor: 'move',
    display: 'block',
  };

  const showFallback = !element.src;

  return (
    <div className="relative w-full h-full select-none" onMouseDown={handleMouseDown}>
              {showFallback ? (
          <div
            className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100 text-sm px-2"
            style={videoStyle}
          >
            <div className="flex h-full items-center justify-center gap-1 text-sm">
              <span className="text-xl">🎬</span>
              <span className="text-xs">비디오</span>
            </div>
          </div>
        ) : (
        <video
          ref={videoRef}
          src={element.src}
          style={videoStyle}
          onClick={(e) => e.stopPropagation()}
          controls
        />
      )}

      {isEditing && (
        <div
          ref={popupRef}
          className="absolute z-[999] bg-white p-3 rounded shadow top-full left-0 mt-1 w-64"
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">비디오 업로드</label>
          <input
            key={element.src}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="text-xs file:text-xs file:mr-3 file:py-1 file:px-4
                       file:rounded-md file:border file:border-gray-300
                       file:bg-white file:text-gray-700 hover:file:bg-gray-50
                       transition w-full mb-1"
          />
          <p className="text-xs text-gray-500 mb-3">
            {fileName || '선택된 파일 없음'}
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

export default VideoElement;