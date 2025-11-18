//  🧠
//  JS Core & Fundamentals
//  1. What’s the difference between var, let, and const — and how does hoisting behave for each?
      // var a;
      // console.log(a);
      // in hoisting var value show undefined

      // let b;
      // console.log(b);
      // in hoisting let value show Uncaught ReferenceError: a is not defined , so cat hoisting let

      // const c;
      // if we want to create a const variable we have to define a value,so cat hoisting const
      // console.log(c);
      // var a = 10;
      // let b = 20;
      // const c = 30;
      // we can not call same nae in let and const
      // console.log(a, b, c);
      // a = 23;
      // b = 2;
      //** */ c = 23; we can not change const value
      // console.log(a, b, c);
      // var is function-scoped, let/const are block-scoped.

      // function abc(){
      //   const a = 20;
      //   console.log(a);
      // }
      // abc();
      // console.log(a);

      // if (true) {
      //   // let y = 20; // block-scoped
      //   // const z = 20; // block-scoped
      //   var rd = 30; // block-scoped
      //   console.log(y, z); // ✅ works
      //   console.log(rd); // ✅ works

      // }
      //console.log(y, z); // ❌ Error: not defined

      // console.log(rd); // ✅ works




//  2. Explain the difference between a statement and an expression with examples.


// 👉 Expression

// An expression is anything that produces a value.
// You can think of it as something that JS can evaluate to get a result.

// 🧩 Examples:

// 5 + 10          // ➜ 15
// "Hello" + "JS"  // ➜ "HelloJS"
// x = 20          // ➜ assigns 20 to x and returns 20
// myFunction()    // ➜ calls a function and returns its result
// 10 > 5  // true


// 👉 Statement

// A statement performs an action — it tells JS to do something, but doesn’t itself return a value.

// 🧱 Examples:

// let x = 10;       // variable declaration statement
// if (x > 5) { ... } // conditional statement
// for (let i = 0; i < 5; i++) { ... } // loop statement


//** */ let sum = a + b;     // Expression used inside a statement

// **💬 How to Answer in an Interview

// You could say:

// “An expression produces a value — for example, 5 + 10 or "Hi" + name.
// A statement performs an action, like declaring a variable or writing an if condition.
// In short, expressions evaluate to a value, while statements control the flow of the program.”

// And if they ask for code, you can write:

// // Expression
// 10 + 5

// // Statement
// if (10 > 5) {
//   console.log("True");
// }





//  3. Why is JavaScript called a loosely typed or dynamically typed language?

// 🧠 Concept: Loosely Typed / Dynamically Typed


// 1️⃣ Loosely Typed

// **JavaScript is loosely typed because you don’t need to declare variable types.
// You can store any kind of data in a variable — and JS won’t complain.

// 🧩 Example:

// let x = 10;      // number
// x = "Asif";      // now it's a string
// x = true;        // now it's a boolean


// ✅ JS allows this without any error.
// It doesn’t care what type you store — it’ll just change the type at runtime.


// 2️⃣ Dynamically Typed

// **JS is dynamically typed because the type of a variable is decided at runtime, not when you write the code.

// That means:

// The interpreter figures out the type when the code runs.

// You don’t explicitly say int, float, or string like in other languages (C, Java, etc.).

// 🧩 Example:

// let name = "Asif";  // string now
// name = 123;         // number later

// ⚙️ Why it Matters

// Easier for beginners → less syntax.

// But can cause unexpected type coercion (weird behavior like "5" + 2 = "52").


// **🧑‍💼 Interview-Ready Answer (Perfect Script)

// “JavaScript is called a loosely typed or dynamically typed language because you don’t need to define variable types explicitly.
// A variable can hold any type of value, and its type can change at runtime.
// For example, a variable that holds a number can later store a string — and JavaScript won’t throw an error.
// The type checking happens when the code runs, not when it’s written.”

// You can add a quick example:

// let value = 10;
// value = "Hello";


// “Here, value changes from a number to a string — that’s what makes JavaScript dynamically typed.”






//  4. What’s the difference between null, undefined, and NaN?


