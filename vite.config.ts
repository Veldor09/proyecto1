import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Services': path.resolve(__dirname, 'src/Services'),
      '@Context': path.resolve(__dirname, 'src/Context'),
      '@Hooks': path.resolve(__dirname, 'src/Hooks'),
      '@Pages': path.resolve(__dirname, 'src/Pages'),
    },
  },
});
