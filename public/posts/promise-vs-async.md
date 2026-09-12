In JavaScript, Promise and Async/Await are the methods for handling asynchronous code. But both work on different approaches.

```
Synchronous Programming
+-------------------+       +-------------------+       +-------------------+
|   Task 1 Starts   | ----> |   Task 1 Completes | ----> |   Task 2 Starts   |
+-------------------+       +-------------------+       +-------------------+
```


```
Asynchronous Programming
+-------------------+       +-------------------+
|   Task 1 Starts   | ----> |   Task 2 Starts   |
+-------------------+       +-------------------+
        |                           |
        v                           v
+-------------------+       +-------------------+
|   Task 1 Completes |       |   Task 2 Completes |
+-------------------+       +-------------------+
```
# What is Asynchronous Program?

Unlike Synchronous Programming where each operation must complete before moving on to the next one. But, Asynchronous programming is a programming technique which allows a program to run multiple tasks independently, this make a program to respond to other events while a task is still running. Hence JavaScript supports asynchronous programming.


- Asynchronous programming the program does not wait for a completion of a request; It moves to the next task and later collects the results of the previous tasks.
You may want to use any method accordingly for your use case.


## 1) Promise
Promises in JavaScript are a way to handle future operations. A promise represents a value which is not yet known at present when it is triggered but can be later resolved (completed) with specific value or reject with error. It means that a event is being executed to complete while still the rest of the other are running.

*Promise are non-blocking, which means the program won't wait for it to complete and moves to the next part.*
*A Promise represents a value that may be available now, in the future, or never.*


Let us see how the Promise actually work:

<b>A Promise has 3 states:</b>
- Pending (Initial state, Neither success nor failure)
- Resolve (The operation completed successfully)
- Reject (The operation failed)


*Initially the Promise state will be 'pending' when created.*

### Handling a Promise:
Promise can be handle using .then() and .catch() methods.
*.then() -> for Handling fulfilled/success promise (resolve state).*
*.catch() -> for handling error or failure (reject state).*


### Use case of Promise:
Create a Nodejs file:

```bash
mkdir promises && cd promises
code .
npm i node-fetch
```

```javascript
// app.js

const fetch = require('node-fetch');

function apiFetch() {
    const data = new Promise((resolve, reject) => {
        fetch("<URL>", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });

    data.then(res => console.log(res))
        .catch(err => console.log(err));
}

console.log("Fetching...");
apiFetch();
console.log("Fetched...");

// Run `node app.js`
```
Hence this behavior causes the output to be returned as:


``` Fetching...
Fetched...
[{ <data> }]
 ```

Why the "Fetched…" appreared first? Why not apiFetch() executed first ????? Let's look into the code.

Code Explanation:
- To create a Promise we use new keyword followed by Promise, which has a set of two arguments (resolve and reject) for resolving the data.
- We use fetch() to make a request with GET method inside the promise.

We use .then() method to handle to successful operation of fetch() which returns a value that is a Response object. Then we return the response object in JSON, the object is still a promise to be resolved.


*res.json() looks like "Promise { <pending> }" which is not the data we want*
- When we create a Promise, we use .then() to tell the program what to do when the Promise is successful.
- Sometimes, the thing we want to do also creates a new Promise. So, we use another .then() to handle this new Promise.
resolve() is used to mark the Promise as successful and gives us the result we want.
- If any exception occurred during the execution we can use .catch() to handle the error and reject() is used to mark the Promise as failed.

*It is like someone is promising to provide you something, if they succussed then resolve() if they couldn't then reject()*

*You see a const variable 'data' has been assigned to Promise which results of it being a promise too. Hence again we need to use .then() and .catch() to handle the promise and fulfill it.*


*To make it easy:
resolve() handled by .then() where as reject() handled by .catch().*


## 2) Async/Await
Async/await is one more way of handling a asynchronous program flow. It is like a syntactic sugar on Promises. It allows writing asynchronous code in a synchronous manner, making it easier to read and maintain.
- An async function returns a Promise. It allows the use of the await keyword inside it
- The await keyword pauses the execution of the async function until the Promise is resolved or rejected.
- Async/await offers cleaner, more readable code

Let us understand with the code:

```javascript
async function fetchData () {
    try {
        console.log("Fetching...")
    const data = await fetch("<url>" , {
      method: 'GET'
    })
    const res = await data.json()
    console.log(res)
    console.log("Fetched...")
    } catch (error) {
        console.log(error)
    }
}
fetchData()
```

Output:

```
Fetching...
[{ <data> }]
Fetched...
 ```

First a function is defined by async keyword at start telling that the function is a asynchronous function.

<b>( use await inside try-catch block so that any exceptions can be handled )</b>
await can only be used inside a async function, here the program will wait for the fetch() to execute, till then it won't execute other part of the program unlike Promise.

- `await fetch()` will returns a response object and hence again awaiting the data.json() will result in resolving the Promise and getting the data.
- Without using await on fetch() it will result be a Promise and using await- will handle it and hence gives a response object.

*await keyword resolves a Promise and provides data within a async function.*

### Conclusion:
- Promises are like a coupon you get at a restaurant. You can continue chatting with your friends (doing other tasks) while the kitchen (the program) prepares your food (completes an operation). When the food (operation) is ready, you can then enjoy it (use the result).
- Async/await is like you cooking food. You start preparing the food (start an operation), then wait right there (await) until your food is cooked. Once it's ready, you take it and do what you want with it (use the result). It's a more straightforward way of doing things, but you can't do anything else while waiting.

In both cases, you get your food (the result of operation), but the way you wait for it is different.