// | Value       | Meaning                                                          | Type                              | Example                 |
// | ----------- | ---------------------------------------------------------------- | --------------------------------- | ----------------------- |
// | `undefined` | A variable has been declared but not assigned any value.         | `undefined`                       | `let x; console.log(x)` |
// | `null`      | Intentional absence of any value (manually set to “nothing”).    | `object` *(weird historical bug)* | `let y = null;`         |
// | `NaN`       | Stands for “Not a Number” — result of invalid numeric operation. | `number`                          | `"Asif" * 2` → `NaN`    |

// 🔍 In Depth
// **1️⃣ undefined

// JS automatically assigns undefined when you declare a variable but don’t give it a value.

// It means: “there’s something here, but it’s empty by accident.”

// let name;
// console.log(name); // undefined


// **2️⃣ null

// You assign it yourself to mean “nothing here on purpose.”

// It’s a placeholder for empty or missing data.

// let user = null; // we know user doesn’t exist (yet)


// 🧠 Fun fact:
// typeof null → "object" → this is a bug in JS since 1995, but it’s kept for backward compatibility.


// **3️⃣ NaN (Not a Number)

// It appears when a math operation fails or a value can’t be converted to a number.

// console.log("hello" * 2); // NaN


// Even though it means Not a Number, its type is actually "number".

// console.log(typeof NaN); // "number"


// ***🧑‍💼 Interview-Ready Answer (Say This)

// “undefined means a variable has been declared but not assigned a value yet.
// null is an intentional absence of a value — we manually assign it to represent ‘nothing’.
// NaN stands for ‘Not a Number’ and shows up when a numeric operation fails, like multiplying a string by a number.
// Interestingly, typeof null is an object, and typeof NaN is number — both are historical quirks in JavaScript.”



//  5. What will this log and why:
//  js
//  console.log(typeof null);


// console.log(typeof null);
// 💥 Output
// csharp
// Copy code
// object
// 🧠 Explanation
// This happens because of a historical bug in JavaScript — from the very first version of the language (back in 1995).

// When JS was first implemented, all values were stored as binary tags representing their type.
// The tag for objects was 000, and somehow the tag for null was also stored as 000.

// So when you run typeof null, JavaScript internally sees it as having the object tag — and mistakenly reports "object".

// ⚙️ In Short
// Value	Real Meaning	typeof Result	Why
// null	intentional empty value	"object"	legacy bug kept for backward compatibility

// ****🧑‍💼 Interview-Ready Answer
// “It logs 'object' — that’s actually a long-standing bug in JavaScript.
// Historically, null was represented by a null pointer, which had the same internal type tag as objects.
// So even though null isn’t an object, typeof null still returns 'object' for backward compatibility.”




//  6. What’s the output?
//  js
//  let x = 10;
//  console.log(x++ + ++x);
// 💥 Output
// 22

// 🧠 Step-by-Step Explanation

// x = 10 initially.

// The expression is:

// x++ + ++x


// x++ → Postfix Increment

// Returns the current value first, then increases by 1.

// So x++ returns 10, and now x becomes 11.

// Next, ++x → Prefix Increment

// Increases the value first, then returns it.

// So ++x changes x to 12, and returns 12.

// Now the expression becomes:

// 10 + 12 = 22


// ✅ Final x value after everything = 12.

// 🔍 So:
// Expression	Returned Value	x after operation
// x++	10	11
// ++x	12	12

// Result logged → 22

// 🧑‍💼 Interview Tip

// If they ask this in an interview, say something like:

// “The output is 22.
// Because x++ returns the original value (10) before incrementing, and ++x increments first (making it 12).
// So the expression becomes 10 + 12 = 22, and x ends up as 12.”



//  7. What is the difference between == and ===?
//  Give an example where == gives true but === gives false.

// console.log("10"==10);
// console.log("10"===10);



