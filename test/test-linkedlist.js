describe('LinkedList', function() {
  var LinkedList = null;

  beforeEach(function(done) {
    requirejs(['lib/linkedlist'], function(a) {
      LinkedList = a;
      done();
    })
  });

  it('should properly construct and represent a list', function() {
    var list = new LinkedList();

    var cmp = [1, 2, 3, 4, 5];
    cmp.forEach(function(n) {list.push(n);});
    list.length.should.equal(5);

    for (var i = 0; i < 5; ++i) {
      list.get(i).should.equal(cmp[i]);
    }
  });

  it('has functional left and right iterator', function() {
    var list = new LinkedList(), i;

    var cmp = [1, 2, 3, 2, 1];
    cmp.forEach(function(n) {list.push(n);});

    for (i = 0; i < 5; ++i) {
      list._traverseLeft(i).val.should.equal(list._traverseRight(5 - i - 1).val);
      list._traverseLeft(i).should.equal(list._traverseRight(i));
    }
  });

  it('should remove nodes properly', function() {
    var list = new LinkedList(), i;

    var cmp = [1, 2, 3, 2, 1];
    cmp.forEach(function(n) {list.push(n);});

    for (i = 0; i < 5; ++i) {
      list.remove(list.length - 1);
    }
    list.length.should.equal(0);
  });

  it('should handle insertion in the middle', function() {
    var list = new LinkedList(), i;

    var cmp = [1, 1];
    cmp.forEach(function(n) {list.push(n);});

    list.insert(0, -1);
    list.insert(2, 0);
    list.insert(list.length, 2);

    cmp = [-1, 1, 0, 1, 2];
    for (i = 0; i < 5; ++i) {
      list.get(i).should.equal(cmp[i]);
    }
  });
});