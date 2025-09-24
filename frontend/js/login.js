document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const signupLink = document.getElementById('signupLink');

    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const remember = rememberCheckbox.checked;

        // Basic validation
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long', 'error');
            return;
        }

        // Simulate login process
        loginUser(email, password, remember);
    });

    // Simulate login function
    function loginUser(email, password, remember) {
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.textContent;

        // Show loading state
        loginBtn.textContent = 'Signing in...';
        loginBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // For demo purposes, accept any email/password combination
            // In a real app, this would make an API call to authenticate

            if (remember) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', email);
            }

            showMessage('Login successful! Welcome to YouMemories', 'success');

            // Simulate redirect to dashboard
            setTimeout(() => {
                alert('Login successful! This would redirect to the main application.');
            }, 1500);

            // Reset button
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
        }, 2000);
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show message function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        // Add styles
        messageDiv.style.cssText = `
            padding: 10px 15px;
            margin-bottom: 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            text-align: center;
            ${type === 'error' ?
                'background-color: #fee; color: #c33; border: 1px solid #fcc;' :
                'background-color: #efe; color: #363; border: 1px solid #cfc;'
            }
        `;

        // Insert message
        loginForm.insertBefore(messageDiv, loginForm.firstChild);

        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Handle signup link
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Signup functionality would be implemented here. This would redirect to a registration page.');
    });

    // Load remembered email if exists
    if (localStorage.getItem('rememberMe') === 'true') {
        const rememberedEmail = localStorage.getItem('userEmail');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberCheckbox.checked = true;
        }
    }

    // Add input animations
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'translateY(0)';
        });
    });
});