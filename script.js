// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Select elements to animate
const animatedElements = document.querySelectorAll('.pillar-card, .about-grid, .section-header');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Donation Modal Logic
const donateModal = document.getElementById('donateModal');
const closeModal = document.getElementById('closeModal');
const donateTriggers = document.querySelectorAll('.donate-trigger');
const steps = document.querySelectorAll('.donation-step');
const nextBtn = document.getElementById('next-to-bank');
const submitBtn = document.getElementById('submit-donation');
const closeSuccess = document.getElementById('close-success');

let selectedAmount = '';
let selectedBank = '';

const showStep = (stepId) => {
    steps.forEach(step => step.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');
};

donateTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
        donateModal.classList.add('active');
        showStep('step-amount');
        // Close mobile menu if open
        if (navList.classList.contains('active')) {
            navList.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

closeModal.addEventListener('click', () => {
    donateModal.classList.remove('active');
});

// Amount Selection
document.querySelectorAll('.amount-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelectorAll('.amount-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedAmount = opt.dataset.amount;
    });
});

nextBtn.addEventListener('click', () => {
    if (!selectedAmount) {
        alert('Please select an amount');
        return;
    }
    showStep('step-bank');
});

// Bank Selection
document.querySelectorAll('.bank-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelectorAll('.bank-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedBank = opt.dataset.bank;
    });
});

submitBtn.addEventListener('click', () => {
    if (!selectedBank) {
        alert('Please select a payment destination');
        return;
    }
    document.getElementById('success-msg').textContent = `Thank you for your donation of ₦${selectedAmount}! We've initiated a payment request to ${selectedBank}. Check your email for further instructions.`;
    showStep('step-success');
});

closeSuccess.addEventListener('click', () => {
    donateModal.classList.remove('active');
    // Reset for next time
    selectedAmount = '';
    selectedBank = '';
    document.querySelectorAll('.amount-opt, .bank-opt').forEach(o => o.classList.remove('selected'));
});

// Insights Card Interaction
document.querySelectorAll('.insight-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        alert(`Viewing Insight: ${title}\n\nThis article is part of our upcoming "Knowledge for National Development" series. Stay tuned!`);
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate sending email
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        console.log(`Sending message from ${name} (${email}): ${subject} - ${message}`);

        // Hide form and show feedback
        contactForm.style.display = 'none';
        formFeedback.style.display = 'block';

        // Clear form
        contactForm.reset();
    });
}
