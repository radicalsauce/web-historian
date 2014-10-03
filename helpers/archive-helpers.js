var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpReq = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err, data){
    if (err) {
      throw err;
    }
    data = data + '';
    data = data.split('\n');
    if (data[data.length - 1] === '') {
      data.pop();
    }
    callback(data);
  });
};

exports.isUrlInList = function(queryUrl, data, callback){
  var there = false;
  if(data.indexOf(queryUrl) !== -1){
    there = true;
  }
  callback(there);
};

exports.addUrlToList = function(queryUrl){
  exports.readListOfUrls(function(){
    fs.appendFile(exports.paths.list, queryUrl + '\n', function(err, data){
      if (err) {
        throw err;
      }
    });
  });
};

exports.isURLArchived = function(queryUrl, callback){
  fs.readFile(path.join(exports.paths.archivedSites, queryUrl), function(err, data){
    callback(err);
  });
};

// exports.isURLArchived = function(queryUrl, callback){
//   if (exports.isUrlInList(queryUrl)) {
//     return true;
//   } else {
//     return false;
//   }
// };

exports.downloadUrls = function(queryUrl){
  httpReq.get(queryUrl, path.join(exports.paths.archivedSites, queryUrl));
};
