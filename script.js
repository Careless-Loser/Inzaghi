/**
 * INZAGHI PORTFOLIO - Full Production Script
 * Integrated with Narrative Paragraph Logic
 */

// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Custom Cursor Movement
const cursor = document.querySelector("#cursor");
document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "none"
    });
});

// 3. Link & Card Hover Interactions
document.querySelectorAll('a, .bento-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 8, backgroundColor: "rgba(255,255,255,0.2)" });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, backgroundColor: "white" });
    });
});

// 4. GSAP Animations & ScrollTriggers
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    // Initial Entrance Reveal (Hero & Navigation)
    gsap.to(".reveal", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
    });

    // Bento Card Scroll Reveals (Gallery Section)
    gsap.utils.toArray(".bento-card").forEach((card) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100px",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    

    // Narrative Scroll Reveals (For Aboutme.html paragraphs)
    gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        });
    });

    /**
 * INZAGHI PORTFOLIO - Master Script
 */

// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Custom Cursor Movement
const cursor = document.querySelector("#cursor");
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "none"
        });
    });
}

// 3. Hover Interactions (Logo, Links, Cards)
document.querySelectorAll('a, .bento-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { 
            scale: 8, 
            backgroundColor: "rgba(255,255,255,0.2)",
            duration: 0.4 
        });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { 
            scale: 1, 
            backgroundColor: "white",
            duration: 0.3 
        });
    });
});

// 4. GSAP ScrollReveal Logic
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    // Initial entrance for all "reveal" items
    gsap.to(".reveal", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
    });

    // Bento Card Scroll Animations
    gsap.utils.toArray(".bento-card").forEach((card) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=80px",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
});

});

