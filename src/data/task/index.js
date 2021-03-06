//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

const Task = require('./_task');


/*~ 
 * stability: experimental 
 * name: module folktale/data/task
 */
module.exports = {
  of: Task.of,
  rejected: Task.rejected,
  task: require('./task'),
  waitAny: require('./wait-any'),
  waitAll: require('./wait-all'),
  _Task: Task,
  _TaskExecution: require('./_task-execution'),

  /*~
   * stability: experimental
   * type: |
   *    forall s, e:
   *      ((Any..., (e, s) => Void) => Void)
   *      => (Any...)
   *      => Task e s
   */
  fromNodeback(aNodeback) {
    return require('folktale/data/conversions/nodeback-to-task')(aNodeback);
  },

  /*~
   * stability: experimental
   * type: |
   *   forall e, v:
   *     ((Any...) => Promise v e) => (Any...) => Task e v
   */
  fromPromised(aPromiseFn) {
    return require('folktale/data/conversions/promised-to-task')(aPromiseFn);
  }
};
