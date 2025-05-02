// WorkNest JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    initializeApp();
});

function initializeApp() {
    // Setup event listeners
    setupNavigation();
    setupAuthModals();
    setupTabNavigation();
    setupLocationDetection();
    setupFileUpload();
    setupFormValidation();
}

// Navigation Functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    hamburger.addEventListener('click', function() {
        // Toggle mobile menu
        this.classList.toggle('active');
        
        // If menu is not already displayed as flex, display it
        if (navLinks.style.display !== 'flex') {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.padding = '1rem';
            navLinks.style.backgroundColor = 'var(--white)';
            navLinks.style.boxShadow = 'var(--shadow-md)';
            
            // Also display auth buttons
            authButtons.style.display = 'flex';
            authButtons.style.flexDirection = 'column';
            authButtons.style.width = '100%';
            authButtons.style.padding = '1rem';
            authButtons.style.backgroundColor = 'var(--white)';
            authButtons.style.gap = '0.5rem';
        } else {
            // Hide the menu
            navLinks.style.display = '';
            authButtons.style.display = '';
        }
    });
    
    // Close mobile menu when window resizes beyond mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = '';
            authButtons.style.display = '';
            hamburger.classList.remove('active');
        }
    });
}

// Authentication Modals
function setupAuthModals() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    
    // Open login modal
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    });
    
    // Open register modal
    registerBtn.addEventListener('click', function() {
        registerModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
    
    // Switch between modals
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Setup OTP functionality
    setupOtpFunctionality();
}

// Tab Navigation
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the parent element of tabs
            const tabsContainer = this.parentElement;
            
            // Get all sibling tabs
            const siblingTabs = tabsContainer.querySelectorAll('.tab');
            
            // Get the tab content container 
            const tabContents = this.closest('.modal-content')
                ? this.closest('.modal-content').querySelectorAll('.tab-content')
                : document.querySelectorAll('.tab-content');
            
            // Remove active class from all tabs and tab contents
            siblingTabs.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab id from data-tab attribute
            const tabId = this.getAttribute('data-tab');
            
            // Find and display the corresponding tab content
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
}

// Location Detection
function setupLocationDetection() {
    const detectLocationBtn = document.getElementById('detectLocation');
    const locationInput = document.getElementById('locationInput');
    
    if (detectLocationBtn) {
        detectLocationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                // Show loading state
                locationInput.placeholder = "Detecting location...";
                detectLocationBtn.disabled = true;
                
                navigator.geolocation.getCurrentPosition(
                    // Success callback
                    function(position) {
                        // Get coordinates
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        
                        // Use reverse geocoding to get address
                        reverseGeocode(latitude, longitude)
                            .then(address => {
                                locationInput.value = address;
                                detectLocationBtn.disabled = false;
                            })
                            .catch(error => {
                                console.error("Reverse geocoding error:", error);
                                locationInput.value = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                                locationInput.placeholder = "Enter your location";
                                detectLocationBtn.disabled = false;
                            });
                    },
                    // Error callback
                    function(error) {
                        console.error("Geolocation error:", error);
                        locationInput.placeholder = "Enter your location";
                        showToast("Unable to detect location. Please enter manually.", "error");
                        detectLocationBtn.disabled = false;
                    }
                );
            } else {
                showToast("Geolocation is not supported by this browser.", "error");
            }
        });
    }
}

