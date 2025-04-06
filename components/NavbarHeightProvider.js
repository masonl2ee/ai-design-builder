'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

// NavbarHeight Context 생성
const NavbarHeightContext = createContext(50); // 기본값 50

export function NavbarHeightProvider({ children }) {
  const [navbarHeight, setNavbarHeight] = useState(50);

  useEffect(() => {
    const navElement = document.querySelector('nav');
    if (navElement) {
      const height = navElement.offsetHeight;
      setNavbarHeight(height);
    }
  }, []);

  return (
    <NavbarHeightContext.Provider value={navbarHeight}>
      {children}
    </NavbarHeightContext.Provider>
  );
}

// 커스텀 훅: NavbarHeight 사용
export function useNavbarHeight() {
  return useContext(NavbarHeightContext);
}

export default NavbarHeightProvider;