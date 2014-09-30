/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
// load node core modules
var path = require('path');
// load installed modules
var findit = require('findit');

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
      // throw away the exension
      examples.push(path.join(path.dirname(file), path.basename(file, '.js')));
    }
  });

  finder.on('error', function (err) {
    return cb(err);
  });

  finder.on('end', function () {
    return cb(null, examples);
  });
};
