import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { flatRoutes } from 'remix-flat-routes';

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ignoredRouteFiles: ['**/.*'],
      routes: async (defineRoutes) => {
        return {
          ...flatRoutes('routes', defineRoutes),
        };
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    open: true,
  },
});
