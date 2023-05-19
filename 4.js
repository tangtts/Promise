
// const Promise = require("./promise")

// 1. 异步

let p1 =  new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(100)
  },1000)
  // resolve(100)
})

let p2 =  p1.then(res=>{
  return new Promise((resolve,reject)=>{
    reject(new Promise((resolve,reject)=>{
      resolve(10)
    }))
  })
})

p2.then(res=>{
  console.log(res,"res")
},err=>{
  console.log(err,"fail")
})