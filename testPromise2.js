


const Promise = require('./Promise2')
const p1 = new Promise((resolve, reject) => {
  // reject ( 12 )
    resolve(1)
})


// then 的状态可以切换
// 所以每次的 then 都需要一个新的Promise

// then 里面可能是普通值，也可能是 new Error

 let p2 = p1.then(data => {
 return 12
}, err => {
  console.log(err, "err")
})

p2.then(res => {
  console.log(res)
}, err => {
  console.log( err )
})

