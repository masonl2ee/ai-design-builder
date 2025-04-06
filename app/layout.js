import './globals.css';
import NavbarHeightProvider from '../components/NavbarHeightProvider';
import TopNavbar from '../components/TopNavbar'; // 새로 만든 클라이언트 컴포넌트

export const metadata = {
  title: 'Ai in One',
  description: 'AI로 UI를 디자인하는 No-code 플랫폼',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <TopNavbar />
        <NavbarHeightProvider>
          {children}
        </NavbarHeightProvider>
      </body>
    </html>
  );
}