const hamburger = document.getElementById('hamburger'); 
const menu = document.querySelector('.menu'); 

hamburger.addEventListener('click', function () { 
	const hamIcon = this.querySelector('.hamburger-icon'); 
	const crossIcon = this.querySelector('.cross-icon'); 
	if (hamIcon.style.display === "none") { 
		hamIcon.style.display = "inline-block"
		menu.style.display = "none"
		crossIcon.style.display = "none"
	} 
	else { 
		crossIcon.style.display = "inline-block"
		hamIcon.style.display = "none"
		menu.style.display = "block"
	} 
});
// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLfyQ7fwoQp1RCLLLnFMIA9GS4VQvM74A",
    authDomain: "nexus-software-portfolio.firebaseapp.com",
    databaseURL: "https://nexus-software-portfolio-default-rtdb.firebaseio.com",
    projectId: "nexus-software-portfolio",
    storageBucket: "nexus-software-portfolio.appspot.com",
    messagingSenderId: "546522167312",
    appId: "1:546522167312:web:4e2652744d21d781b87295",
    measurementId: "G-C2FTQFNLV4"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (validateForm(name, email, message)) {
        db.collection('contacts').add({
            name: name,
            email: email,
            message: message
        }).then(() => {
            alert('Your message has been submitted successfully.');
            contactForm.reset();
        }).catch((error) => {
            console.error('Error writing document: ', error);
        });
    } else {
        alert('Please fill in all fields correctly.');
    }
});

function validateForm(name, email, message) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === '' || email === '' || message === '') {
        return false;
    } else if (!emailPattern.test(email)) {
        return false;
    }
    return true;
}
