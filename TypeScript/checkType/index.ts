let a: number = 10;
let b: String = "Hello";

// a = "String"   Wrong ❌ TSError: ⨯ Unable to compile TypeScript:index.ts:4:1 - error TS2322: Type 'string' is not assignable to type 'number'.

a = 20 //✅

console.log(b,a);
