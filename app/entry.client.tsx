/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../src/ui/ErrorFallback';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace('/')}
      >
        <RemixBrowser />
      </ErrorBoundary>
    </StrictMode>
  );
});
