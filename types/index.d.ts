declare module "getclassname" {
    export interface ClassNameData {
        base?: string;
        [x: string]: any;
    }

    export type ClassName = string & {
        token(): string;
        base(): string;
        extend(sub: string): ClassName;
        recompute(data: ClassNameData): ClassName;
    }

    export function getClassName(data: ClassNameData): ClassName;
}