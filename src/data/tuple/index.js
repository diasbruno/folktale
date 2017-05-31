//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


const Product = require('./tuple');
const { typeSymbol } = require('folktale/core/adt/data');

const { Tuple } = Product;

/*~
 * stability: stable
 * authors:
 *   - "@diasbruno"
 *
 * name: module folktale/data/tuple
 */
module.exports = {
  Tuple: Tuple,
  hasInstance: Product.hasInstance,
  fromJSON: Product.fromJSON,
  [typeSymbol]: Product[typeSymbol]
};
