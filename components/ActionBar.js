'use client';
import { useUIBuilder } from '../context/UIBuilderContext';

export default function ActionBar() {
  const { uiElements } = useUIBuilder();
  
  const handleViewCode = () => {
    console.log('코드 보기');
  };
  
  const handleExport = () => {
    console.log('내보내기');
  };
  
  const handleSave = async () => {
    const res = await fetch('/api/projects/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Untitled Project',
        elements: uiElements,
        createdAt: new Date().toISOString()
      })
    });
  
    const result = await res.json();
    console.log('저장됨 ID:', result.id);
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="text-sm text-gray-700 mb-3 sm:mb-0">
        총 {uiElements.length}개의 UI 요소
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={handleViewCode}
          className="border border-gray-300 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-50"
        >
          코드 보기
        </button>
        <button 
          onClick={handleExport}
          className="border border-indigo-500 text-indigo-600 py-2 px-4 rounded text-sm hover:bg-indigo-50"
        >
          내보내기
        </button>
        <button 
          onClick={handleSave}
          className="bg-indigo-600 text-white py-2 px-4 rounded text-sm hover:bg-indigo-700"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}