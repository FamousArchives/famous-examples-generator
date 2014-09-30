/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
// require from node core
var path = require('path');
var fs = require('fs');
// installed modules
var async = require('async');
var _ = require('lodash');
// lib modules
var prep = require('./prep');
// path to template file
var templatePath = path.join(__dirname, '../templates/index.html');

// write an index template
var templateIndex = function (template, files, examplesPath, outpath, cb) {
  var data = _(files)
  .map(function (file) {
    return path.relative(examplesPath, file);
  })
  .groupBy(function (file) {
    return file.split('/')[0];
  }).value();
  var templatedHTML = _.template(templatePath, data);
  outpath = path.join(outpath, 'index.html');
  fs.writeFile(outpath, templatedHTML, cb);
};

// Tie it all together in a single export
module.exports = function (examplesPath, outpath, cb) {
  // if no outpath is given default to examplesPath
  if (typeof outpath === 'function') {
    cb = outpath;
    outpath = examplesPath;
  }
  async.waterfall([
    prep.bind(null, examplesPath, templatePath)
  ], function (err, results) {
    if (err) { return cb(err); }
    templateIndex(results[0], results[1], examplesPath, outpath, cb);
  });
};
