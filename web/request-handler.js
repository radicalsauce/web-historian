var path = require('path');
var parseUrl = require('url').parse;
var archiveHelpers = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');

// require more modules/folders here!

exports.handleRequest = function (request, response) {
  var pathname = parseUrl(request.url).pathname.split('/').slice(1);
  // console.log(pathname);
  console.log("Request received.");
  console.log(archiveHelpers.isUrlInList("example1.com"));
  response.writeHead(200, httpHelpers.headers);
  response.end(archiveHelpers.readListOfUrls()); // archiveHelpers.paths.list);
};
