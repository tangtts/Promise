
// const Promise = require("./promise")

// 1. 异步

let p1 =  new Promise((resolve,reject)=>{
  resolve(100)
})

// 在 then 中只有 throw 和 Promise 一个 reject 可以到下一个的 reject
// err 也是
let p2 = p1.then(res=>{
  
  return new Promise((resolve,reject)=>{
    reject(100)
  })
},err=>{
  console.log(err)
  return 10
})

p2.then(res=>{
  console.log(res,"success")
},err=>{
  console.log(err,"fail")
})






