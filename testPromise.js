
// Promise 一共有3个状态，只能由 等待态到 成功态 或者失败态

// 需要一个执行器 executor
// 当 executor 会立即执行， 当成功的时候 不会走失败
// 当 executor 报错的时候，会走到 reject
// 

const Promise = require('../Promisee')
const p1 = new Promise(( resolve,reject ) => {
  // reject ( 12 )
  setTimeout(()=>{
    resolve( 1 )
  },1000)
})

p1.then( data =>{
  console.log( data,'data' )
},err => {
  console.log( err,"err" )
})

p1.then( data =>{
  console.log( data,'data' )
},err => {
  console.log( err,"err" )
})