// 🧠 JavaScript Data Types — Complete Notes
// 🔹 1. Number

// Represents numeric values — both integers and decimals.
// let age = 25;
// let price = 1999;

// 🔹 2. Float

// A float is a number with a decimal point.
// let temperature = 12.3;


// ⚡ Note: In JavaScript, both integers and floats are of type Number.

// 🔹 3. NaN (Not a Number)

// NaN means a value that’s not a valid number, even though its type is still number.
// let result = "hello" / 2; // NaN
// let another = 12 * "Asif"; // NaN

// 🔹 4. Null

// Used when you want to intentionally assign “nothing” to a variable.
// let user = null;
// let data = null;

// 🔹 5. Undefined

// Means a variable is declared but not yet assigned a value.
// let name;
// console.log(name); // undefined

// 🔹 6. String

// Used to store text or characters, wrapped in quotes.
// let message = "How are you?";

// 🔹 7. Boolean

// Represents a true or false value.
// let isLoggedIn = true;
// let isAdmin = false;

// 🧩 Complex (Non-Primitive) Data Types
// 🔹 8. Array

// Used to store multiple values in a single variable.
// let numbers = [1, 2, 3];

// 🔹 9. Object

// Used to store key–value pairs — structured data.
// let person = {
//   name: "Asif",
//   age: 22
// };

// 🧱 Primitive vs. Reference Data Types
// Type	Description	Example
// Primitive	Values are copied directly when assigned or passed.	Number, String, Boolean, Null, Undefined, Symbol, BigInt
// Reference (Non-Primitive)	Values are referenced, not copied. They share the same memory address.	Object, Array, Function

// Example:

//  Primitive example
// let x = 10;
// let y = x;
// y = 20;
// console.log(x); // 10 (copied separately)

// Reference example
// let obj1 = { name: "Asif" };
// let obj2 = obj1;
// obj2.name = "Arafat";
// console.log(obj1.name); // "Arafat" (same reference)
