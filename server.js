// // server.js
// const express = require('express');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   // Custom route to handle API requests
//   server.get('/numbers/:numberid', (req, res) => {
//     console.log('Received request for:', req.params.numberid); // Add this line
//     const actualPage = '/api/[numberid]';
//     const queryParams = { numberid: req.params.numberid };
//     app.render(req, res, actualPage, queryParams);
//   });

//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(9876, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:9876');
//   });
// });

// server.js

const express = require('express');
const app = express();
const port = 4000;

const numberData = {
  'p': [2, 3, 5, 7, 11, 13, 17, 19, 23, 29],
  'f': [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
  'e': [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  'r': [5, 7, 2, 9, 12, 6, 14, 1, 8, 3]
};

app.get('/numbers/:id', (req, res) => {
  const { id } = req.params;
  const numbers = numberData[id];
  if (numbers) {
    res.json({ numbers });
  } else {
    res.status(404).json({ error: 'Invalid number ID' });
  }
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});



