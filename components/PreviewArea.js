'use client';
import { useRef, useMemo } from 'react';
import { useUIBuilder } from '../context/UIBuilderContext';
import { Button, Input, TextElement, ImageElement, Divider, Card, VideoElement } from './ui';

// 아이폰 14 Pro 디자인 모형
const MobileFrame = ({ children }) => (
  <div className="h-full flex-1 p-6 overflow-auto">
    <h2 className="font-bold text-[30px] text-gray-800 ml-5">내 IPhone UI</h2>
    <div 
      className="bg-gray-50 bg-[length:10px_10px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] rounded-[40px] overflow-hidden shadow-2xl relative" 
      style={{
        width: '340px', 
        height: '720px', 
        border: '12px solid black',
        margin: '0 auto'
      }}
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black w-[120px] h-[30px] rounded-b-[20px] z-50"></div>
      <div className="absolute inset-0 mt-[30px] ">{children}</div>
    </div>
  </div>
);

const BrowserFrame = ({ children }) => (
  <div className="h-full flex-1 p-6 overflow-auto">
    <h2 className="font-bold text-[30px] text-gray-800 mb-8 ml-5">내 웹페이지 UI</h2>
    <div
      className="mx-auto shadow-lg rounded-lg overflow-hidden"
      style={{ width: '1170px', height: '700px' }}
    >
      <div className="bg-gray-200 p-2 flex items-center space-x-2">
        <div className="flex space-x-2 ml-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 bg-white text-xs p-1 rounded flex items-center">
          <div className="flex items-center text-gray-500 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>mywebsite.com</span>
          </div>
        </div>
        <div className="flex space-x-3 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
      </div>
      <div className="bg-gray-50 w-full h-[636px] bg-[length:10px_10px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]">{children}
      </div>
      <div className="bg-gray-200 p-1 flex justify-between text-xs text-gray-500">
        <div>https://mywebsite.com</div>
        <div>100%</div>
      </div>
    </div>
  </div>
);