// Reverse Geocoding (convert coordinates to address)
async function reverseGeocode(latitude, longitude) {
    // In a real implementation, you would use a geocoding service like Google Maps, Mapbox, etc.
    // For this demo, we'll just return a placeholder result
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a placeholder address based on coordinates
    // In production, replace with actual API call
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (Sample Location)`;
}

// File Upload Handling
function setupFileUpload() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0]?.name || "No file chosen";
            const fileNameDisplay = this.parentElement.querySelector('.file-name');
            
            if (fileNameDisplay) {
                fileNameDisplay.textContent = fileName;
            }
        });
    });
}

// Form Validation
function setupFormValidation() {
    // User registration form
    const userRegisterForm = document.getElementById('userRegisterForm');
    if (userRegisterForm) {
        userRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userRegPhone').value;
            const email = document.getElementById('userEmail').value;
            const otp = document.getElementById('userRegOtp')?.value;
            
            if (!name || !phone || !email) {
                showToast("Please fill in all required fields", "error");
                return;
            }
            
            if (!validatePhone(phone)) {
                showToast("Please enter a valid phone number", "error");
                return;
            }
            
            if (!validateEmail(email)) {
                showToast("Please enter a valid email address", "error");
                return;
            }
            
            if (!otp) {
                showToast("Please enter the OTP sent to your phone", "error");
                return;
            }
            
            // If all validations pass, submit the form (in production, this would be an API call)
            registerUser({
                name,
                phone,
                email,
                otp,
                type: 'user'
            });
        });
    }
    
    // Worker registration form
    const workerRegisterForm = document.getElementById('workerRegisterForm');
    if (workerRegisterForm) {
        workerRegisterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('workerName').value;
            const phone = document.getElementById('workerRegPhone').value;
            const email = document.getElementById('workerEmail').value;
            const service = document.getElementById('workerService').value;
            const aadhar = document.getElementById('workerAadhar').value;
            const aadharFile = document.getElementById('aadharFile').files[0];
            const otp = document.getElementById('workerRegOtp')?.value;
            
            if (!name || !phone || !email || !service || !aadhar) {
                showToast("Please fill in all required fields", "error");
                return;
            }
            
            if (!validatePhone(phone)) {
                showToast("Please enter a valid phone number", "error");
                return;
            }
            
            if (!validateEmail(email)) {
                showToast("Please enter a valid email address", "error");
                return;
            }
            
            if (!validateAadhar(aadhar)) {
                showToast("Please enter a valid 12-digit Aadhaar number", "error");
                return;
            }
            
            if (!aadharFile) {
                showToast("Please upload your Aadhaar card", "error");
                return;
            }
            
            if (!otp) {
                showToast("Please enter the OTP sent to your phone", "error");
                return;
            }
            
            // If all validations pass, submit the form (in production, this would be an API call)
            registerWorker({
                name,
                phone,
                email,
                service,
                aadhar,
                aadharFile,
                otp,
                type: 'worker'
            });
        });
    }
    
    // Login forms
    setupLoginForms();
}

// Login Form Handling
function setupLoginForms() {
    // User login form
    const userLoginForm = document.getElementById('userLoginForm');
    if (userLoginForm) {
        // Send OTP button
        const userSendOtp = document.getElementById('userSendOtp');
        userSendOtp.addEventListener('click', function() {
            const phone = document.getElementById('userPhone').value;
            
            if (!validatePhone(phone)) {
                showToast("Please enter a valid phone number", "error");
                return;
            }
            
            // Show OTP input and login button
            document.querySelector('#userLoginForm .otp-group').classList.remove('hidden');
            document.getElementById('userLoginBtn').classList.remove('hidden');
            userSendOtp.classList.add('hidden');
            
            // Start OTP timer
            startOtpTimer('userTimer', 'userResendOtp');
            
            // In production, this would make an API call to send OTP
            showToast("OTP sent to your phone", "success");
        });
        
        // Form submission
        userLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = document.getElementById('userPhone').value;
            const otp = document.getElementById('userOtp').value;
            
            if (!phone || !otp) {
                showToast("Please fill in all required fields", "error");
                return;
            }
            
            // In production, this would make an API call to verify OTP and login
            loginUser({
                phone,
                otp,
                type: 'user'
            });
        });
    }
    
    // Worker login form
    const workerLoginForm = document.getElementById('workerLoginForm');
    if (workerLoginForm) {
        // Send OTP button
        const workerSendOtp = document.getElementById('workerSendOtp');
        workerSendOtp.addEventListener('click', function() {
            const phone = document.getElementById('workerPhone').value;
            
            if (!validatePhone(phone)) {
                showToast("Please enter a valid phone number", "error");
                return;
            }
            
            // Show OTP input and login button
            document.querySelector('#workerLoginForm .otp-group').classList.remove('hidden');
            document.getElementById('workerLoginBtn').classList.remove('hidden');
            workerSendOtp.classList.add('hidden');
            
            // Start OTP timer
            startOtpTimer('workerTimer', 'workerResendOtp');
            
            // In production, this would make an API call to send OTP
            showToast("OTP sent to your phone", "success");
        });
        
        // Form submission
        workerLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = document.getElementById('workerPhone').value;
            const otp = document.getElementById('workerOtp').value;
            
            if (!phone || !otp) {
                showToast("Please fill in all required fields", "error");
                return;
            }
            
            // In production, this would make an API call to verify OTP and login
            loginUser({
                phone,
                otp,
                type: 'worker'
            });
        });
    }
}

// OTP Functionality
function setupOtpFunctionality() {
    // User registration OTP
    const userRegSendOtp = document.getElementById('userRegSendOtp');
    if (userRegSendOtp) {
        userRegSendOtp.addEventListener('click', function() {
            const phone = document.getElementById('userRegPhone').value;
            
            if (!validatePhone(phone)) {
                showToast("Please enter a valid phone number", "error");
                return;
            }
            
            // Show OTP input and register button
            document.querySelector('#userRegisterForm .otp-group').classList.remove('hidden');
            document.getElementById('userRegisterBtn').classList.remove('hidden');
            userRegSendOtp.classList.add('hidden');
            
            // Start OTP timer
            startOtpTimer('userRegTimer', 'userRegResendOtp');
            
            // In production, this would make an API call to send OTP
            showToast("OTP sent to your phone", "success");
        });
    }
    
    // Worker registration OTP
    const workerRegSendOtp = document.getElementById('workerRegSendOtp');
    if (workerRegSendOtp) {
        workerRegSendOtp.addEventListener('click', function() {
            const phone = document.getElementById('workerRegPhone').value;
            
            if (!validatePhone(phone)) {
                showToast("Please enter a valid phone number", "error");
                return;
            }
            
            // Show OTP input and register button
           // document.querySelector('#workerRegisterForm .otp-group').classList.remove('hidden');
           // document.getElementById('workerRegisterBtn').classList.remove('hidden