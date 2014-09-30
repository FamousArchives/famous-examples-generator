/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var test = require('tape');
var path = require('path');
var os = require('os');
var fs = require('fs');

var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var examplesPath = path.join(__dirname, 'fixtures', 'examples');
var tmpdir = path.join(os.tmpdir(), 'famous-examples-generator', 'test-template-index');
var templateIndex = require('../lib/template-examples');

test('test-template-index: setup', function (t) {
  t.plan(2);
  mkdirp(tmpdir, function (err) {
    t.notok(err, 'the temp directory should be made without an error');
    var exists = fs.existsSync(tmpdir);
    t.ok(exists, 'the temp directory should exist');
  });
});

test('test-template-index:', function (t) {
  t.plan(2);
  templateIndex(examplesPath, tmpdir, function (err) {
    t.notok(err, 'should return values without an error');
    var exists = fs.existsSync(path.join(tmpdir, 'index.html'));
    t.ok(exists, 'index.html should exist after templating');
  });
});

test('test-template-index: teardown', function (t) {
  t.plan(2);
  rimraf(tmpdir, function (err) {
    t.notok(err, 'the temp directory should be removed without an error');
    var exists = fs.existsSync(tmpdir);
    t.notok(exists, 'the temp directory should no longer exist');
  });
});
