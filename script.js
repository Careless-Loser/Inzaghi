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

const cursor = document.querySelector("#cursor");
if (window.matchMedia("(pointer: fine)").matches && cursor) {
    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "none"
        });
    });
}

function initHoverInteractions() {
    document.querySelectorAll('a, button, .bento-card, .project-row').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) {
                gsap.to(cursor, { 
                    scale: 8, 
                    backgroundColor: "rgba(255,255,255,0.2)",
                    duration: 0.4 
                });
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) {
                gsap.to(cursor, { 
                    scale: 1, 
                    backgroundColor: "white",
                    duration: 0.3 
                });
            }
        });
    });
}

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    gsap.to(".reveal", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out"
    });

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

    initHoverInteractions();
});

function renderProjects(filterValue = "all") {
    const listContainer = document.querySelector("#project-list-container");
    if (!listContainer || typeof projects === 'undefined') return;

    listContainer.innerHTML = ""; 

    const filtered = Object.entries(projects).filter(([key, p]) => {
        return filterValue === "all" || p.tags.includes(filterValue);
    });

    filtered.forEach(([key, p], index) => {
        const row = document.createElement("a");
        row.href = `project.html?id=${key}`;
        row.className = "project-row group block py-8 md:py-14 border-b border-white/10 px-0 md:px-4 transition-colors hover:bg-white/[0.02]";
        
        row.innerHTML = `
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
                <div class="flex flex-col mb-6 md:mb-0 pointer-events-none">
                    <span class="text-[9px] font-mono opacity-40 mb-2 uppercase tracking-widest">
                        0${index + 1} // ${p.tags}
                    </span>
                    <h2 class="text-3xl md:text-7xl font-['Syne'] uppercase group-hover:italic transition-all duration-500 leading-none">
                        ${p.title}
                    </h2>
                </div>

                <div class="hidden md:block opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span class="text-[10px] tracking-[0.3em] uppercase"> ↗</span>
                </div>
            </div>
        `;

        listContainer.appendChild(row);
    });

    initHoverInteractions();
    gsap.from(".project-row", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll(".filter-btn");

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => {
                    b.classList.remove("active", "border-b", "border-white");
                    b.classList.add("opacity-40");
                });
                btn.classList.add("active", "border-b", "border-white");
                btn.classList.remove("opacity-40");
                renderProjects(btn.getAttribute("data-filter"));
            });
        });
    }

    renderProjects();
});