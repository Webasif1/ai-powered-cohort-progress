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

//  3. Why is JavaScript called a loosely typed or dynamically typed language?
//  4. What’s the difference between null, undefined, and NaN?
//  5. What will this log and why:
//  js
//  console.log(typeof null);
//  6. What’s the output?
//  js
//  let x = 10;
//  console.log(x++ + ++x);
//  7. What is the difference between == and ===?
//  Give an example where == gives true but === gives false.
//  💬
//  Strings
//  8. What does splice() do? (Careful—does it even exist for strings?)
//  9. How would you extract "JS" from "I love JS" using slice()?
//  10. Write one line that converts "asif" → "Asif".
//  Printed using ChatGPT to PDF, powered by PDFCrowd HTML to PDF API. 2/5
// 11. What’s the difference between split() and join()?
//  12. How would you check if a string contains “fire” without using regex?
//  🔢
//  Data Types
//  13. What’s the difference between primitive and reference data types?
//  14. Is an array primitive or reference?
//  15. What happens when you copy an object like this:
//  js
//  const obj2 = obj1;
//  16. Explain how you can clone an object without linking it to the original.
//  ⚙
//  Operators
//  17. What’s the difference between ++x and x++?
//  18. Explain this code:
//  js
//  let a = "10", b = 10;
//  console.log(a == b, a === b);
//  19. What does the && operator return if both conditions are true?
//  20. Explain what’s wrong with this:
//  js
//  if (x = 5) { console.log("true") }
//  🔁
//  Conditionals & Loops
//  21. Write a switch statement that logs the weekday based on a number (1–7).
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



