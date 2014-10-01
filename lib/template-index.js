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

/**
 *  Capitalize words that should be capitalized.
 *  @method capitalizeNames
 */
var capitalizeNames = function (file) {
  var exceptionList = ['in', 'the', 'of', 'and', 'or'];
  return _.map(file.split('-'), function (word) {
    if (!_.contains(exceptionList, word)) {
      word = word[0].toUpperCase() + word.slice(1);
    }
    return word;
  }).join(' ');
};

// use lodash to filter files into appropriate data for template
var dataFromFiles = function (files, examplesPath) {
  return _(files)
  .map(function (file) {
    return path.relative(examplesPath, file);
  })
  .groupBy(function (file) {
    return file.split('/')[0];
  })
  .mapValues(function (files) {
    return _.map(files, function (file) {
      return {
        url: file,
        module: file.split('/')[1],
        name: capitalizeNames(file.split('/').slice(2).join('/'))
      };
    });
  }).value();
};

/**
 * Assume file changing the data from: 
 * { 
 *      'folder': [filepath, filepath..]
 * } 
 * to 
 * {
 *  'folder' : [{ 
 *      url: filepath,
 *      name: 'Readable Name'
 *  }]
 * }
 * @method addReadableNames
 * @param data {object} previous data object
 */
var addReadableNames = function (data) {
    var outData = {};
    for (var key in data) {
        var fileList = data[key];
        outData[key] = [];
        for (var i = 0; i < fileList.length; i++) {
            outData[key][i] = {};
            var obj = outData[key][i];
            var parsedFilename = parseReadableNames(key, fileList[i]);
            obj['url'] = fileList[i];
            obj['name'] = parsedFilename['name'];
            obj['module'] = parsedFilename['module'];
        };
    }
    return outData;
}

/**
 *  Parse readable names out of the given filepath, returning module and a name.
 *  @method parseReadableNames
 */
var parseReadableNames = function (key, nameString) {
    var splitName = nameString.split(key + '/')[1];
    splitName = splitName.split('/');
    for (var i = 0; i < splitName.length; i++) {
        splitName[i] = capitalizeNames(splitName[i].split('-'));
    };
    return {
        'module': splitName[0],
        'name': splitName[1]
    };
}

/**
 *  Capitalize words that should be capitalized.
 *  @method capitalizeNames
 */
var capitalizeNames = function (wordArray) {
    var exceptionList = ['in', 'the', 'of', 'and', 'or'];
    for (var i = 0; i < wordArray.length; i++) {
        if (exceptionList.indexOf(wordArray[i]) < 0) {
            wordArray[i] = wordArray[i][0].toUpperCase() + 
                wordArray[i].substring(1, wordArray[i].length);
        }
    };
    return wordArray.join(' ');
}

// write an index template
var templateIndex = function (template, files, examplesPath, outdir, cb) {
  var famousPath = path.join(examplesPath, '../src');
  var relativeFamousPath = path.relative(outdir, famousPath);
  var relativeExamplePath = path.relative(outdir, examplesPath);
  if (relativeExamplePath === '') { relativeExamplePath = '.'; }
  var data = dataFromFiles(files, examplesPath);
  data = addReadableNames(data);
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
