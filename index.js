// index.js
const clone = (m={})=>o=>JSON.parse(
    JSON.stringify(o)
   ,(k, v)=>m[k] ? m[k](v) : v
)
module.exports.clone = clone

const filter = m=>o=>Object.keys(o).reduce((p, k)=>{
    if(m[k]) p[k] = m[k](o[k])
    return p
}, {})
module.exports.filter = filter
