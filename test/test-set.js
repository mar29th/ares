describe('Set', function() {
  var Set = null;

  beforeEach(function(done) {
    requirejs(['lib/set'], function(a) {
      Set = a;
      done();
    });
  });

  it('should handle simple addition', function() {
    var set = new Set(),
        i;

    for (i = 0; i < 10; ++i) {
      set.add(i);
    }

    set.length.should.equal(10);

    for (i = 0; i < 10; ++i) {
      set.has(i).should.equal(true);
    }

    for (i = 0; i < 10; ++i) {
      set.delete(i);
    }

    set.length.should.equal(0);
  });

  it('should count duplicates only once', function() {
    var set = new Set();

    for (var i = 0; i < 100; ++i) {
      set.add(1);
    }

    set.length.should.equal(1);
  });

  it('should be iterable', function() {
    var set = new Set(),
      nums = {};

    for (var i = 0; i < 100; ++i) {
      set.add(i);
      nums[i] = true;
    }

    set.forEach(function(item) {
      nums.hasOwnProperty(item).should.equal(true);
      delete nums[item];
    });

    var res = set.map(function(item, i) {
      return item.toString() + ' ' + i.toString();
    });

    res.length.should.equal(100);
    for (i = 0; i < 100; ++i) {
      res[i].should.equal([i.toString(), i.toString()].join(' '));
    }
  });
});