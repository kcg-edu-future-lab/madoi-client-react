import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/madoi-react.ts',
      name: 'madoi-react',
      formats: ["es", "umd"],
      fileName: (format) => `madoi-react.${format}.js`,      
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'reactdom'
        },
      },
    },
  }
});
