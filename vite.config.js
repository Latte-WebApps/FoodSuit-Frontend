import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),  vueDevTools({
    componentInspector: true, // Opciones específicas para el DevTools
    launchEditor: 'code', // El editor que usará cuando elijas "Open in editor"
  }),  createHtmlPlugin({})],

})
