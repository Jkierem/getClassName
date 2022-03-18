import { ClassName } from "../..";

export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeEquivalentCSS(cl: string): R;
    }
  }
} 