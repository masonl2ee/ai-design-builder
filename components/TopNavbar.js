'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleGoToList = () => {
    router.push('/list');
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-1.5 pl-2 sm:pr-5">
      <div className="max-w-20xl h-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 pl-2 md:pl-4 flex items-center gap-2">
          <img src="/icon/logo.svg" alt="Logo" className="w-12 h-12" />
          AiinOne
        </h1>

        <div className="flex space-x-2">
          <button
            onClick={handleGoToList}
            className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 px-4 rounded-md text-sm font-medium"
          >
            불러오기
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium">
            새 프로젝트
          </button>
        </div>
      </div>
    </nav>
  );
}