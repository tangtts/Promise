
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(promise2,x,resolve,reject) {
  if( x == promise2) return new TypeError('一样')
}


class Promise {

constructor( executor ){
    this.value = undefined;
    this.reason = undefined;
    this.status  = PENDING;

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const fulfilled =  ( value ) => {
      if( this.status == PENDING ){
        this.value = value
        this.status = FULFILLED
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const rejected =  ( reason ) => {
      if( this.status == PENDING ){
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(fulfilled,rejected)
    }catch (e){
      rejected(e)
    }
  }
  // 由于需要切换状态，所以需要返回一个新的Promise
  then(onFulfilled,onRejected){
    let promise2 = new Promise((resolve,reject)=>{

      if( this.status == FULFILLED ){
     //   then 里面可能是普通值，也可能是 new Error
        try {
          let x  = onFulfilled( this.value )
          // resolve 是一个函数 是fulfilled
          // 但是 Promise 是同步的，获取不到 Promise2
          // 所以使用 异步
          setTimeout(()=>{
            resolvePromise(promise2,x,resolve,reject)
          })
        }catch (e){
          reject(e)
        }
      }
  
      if( this.status == REJECTED){
        try {
          let x  = onRejected( this.reason )
          setTimeout(()=>{
            resolvePromise(promise2,x,resolve,reject)
          })
        } catch (e) {
          reject(e)
        }
      }
  
      if( this.status == PENDING ){
        this.onRejectedCallbacks.push(()=> {
          try {
            //需要根据 x 来进行判断是否是 Promise 和 普通值
            let x  = onRejected( this.reason )

            setTimeout(()=>{
              resolvePromise(promise2,x,resolve,reject)
            })
          } catch (e) {
            reject(e)
          }
        })
        this.onFulfilledCallbacks.push(()=>{
          try {
            let x  = onRejected( this.value )
            setTimeout(()=>{
              resolvePromise(promise2,x,resolve,reject)
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