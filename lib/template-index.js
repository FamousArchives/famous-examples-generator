// /* This Source Code Form is subject to the terms of the Mozilla Public
//  * License, v. 2.0. If a copy of the MPL was not distributed with this
//  * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
//
// 'use strict';
// // require from node core
// var path = require('path');
// var fs = require('fs');
// // installed modules
// // var async = require('async');
// // var _ = require('lodash');
// // var mkdirp = require('mkdirp');
// // // lib modules
// // var findFiles = require('./find-files');
// // // path to template file
// // var templatePath = path.join(__dirname, '../templates/example.html');
// // // read in the template file and a file list of the examples folder asyncronously
// var prep = function (examplesPath, cb) {
//   async.parallel([
//     fs.readFile.bind(null, templatePath, 'utf8'),
//     findFiles.bind(null, examplesPath)
//   ], cb);
// };
//
// // write a template for each provided file
// var templateFiles = function (template, files, examplesPath, outpath, cb) {
//   // var famousPath = path.join(examplesPath, '../src');
//   // async.each(files, function (file, done) {
//   //   var exampleNameLong = path.relative(examplesPath, file);
//   //   var outdir = path.join(outpath, path.dirname(exampleNameLong));
//   //   mkdirp(outdir, function (err) {
//   //     if (err) { done(err); }
//   //     var relativeFamousPath = path.relative(outdir, famousPath);
//   //     var relativeExamplePath = path.relative(outdir, examplesPath);
//   //     var example = path.basename(file);
//   //     var templatedHTML = _.template(template, {
//   //       examplesPath: relativeExamplePath,
//   //       famousPath: relativeFamousPath,
//   //       example: example
//   //     });
//   //     outdir = path.join(outdir, example + '.html');
//   //     fs.writeFile(outdir, templatedHTML, done);
//   //   });
//   // }, cb);
// };
//
// // Tie it all together in a single export
// module.exports = function (examplesPath, outpath, cb) {
//   // if no outpath is given default to examplesPath
//   if (typeof outpath === 'function') {
//     cb = outpath;
//     outpath = examplesPath;
//   }
//   // async.waterfall([
//   //   prep.bind(null, examplesPath)
//   // ], function (err, results) {
//   //   if (err) { return cb(err); }
//   //   templateFiles(results[0], results[1], examplesPath, outpath, cb);
//   // });
// };
