const express = require('express');
const nextJS = require('next');
// const {
//   isBlockedPage,
//   isInternalUrl,
// } = require('next-server/dist/server/utils');

async function start() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = nextJS({ dev });
  const server = express();
  await app.prepare();

  // Redirect all requests to main entrypoint pages/index.js
  server.get('/*', async (req, res, next) => {
    try {
      app.render(req, res, '/');
    } catch (e) {
      next(e);
    }
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:3000`);
  });
}

start();

// req.locals = {};
// req.locals.context = {};
// const html = await app.renderToHTML(req, res, '/', {});

// // Handle client redirects
// const context = req.locals.context;
// if (context.url) {
//   return res.redirect(context.url);
// }

// // Handle client response statuses
// if (context.status) {
//   return res.status(context.status).send();
// }

// // Request was ended by the user
// if (html === null) {
//   return;
// }
// // Code omitted
// app.sendHTML(req, res, html);
