// 1.Create two variables: one storing your full name and another storing your favorite hobby. Print a sentence in the format:
//  "My name is <your name> and <your hobby>".


// const fullName = prompt("Write your name 😎");
// const favoriteHobby = prompt("White your favorite hobby 👍");
// const string = `My name is ${fullName} and ${favoriteHobby}`

// console.log(string);


// 2. Perform the arithmetic calculation `45 * 2 - 10` and print the final result.

// const result = 45*2-10;
// console.log(result);


// 3. Write a program that retrieves and prints the current year using JavaScript’s `Date` object.

// const date = new Date();

// let year = date.getFullYear()
// console.log(year);

// 4. Store your first name and last name in two different variables, then print your full name in a single output.

// const firstName = "Md Arafat Hossain";
// const lastName = "Asif";
// console.log(firstName + " " + lastName);

// 5. Create a variable with an initial value. Print its value, update the value, and print the updated value again.

// let a =10;
// console.log(a);
// a = 20;
// console.log(a);

// 6. Print a custom error message using `console.error()`.


// console.error('Something went wrong')

// 7. Store a number in a variable and print the square of that number.

// let a = 10;
// a = a ** 2
// console.log(a);

// 8. Create a boolean variable and print its value.

// const bool = true;
// console.log(bool);

// 9. Store your age in a variable and print whether your age is greater than 18.

// let age = 23;

// if(age > 18){
//   console.log(age);
// }else{
//   console.log("Your age is less then 18");
// }


// 10. Divide `100` by `0` and print the result. Observe what JavaScript returns.

// let a = 100 / 0;

// console.log(a);

//** ## Variables and Data types

// 11. Create a variable using `let` and print its value.

// let a = 10;
// console.log(a);

// 12. Declare a constant named `PI` with the value `3.14` and print it.

// const PI = 3.14
// console.log(PI);

// 13. Create a variable, print its value, update the value, and print the updated value again.

// let a = 10;
// console.log(a);
// a = 11;
// console.log(a);

// 14. Print the output of `typeof null` and observe what type JavaScript reports.

// console.log(typeof null);

// 15. Create a variable containing a numeric value as a string (e.g., `"25"`) and print its type.

// const num = "25"
// console.log(typeof num);


// 16. Create a boolean variable and print its type using `typeof`.

// const bool = false;
// console.log(typeof bool);

// 17. Create three variables: a string, a number, and a boolean. Print all of them together in a formatted output.

// const nameOfUser = "Asif"
// const age = 22;
// const isCorrect = true;

// console.log(`My name is ${nameOfUser} & my age is ${age} this is ${isCorrect}`);

// 18. Declare a variable without assigning a value and print its type using `typeof`.

// let val ; //show undefined
// const val; //not correct show error
// console.log(typeof val);

// 19. Create a variable with the value `undefined` and print its type.

// const type = undefined;
// console.log(typeof type);
// const type = NaN;
// console.log(typeof type);
// const type = null;
// console.log(typeof type);

// 20. Create an array using `const`, print it, attempt to reassign the entire array (and handle the error), then modify the existing array by adding a new element and print the updated array.
// const arr = [12,13,14,15]
// console.log(arr);
// try{
//   arr = [11,13,14,15]
// } catch(e){
//   console.error("Error: Cannot reassign a const array");
// }
// arr.push(16)
// console.log(arr);


//*** ## Loops

// 21. Write a program that prints the numbers from 1 to 50 using a `for` loop.


// for(let i = 1; i <= 50; i++){
//   console.log(i);
// }

// 22. Using a `while` loop, calculate and print the sum of numbers from 1 to 10.

// let sum = 0;
// let i = 0;

// while(i<10){
//   i++
//   sum  = sum + i
// }
// console.log(sum);

// 23. Iterate through each character of the string `"JavaScript"` using a `for...of` loop and print each character.

// const str = "JavaScript";

// for(const chr of str){
//   console.log(chr);
// }


// 24. Using a `for` loop, print all odd numbers from 1 to 20. Use `continue` to skip even numbers.

// for (let i = 1; i<=20; i++){
//   if(i % 2 === 0){
//     continue;
//   }
//   console.log(i);
// }

// 25. Use a `do...while` loop to print the numbers from 5 down to 1.

// let i = 5;

// do{
//   console.log(i);
//   i--;
// }while(i >= 1)

// 26. Write a program to calculate the factorial of 5 using a loop and print the result.

// let factorial = 1;
// for(let i = 5; i>=1; i--){
//   factorial = factorial * i
// }

// console.log(factorial);

// let n = 1;
// let i = 5;
// while(i > 1){
//   n = n * i
//   i--;
// }
// console.log(n);


// 27. Use nested `for` loops to print a 3×3 grid pattern where each row contains the numbers 1 to 3.

  // Example output format:

  // 1 2 3
  // 1 2 3
  // 1 2 3

// for(let row = 1; row <= 3; row++){
//   console.log(row);
//   let rowStr = "";
//   for(let col = 1; col <= 3; col++){
//     console.log(col);
//     rowStr += col + " ";
//   }
//   console.log(rowStr);
// }

// 28. Reverse an array manually (without using the `reverse()` method) and print the reversed array.
//  let arr = [14, 22, 32, 44, 33]
//  let arrNew = new Array()
//  console.log(arrNew);
//  for(let i = arr.length - 1; i >= 0; i--){
//    console.log(arr[i])
//    arrNew.push(arr[i])
//   }
//   console.log(arrNew);

