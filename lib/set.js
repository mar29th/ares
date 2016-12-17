define(function() {
  'use strict';

  function Set(original) {
    var original = original || [];

    this._dict = {};
    this._length = 0;

    for (var item in original) {
      this.add(item);
    }
  }

  Set.prototype = {
    get length() {
      return this._length;
    },

    add: function(o) {
      if (!this._dict.hasOwnProperty(o)) {
        this._dict[o] = true;
        ++this._length;
      }
    },

    remove: function(o) {
      delete this._dict[o];
      --this._length;
    },

    has: function(key) {
      return this._dict.hasOwnProperty(key);
    },

    clear: function(o) {
      var keys = Object.keys(this._dict);
      for (var key in keys) {
        if (this._dict.hasOwnProperty(key)) {
          delete this._dict[key];
        }
      }
      this._length = 0;
    },

    _doEach: function(fun) {
      var keys = Object.keys(this._dict);
      var i = 0;
      for (var key in keys) {
        if (this._dict.hasOwnProperty(key)) {
          fun(key, i++);
        }
      }
    },

    forEach: function(fun) {
      this._doEach(fun);
    },

    map: function(fun) {
      var retval = [];
      this._doEach(function(item, i) {
        retval.push(fun(item, i));
      });
      return retval;
    }
  };

  return Set;

});