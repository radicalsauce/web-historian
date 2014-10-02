var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  exports.readListOfUrls(function(){
      var data = arguments[0];
      console.log("hello");
    if(data.indexOf(queryUrl) !== -1){
      console.log('it is here');
    } else {
      console.log('nope, no good');
    }
  });

};

exports.addUrlToList = function(){
  // if (!exports.isUrlInList) {
  //   // add URL to list
  // }
  // else {
  //   return false;
  // }
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


// fs.readFile(filename, [options], callback)#
// filename String
// options Object
// encoding String | Null default = null
// flag String default = 'r'
// callback Function
// Asynchronously reads the entire contents of a file. Example:

// fs.readFile('/etc/passwd', function (err, data) {
//   if (err) throw err;
//   console.log(data);
// });
// The callback is passed two arguments (err, data), where data is the contents of the file.

// If no encoding is specified, then the raw buffer is returned.

// As you progress, keep thinking about what helper functions you can put here!

