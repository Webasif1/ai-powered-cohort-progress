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



