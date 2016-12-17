describe('Heap', function() {

  var heap = null;

  beforeEach(function(done) {
    requirejs(['lib/heap'], function(a) {
      heap = a;
      done();
    })
  });

  it('should perform a heapsort well', function() {
    var lst = [1, 5, 9, -1, -5, -9, 23, -12, 8],
        cmp = function (a, b) {return a - b;},
        cpy = lst.splice(0).sort(function (a, b) { return b - a; });

    heap.heapify(lst, cmp);

    for (var i = 0; lst.length > 0; ++i) {
      heap.heapPop(lst, cmp).should.equal(cpy[i]);
    }
  });

  it('should maintain heap property after insertion', function() {
    var lst = [],
        cpy = [],
        cmp = function (a, b) {return a - b;},
        randFloat;

    for (var i = 0; i < 100; ++i) {
      randFloat = Math.random();
      heap.heapPush(lst, randFloat, cmp);
      cpy.push(randFloat);
    }

    lst.length.should.equal(100);
    cpy = cpy.sort(function (a, b) { return b - a; });
    for (i = 0; i < 100; ++i) {
      heap.heapPop(lst, cmp).should.equal(cpy[i]);
    }
  });

});