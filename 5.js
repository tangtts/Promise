
const Promise = require("./promise")
let p1 = new Promise((resolve, reject) => {
  resolve()
}).then(()=>{
  return new Promise((resolve,reject)=>{
    resolve(new Promise((resolve)=>{
      reject(100)
    }))
  })
});

p1.then(res=>{
  console.log(res)
},err=>{
  console.log(err,"err")
})