const TabletFrame = ({ children }) => (
  <div className="h-full flex-1 p-6 overflow-auto">
    <h2 className="font-bold text-[30px] text-gray-800 mb-16 ml-5">내 IPad UI</h2>
    <div 
      className="bg-black mx-auto max-w-4xl shadow-lg rounded-[20px] overflow-hidden" 
      style={{
        width: '850px',
        height: '610px',
        padding: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
      }}
    >
      <div className="bg-gray-50 w-full h-full rounded-[12px] overflow-hidden bg-[length:10px_10px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] relative">
        <div className="h-6 w-full bg-transparent flex justify-between items-center px-4 text-xs text-black font-medium rounded-tl-[10px] rounded-tr-[10px]">
          <div className="flex items-center space-x-2">
            <span>10:10</span>
            <span> </span>
            <span>4월 4일 금요일</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 50 20">
              <rect x="2" y="2" width="34" height="16" rx="4" ry="4" fill="white" stroke="black" strokeWidth="2" />
              <rect x="4" y="4" width="28" height="12" rx="2" ry="2" fill="black" />
              <text x="17" y="13.5" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">88</text>
            </svg>
          </div>
        </div>
        <div className="w-full h-[calc(100%-1.5rem)]">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default function PreviewArea() {
  const {
    uiElements,
    handleMouseDown,
    handleDeleteElement,
    viewMode,
    setViewMode,
    activeElement,
    updateElementPosition,
    bringElementToFront // z-index 조정을 위해 추가
  } = useUIBuilder();
  const previewRef = useRef(null);

  const DESIGN_WIDTH = 1200;
  const DESIGN_HEIGHT = 800;

  const deviceConfig = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 820, height: 1180 },
    desktop: { width: 1200, height: 800 }
  };

  const scaleElement = (element, fromSize, toSize) => {
    const scaleX = toSize.width / fromSize.width;
    const scaleY = toSize.height / fromSize.height;
    return {
      x: element.position.x * scaleX,
      y: element.position.y * scaleY,
      width: element.position.width * scaleX,
      height: element.position.height * scaleY
    };
  };

  const renderElement = (element) => {
    const commonProps = {
      key: element.id,
      element,
      onDragStart: (e, id) => {
        bringElementToFront(id);
        handleMouseDown(e, id);
      }
    };

    const deleteButton = (
      <button
        onClick={() => handleDeleteElement(element.id)}
        className="absolute -top-2 -right-2 z-10 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        ✕
      </button>
    );

    const wrappedElement = (component) => {
      const isDragging = activeElement === element.id;
      const handleResize = (e, direction) => {
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startPos = { ...element.position };

        const onMouseMove = (e) => {
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          const newPos = { ...startPos };

          if (direction.includes('e')) newPos.width = Math.max(30, startPos.width + dx);
          if (direction.includes('s')) newPos.height = Math.max(20, startPos.height + dy);
          if (direction.includes('w')) {
            newPos.width = Math.max(30, startPos.width - dx);
            newPos.x = startPos.x + dx;
          }
          if (direction.includes('n')) {
            newPos.height = Math.max(20, startPos.height - dy);
            newPos.y = startPos.y + dy;
          }

          updateElementPosition(element.id, newPos);
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      return (
        <div
          key={element.id}
          className={`absolute group select-none`}
          style={{
            left: `${element.position.x}px`,
            top: `${element.position.y}px`,
            width: `${element.position.width}px`,
            height: `${element.position.height}px`,
            zIndex: element.zIndex || 1,
            transition: isDragging ? 'none' : 'all 0.2s ease',
            opacity: isDragging ? '0.8' : '1',
            transform: isDragging ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          {component}
          {!isDragging && deleteButton}
          <div onMouseDown={(e) => handleResize(e, 'se')} className="absolute right-0 bottom-0 w-2 h-2 bg-indigo-500 cursor-nwse-resize z-20 rounded-sm" />
          <div onMouseDown={(e) => handleResize(e, 'e')} className="absolute top-1/2 right-0 w-2 h-6 -translate-y-1/2 bg-transparent cursor-ew-resize z-20" />
          <div onMouseDown={(e) => handleResize(e, 's')} className="absolute bottom-0 left-1/2 w-6 h-2 -translate-x-1/2 bg-transparent cursor-ns-resize z-20" />
          <div onMouseDown={(e) => handleResize(e, 'sw')} className="absolute bottom-0 left-0 w-3 h-3 bg-transparent cursor-nesw-resize z-20" />
          <div onMouseDown={(e) => handleResize(e, 'w')} className="absolute top-1/2 left-0 w-2 h-6 -translate-y-1/2 bg-transparent cursor-ew-resize z-20" />
          <div onMouseDown={(e) => handleResize(e, 'n')} className="absolute top-0 left-1/2 w-6 h-2 -translate-x-1/2 bg-transparent cursor-ns-resize z-20" />
          <div onMouseDown={(e) => handleResize(e, 'ne')} className="absolute top-0 right-0 w-3 h-3 bg-transparent cursor-nesw-resize z-20" />
          <div onMouseDown={(e) => handleResize(e, 'nw')} className="absolute top-0 left-0 w-3 h-3 bg-transparent cursor-nwse-resize z-20" />
        </div>
      );
    };

    switch (element.type) {
      case 'button': return wrappedElement(<Button {...commonProps} />);
      case 'input': return wrappedElement(<Input {...commonProps} />);
      case 'text': return wrappedElement(<TextElement {...commonProps} />);
      case 'image': return wrappedElement(<ImageElement {...commonProps} />);
      case 'divider': return wrappedElement(<Divider {...commonProps} />);
      case 'card': return wrappedElement(<Card {...commonProps} />);
      case 'video': return wrappedElement(<VideoElement {...commonProps} />);
      default: return null;
    }
  };

  const renderPreview = () => {
    const currentConfig = deviceConfig[viewMode];
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${currentConfig.gridColumns}, 1fr)`,
      gridTemplateRows: `repeat(${currentConfig.gridRows}, ${viewMode === 'desktop' ? '33px' : '1fr'})`,
      gap: '1px',
      width: '100%',
      height: '100%',
      padding: '4px',
      position: 'relative'
    };

    if (!uiElements || uiElements.length === 0) {
      return (
        <div className="w-full h-full inset-0 flex items-center justify-center text-center p-6 relative z-10">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">AI UI 웹페이지</h1>
            <p className="text-gray-700 mb-6 text-lg">AI와 대화하며 필요한 UI 요소를 추가하고 드래그하여 배치해보세요!</p>
            <div className="flex w-full justify-center gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">시작하기</button>
              <button className="border border-gray-300 text-gray-700 py-2 px-6 rounded-md">둘러보기</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        ref={previewRef}
        className="w-full h-full relative z-10"
        style={gridStyle}
        data-preview="true"
      >
        {uiElements.map(renderElement)}
      </div>
    );
  };

  const deviceButtons = (
    <div className="mt-6 flex justify-center gap-4">
      <button 
        onClick={() => setViewMode('mobile')}
        className={`px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 ${viewMode === 'mobile' ? 'bg-gray-100' : ''}`}
      >
        <span className="mr-2">📱</span>모바일
      </button>
      <button 
        onClick={() => setViewMode('desktop')}
        className={`px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 ${viewMode === 'desktop' ? 'bg-gray-100' : ''}`}
      >
        <span className="mr-2">💻</span>데스크톱
      </button>
      <button 
        onClick={() => setViewMode('tablet')}
        className={`px-4 py-2 border flex border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 ${viewMode === 'tablet' ? 'bg-gray-100' : ''}`}
      >
        <span className="mr-2">
          <svg width="13" height="20" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="16" height="20" rx="2" ry="2" fill="#2F2F38"/>
            <rect x="2" y="2" width="12" height="14" rx="1" ry="1" fill="#e5e7eb"/>
            <circle cx="8" cy="18" r="1" fill="#1F1F28"/>
            <circle cx="8" cy="1" r="0.5" fill="#1F1F28"/>
          </svg>
        </span>
        <span>IPad</span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex justify-center items-center overflow-hidden">
        {viewMode === 'mobile' ? (
          <MobileFrame>{renderPreview()}</MobileFrame>
        ) : viewMode === 'tablet' ? (
          <TabletFrame>{renderPreview()}</TabletFrame>
        ) : (
          <BrowserFrame>{renderPreview()}</BrowserFrame>
        )}
      </div>
      <div className="sticky bottom-0 bg-white py-4 border-t">
        {deviceButtons}
      </div>
    </div>
  );
}
