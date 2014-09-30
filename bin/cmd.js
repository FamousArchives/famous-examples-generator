#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*eslint no-process-exit:0*/

'use strict';

var argv = require('minimist')(process.argv.slice(2));
var exampleGenerator = require('../lib');

var examplePath = argv.i;
var outPath = argv.o || examplePath;

exampleGenerator.templateExamples(examplePath, outPath, function (err) {
  if (err) {
    console.error(new Error(err));
    process.exit(1);
  }
  console.log('All Done!');
  process.exit(0);
});
