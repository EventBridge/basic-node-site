const http = require('http');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  // Build file path
  const filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : `${req.url}.html`
  );

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), () => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
