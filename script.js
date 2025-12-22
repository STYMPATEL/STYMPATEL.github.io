/* =========================================
   SYNI.ME - OMNIVERSE LOGIC ENGINE
   Developed by: Satyam & The Grandmaster
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE (Phone par menu kholna/band karna)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Icon change karna (Hamburger to X)
            if (navLinks.classList.contains('active')) {
                hamburger.textContent = '✕'; // Cross Icon
            } else {
                hamburger.textContent = '☰'; // Hamburger Icon
            }
        });
    }

    // 2. SMOOTH SCROLLING (Jab menu par click karo to aaram se scroll ho)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Mobile menu band kar do agar khula hai
                navLinks.classList.remove('active');
                hamburger.textContent = '☰';
                
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. STICKY HEADER GLOW (Scroll karne par header glass ban jayega)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(5, 5, 7, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0, 240, 255, 0.1)';
            header.style.padding = '10px 0'; // Thoda chhota ho jayega
        } else {
            header.style.background = 'rgba(5, 5, 7, 0.85)';
            header.style.boxShadow = 'none';
            header.style.padding = '15px 0';
        }
    });

    // 4. NUMBER COUNTER ANIMATION (Stats section me ginti chalegi)
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Jitna kam utna tez

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                // Target number nikalo (e.g. "100" from "100%")
                const target = +counter.innerText.replace(/\D/g, ''); // Sirf number leta hai
                const count = +counter.getAttribute('data-count') || 0;
                
                // Original text save karo (e.g. "10x", "100%")
                if (!counter.hasAttribute('data-target-text')) {
                    counter.setAttribute('data-target-text', counter.innerText);
                    counter.setAttribute('data-count', 0);
                    counter.innerText = '0'; // Start at 0
                }
                
                const inc = target / speed;

                if (count < target) {
                    counter.setAttribute('data-count', count + inc);
                    // Wapas text format me dikhao (plus suffix agar hai)
                    const originalText = counter.getAttribute('data-target-text');
                    const suffix = originalText.replace(/[0-9]/g, ''); // "x" or "%"
                    
                    counter.innerText = Math.ceil(count + inc) + suffix;
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = counter.getAttribute('data-target-text');
                }
            };
            updateCount();
        });
    };

    // 5. SCROLL ANIMATIONS (Fade In Effect - The Omniverse Magic)
    // Ye check karega ki element screen par aaya ya nahi
    const observerOptions = {
        threshold: 0.2 // 20% dikhne par animation chalegi
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Agar ye stats section hai to counter chalao
                if (entry.target.classList.contains('stat-box')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target); // Ek baar ho gaya to bas
            }
        });
    }, observerOptions);

    // Kin elements par animation lagani hai
    const animateElements = document.querySelectorAll('.service-card, .step, .hero-content, .hero-image, .compare-card, .stat-box');
    animateElements.forEach(el => {
        el.style.opacity = '0'; // Pehle chhupa do
        el.style.transform = 'translateY(30px)'; // Thoda neeche rakho
        el.style.transition = 'all 0.8s ease-out'; // Animation speed
        observer.observe(el);
    });

    // Class add hone par kya hoga (Inline Style Injector for Magic)
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

});
