// index.js
const clone = (m={})=>o=>JSON.parse(
    JSON.stringify(o)
   ,(k, v)=>m[k] ? m[k](v) : v
)

const filter = m=>o=>Object.keys(o).reduce((p, k)=>{
    if(m[k]) p[k] = m[k](o[k])
    return p
}, {})

const conv = m=>o=>Object.keys(o).reduce((p, k)=>{
    p[k] = m[k] ? m[k](o[k]) : o[k]
    return p
}, {})

module.exports = {
    clone: clone
   ,filter: filter
   ,conv: conv
}

if(module.parent) return

// sample
const {clone:cln, filter:flt, conv:cnv} = require('./index.js')
const dto = {
    id: 12345
   ,name: 'foo bar'
   ,birthday: new Date(2018, 12-1, 31)
   ,sex: true
   ,comment: null
}

const _clone = cln({
    birthday: v=>new Date(v)
})
console.log('** clone:', _clone(dto))

const _filter = flt({
    id: v=>v
   ,name: v=>v
   ,birthday: v=>v
   ,sex: v=>v
})
console.log('** filter:', _filter(dto))

const _conv = cnv({
    id: v=>("0000000000"+v).slice(-10)
   ,birthday: dt=>{
        const y = dt.getFullYear()
        const m = ("00"+(dt.getMonth()+1)).slice(-2)
        const d = ("00"+(dt.getDate())).slice(-2)
        return `${y}/${m}/${d}`
    }
   ,sex: v=>v ? 'M' : 'F'
   ,comment: v=>v ? v : ''
})
console.log('** conv:', _conv(dto))

