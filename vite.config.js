import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	entry: './app/public/index.html',
	output: './app/index.js'
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
