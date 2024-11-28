// Exercises:

// Exercise 1: Create and Use Simple Promises (Easy)

// Task:
// Create a Promise that resolves or rejects based on a random number.
// Handle the result using .then() and .catch().

// Promise has two outcomes resolve and reject
let randomNumber = new Promise(function(resolve, reject) {
    
    // randomize a while number between 0 and 100 
   let number = Math.floor(Math.random() * 100)
   
   if (number > 30) {

    // resolve is used to indicate the promise was successfully fulfilled
    resolve(`${number} Hooray! The number is greater than 30`);
   } else {

    // reject is used to indicate the promise was unsuccessful
    reject(`${number} Boohoo... The number is less than 30`);
   }
});

randomNumber

// .then() is called with the value passed to resolve (.then() refers to resolve, a success)
.then(function (value) {
    document.getElementById('display').innerHTML = `${value}`
})

// .catch() is called with the value passed to reject (.catch() refers to reject, a failure)
.catch(function(error) {
    document.getElementById('display').innerHTML = `${error}`
});

// resolve = .then() & value
// reject = .catchh() & error

// -----------------------------------------------
// Exercise 2: Chain Multiple Promises (Intermediate)

// Task:
// Implement a sequence of asynchronous operations where each step depends on the result of the previous Promise.
// Instructions:
// Fetch a user from https://jsonplaceholder.typicode.com/users/1.
// Fetch their posts from https://jsonplaceholder.typicode.com/posts?userId=1.
// Log the user's name and the titles of their posts.

// Goal:
// Learn to chain Promises to handle complex asynchronous flows.

// this function takes one parameter: userID
// userId will be used to fetch data for a specific user & their posts 
function getUserAndPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    
    // handle response, checks if HTTP status is good
    .then(response => {
        if(!response.ok) {
            throw new Error(`Failed to fetch user: ${response.status}`);
        }

        // if no errors the converts to a JS object or array (parsed data)
        return response.json();
    })

    // parsed data is passed to this .then() block
    .then(user => {

        // the name of the user is extracted & displayed 
        document.getElementById('displayTwo').innerHTML = `User retrieved!: ${user.name}`;

        // a new fetch call is initiated to retrieve posts for the given userId
        // the url is constructed for posts 
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    })

    // checks the status of the HTTP above 
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        return response.json(); 
    })

    // displays posts
    .then(posts => {
        const display = document.getElementById('displayTwo');
        
        // loops through posts
        posts.forEach(post => {
            // console.log(`- ${post.title}`);

            // added a + and <br> so we can display all the posts titles
            display.innerHTML += `<br>- ${post.title}`;
        });
    })

    // if any part od the promise chain fails the .catch() block is triggered
    .catch(error => {
        console.log('Error fetching user:', error);
    });
}

// the number represents the userId :)
getUserAndPosts(1);


// -----------------------------------------------
// Exercise 3: Handle Multiple Promises Simultaneously with Promise.all() (Hard)

// Task:
// Use Promise.all() to run multiple asynchronous operations in parallel and handle the results when all are complete.
// Instructions:
// Fetch data from:
// https://jsonplaceholder.typicode.com/posts/1
// https://jsonplaceholder.typicode.com/posts/2
// https://jsonplaceholder.typicode.com/posts/3
// Use Promise.all() to execute these fetch() calls in parallel.
// Once all calls are complete, log the titles of the posts.

// Goal:
// Understand how to effectively manage multiple asynchronous operations simultaneously using Promises.

// this function fetches and logs titles from multiple URLs using Promise.all()
async function fecthAndLog() {

    // define URLs
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    try {
        //  use Promise.all() to fetch all posts in parallel
        const responses = await Promise.all(urls.map(url => fetch(url)));

        // map over responses to extract JSON data
        const posts = await Promise.all(responses.map(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }));

        // log titles
        posts.forEach(post => {
            const display = document.getElementById('displayThree');
            display.innerHTML += `<br>- ${post.title}`;
        });
    }

    catch (error) {
        // Handle errors
        console.error("Error fetching posts:", error);
}}

fecthAndLog();

// -----------------------------------------------
// Exercise 4: Advanced Code-Along: Build a Complex Asynchronous Flow with Promises (Extra Hard)

// Description:
// Build an application that fetches user data, their posts, and comments on those posts, all using Promises. 
// The focus is on managing complex chains and error handling.

async function displayUserData () {
    const url = `https://restcountries.com/v3.1/region/europe`;

    try {

        //  use Promise.all() to fetch all posts in parallel
        const responses = await Promise.all(url.map(url => fetch(url)));

        // map over responses to extract JSON data
        const places = await Promise.all(responses.map(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }));

        // log titles
        places.forEach(place => {
            const display = document.getElementById('displayFive');
            display.innerHTML += `<br>- ${place.region}`;
            console.log(`${place.region}`);
        });

    } catch(error) {
         // Handle errors
         console.error("Error fetching posts:", error);
        }
    }




