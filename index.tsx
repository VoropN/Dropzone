import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createServer } from 'miragejs';

import App from './App';

createServer({
  routes() {
    this.post('/api/save-file', (_, request) => {
      if (Math.random() > 0.9) {
        throw new Error();
      }
    });
  },
});

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
