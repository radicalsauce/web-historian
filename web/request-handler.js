var path = require('path');
var parseUrl = require('url').parse;
var archiveHelpers = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

// require more modules/folders here!

exports.handleRequest = function (request, response) {
  var pathname = parseUrl(request.url).pathname.split('/').slice(1);
  console.log("Request received.");
  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end();
  } else {
    response.writeHead(200, httpHelpers.headers);
    archiveHelpers.addUrlToList("www.google.com");
    response.end(); // archiveHelpers.paths.list);
  }
};
