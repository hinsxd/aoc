class _DefaultDict<T, V> extends Map<T, V> {
  constructor(defaultInit: V | (() => V)) {}
}
class _ObjectMap<any, V> extends Map<any, V> {
  constructor(hashFn?: (object: any) => string) {}
}
class _ObjectSet<V> extends Set<V> {
  constructor(hashFn?: (object: any) => string) {}
}
import * as _ from "lodash-es";

declare global {
  var print2d: (arr: any[][]) => string;
  var DefaultDict = _DefaultDict;
  var ObjectMap = _ObjectMap;
  var ObjectSet = _ObjectSet;
  var readFileContent: (file: string) => string;
  var zip: (...arrs: any[]) => any[];
  var _ = _;
  var memoize: <T extends (...args: any[]) => any>(func: T) => T;
  var Oe = Object.entries;
  var Ok = Object.keys;
  var Ov = Object.values;
  var Logger: {
    new (mutes: string[], canLog?: boolean): {
      (...args: any[]): void;
      label(label: string): (...args: any[]) => void;
    };
  };
  interface Array {
    indexOfValue(value: any): number;
    transpose(): any[];
    equals(arr: any[]): boolean;
    has(value: any): boolean;
    remove(value: any): void;
    count(el: any): number;
    countRecursive(el: any): number;
  }

  interface String {
    count(substring: string): number;
  }
  interface Set<T> {
    intersect(set: Set<T>): Set<T>;
    union(set: Set<T>): Set<T>;
    difference(set: Set<T>): Set<T>;
    isSubsetOf(set: Set<T>): boolean;
    isSupersetOf(set: Set<T>): boolean;
  }
  interface Object {
    equals(obj: any): boolean;
  }
}

export {};
