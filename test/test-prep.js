/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
var fs = require('fs');
var path = require('path');

var test = require('tape');
var _ = require('lodash');

var prep = require('../lib/prep');
var fileList = require('./fixtures/file-list-array');

var examplesPath = path.join(__dirname, 'fixtures/examples');
var indexPath = path.join(__dirname, '../templates/index.html');
var indexHTML = fs.readFileSync(indexPath, 'utf8');
var exampleHTML = fs.readFileSync(path.join(__dirname, '../templates/example.html'), 'utf8');

fileList = _.map(fileList, function (file) {
  return path.join(examplesPath, file);
});

test('find-files: no template path', function (t) {
  t.plan(3);
  prep(examplesPath, function (err, results) {
    t.notok(err, 'should return values without an error');
    t.equal(results[0], exampleHTML, 'the first item in the result array should have the same content as example.html');
    t.deepEqual(results[1].sort(), fileList.sort(), 'the second value should be an array of path');
  });
});

test('find-files: with template path', function (t) {
  t.plan(3);
  prep(examplesPath, indexPath, function (err, results) {
    t.notok(err, 'should return values without an error');
    t.equal(results[0], indexHTML, 'the first item in the result array should have the same content as example.html');
    t.deepEqual(results[1].sort(), fileList.sort(), 'the second value should be an array of path');
  });
});
