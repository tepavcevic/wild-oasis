import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  _responseHeaders: Headers,
  remixContext: EntryContext
) {
  const sheet = new ServerStyleSheet();

  let markup = renderToString(
    sheet.collectStyles(
      <RemixServer context={remixContext} url={request.url} />
    )
  );

  const styles = sheet.getStyleTags();

  markup = markup.replace('__STYLES__', styles);

  if (markup.startsWith('<html')) {
    markup = '<!DOCTYPE html>\n' + markup;
  }

  return new Response(markup, {
    headers: { 'Content-Type': 'text/html' },
    status: responseStatusCode,
  });
}
