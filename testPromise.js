
// Promise 一共有3个状态，只能由 等待态到 成功态 或者失败态

// 需要一个执行器 executor
// 当 executor 会立即执行， 当成功的时候 不会走失败
// 当 executor 报错的时候，会走到 reject
// 

// const Promise = require('../Promisee')
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
// afternoon
// then 链条
// 如果 then 里面是一个 Promise 的话
  // 如果 是 resolve 下一个 then 里面的 成功
  // 如果是 reject 的话，下一个 走的是 then 里面的 失败
// 如果默认不写 then 的成功或者失败 函数
// 会直接传递给 下一个 then 的 失败或者成功
const  p2 = new Promise((resolve,reject) => {
  resolve()
})
p2.then(res=>{
  return Promise.reject(1)
}, err => {
  console.log(err, 'err ')
}).then( res => {

}, err => {
  console.log(err, 'err then')
}).catch( err => {
  console.log(err, 'err catch')
})