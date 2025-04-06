'use client';

import { useState, useEffect } from 'react';
import { UIBuilderProvider, useUIBuilder } from '../context/UIBuilderContext';
import { useNavbarHeight } from '../components/NavbarHeightProvider';
import ChatInterface from '../components/ChatInterface';
import ComponentLibrary from '../components/ComponentLibrary';
import PreviewArea from '../components/PreviewArea';
import ActionBar from '../components/ActionBar';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const navbarHeight = useNavbarHeight();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    { sender: 'user', text: '파란색 버튼 하나 만들어줘' },
    { sender: 'ai', text: '파란색 버튼을 생성했습니다. 텍스트나 크기를 변경하시겠어요?' },
    { sender: 'user', text: "'제출하기'라는 텍스트로 변경해줘" },
    { sender: 'ai', text: "텍스트를 '제출하기'로 변경했습니다. 미리보기 영역에서 확인하실 수 있습니다." }
  ]);

  const { setUIElements } = useUIBuilder();

  // 화면 높이 조절
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--window-height', `${window.innerHeight - navbarHeight}px`);
    const resize = () => root.style.setProperty('--window-height', `${window.innerHeight - navbarHeight}px`);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [navbarHeight]);

  // 프로젝트 ID가 있을 경우 불러오기
  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const res = await fetch(`/api/projects/${projectId}`);
          const data = await res.json();
          if (data && data.elements) {
            setUIElements(data.elements);
          }
        } catch (err) {
          console.error('프로젝트 불러오기 실패:', err);
        }
      };
      fetchProject();
    }
  }, [projectId, setUIElements]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { sender: 'user', text }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'ai', text: `"${text}"에 대한 응답입니다.` }]);
    }, 1000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-[var(--window-height)] overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* 사이드바 */}
        <div
          className={`transition-all duration-300 bg-white border-r border-gray-200 flex flex-col ${
            isSidebarOpen ? 'w-full md:w-1/3 lg:w-1/4' : 'w-0'
          } overflow-hidden`}
        >
          <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
        </div>

        <button
          onClick={toggleSidebar}
          className="absolute left-2 bottom-20 z-50 bg-white border border-gray-300 rounded-md px-2 py-1 text-sm shadow hover:bg-gray-100"
        >
          {isSidebarOpen ? '←' : '→'}
        </button>

        {/* 메인 영역 */}
        <div className="flex-1 flex flex-col">
          <ComponentLibrary toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <PreviewArea />
          <ActionBar elementsCount={0} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <UIBuilderProvider>
      <HomeContent />
    </UIBuilderProvider>
  );
}