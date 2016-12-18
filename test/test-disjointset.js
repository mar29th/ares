describe('DisjointSet', function() {

  var dsets = null;

  beforeEach(function(done) {
    requirejs(['lib/disjointset'], function(a) {
      dsets = a;
      done();
    })
  });

  it('should unite sets', function() {
    var sets = {};
    for (var i = 0; i < 10; ++i) {
      sets[i] = dsets.make();
    }

    for (i = 0; i < 5; ++i) {
      dsets.union(sets[i], sets[9 - i]);
    }

    for (i = 0; i < 5; ++i) {
      var node = dsets.find(sets[i]);
      if (node !== sets[i] && node !== sets[9 - i]) {
        throw new Error('Parents not chained correctly');
      }
    }

    for (i = 0; i < 9; ++i) {
      dsets.union(sets[i], sets[i + 1]);
    }

    var exp = null;
    for (i = 0; i < 10; ++i) {
      if (!exp) {
        exp = dsets.find(sets[i]);
      } else if (dsets.find(sets[i]) !== exp) {
          throw new Error('Not united into one');
      }
    }
  });
});