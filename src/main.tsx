import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const title = document.querySelector('title[data-default]');
if (title) {
  title.textContent = 'EduCare Center - Trung Tâm Đào Tạo Hàng Đầu';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);