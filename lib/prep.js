/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
var async = require('async');
var fs = require('fs');
var path = require('path');

var findFiles = require('./find-files');

module.exports = function (examplesPath, templatePath, cb) {
  // Set default template if none given
  if (typeof templatePath === 'function') {
    cb = templatePath;
    templatePath = path.join(__dirname, '..', 'templates', 'example.html');
  }
  async.parallel([
    fs.readFile.bind(null, templatePath, 'utf8'),
    findFiles.bind(null, examplesPath)
  ], cb);
};
