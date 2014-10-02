var path = require('path');
var parseUrl = require('url').parse;
var archiveHelpers = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var httpReq = require('http-request');

// require more modules/folders here!

exports.handleRequest = function (request, response) {
  // var pathname = parseUrl(request.url).pathname.split('/').slice(1);
  console.log("Request received.");
  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end();
  } else {
    if (request.method === 'GET' || request.method === 'OPTIONS') {
      response.writeHead(200, httpHelpers.headers);
      // httpReq.get('http://www.google.com', function (err, res) {
      //   if (err) {
      //     throw err;
      //   }
      //   response.end(res.buffer.toString());
      // });
      response.end();
    } else if (request.method === 'OPTIONS') {
      response.writeHead(200, httpHelpers.headers);
      response.end();
    } else if (request.method === 'POST') {
      response.writeHead(201, httpHelpers.headers);
      response.end();
    }
  }





  // if (pathname[0] === '') {
  // if (request.method === 'GET' || request.method === 'OPTIONS') {
  //   response.writeHead(200, httpHelpers.headers);
  //   httpReq.get('http:/'+request.url, function (err, res) {
  //     if (err) {
  //       throw err;
  //     }
  //     // console.log(res.code, res.headers, res.buffer.toString());
  //     response.end(res.buffer.toString());
  //   });
  // } else if (request.method === 'OPTIONS') {
  //   response.writeHead(200, httpHelpers.headers);
  //   response.end();
  // } else if (request.method === 'POST') {
  //   response.writeHead(201, httpHelpers.headers);
  //   response.end();
  // }
  // } else {
  //   response.writeHead(404, httpHelpers.headers);
  //   response.end();
  // }
};
