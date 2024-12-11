import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

import { AppServerModule } from './src/main.server';

export function app(): express.Express {
  const server = express();
  const distFolder = join(__dirname, '../browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  console.log(`Rendering index: ${indexHtml}, path: ${join(distFolder, indexHtml)}`);

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.render(indexHtml, {
      req,
      res,
      providers: [
        { provide: 'BASE_URL', useValue: baseUrl },
        {provide: APP_BASE_HREF, useValue: req.baseUrl},
        {provide: REQUEST, useValue: req},
        {provide: RESPONSE, useValue: res}
      ]
    });
  });

  server.get('*', (req, res, next) => {
    // Проверка, является ли запрос частью маршрутов, для которых нужно использовать клиентское приложение
    if (
      req.originalUrl.startsWith('/auth') ||
      req.originalUrl.startsWith('/client') ||
      req.originalUrl.startsWith('/not-verify') ||
      req.originalUrl.startsWith('/admin')
    ) {
      res.sendFile(join(distFolder, 'index.html')); // вернуть клиентский index.html для этих маршрутов
    } else {
      next(); // продолжить выполнение SSR для остальных маршрутов
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
