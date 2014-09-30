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

// use lodash to filter files into appropriate data for template
var dataFromFiles = function (files, examplesPath) {
  return _(files)
  .map(function (file) {
    return path.relative(examplesPath, file);
  })
  .groupBy(function (file) {
    return file.split('/')[0];
  })
  .value();
};

// write an index template
var templateIndex = function (template, files, examplesPath, outdir, cb) {
  var famousPath = path.join(examplesPath, '../src');
  var relativeFamousPath = path.relative(outdir, famousPath);
  var relativeExamplePath = path.relative(outdir, examplesPath);
  if (relativeExamplePath === '') { relativeExamplePath = '.'; }
  var data = dataFromFiles(files, examplesPath);
  var templatedHTML = _.template(template, {
    data: data,
    famousPath: relativeFamousPath,
    examplesPath: relativeExamplePath
  });
  outdir = path.join(outdir, 'index.html');
  fs.writeFile(outdir, templatedHTML, cb);
};

// Tie it all together in a single export
module.exports = function (examplesPath, outdir, cb) {
  // if no outdir is given default to examplesPath
  if (typeof outdir === 'function') {
    cb = outdir;
    outdir = examplesPath;
  }
  async.waterfall([
    prep.bind(null, examplesPath, templatePath)
  ], function (err, results) {
    if (err) { return cb(err); }
    templateIndex(results[0], results[1], examplesPath, outdir, cb);
  });
};
