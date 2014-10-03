var archive = require('../helpers/archive-helpers.js');
var _ = require('underscore');

console.log("CRONRAN!!!!");
archive.readListOfUrls(function(data){
  for(var i = 0; i < data.length; i++){
    archive.isURLArchived(queryUrl, function(err){
      if(err){
        archive.downloadUrls(queryUrl);
      }
    });
  }
});

// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

// * * * * * crontab -l path/to/runThisJob.sh
