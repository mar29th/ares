define(function() {
  'use strict';

  function _DisjointSetNode() {
    this._parent = this;
    this._rank = 0;
  }

  function find(item) {
    if (item._parent !== item) {
      item._parent = find(item._parent);
    }

    return item._parent;
  }

  function make() {
    return new _DisjointSetNode();
  }

  function union(a, b) {
    var aRoot = find(a);
    var bRoot = find(b);

    if (aRoot === bRoot) {
      return;
    }

    if (aRoot._rank < bRoot._rank) {
      aRoot.parent = bRoot;
    } else if (aRoot._rank > bRoot._rank) {
      bRoot._parent = aRoot;
    } else {
      aRoot._parent = bRoot;
      ++bRoot._rank;
    }
  }

  return {
    make: make,
    union: union,
    find: find
  }
});