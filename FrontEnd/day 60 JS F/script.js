// 01
// function getUser(id, callback) {
//   setTimeout(() => {
//     callback({ id, name: "Asif" })
//   }, 1000)
// }

// getUser(1, (user) => {
//   console.log("User fetched:", user)
// })

// 02
// function animateBox(callback) {
//   console.log("Animating...")
//   setTimeout(() => {callback()}, 500)
// }

// animateBox(() => console.log("Animation complete"))

// 03
// const fs = require("fs")

// fs.readFile("test.txt", "utf8", (err, data) => {
//   if (err) return console.error(err)
//   console.log(data)
// })

// 04
// const nums = [5, 2, 9, 1]

// nums.sort((a, b) => a - b)   // callback
// console.log(nums)


// 05
// function login(user, pass, success, failure) {
//   console.log("login...");
//   setTimeout(() =>{if (user === "asif" && pass === "123") {
//     success("Login successful")
//   } else {
//     failure("Login failed")
//   }},1000)
// }

// login("asif", "123",
//   (msg) => console.log(msg),
//   (err) => console.error(err)
// )

// 06
// button.addEventListener("click", () => {
//   console.log("Button clicked!")
// })

// 07
// function queryDB(query, callback) {
//   setTimeout(() => {
//     callback({ success: true, data: [] })
//   }, 700)
// }

// queryDB("SELECT * FROM users", (res) => {
//   console.log(res)
// })

// 08
// function wait(ms, callback) {
//   setTimeout(callback, ms)
// }

// wait(1000, () => console.log("1 second passed"))

// 09
// function loop(arr, callback) {
//   for (let i of arr) {
//     callback(i)
//   }
// }

// loop([10, 20, 30], (val) => console.log(val))

//***for...of loop
// for (let char of "Asif") {
//   console.log(char);
// }

// 10
// function myFilter(arr, callback) {
//   const res = []
//   for (let item of arr) {
//     if (callback(item)) res.push(item)
//   }
//   return res
// }

// const evens = myFilter([1, 2, 3, 4], (num) => num % 2 === 0)
// console.log(evens)

// ✅ 10 Callback Function Questions
// 1. Write a function doTwice(callback) that calls the callback two times.

// function doTwice(cb){
//   cb()
//   cb()
// }

// doTwice(function(){
//   console.log("hello");
// })

// 2. Create a function calculate(a, b, callback) that performs an operation (add, subtract, etc.) based on the callback.
// function calculate(a, b, cb){
//   setTimeout(()=> {
//     cb(a+b);
//   },2000)
// }
// calculate(10, 30, function(result){
//    console.log(result);
// })

// 3. Make a custom map function called myMap(arr, callback) that returns a new array.

// function myMap(arr, cb) {
//   const result = [];

//   for (let item of arr) {
//     const newValue = cb(item);
//     result.push(newValue);
//   }

//   return result;
// }
// const output = myMap([1, 2, 4, 5], function(item){
//   return item * 2;
// });

// console.log(output);


// 4. Create a function repeat(n, callback) that runs the callback n times.
function repeat(n, cb){
  for(let i=0; i < n; i++){
    cb(i);
  }
}
repeat(10, function(i){
  console.log("Run:", i+1);
})

// 5. Build a custom forEach called myForEach(arr, callback).
// 6. Write a function check(arr, callback) that returns true if any item in the array passes the callback test (like .some()).
// 7. Create a function delay(callback, time) that waits time milliseconds then runs the callback.
// 8. Write a function findItem(arr, callback) that returns the first item that makes the callback return true.
// 9. Write a function processUser(name, callback) that takes a user’s name and runs a callback to process it.
// 10. Create a function runTasks(tasks, callback) where tasks is an array of functions, and you run each one in order, calling the callback at the end.


