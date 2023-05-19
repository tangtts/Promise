const PENGING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    //
    this.value = undefined;
    this.reason = undefined;
    this.status = PENGING;

    const onFulfilled =  (val)=> {
      if (this.status == PENGING) {
        this.value = val;
        this.status = FULFILLED;
      }
    };
    const onRejected =  (reason)=> {
      if (this.status == PENGING) {
        this.reason = reason;
        this.status = REJECTED;
      }
    };

    // 默认执行一次
    executor(onFulfilled, onRejected);
  }
  then(onFulfilled,onRejected) {
    if(this.status == FULFILLED){
      onFulfilled(this.value)
    }
    if(this.status == REJECTED){
      onRejected(this.reason)
    }
  }
}

module.exports = Promise;
