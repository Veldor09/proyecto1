// src/Hooks/useNavigateTo.ts
// If this file doesn't exist or needs updating:
import { useState } from 'react';

export function useNavigateTo(initialPage = 'home') {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  return { currentPage, navigateTo };
}