const extract = fn => typeof(fn) === "function" ? fn() : fn;
const makeRegexp = (tok="&") => new RegExp(tok,"gi")
const preProcess = obj => {
    if(obj.base){
        const { token="&", ...rest } = obj
        const entries = Object.entries(rest)
            .map(([ key, val ]) => key === "base" ? [val, true] : [key,val])
            .map(([ key, val ]) => [ key.replace(makeRegexp(token),obj.base), val])
        
        return Object.fromEntries(entries) 
    } else {
        return obj
    }
}

const processClass = (obj) => Object.entries(preProcess(obj))
    .map(([cl,pred]) => extract(pred) && cl )
    .filter(Boolean)
    .join(" ")

export default function getClassName (obj) {
    const __inner = processClass(obj)
    const res = Object.assign(__inner,{
        token(){ 
            return obj?.token || "&"
        },
        base(){
            return obj?.base || __inner
        },
        extend(sub){
            return getClassName({
                base: sub.replace(makeRegexp(this.token()), this.base() || "")
            })
        },
        recompute(obj={}){
            return getClassName({
                base: this.base(),
                ...obj
            })
        }
    });
    return res;
}