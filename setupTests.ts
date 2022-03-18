import { ClassName } from "./src";

expect.extend({
    toBeEquivalentCSS(cl: ClassName, expected: string){
        const result = cl.toString();
        const missingCls = expected
            .split(" ")
            .filter(cl => !result.includes(cl))
        
        if( missingCls.length === 0 ){
            return {
                pass: true,
                message: () => `Expected "${result}" to not be a class equivalent to "${expected}"`
            }
        } else {
            return {
                pass: false,
                message: () => `Expected "${result}" to be a class equivalent to "${expected}".\n\n` 
                    + `It is missing the following classes: [${missingCls.join(", ")}]`
            }
        }
    }
})