//  💬
//  Strings
//  8. What does splice() do? (Careful—does it even exist for strings?)


      // let nums = [1, 3 , 4, 5];
      // nums.splice(0, 2);
      // console.log(nums);


      // let fruits = ["apple", "banana"];
      // fruits.splice(1,0, "watermelon");
      // console.log(fruits); // ["apple", "mango", "banana"]

      // let arr = [10, 20, 30];
      // arr.splice(1, 1, 99);
      // console.log(arr); // [10, 99, 30]

      // Does splice() exist for strings?

      // No.



//  9. How would you extract "JS" from "I love JS" using slice()?

      // let str = "I love JS";
      // let result = str.slice(7, 9);
      // console.log(result); // "JS"

      // Why 7 and 9?

      // "I love JS"

      // I → index 0

      // space → index 1

      // l → 2

      // o → 3

      // v → 4

      // e → 5

      // space → 6

      // J → 7

      // S → 8

      // slice(7, 9) → takes characters from index 7 up to 9 (not including 9) → "JS"
//  10. Write one line that converts "asif" → "Asif".

      // const uprCase = "asif"[0].toUpperCase() + "asif".slice(1);
      // console.log(uprCase);



// 11. What’s the difference between split() and join()?

      // 1️⃣ split()

      // Works on strings.

      // Splits a string into an array based on a separator.

      // let str = "I love JS";
      // let arr = str.split(" ");  // split by space
      // console.log(arr); // ["I", "love", "JS"]


      // ✅ Converts string → array.

      // 2️⃣ join()

      // Works on arrays.

      // Joins array elements into a string using a separator.

      // let arr = ["I", "love", "JS"];
      // let str = arr.join(" ");  // join with space
      // console.log(str); // "I love JS"


      // ✅ Converts array → string.


//  12. How would you check if a string contains “fire” without using regex?

      // const str = "I love fire";
      // if(str.includes("fire")){
      //       console.log("yes");
      // }else{
      //       console.log("no");
      // }

//  🔢
//  Data Types
//  13. What’s the difference between primitive and reference data types?

      // Primitive
      // let a = 10;
      // let b = a;  // copies the value
      // b++;
      // console.log(a, b); // 10, 11 → a is unchanged

      // Reference
      // let obj1 = { name: "Asif" };
      // let obj2 = obj1;  // copies the reference
      // obj2.name = "Ali";
      // console.log(obj1.name); // "Ali" → obj1 changes because obj2 points to the same object


//  14. Is an array primitive or reference?
      // primitive
//  15. What happens when you copy an object like this:
//  js
//  const obj2 = obj1;

      // Code
      // const obj1 = { name: "Asif" };
      // const obj2 = obj1;
      // obj2.name = "Ali";

      // console.log(obj1.name); // ?

      // What Happens

      // Objects in JS are reference types.

      // const obj2 = obj1; does not create a new object.

      // It copies the reference to the same object in memory.

      // Any changes through obj2 affect obj1, because both variables point to the same object.

      // ✅ Output:

      // "Ali"

//  16. Explain how you can clone an object without linking it to the original.
//  ⚙
//  Operators


      // a. Spread Operator
      // const obj1 = { name: "Asif", age: 22 };
      // const obj2 = { ...obj1 };  // clone

      // obj2.name = "Ali";
      // console.log(obj1.name); // "Asif" → original is safe

      // b. Object.assign()
      // const obj2 = Object.assign({}, obj1);


      // ✅ Both methods are equivalent for shallow cloning.


      // 2️⃣ Deep Copy

      // If the object has nested objects or arrays, a shallow copy isn’t enough. You need a deep copy:

      // const obj1 = { name: "Asif", address: { city: "Dhaka" } };
      // const obj2 = JSON.parse(JSON.stringify(obj1));

      // obj2.address.city = "Chittagong";
      // console.log(obj1.address.city); // "Dhaka" → original stays intact


      // ⚠️ Limitation: JSON method cannot clone functions, undefined, or Symbols.

