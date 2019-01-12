// index.js
const clone = m=>o=>JSON.parse(JSON.stringify(o), (k, v)=>m[k] ? m[k](v) : v)
module.exports.clone = clone

const filter = d=>o=>Object.keys(o).reduce((p, k)=>{
    if(d[k]) p[k] = o[k]
    return p
}, {})
module.exports.filter = filter
