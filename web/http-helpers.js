var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.sendResponse = function(response, body, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(body);
};

exports.serveLoading = function(response){
  fs.readFile(path.join(__dirname, 'public', '/loading.html'), function(err, data){
    if (err){
      exports.sendResponse(response, '', 404);
    } else {
      headers.location = '/loading.html';
      exports.sendResponse(response, data, 302);
    }
  });
};


exports.serveAssets = function(response, asset, callback) {
  fs.readFile(path.join(__dirname, 'public', asset), function(err, data){
    if(err){
      fs.readFile(path.join(__dirname, '../archives/sites', asset), function(err, data){
        if(err){
          callback(response);
        } else {
          exports.sendResponse(response, data);
        }
      });
    } else {
      exports.sendResponse(response, data);
    }
  });
};



// ******* //

// var path = require('path');
// var fs = require('fs');
// var archive = require('../helpers/archive-helpers');


// exports.headers = headers = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10, // Seconds.
//   'Content-Type': "text/html"
// };

// exports.sendResponse = function(response, data, statusCode){
//   statusCode = statusCode || 200;
//   response.writeHead(statusCode, headers);
//   response.end(data);
// };

// exports.serveAssets = function(res, asset, callback) {

// };

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

