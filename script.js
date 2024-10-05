// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to handle animations on scroll
const animateOnScroll = () => {
    const sections = document.querySelectorAll('.fade-in');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    sections.forEach(section => {
        observer.observe(section);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateSkillBars(); // Call skill bars animation on load
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillsSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.level');

    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(skill => {
                    const width = skill.style.width; // Get width value
                    skill.style.width = '0%'; // Reset width for animation
                    setTimeout(() => {
                        skill.style.width = width; // Animate to the width
                    }, 100); // Small delay for effect
                });
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(skillsSection);
};

// Initialize EmailJS
emailjs.init('XOegdbe8wdXdvaxPs'); // Replace with your EmailJS user ID


// Form handling with EmailJS
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    let isValid = true;
    const inputs = this.querySelectorAll('input, textarea');

    // Validate inputs
    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });


    // If valid, send data using EmailJS
    if (isValid) {
        emailjs.sendForm('Yservice_8owze37', 'template_hm9jwyn', contactForm)
        .then(() => {
            document.getElementById('responseMessage').textContent = 'Thank you for your message!'; 
            contactForm.reset(); // Clear the form
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('responseMessage').textContent = 'An error occurred. Please try again later.';
        });
    }
});
