'use client';
import { useState } from 'react';
import { useUIBuilder } from '../context/UIBuilderContext';

export default function ComponentLibrary({ toggleSidebar, isSidebarOpen }) {
  const [isOpen, setIsOpen] = useState(true);
  const { addElement } = useUIBuilder();
  
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="font-medium text-gray-800">컴포넌트 라이브러리</h2>
          <button 
            className="ml-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        {toggleSidebar && (
          <button 
            className="md:hidden text-indigo-600"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="flex space-x-3 overflow-x-auto py-2 px-4 pb-4">
          {/* 버튼 */}
          <ElementItem label="버튼" onClick={() => addElement('button')}>
            <div className="w-16 h-10 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-medium">
              버튼
            </div>
          </ElementItem>

          {/* 입력창 */}
          <ElementItem label="입력창" onClick={() => addElement('input')}>
            <div className="w-16 h-10 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-800">
              입력창
            </div>
          </ElementItem>

          {/* 텍스트 */}
          <ElementItem label="텍스트" onClick={() => addElement('text')}>
            <div className="w-16 h-10 flex items-center justify-center text-xs text-gray-800">
              <span className="border-b border-gray-300">텍스트</span>
            </div>
          </ElementItem>

          {/* 카드 */}
          <ElementItem label="카드" onClick={() => addElement('card')}>
            <div className="w-16 h-10 bg-white shadow rounded text-xs text-gray-800 flex items-center justify-center border">
              카드
            </div>
          </ElementItem>

          {/* 구분선 */}
          <ElementItem label="구분선" onClick={() => addElement('divider')}>
            <div className="w-16 h-10 flex items-center justify-center text-xs text-gray-600 border rounded">
              ───
            </div>
          </ElementItem>

          {/* 이미지 */}
          <ElementItem label="이미지" onClick={() => addElement('image')}>
            <div className="w-16 h-10 bg-purple-950 flex items-center justify-center text-xs text-white border rounded">
            🎆 이미지
            </div>
          </ElementItem>

          {/* 비디오 */}
          <ElementItem label="비디오" onClick={() => addElement('video')}>
            <div className="w-16 h-10 bg-black text-white flex items-center justify-center text-xs rounded">
            🎬 비디오
            </div>
          </ElementItem>
        </div>
      )}
    </div>
  );
}

// 재사용 가능한 항목 컴포넌트
const ElementItem = ({ label, onClick, children }) => (
  <div 
    className="flex-none border border-gray-200 rounded-md p-2 hover:border-indigo-500 cursor-pointer"
    onClick={onClick}
    title={label}
  >
    {children}
  </div>
);