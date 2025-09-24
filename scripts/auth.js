// Google OAuth Authentication
(function() {
    const AUTH_KEY = 'user_auth';
    let currentUser = null;

    // Initialize Google Sign-In
    function initializeGoogleSignIn() {
        console.log('Initializing Google Sign-In...');
        if (typeof google !== 'undefined' && google.accounts) {
            console.log('Google accounts API available');
            google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
                callback: handleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true
            });
            console.log('Google Sign-In initialized');
        } else {
            console.log('Google accounts API not available yet');
        }
    }

    // Handle Google Sign-In response
    function handleCredentialResponse(response) {
        try {
            const responsePayload = decodeJwtResponse(response.credential);
            
            currentUser = {
                id: responsePayload.sub,
                name: responsePayload.name,
                email: responsePayload.email,
                picture: responsePayload.picture,
                given_name: responsePayload.given_name,
                family_name: responsePayload.family_name
            };

            // Save user data
            localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
            
            // Update UI
            updateAuthUI();
            
            // Show success message
            showNotification('Successfully signed in!', 'success');
            
        } catch (error) {
            console.error('Error handling credential response:', error);
            showNotification('Sign-in failed. Please try again.', 'error');
        }
    }

    // Decode JWT token (simplified version)
    function decodeJwtResponse(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    // Update authentication UI
    function updateAuthUI() {
        const loginButton = document.getElementById('loginButton');
        
        if (loginButton) {
            if (currentUser) {
                loginButton.textContent = 'Logout';
                loginButton.classList.add('logged-in');
            } else {
                loginButton.textContent = 'Login';
                loginButton.classList.remove('logged-in');
            }
        }
    }

    // Trigger Google Sign-In
    function login() {
        console.log('Login button clicked');
        
        // For testing without Google OAuth setup
        if (typeof google === 'undefined' || !google.accounts) {
            console.log('Google Sign-In not available, using demo login');
            // Demo login for testing
            currentUser = {
                id: Date.now(),
                name: 'Demo User',
                email: 'demo@example.com',
                picture: 'assets/banner2.jpg'
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
            updateAuthUI();
            showNotification('Demo login successful!', 'success');
            return;
        }
        
        if (typeof google !== 'undefined' && google.accounts) {
            console.log('Triggering Google Sign-In popup');
            google.accounts.id.prompt();
        } else {
            console.log('Google Sign-In not available');
            showNotification('Google Sign-In is not available. Please refresh the page.', 'error');
        }
    }

    // Logout function
    function logout() {
        currentUser = null;
        localStorage.removeItem(AUTH_KEY);
        updateAuthUI();
        showNotification('Successfully logged out!', 'success');
        
        // Clear any user-specific data
        clearUserData();
    }

    // Clear user-specific data
    function clearUserData() {
        // Clear likes
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.classList.remove('liked');
            const likeCount = btn.querySelector('.like-count');
            if (likeCount) likeCount.textContent = '0';
        });
        
        // Clear comments
        document.querySelectorAll('.comment-section').forEach(section => {
            section.remove();
        });
    }

    // Check if user is logged in
    function isLoggedIn() {
        return currentUser !== null;
    }

    // Get current user
    function getCurrentUser() {
        return currentUser;
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Make functions globally available
    window.handleCredentialResponse = handleCredentialResponse;
    window.isLoggedIn = isLoggedIn;
    window.getCurrentUser = getCurrentUser;
    window.logout = logout;
    window.hideThankYouMessage = hideThankYouMessage;

    // Handle contact form submission
    function handleContactForm() {
        // Initialize EmailJS with your public key
        emailjs.init("1BCSX5uoOsP2JCQ2j"); // You'll need to replace this with your actual public key
        
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Email parameters for EmailJS
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_name: 'Ahmad Nabi Ismail',
                    reply_to: email
                };
                
                // Send email using EmailJS
                emailjs.send('service_cv_contact', 'template_cv_form', templateParams)
                    .then(function(response) {
                        console.log('Email sent successfully:', response);
                        
                        // Show thank you message
                        showThankYouMessage();
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Show success notification
                        showNotification('Message sent successfully! Thank you for contacting Ahmad Nabi Ismail.', 'success');
                    })
                    .catch(function(error) {
                        console.error('Email sending failed:', error);
                        showNotification('Failed to send message. Please check your internet connection and try again.', 'error');
                    })
                    .finally(function() {
                        // Reset button state
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            });
        }
    }
    
    // Show thank you message
    function showThankYouMessage() {
        const thankYouMessage = document.getElementById('thankYouMessage');
        if (thankYouMessage) {
            thankYouMessage.style.display = 'flex';
        }
    }
    
    // Hide thank you message
    function hideThankYouMessage() {
        const thankYouMessage = document.getElementById('thankYouMessage');
        if (thankYouMessage) {
            thankYouMessage.style.display = 'none';
        }
    }

    // Initialize authentication
    function init() {
        // Load saved user data
        const savedUser = localStorage.getItem(AUTH_KEY);
        if (savedUser) {
            try {
                currentUser = JSON.parse(savedUser);
            } catch (error) {
                console.error('Error loading saved user:', error);
                localStorage.removeItem(AUTH_KEY);
            }
        }

        // Update UI
        updateAuthUI();

        // Initialize Google Sign-In
        if (typeof google !== 'undefined') {
            initializeGoogleSignIn();
        } else {
            // Wait for Google script to load
            window.addEventListener('load', initializeGoogleSignIn);
        }

        // Handle contact form
        handleContactForm();

        // Attach login button
        const loginButton = document.getElementById('loginButton');
        console.log('Login button found:', loginButton);
        if (loginButton) {
            loginButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Login button clicked, current user:', currentUser);
                if (currentUser) {
                    logout();
                } else {
                    login();
                }
            });
            console.log('Login button event listener attached');
        } else {
            console.log('Login button not found!');
        }
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
