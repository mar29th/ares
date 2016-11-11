define(function() {
  'use strict';

  function Node(val) {
    this.prev = this.next = null;
    this.val = val;
  }

  function LinkedList() {
    this._length = 0;
    this._head = new Node(null);
    this._tail = new Node(null);
    this._head.next = this._tail;
    this._tail.prev = this._head;
  }

  LinkedList.prototype = {
    get length() {
      return this._length;
    },

    pushLeft: function(val) {
      // This is implemented separately to avoid extra branching in insert()
      var node = new Node(val);
      node.next = this._head.next;
      this._head.prev = node;
      node.prev = this._head;
      this._head.next = node;
      ++this._length;
    },

    pushRight: function(val) {
      // This is implemented separately to avoid extra branching in insert()
      var node = new Node(val);
      this._tail.prev.next = node;
      node.prev = this._tail.prev;
      node.next = this._tail;
      this._tail.prev = node;
      ++this._length;
    },

    popLeft: function() {
      var node = this._head.next;
      this._head.next = node.next;
      node.prev = this._head;
      --this._length;
      return node.val;
    },

    popRight: function() {
      var node = this._tail.prev;
      node.prev.next = this._tail;
      this._tail.prev = node.prev;
      --this._length;
      return node.val;
    },

    _traverseLeft: function(pos) {
      var curr = this._head, i;
      for (i = 0; i < pos; curr = curr.next, ++i);
      return curr.next;
    },

    _traverseRight: function(pos) {
      var curr = this._tail, i;
      for (i = this._length - 1; i > pos; curr = curr.prev, --i);
      return curr.prev;
    },

    _getNode: function(pos) {
      return pos > (this._length >> 1) ? this._traverseRight(pos) : this._traverseLeft(pos);
    },

    insert: function(pos, val) {
      if (pos < 0 || pos > this._length) {
        throw new Error('Index ' + pos + ' out of bounds');
      }

      // Get point of insertion
      var node = new Node(val), curr;
      if (pos === 0) {
        curr = this._head.next;
      } else if (pos === this._length) {
        curr = this._tail;
      } else {
        curr = this._getNode(pos);
      }

      // Insert in between
      curr.prev.next = node;
      node.prev = curr.prev;
      node.next = curr;
      curr.prev = node;
      ++this._length;
    },

    remove: function(pos) {
      if (pos < 0 || pos >= this._length) {
        throw new Error('Index ' + pos + 'out of bounds');
      }

      // Get removed node
      var node = this._getNode(pos);

      // Remove
      node.prev.next = node.next;
      node.next.prev = node.prev;
      --this._length;
      return node.val;
    },

    get: function(pos) {
      if (pos >= this._length || pos < 0) {
        throw new Error('Index out of bounds');
      }
      return this._getNode(pos).val;
    }

  };

  LinkedList.prototype.push = LinkedList.prototype.pushRight;
  LinkedList.prototype.unshift = LinkedList.prototype.pushLeft;
  LinkedList.prototype.pop = LinkedList.prototype.popRight;

  return LinkedList;
});