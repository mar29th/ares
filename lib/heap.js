define(function() {
  'use strict';

  function _defaultCmp(a, b) {
    return a < b ? -1 : (a === b ? 0 : 1);
  }

  function _heapifyDown(lst, idx, cmp) {
    while (idx < lst.length) {
      var largestIdx = idx,
          left = 2 * idx + 1,
          right = 2 * idx + 2;

      if (left < lst.length && cmp(lst[largestIdx], lst[left]) < 0) {
        largestIdx = left;
      }
      if (right < lst.length && cmp(lst[largestIdx], lst[right]) < 0) {
        largestIdx = right;
      }

      if (largestIdx !== idx) {
        var tmp = lst[idx];
        lst[idx] = lst[largestIdx];
        lst[largestIdx] = tmp;
        idx = largestIdx;
      } else {
        break;
      }
    }
  }

  function _heapifyUp(lst, idx, cmp) {
    while (idx > 0) {
      var parentIdx = Math.floor((idx - 1) / 2);
      if (cmp(lst[parentIdx], lst[idx]) < 0) {
        var tmp = lst[idx];
        lst[idx] = lst[parentIdx];
        lst[parentIdx] = tmp;
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  function heapify(lst, cmp) {
    // Max Heap with root idx 0. In place.
    var i;
    cmp = cmp || _defaultCmp;

    for (i = Math.floor(lst.length / 2); i >= 0; --i) {
      _heapifyDown(lst, i, cmp)
    }
  }

  function heapPush(lst, o, cmp) {
    cmp = cmp || _defaultCmp;
    lst.push(o);
    _heapifyUp(lst, lst.length - 1, cmp);
  }

  function heapPop(lst, cmp) {
    if (lst.length === 0) {
      throw new Error('Array empty');
    }

    cmp = cmp || _defaultCmp;
    var retval = lst[0];
    lst[0] = lst[lst.length - 1];
    lst.pop();

    _heapifyDown(lst, 0, cmp);

    return retval;
  }

  return {
    heapify: heapify,
    heapPush: heapPush,
    heapPop: heapPop
  };

});