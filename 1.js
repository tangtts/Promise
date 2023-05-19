
const Promise = require("./promise")

// 1. 同步

let p1 =  new Promise((resolve,reject)=>{
  reject(100)
})

p1.then(res=>{
  console.log(res)
},err=>{
  console.log(err)
})



