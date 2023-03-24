const http = require("http");
const PORT = process.env.PORT || 3000;

let user = {
  id: 1,
  username: 'Andy',
  firstName: 'Andy',
  lastName: 'Mitchell'
};

const server = http.createServer(async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Max-Age': 2592000,
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  // Show user
  if (req.url.match(/\/users\/([0-9]+)/) && req.method === "GET") {
    res.writeHead(200, headers);
    res.end(JSON.stringify(user));

  // Update user
  } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === "PUT") {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on('end', () => {
      user = Object.assign(user, JSON.parse(body));

      res.writeHead(200, headers);
      res.end(JSON.stringify(user));
    });
  }

  // If no route present
  else {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
