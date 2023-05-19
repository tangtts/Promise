
const Promise = require("./promise")


Promise.resolve(10).then(res=>{
  console.log(res)
})

Promise.resolve(new Promise((resolve,reject)=>{
  resolve(100)
}))

Promise.reject(100).catch(res=>{
  console.log(res)
})


Promise.all([Promise.resolve(10),2,3]).then(res=>{
  console.log(res)
},err=>{
  console.log(err)
})

Promise.race([2,3,1]).then(res=>{
  console.log(res,"aaaa")
})

let p = new Promise((resolve)=>{
  resolve(10)
})

p.then(res=>res).finally(res=>{
  console.log(res,"finally")
})