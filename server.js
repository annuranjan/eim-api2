const http = require('http');
const port = 1101;
const hostname = "127.0.0.1";
const app = require('./app');

const server = http.createServer(app);


// server.listen(port, /*hostname,*/ () => {
//     console.log("The server is listening on the port: " + port);
// });

// server.listen(port, hostname), () => {
//     console.log("Server running on the port: " + port);
// };
function startServer(){
    server.listen(port);
    console.log("server listening on the port: "+port);
}

startServer();
