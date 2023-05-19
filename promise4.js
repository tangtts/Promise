const PENGING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function resolvePromise(promise2, x, resolve, reject) {
  if (x == promise2) return new TypeError('循环引用');
  let then, called;
   //  2.3.3 x 是函数或者对象
  if (x != null && ((typeof x == 'object' || typeof x == 'function'))) {
  // 2.3.3.2 异常直接reject
    try {
    // 2.3.3.1 then 为 x.then
      then = x.then;
      
      // 2.3.3.3 判断函数
      if (typeof then == 'function') {
      // 2.3.3.3 x 作为 this
      // 相当于 x.then(function(y){},function(r){})
        then.call(x, function (y) {
         // 2.3.3.3.4.1 已经调用过，直接忽略掉
          if (called) return;
          called = true;
          // 2.3.3.3.1 如果是 resolve，则继续往下判断是否是 promise
          resolvePromise(promise2, y, resolve, reject);
        }, function (r) {
           // 2.3.3.3.4.1 已经调用过，直接忽略掉
          if (called) return;
          called = true;
          // 2.3.3.3.2 如果是 reject ，直接停止判断
          reject(r);
        });
      } else {
      // 不是函数，只是一个普通对象
        resolve(x);
      }
    } catch (e) {
    // 2.3.3.2 异常直接reject
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
  // 普通值直接返回
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    //
    this.value = undefined;
    this.reason = undefined;
    this.status = PENGING;

    this.onFulfilledAry = [];
    this.onRejectedAry = [];

    const onFulfilled = val => {
      if (this.status == PENGING) {
        this.value = val;
        this.status = FULFILLED;
        this.onFulfilledAry.forEach(fn => fn());
      }
    };
    const onRejected = reason => {
      if (this.status == PENGING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedAry.forEach(fn => fn());
      }
    };

    // 默认执行一次
    executor(onFulfilled, onRejected);
  }
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      if (this.status == FULFILLED) {
        try {
          let x = onFulfilled(this.value);
          setTimeout(() => {
            resolvePromise(promise2, x, resolve, reject);
          });
        } catch (err) {
          reject(err);
        }
      }
      if (this.status == REJECTED) {
        try {
         let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          reject(err);
        }
      }
      if (this.status == PENGING) {
        this.onFulfilledAry.push(() => {
          try {
           let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
        this.onRejectedAry.push(() => {
          try {
           let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      }
    });
    return promise2;
  }
}

module.exports = Promise;