// 29. Using a `while` loop, print all numbers between 1 and 100 that are divisible by 5.

// let i = 1;
// while(i <= 100){
//   if(i % 5 === 0){
//     console.log(i);
//   }
//   i++;
// }


// 30. Create an object with keys like `name` and `age`. Use a `for...in` loop to print all the keys of the object.

// const person = {
//   name: "Asif",
//   age: 22
// };
// for(let key in person){
//   console.log(key,":",person[key]);
// }


//*** ## Arrays

// 31. Create an array of movie names and print them in a single line separated by ` - ` using `join()`.

// const movies = [
//   "The Shawshank Redemption",
//   "The Godfather",
//   "The Dark Knight",
//   "Pulp Fiction",
//   "Forrest Gump",
//   "Inception",
//   "The Matrix",
//   "Goodfellas"
// ];
// console.log(movies.join(" - "));

// 32. Create an array of numbers and print the value at index 1.

// const arr = [12,124,13,12,41,411,24,25]
// console.log(arr[1]);

// 33. Add two elements to the beginning of an array using `unshift()` and print the updated array.

// let arr = [12,124,13,12,41,411,24,25]

// arr.unshift(1,2)
// console.log(arr);

// 34. Create an array of song names, remove the last element using `pop()`, and print the remaining elements.

// const songs = [
//   "Bohemian Rhapsody",
//   "Hotel California",
//   "Imagine",
//   "Billie Jean",
//   "Like a Rolling Stone",
//   "Smells Like Teen Spirit",
//   "Blinding Lights",
//   "Watermelon Sugar",
//   "Stay",
//   "Heat Waves"
// ];
// songs.pop()
// console.log(songs);

// 35. Given an array, extract the first three elements using `slice()` and print them.

// const songs = [
//   "Bohemian Rhapsody",
//   "Hotel California",
//   "Imagine",
//   "Billie Jean",
//   "Like a Rolling Stone",
//   "Smells Like Teen Spirit",
//   "Blinding Lights",
//   "Watermelon Sugar",
//   "Stay",
//   "Heat Waves"
// ];
// let sliceSong = songs.slice(0,3)
// console.log(sliceSong);

// 36. Create an array of numbers and find the index of the number `5` using `indexOf()`.


// const arr = [12,124,13,12,41,411,24,5,25]

// console.log(arr.indexOf(5));

// 37. Create an array of values and use `includes()` to check whether the value `3` exists in the array. Print the result.

// const mixedArray = [
//   "Hello",
//   3,
//   true,
//   null,
//   undefined,
//   {name: "John"},
//   [1, 2, 3],
//   function() {
//     return "I'm a function";
//   },
//   Symbol("id"),
//   new Date()
// ];


// if(mixedArray.includes(3)){
//   console.log("Value 3 exists in the array");
// } else {
//   console.log("Value 3 does not exist in the array");
// }

// 38. Concatenate two arrays using `concat()` and print the resulting combined array.

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];

// console.log(arr1.concat(arr2));



// 39. Sort an array of numbers in ascending order using a custom comparator function and print the sorted array.

// const fruits = ["banana", "apple", "cherry", "date"];
// const numbers = [10, 5, 100, 2, 25];

// fruits.sort()
// numbers.sort((a,b)=>a - b)

// console.log(fruits,numbers);

// 40. Create a copy of an array using the spread operator (`...`). Print the copied array and also print whether the copied array and original array reference the same memory.

// const fruits = ["banana", "apple", "cherry", "date"];
// const copyFruits = [...fruits]

// console.log(typeof fruits);

// console.log("Copied array:", copyFruits);
// console.log("Same reference?", copyFruits === fruits);

// 41. Write a function that takes a number as input and returns whether it is "even" or "odd".

// function evenOdd (){
//   const number = prompt("Write a number")
//   if(Number(number) % 2 === 0){
//     console.log("It's a even number");
//   }else{
//   console.log("It's a odd number");
//   }
// }
// evenOdd()

// 42. Create a function that calculates and returns the area of a circle given its radius.

// function circle(){
//   let r = Number(prompt("Give a value"))

//   let area = Math.PI * r * r

//   return area
// }
// console.log(circle());


// 43. Write a function that takes an array of numbers and returns the sum of all elements in the array.

// function sumOfArray(numbers){
//   let sum = 0;
//   for(let i = 0; i <= numbers.length -1; i++){
//     sum += numbers[i]
//   }
//   return sum
// }
// console.log(sumOfArray([1, 2, 3, 4, 5]));

// 44. Write a function that checks whether a given string starts with a specified character. Return `true` or `false`.

// function specifiedCharacter(char){
//   let firstChar = char[0];
//   if(firstChar === "H"){
//     return true
//   }else{
//     return false
//   }
// }

// console.log(specifiedCharacter('World'));

// 45. Create a function that takes two numbers and returns the larger of the two.

// function largerSmall(num1,num2){
//   if(num1 > num2){
//     return `${num1} is bigger than ${num2}`
//   }else{
//     return `${num2} is bigger than ${num1}`
//   }
// }

// console.log(largerSmall(4,5));
console.log(largerSmall(20,100));
