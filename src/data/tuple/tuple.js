//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

const assertType = require('folktale/helpers/assert-type');
const assertFunction = require('folktale/helpers/assert-function');
const { data, derivations } = require('folktale/core/adt');
const provideAliases = require('folktale/helpers/provide-fantasy-land-aliases');
const warnDeprecation = require('folktale/helpers/warn-deprecation');
const adtMethods = require('folktale/helpers/define-adt-methods');
const extend = require('folktale/helpers/extend');

const { equality, debugRepresentation, serialization } = derivations;


/*~ stability: stable */
const Product = data('folktale:Data.Product', {
  /*~
   * type: |
   *   forall a b: (a, b) => Tuple a b
   */
  Tuple(a, b) {
    return { a, b };
  }
}).derive(equality, debugRepresentation, serialization);


const { Tuple } = Product;
const assertTuple = assertType(Product);

/*~~belongsTo: Product */
adtMethods(Product, {
  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Product a b).((a) => b) => Product a b
   */
  map: {
    /*~*/
    Tuple: function map(transformation) {
      assertFunction('Tuple.Tuple#map', transformation);
      return Tuple(this.a, transformation(this.b));
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Product a b).((a) => b) => Product a b
   */
  concat: {
    Tuple: function concat(aTuple) {
      assertTuple('Tuple.Tuple#concat', aTuple);
      return Tuple(this.a.concat(aTuple.a), this.b.concat(aTuple.b));
    }
  },

  /*~
   * type: |
   *   forall a, b, c: (Product a b).((b) => Product a c) => (Product a c)
   */
  chain: {
    Tuple: function chain(transformation) {
      assertFunction('Tuple.Tuple#chain', transformation);
      return this.map(transformation);
    }
  },

  /*~
   * type: |
   *   forall a, b, f: (Product a b).((b) => f b) => f (Product a b)
   */
  traverse: {
    Tuple: function traverse(transformation) {
      return transformation(this.b).map(v => Tuple(this.a, v));
    }
  },

  /*~
   * type: |
   *   forall a, b: (Product a b).((b) => b, (a) => b) => b
   */
  fold: {
    Tuple: function fold(noop, transformation) {
      return transformation(this.b);
    }
  },

  /*~
   * type: |
   *   forall a, b, c, d: (Product a b).((a) => c, (b) => d) => Product c d
   */
  bimap: {
    Tuple: function bimap(transformA, transformB) {
      return Tuple(transformA(this.a), transformB(this.b));
    }
  },

  /*~
   * type: |
   *   forall a, b: (Product a b).() => a
   */
  fst: {
    Tuple: function fst() {
      return this.a;
    }
  },

  /*~
   * type: |
   *   forall a, b: (Product a b).() => b
   */
  snd: {
    Tuple: function snd() {
      return this.b;
    }
  },

  /*~
   * type: |
   *   forall a, b: (Product a b).() => Product b a
   */
  swap: {
    Tuple: function swap() {
      return Tuple(this.b, this.a);
    }
  }

});

provideAliases(Tuple.prototype);
provideAliases(Product);

module.exports = Product;
