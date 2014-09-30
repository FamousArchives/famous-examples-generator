'use strict';
var test = require('tape');
var path = require('path');

var findFiles = require('../lib/find-files');
var fileList = require('./fixtures/file-list-array');

test('find-files:', function (t) {
  t.plan(2);
  var examplesPath = path.join(__dirname, 'fixtures/examples');
  findFiles(examplesPath, function (err, files) {
    t.notok(err, 'should return values without an error');
    t.deepEqual(files.sort(), fileList.sort(), 'values should return with relative paths to src and without extensions');
  });
});
