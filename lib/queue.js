define(['./linkedlist'], function(LinkedList) {
  'use strict';

  function Queue() {
    this._list = new LinkedList();
  }

  Queue.prototype = {
    get length() {
      return this._list.length;
    },

    enqueue: function(val) {
      this._list.pushRight(val);
    },

    dequeue: function(val) {
      return this._list.popLeft();
    },

    front: function() {
      return this._list.get(0);
    }
  };

  return Queue;

});