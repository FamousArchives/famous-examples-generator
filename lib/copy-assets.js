/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';
// require from node core
var path = require('path');

var ncp = require('ncp');

var assetsDir = path.join(__dirname, '..', 'assets');

// Tie it all together in a single export
module.exports = function (outpath, cb) {
  outpath = path.join(outpath, 'assets');
  ncp(assetsDir, outpath, cb);
};
