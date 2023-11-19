import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	entry: './app/index.js',
	output: './public/index.html'
});

/* 
module.exports = {
	entry: './app/main.js',
	output: {
			path: './dist',
			filename: 'bundle.js'
	}
} 
*/