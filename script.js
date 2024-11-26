// Exercise 1: Simple Asynchronous Function with Callback (Easy)

// Task:
// Create a function delayLog that takes a string and a time in milliseconds as arguments.
// The function should use setTimeout to log the string after the specified time.
// Use a callback to notify when the logging is complete.

const posts = [
    { title: 'Post One', body: 'This is post one'},
    { title: 'Post Two', body: 'This is post two'}
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.getElementById('list').innerHTML = output;
    }, 1000);
}

getPosts();

function delay(message, time, callback) {
    setTimeout(() => {
        console.log(message);
        if(callback) {
            callback();
        }
    }, time);
}
delay('Good morning!', 2000, () => {
    console.log('Message displayed');
});

// Goal:
// Understand how to use callbacks with setTimeout.
// Practice basic asynchronous operations.
// ------------------------------------------
// Exercise 2: Chaining Asynchronous Operations (Medium)

// Task:
// Use fetch() to retrieve a user from https://jsonplaceholder.typicode.com/users/1.
// Once the user is retrieved, use their id to fetch their posts from https://jsonplaceholder.typicode.com/posts?userId=1.
// Use callbacks within a .then() chain to handle the results and log them to the console.

function fetchUser(userId, callback) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.status}`);
            }
            return response.json();
        })
        .then(user => {
            console.log('User retrieved!:', user);
            if (callback) {
                callback(user.id);
            }
        })
        .catch(error => {
            console.log('Error fetching user:', error);
        });
} 

function fetchPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch posts: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            console.log(`Posts by: ${userId}`, posts);
        })
        .catch(error => {
            console.log('Error fetching posts:', error);
        });
}

fetchUser(1, fetchPosts);

// Tips:
// Use separate functions to fetch the user and the posts.
// Handle errors with .catch() and log appropriate error messages.

// ------------------------------------------
// Exercise 3: Handling Errors in Asynchronous Code with fetch() (Hard)

// Task:
// Modify Exercise 2 to include robust error handling.
// Simulate an error by using an incorrect URL or by throwing an error if the response status code is not 200.
// Ensure error messages are logged correctly and the program does not crash.

// ------------------------------------------
// Exercise 4: Building a Simple Application with fetch() (Extra Hard)

// Task:
// Build a simple web application that:
// Includes a button "Fetch User".
// When the button is clicked, fetches a random user from https://jsonplaceholder.typicode.com/users.
// Displays the user's name and email on the page.
// Use fetch() and manage asynchronous behavior with .then() and callbacks within them.

// Goal:
// Apply your knowledge in a practical application.
// Understand how asynchronous behavior affects DOM manipulation.
// ------------------------------------------
