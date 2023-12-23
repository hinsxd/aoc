// @ts-nocheck
import { readFileSync } from "fs";
import { zip } from "lodash-es";
import * as _ from "lodash-es";
global._ = _;

global.Oe = Object.entries;
global.Ok = Object.keys;
global.Ov = Object.values;
global.memoize = function (fn) {
  return function (...args) {
    const hash = JSON.stringify(args);
    if (cache.has(hash)) return cache.get(hash);
    const result = fn(...args);
    cache.set(hash, result);
    return result;
  };
};

global.DefaultDict = class DefaultDict extends Map {
  constructor(defaultFactory) {
    super();
    this.defaultFactory = defaultFactory;
  }

  get(key) {
    if (!this.has(key)) {
      this.set(key, this.defaultFactory());
    }
    return super.get(key);
  }
};

Array.prototype.count = function (value) {
  return this.filter((item) => item === value).length;
};

Array.prototype.countRecursive = function (value) {
  return this.reduce(
    (acc, item) =>
      acc +
      (Array.isArray(item)
        ? item.countRecursive(value)
        : item === value
        ? 1
        : 0),
    0
  );
};

Array.prototype.indexOfValue = function (value, fromIndex) {
  return this.findIndex(
    (item) => JSON.stringify(item) === JSON.stringify(value),
    fromIndex
  );
};
Array.prototype.transpose = function () {
  return zip(...this);
};

Array.prototype.equals = function (other) {
  if (this.length !== other.length) return false;
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== other[i]) return false;
  }
  return true;
};

Array.prototype.has = function (value) {
  return this.indexOf(value) !== -1;
};

Array.prototype.remove = function (value) {
  const index = this.indexOf(value);
  if (index === -1) return;
  this.splice(index, 1);
};

Object.prototype.equals = function (other) {
  const thisKeys = Object.keys(this);
  const otherKeys = Object.keys(other);
  if (thisKeys.length !== otherKeys.length) return false;
  for (const key of thisKeys) {
    if (this[key] !== other[key]) return false;
  }
  return true;
};

global.readFileContent = function readFileContent(filePath) {
  const file = readFileSync(filePath, "utf-8");
  return file;
};

Set.prototype.intersect = function (other) {
  const intersection = new Set();
  for (const item of this) {
    if (other.has(item)) intersection.add(item);
  }
  return intersection;
};

Set.prototype.union = function (other) {
  const union = new Set(this);
  for (const item of other) {
    union.add(item);
  }
  return union;
};

Set.prototype.difference = function (other) {
  const difference = new Set(this);
  for (const item of other) {
    difference.delete(item);
  }
  return difference;
};

Set.prototype.isSupersetOf = function (subset) {
  for (const item of subset) {
    if (!this.has(item)) return false;
  }
  return true;
};

Set.prototype.isSubsetOf = function (superset) {
  return superset.isSupersetOf(this);
};

String.prototype.count = function (subString) {
  return this.split(subString).length - 1;
};

global.zip = zip;

global.Logger = class Logger extends Function {
  constructor(muteMap = [], canLog = true) {
    super();
    this.muteMap = new Set([...muteMap]);
    this.canLog = canLog;

    return new Proxy(this, {
      apply: (target, thisArg, args) => target.#log(...args),
    });
  }
  #log(...args) {
    if (!this.canLog) return;
    console.log(...args);
  }
  label(label) {
    return (...args) => {
      if (this.muteMap.has(label)) return;
      this(`\n\x1b[33m*+_+*+_+*+_+* ${label} START *+_+*+_+*+_+*\x1b[0m\n`);
      this(...args);
      this(`\n\x1b[33m*+_+*+_+*+_+* ${label}  END  *+_+*+_+*+_+*\x1b[0m\n`);
    };
  }
};

global.ObjectMap = class ObjectMap extends Map {
  #hashFn;
  constructor(hashFn = (obj) => JSON.stringify(obj)) {
    super();
    this.#hashFn = hashFn;
  }

  set(key, value) {
    super.set(this.#hashFn(key), value);
  }
  get(key) {
    return super.get(this.#hashFn(key));
  }
  delete(key) {
    return super.delete(this.#hashFn(key));
  }
};
global.ObjectSet = class ObjectSet extends Set {
  #hashFn;
  constructor(hashFn = (obj) => JSON.stringify(obj)) {
    super();
    this.#hashFn = hashFn;
  }

  add(key) {
    super.add(this.#hashFn(key));
  }
  has(key) {
    return super.has(this.#hashFn(key));
  }
  delete(key) {
    return super.delete(this.#hashFn(key));
  }
  *entries() {
    for (const [v, _] of super.entries()) {
      const value = JSON.parse(v);
      yield value;
    }
  }
  *keys() {
    for (const key of super.keys()) {
      yield JSON.parse(key);
    }
  }
};

global.print2d = (arr) => {
  console.log(arr.map((a) => a.join("")).join("\n"));
};
