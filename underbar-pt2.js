const { each } = require('./underbar-pt1');

/**
 * OBJECTS
 * =======
 *
 * In this section, we'll look at a couple of helpers for merging objects.
 */

// Extend a given object with all the properties of the passed in
// object(s).
//
// Example:
//   var obj1 = {key1: "something"};
//   _.extend(obj1, {
//     key2: "something new",
//     key3: "something else new"
//   }, {
//     bla: "even more stuff"
//   }); // obj1 now contains key1, key2, key3 and bla
const extend = function(obj) {
  // Your code here
  // Hint: remember that Array.from can convert an array-like object to handy-dandy array for you.
  const args = Array.from(arguments).slice(1);
  each(args, newObj => each(Object.keys(newObj), key => obj[key] = newObj[key]));
  return obj;
};

// Like extend, but doesn't ever overwrite a key that already
// exists in obj
const defaults = function(obj) {
  const args = Array.from(arguments).slice(1);
  each(args, newObj => {
    each(Object.keys(newObj), key => {
      (obj[key] === undefined) && (obj[key] = newObj[key]);
    });
  });
  return obj;
};


/**
 * FUNCTIONS
 * =========
 *
 * Now we're getting into function decorators, which take in any function
 * and return out a new version of the function that works somewhat differently
 */

// Return a function that can be called at most one time. Subsequent calls
// should return the previously returned value.
const once = function(func) {
  // Hint: you're going to need to return another function that you create inside this function.
  let called = false;
  let result;
  return function() {
    if (!called) {
      result = func.apply(this, arguments);
      called = true;
    }
    return result;
  }
};

// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
const memoize = function(func) {
  const functionResults = {};
  return function() {
    const resultsKey = JSON.stringify(arguments);
    if (functionResults[resultsKey] === undefined) {
      functionResults[resultsKey] = func.apply(this, arguments);
    }
    return functionResults[resultsKey];
  }
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// The arguments for the original function are passed after the wait
// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
// call someFunction('a', 'b') after 500ms
const delay = function(func, wait) {
  const args = Array.from(arguments).slice(2);
  setTimeout(function() { func.apply(this, args); }, wait);
};

// Randomizes the order of an array's contents.
//
// TIP: This function's test suite will ask that you not modify the original
// input array. For a tip on how to make a copy of an array, see:
// http://mdn.io/Array.prototype.slice
const shuffle = function(arr) {
  // Hint: See http://bost.ocks.org/mike/shuffle/ for an in-depth explanation of the
  // Fisher-Yates Shuffle
  const shuffled = arr.slice();
  let leftToSort = arr.length;
  while(leftToSort) {
    // choose a random value
    let randomIndex = Math.floor(Math.random() * leftToSort--);
    let swapSpace = shuffled[leftToSort];
    shuffled[leftToSort] = shuffled[randomIndex];
    shuffled[randomIndex] = swapSpace;
  }
  return shuffled;
};

module.exports = {
  extend: extend,
  defaults: defaults,
  once: once,
  memoize: memoize,
  delay: delay,
  shuffle: shuffle
};
