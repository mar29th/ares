define(function() {
  'use strict';

  function shallowCopy(o) {
    var retval = {};
    Object.keys(o).forEach(function() {
      if (o.hasOwnProperty(key)) {
        retval[key] = o[key];
      }
    });

    return retval;
  }
});