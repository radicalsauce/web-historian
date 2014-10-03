var path = require('path');
var archive = require('../helpers/archive-helpers');
var parse = require('url').parse;
var httpHelpers = require('./http-helpers.js');
var qs = require('querystring');

var actions = {
  'GET': function(request, response){
    if (request.url === '/'){
      request.url = '/index.html';
    }
    httpHelpers.serveAssets(response, request.url, function(response){
      httpHelpers.sendResponse(response, '', 404);
    });
  },

  'POST': function(request, response){
    var pathname = parse(request.url, true);
    var body = '';
    request.on('data', function(chunk){
      body += chunk;
    });
    request.on('end', function(){
      var postResponse = qs.parse(body);

      // Split off a thread to add url to sites.txt if necessary
      archive.readListOfUrls(function(urls){
        archive.isUrlInList(postResponse.url, urls, function(there){
          if (!there){
            archive.addUrlToList(postResponse.url);
          }
        });
      });

      // Return existing page if available, otherwise serve loading.html
      httpHelpers.serveAssets(response, postResponse.url, function(response){
        httpHelpers.serveLoading(response);
      });

    });
  }
};

exports.handleRequest = function (request, response) {
  if (actions[request.method]){
    actions[request.method](request, response);
  }
};





// ******* //


// var path = require('path');
// var parseUrl = require('url').parse;
// var archiveHelpers = require('../helpers/archive-helpers');
// var httpHelpers = require('./http-helpers.js');
// var httpReq = require('http-request');

// require more modules/folders here!


// exports.handleRequest = function (request, response) {

  // var pathname = parseUrl(request.url).pathname.split('/').slice(1);
  // console.log("Request received.");
  // if (request.url === '/favicon.ico') {
  //   response.writeHead(200, {'Content-Type': 'image/x-icon'} );
  //   response.end();
  // } else {
  //   if (request.method === 'GET' || request.method === 'OPTIONS') {
  //     response.writeHead(200, httpHelpers.headers);
  //     // httpReq.get('http://www.google.com', function (err, res) {
  //     //   if (err) {
  //     //     throw err;
  //     //   }
  //     //   response.end(res.buffer.toString());
  //     // });
  //     response.end();
  //   } else if (request.method === 'OPTIONS') {
  //     response.writeHead(200, httpHelpers.headers);
  //     response.end();
  //   } else if (request.method === 'POST') {
  //     response.writeHead(201, httpHelpers.headers);
  //     response.end();
  //   }
  // }

