import { ReactNode } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import AppLayoutFallback from '#/ui/AppLayoutFallback';
import ThemeProvider from '#/context/ThemeContext';
import GlobalStyles from '#/styles/GlobalStyles';
import { queryClient } from '#/query/client';
import ErrorFallback from '#/ui/ErrorFallback';
import { userQuery } from '#/query/options';

export async function clientLoader() {
  const user = await queryClient.ensureQueryData({ ...userQuery });
  return user;
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <title>Wild Oasis</title>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <StyledThemeProvider theme={{ isDarkMode: true }}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </StyledThemeProvider>
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}

export default function AppWithProviders() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export function HydrateFallback() {
  return <AppLayoutFallback />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <title>Wild Oasis</title>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <StyledThemeProvider theme={{ isDarkMode: true }}>
          <ErrorFallback error={error as Error} />;
          <ScrollRestoration />
          <Scripts />
        </StyledThemeProvider>
      </body>
    </html>
  );
}
