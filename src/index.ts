type Extractable<T> = T | (() => T)
type Extracted<T> = T extends ((...args: unknown[]) => unknown) ? ReturnType<T> : T
export type ClassNameConfig = {
    base?: string;
    token?: string;
    [x: string]: string | Extractable<boolean> | undefined;
} 

export type ClassName = string & {
    /**
     * Returns the current base class of the classname. 
     * It is what the token is replaced to.
     */
    base: () => string,
    /**
     * Returns the current token used for interpolation.
     * The default token is &(ampersand)
     */
    token: () => string,
    /**
     * Creates a new classname with the base class set to be the passed subclass string.
     * If the subclass includes the current token, it will be replaced with the current base
     */
    extend: (subclass: string) => ClassName,
    /**
     * Creates a new classname, using the configuration passed as argument. 
     * The base is automatically set to the current base but can be overwritten 
     * in the config object
     */
    recompute: (config?: ClassNameConfig) => ClassName,
    /**
     * Creates a new element subclass by prepending `"&__"`. 
     * Shorthand for `extend("&__subclass")`
     */
    element: (subclass: string) => ClassName,
    /**
     * Creates a new modifier subclass by prepending `"&--"`. 
     * Shorthand for `extend("&--subclass")`
     */
    modifier: (subclass: string) => ClassName
}

const extract = <T>(fn: T): Extracted<T> => typeof(fn) === "function" ? fn() : fn;
const makeRegexp = (tok: string) => new RegExp(tok,"gi")
const entries = (obj: any): [string,unknown][] => Object.keys(obj).map(key => [key,obj[key]] as [string,unknown])
const fromEntries = (entr: any) => entr.reduce((acc: any,[key,val]: any) => ({ ...acc, [key]: val }),{})
const preProcess = (obj: ClassNameConfig): Record<string, Extractable<boolean>> => {
    if(obj.base){
        const { token="&", ...rest } = obj
        const entr = entries(rest)
            .map(([ key, val ]) => (key === "base" ? [val, true] : [key,val]) as [string,any])
            .map(([ key, val ]) => [key.replace(makeRegexp(token),obj.base as string), val])
        
        return fromEntries(entr)
    } else {
        return obj as Record<string, Extractable<boolean>>
    }
}

const processClass = (obj: ClassNameConfig): string => (entries(preProcess(obj)) as [string, Extractable<boolean>][])
    .map(([cl,pred]) => extract(pred) && cl )
    .filter(Boolean)
    .join(" ")

export default function getClassName (obj: ClassNameConfig = {}): ClassName {
    const __inner = processClass(obj)
    const res = Object.assign(__inner,{
        token(){ 
            return obj.token || "&"
        },
        base(){
            return obj.base || __inner
        },
        extend(sub: string){
            return getClassName({
                base: sub.replace(makeRegexp(this.token()), this.base())
            })
        },
        recompute(obj={}){
            return getClassName({
                base: this.base(),
                ...obj
            })
        },
        element(sub: string){
            return this.extend(`&__${sub}`)
        },
        modifier(sub: string){
            return this.extend(`&--${sub}`)
        }
    });
    return res;
}