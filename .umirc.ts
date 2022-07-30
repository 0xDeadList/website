import { defineConfig } from 'umi';

export default defineConfig({
  title: '0xdeadlist - unsafe address killer.',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/bury', component: '@/pages/bury' },
  ],
  fastRefresh: {},
  favicon: '/favicon.ico',
});