//  17. What’s the difference between ++x and x++?

      // 1️⃣ ++x → Prefix Increment

      // Increments the variable first, then returns the new value.

      // let x = 5;
      // console.log(++x); // 6
      // console.log(x);   // 6


      // ✅ x is increased before it’s used.

      // 2️⃣ x++ → Postfix Increment

      // Returns the current value first, then increments the variable.

      // let x = 5;
      // console.log(x++); // 5 → returns old value
      // console.log(x);   // 6 → x is incremented after


      // ✅ x is increased after it’s used.


//  18. Explain this code:
//  js
//  let a = "10", b = 10;
//  console.log(a == b, a === b);

      // true and false cause == just watch the value is correct or not but === check value is correct or not and  string or number and both are same or not

//  19. What does the && operator return if both conditions are true?
      // true
//  20. Explain what’s wrong with this:
//  js
//  if (x = 5) { console.log("true") }

      // if (x = 5) {
      //   console.log("true");
      // }
      // What’s Wrong
      // = is an assignment, not a comparison

      // x = 5 assigns the value 5 to x.

      // The if condition doesn’t check equality — it just evaluates the value of the assignment.

      // Result in JS

      // The value of x = 5 is 5.

      // In a Boolean context (like if), any non-zero number is treated as true.

      // So the block will always run, regardless of what you intended.


//  🔁
//  Conditionals & Loops
//  21. Write a switch statement that logs the weekday based on a number (1–7).

// let day = 2;
// switch(day){
//       case 1:
//       console.log("Saturday");
//       break;
//       case 2:
//       console.log("Sunday");
//       break;
//       case 3:
//       console.log("Monday");
//       break;
//       case 4:
//       console.log("Tuesday");
//       break;
//       case 5:
//       console.log("Wednesday");
//       break;
//       case 6:
//       console.log("Thrust day");
//       break;
//       case 7:
//       console.log("Friday");
//       break;
//       default:
//       console.log("Invalid day");
// }



//  22. What’s the difference between while and do...while?
//  23. When would you use break vs continue?
//  24. Write a for loop that prints only even numbers between 1 and 20.
//  25. Write a for...of loop and a for...in loop — what’s the difference?
//  🧩
//  Functions
//  26. What’s the difference between parameters and arguments?
//  Printed using ChatGPT to PDF, powered by PDFCrowd HTML to PDF API. 3/5
// 27. What’s a higher-order function? Give a quick example.
//  28. Explain what an IIFE is and why it’s useful.
//  29. What’s the difference between a function declaration and a function expression?
//  30. What’s the output?
//  js
//  console.log(a);
//  var a = 10;
//  31. What’s the output?
//  js
//  console.log(b);
//  let b = 10;
//  32. Explain closure in your own words and show a simple code example.
//  33. What’s the difference between a pure and an impure function?
//  34. How does this behave differently in arrow functions?
//  🧱
//  Arrays & Objects
//  35. What’s the difference between map() and forEach()?
//  36. What does reduce() do — and how is it different from filter()?
//  37. Write a one-liner that sums all numbers in [2, 4, 6, 8] using reduce().
//  38. What’s the difference between push() and unshift()?
//  39. Write code to reverse an array without using .reverse().
//  40. Explain what happens here:
//  js
//  const arr = [1, 2];
//  arr[2] = arr;
//  console.log(arr);
//  41. What does Object.freeze() do?
//  42. What’s the difference between Object.seal() and Object.freeze()?
//  43. How do you access a nested object property safely (without erroring if undefined)?
//  44. Explain what this refers to in an object method.
//  ⏰
//  Timing Functions
//  45. What’s the difference between setTimeout and setInterval?
//  Printed using ChatGPT to PDF, powered by PDFCrowd HTML to PDF API. 4/5
// 46. How can you stop a running setInterval()?
//  47. Write a setTimeout() that prints "BOOM
// �
// �
//  " after 3 seconds.
//  🧠
//  Bonus: Trick Questions
//  48. What’s the output?
//  js
//  console.log([] == []);
//  49. And this?
//  js
//  console.log({} == {});
//  50. What’s the output of this and why?
//  js
//  console.log(typeof NaN);
//  Wanna go next-level? I can turn this list into a mock quiz (auto-check your answers + explain mistakes
//  like a mentor).
//  Wanna go for that?



