'use client';
import { useState } from 'react';

export default function ChatInterface({ onSendMessage, messages = [] }) {
  const [inputText, setInputText] = useState('');
  
  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage && onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg shadow-sm max-w-xs ${
                msg.sender === 'user' 
                  ? 'bg-white ml-auto' 
                  : 'bg-indigo-50'
              }`}
            >
              <p className="text-sm text-gray-800">{msg.text}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            AI에게 UI 요소 생성을 요청해보세요
          </div>
        )}
      </div>
      
      {/* 입력 영역 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 text-sm"
            placeholder="AI에게 UI 요소 생성을 요청하세요..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="bg-indigo-600 text-white py-2 px-4 rounded-r-md text-sm font-medium hover:bg-indigo-700"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}