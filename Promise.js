
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
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
  then(onFulfilled,onRejected){

    if( this.status == FULFILLED ){
      onFulfilled( this.value )
    }

    if( this.status == REJECTED){
      onRejected( this.reason )
    }

    if( this.status == PENDING ){
      this.onRejectedCallbacks.push(()=> onRejected( this.reason ) )
      this.onFulfilledCallbacks.push(()=> onFulfilled( this.value ) )
    }

  }
}

module.exports = Promise