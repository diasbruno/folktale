//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

const { property, forall} = require('jsverify');
const assert = require('assert');
const laws = require('../helpers/fantasy-land-laws');
const { Just } = require('folktale/data/maybe');
const { Tuple } = require('folktale/data/tuple');


describe('Data.Tuple', () => {

  describe('#map(f)', () => {
    property('Tuple(a, b).map(f) = Tuple(a, f(b))', 'nat', 'nat', 'nat -> nat', (a, b, f) => {
      return Tuple(a, b).map(f).equals(Tuple(a, f(b)));
    });
  });

  describe('#concat(b)', () => {
    property('Tuple(a, b).concat(Tuple(b, a)) = Tuple(a.concat(b), b.concat(a))', 'string', 'string', 'string', 'string', (a, b) => {
      return Tuple(a, b).concat(Tuple(b, a)).equals(Tuple(a.concat(b), b.concat(a)));
    });
  });

  describe('#chain(f)', () => {
    property('Tuple(a, b).chain(f) = Tuple(a, b).map(f)', 'nat', 'nat', 'nat -> nat', (a, b, f) => {
      return Tuple(a, b).chain(f).equals(Tuple(a, b).map(f));
    });
  });

  describe('#bimap(f, g)', () => {
    property('Tuple(a, b).bimap(f, g) = Tuple(f(a), g(b))', 'nat', 'nat', 'nat -> nat', 'nat -> nat', (a, b, f, g) => {
      return Tuple(a, b).bimap(f, g).equals(Tuple(f(a), g(b)));
    });
  });

  describe('#traverse(f)', () => {
    property('Tuple(a, b).traverse(f) = Just(Tuple(a, b))', 'nat', 'nat', (a, b) => {
      return Tuple(a, b).traverse(x => Just(x)).equals(Just(Tuple(a, b)));
    });
  });

  describe('Fantasy Land', _ => {
    laws.Setoid(Tuple);

    laws.Semigroup(x => Tuple(x, x));

    laws.Chain(x => Tuple(x, x));
  });

});
