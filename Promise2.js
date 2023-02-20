
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2, x, resolve, reject) {
  if (x == promise2) return new TypeError('循环引用');
  let then, called;

  if (x != null && ((typeof x == 'object' || typeof x == 'function'))) {
    try {
      then = x.then;
      // 判断是否是 promise 
      if (typeof then == 'function') {
        then.call(x, function (y) {
          if (called) return;
          called = true;
          // 可能有深度 Promise
          /**
           * new Promise((resolve,reject)=>{
           *  resolve(new Promise((resolve)=>{
           *      resolve(1000)
           * }))
           * })
           */
          resolvePromise(promise2, y, resolve, reject);
        }, function (r) {
          // 防止失败之后再次调用，其实没啥用
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}


class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const fulfilled = (value) => {
      if (this.status == PENDING) {
        this.value = value
        this.status = FULFILLED
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const rejected = (reason) => {
      if (this.status == PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(fulfilled, rejected)
    } catch (e) {
      rejected(e)
    }
  }
  // 由于需要切换状态，所以需要返回一个新的Promise
  then(onFulfilled, onRejected) {
    // 值的穿透
    // Promise.resolve(1).then().then().then(10)
    // 相当于 Promise.resolve(1).then(r=>{return r}).then(r=>{ return r})
    onFulfilled ??= v => v;
    // 相当于 Promise.reject(1).then(_,e=>throw e).then(_,e=>throw e)
    onRejected ??= v => { throw v };
    let promise2 = new Promise((resolve, reject) => {

      if (this.status == FULFILLED) {
        //   then 里面可能是普通值，也可能是 new Error
        try {
          let x = onFulfilled(this.value)
          // resolve 是一个函数 是fulfilled
          // 但是 Promise 是同步的，获取不到 Promise2
          // 所以使用 异步,要判断是否 promise 和 x 的关系
          setTimeout(() => {
            resolvePromise(promise2, x, resolve, reject)
          })
        } catch (e) {
          reject(e)
        }
      }

      if (this.status == REJECTED) {
        try {
          let x = onRejected(this.reason)
          setTimeout(() => {
            resolvePromise(promise2, x, resolve, reject)
          })
        } catch (e) {
          reject(e)
        }
      }

      if (this.status == PENDING) {
        this.onRejectedCallbacks.push(() => {
          try {
            //需要根据 x 来进行判断是否是 Promise 和 普通值
            let x = onRejected(this.reason)

            setTimeout(() => {
              resolvePromise(promise2, x, resolve, reject)
            })
          } catch (e) {
            reject(e)
          }
        })
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onRejected(this.value)
            setTimeout(() => {
              resolvePromise(promise2, x, resolve, reject)
            })
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }
}

module.exports = Promise