// SIGNUP LOGIC
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!name || !email || !password) {
            alert('Please fill all fields');
            return;
        }

        // Get existing users
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email already exists
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('User already exists. Please login.');
            return;
        }

        // Save new user
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Signup successful! Please login.');
        window.location.href = 'login.html';
    });
}
// LOGIN LOGIC
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!email || !password) {
            alert('Please fill all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const matchedUser = users.find(
            user => user.email === email && user.password === password
        );

        if (!matchedUser) {
            alert('Invalid email or password');
            return;
        }

        // Login success
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', matchedUser.name);

        alert('Login successful!');
        window.location.href = 'index.html';
    });
}