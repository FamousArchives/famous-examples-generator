#!/usr/bin/env node
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';
var path = require('path');

var findit = require('findit');
// var _ = require('lodash');

// var outPath = path.join(__dirname, '../examples/assets/file-list.json');
// var output = _.groupBy(examples, function (file) {
//   return file.split('/')[0];
// });
// output = _.reduce(output, function (result, folder, key) {
//   result[key] = _.groupBy(folder, function (file) {
//     return path.dirname(file);
//   });
//   return result;
// }, {});

// fs.writeFile(outPath, JSON.stringify(output, null, 4), function (err) {
//   if (err) { throw new Error(err); }
//   console.log('All done!');
// });

module.exports = function (examplesPath, cb) {
  var finder = findit(examplesPath);
  var examples = [];

  finder.on('directory', function (dir, stat, stop) {
    var base = path.basename(dir);
    if (base === 'assets') { stop(); }
  });

  finder.on('file', function (file) {
    var base = path.basename(file);
    if (base === 'index.html' || base === 'main.js') { return; }
    if (path.extname(file) === '.js') {
      // Get the relative path and then throw away the exension
      var relativePath = path.relative(examplesPath, file).split('.').slice(0, 1).toString();
      examples.push(relativePath);
    }

  });

  finder.on('error', function (err) {
    return cb(err);
  });

  finder.on('end', function () {
    return cb(null, examples);
  });

};
