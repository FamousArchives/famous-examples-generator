/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var test = require('tape');
var path = require('path');
var os = require('os');
var fs = require('fs');
var spawn = require('child_process').spawn;

var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var examplesPath = path.join(__dirname, 'fixtures', 'examples');
var tmpdir = path.join(os.tmpdir(), 'famous-examples-generator', 'test-bin');

test('test-bin: setup', function (t) {
  t.plan(2);
  mkdirp(tmpdir, function (err) {
    t.notok(err, 'the temp directory should be made without an error');
    var exists = fs.existsSync(tmpdir);
    t.ok(exists, 'the temp directory should exist');
  });
});

test('test-bin: two args', function (t) {
  t.plan(3);

  var binPath = path.resolve(__dirname, '../bin/cmd.js');
  var ps = spawn(binPath, ['-i', examplesPath, '-o', tmpdir]);
  var stdout = '';
  var stderr = '';
  ps.stdout.on('data', function (buf) { stdout += buf; });
  ps.stderr.on('data', function (buf) { stderr += buf; });

  ps.on('exit', function (code) {
    t.equal(code, 0);
    t.equal(stderr, '');
    t.equal(stdout, 'All Done!\n');
  });
});

test('test-bin: one arg', function (t) {
  t.plan(3);

  var binPath = path.resolve(__dirname, '../bin/cmd.js');
  var ps = spawn(binPath, ['-i', tmpdir]);
  var stdout = '';
  var stderr = '';
  ps.stdout.on('data', function (buf) { stdout += buf; });
  ps.stderr.on('data', function (buf) { stderr += buf; });

  ps.on('exit', function (code) {
    t.equal(code, 0);
    t.equal(stderr, '');
    t.equal(stdout, 'All Done!\n');
  });
});

test('test-bin: teardown', function (t) {
  t.plan(2);
  rimraf(tmpdir, function (err) {
    t.notok(err, 'the temp directory should be removed without an error');
    var exists = fs.existsSync(tmpdir);
    t.notok(exists, 'the temp directory should no longer exist');
  });
});
