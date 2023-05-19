const PENGING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

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
    return new Promise((resolve, reject) => {
      if (this.status == FULFILLED) {
       let x =  onFulfilled(this.value);
       return resolve(x)
      }
      if (this.status == REJECTED) {
        let x = onRejected(this.reason);
        return reject(x)
      }
      if (this.status == PENGING) {
        this.onFulfilledAry.push(() => {
          let x = onFulfilled(this.value)
          return resolve(x)
        });
        this.onRejectedAry.push(() => {
          let x = onRejected(this.reason)
          return reject(x)
        });
      }

    });
  }
}

module.exports = Promise;
