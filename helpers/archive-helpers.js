var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpReq = require('http-request');

  // httpReq.get('http://www.google.com', function (err, res) {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(res.buffer.toString());
  // });

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
  fs.readFile(__dirname + '/../archives/sites.txt', 'utf8', function(err, data){
    if (err) {
      throw err;
    }
    data = data.split('\n');
    data.pop();
    callback(data);
  });
};

exports.isUrlInList = function(queryUrl){
  return exports.readListOfUrls(function(data){
    if(data.indexOf(queryUrl) !== -1){
      console.log('it is here');
      return true;
    } else {
      console.log('nope, no good');
      return false;
    }
  });
};

exports.addUrlToList = function(queryUrl){
  console.log(exports.isUrlInList(queryUrl));
  if (exports.isUrlInList(queryUrl)) {
    fs.appendFile(__dirname + '/../archives/sites.txt', queryUrl + '\n', function(err, data){
      if (err) {
        throw err;
      }
      console.log('writing');
    });
  } else {
    console.log('Already there.');
    return false;
  }
};

exports.isURLArchived = function(queryUrl){
  // if (exports.isUrlInList(queryUrl)) {
  //   return true;
  // } else {
  //   return false;
  // }
};

exports.downloadUrls = function(){
};
