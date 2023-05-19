
const Promise = require("./promise")

// 1. 异步

let p1 =  new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject(100)
  },1000)
})

p1.then(res=>{
  console.log(res)
},err=>{
  console.log(err)
})



