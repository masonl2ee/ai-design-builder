'use client';
import { createContext, useState, useContext, useRef } from 'react';

const UIBuilderContext = createContext(null);

export function UIBuilderProvider({ children }) {
  const [uiElements, setUiElements] = useState([]);
  const [activeElement, setActiveElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState('desktop');

  const stateRef = useRef({ uiElements, activeElement, isDragging, viewMode });
  stateRef.current = { uiElements, activeElement, isDragging, viewMode };

  const setElements = (newElements) => setUiElements(newElements);

  const addElement = (type) => {
    const newId = Date.now();
    const baseSize = {
      button: { width: 100, height: 40 },
      input: { width: 150, height: 40 },
      text: { width: 120, height: 30 }
    };

    const { width, height } = baseSize[type] || { width: 100, height: 40 };
    const newElement = {
      id: newId,
      type,
      text: type === 'button' ? '버튼' : type === 'input' ? '입력창' : '텍스트',
      position: { x: 160, y: 150, width, height },
      zIndex: 1
    };
    setUiElements((prev) => [...prev, newElement]);
    bringElementToFront(newId);
  };

  const bringElementToFront = (id) => {
    setUiElements((prev) => {
      const maxZ = Math.max(...prev.map(el => el.zIndex || 1));
      return prev.map(el =>
        el.id === id ? { ...el, zIndex: maxZ + 1 } : el
      );
    });
  };

  const updateElement = (id, newProps) => {
    setUiElements((prev) =>
      prev.map(el => (el.id === id ? { ...el, ...newProps } : el))
    );
  };

  const updateElementPosition = (id, newPosition) => {
    setUiElements((prev) =>
      prev.map(el =>
        el.id === id ? { ...el, position: { ...el.position, ...newPosition } } : el
      )
    );
  };

  const handleDeleteElement = (id) => {
    setUiElements((prev) => prev.filter(el => el.id !== id));
  };

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    const element = stateRef.current.uiElements.find(el => el.id === id);
    if (!element) return;

    setActiveElement(id);
    setIsDragging(true);

    const targetRect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - targetRect.left;
    const offsetY = e.clientY - targetRect.top;

    const handleMouseMove = (moveEvent) => {
      const preview = document.querySelector('[data-preview="true"]');
      if (!preview) return;

      const rect = preview.getBoundingClientRect();
      let newX = moveEvent.clientX - rect.left - offsetX;
      let newY = moveEvent.clientY - rect.top - offsetY;

      newX = Math.max(0, Math.min(newX, rect.width - element.position.width));
      newY = Math.max(0, Math.min(newY, rect.height - element.position.height));

      setUiElements(prev =>
        prev.map(el =>
          el.id === id
            ? { ...el, position: { ...el.position, x: newX, y: newY } }
            : el
        )
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setActiveElement(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <UIBuilderContext.Provider
      value={{
        uiElements,
        setElements,
        addElement,
        bringElementToFront,
        updateElement,
        updateElementPosition,
        handleDeleteElement,
        handleMouseDown,
        activeElement,
        isDragging,
        viewMode,
        setViewMode
      }}
    >
      {children}
    </UIBuilderContext.Provider>
  );
}

export const useUIBuilder = () => useContext(UIBuilderContext);