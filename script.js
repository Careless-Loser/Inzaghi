// 1. Initialize Lenis (Smooth Scroll)
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// 2. Custom Cursor Logic
const cursor = document.querySelector("#cursor");
document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out"
    });
});

// 3. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Initial Load Animation
window.addEventListener("load", () => {
    const tl = gsap.timeline();
    
    tl.to(".reveal", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
    });
});

// Scroll Reveal for Cards
gsap.utils.toArray(".bento-card").forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=100px",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 60,
        duration: 1.5,
        ease: "power4.out"
    });
});