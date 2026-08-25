'use strict';

var combine = require('..');
var malformed = new Array(500002).join('\n');
if (combine.removeComments(malformed) !== malformed) {
  throw new Error('Malformed input changed unexpectedly');
}
