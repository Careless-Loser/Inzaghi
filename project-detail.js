/**
 * INZAGHI - Deep Project Detail Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Extract Data from URL
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    
    // Ensure 'projects' object exists from project-data.js
    const project = typeof projects !== 'undefined' ? projects[projectId] : null;

    // 3. Fail-safe: If no project found
    if (!project) {
        console.error("Project not found!");
        // Optional: window.location.href = 'index.html';
        return;
    }

    // 4. Populate Text Content
    document.title = `INZAGHI | ${project.title}`;
    document.getElementById('p-title').innerText = project.title;
    document.getElementById('p-description').innerText = project.description;
    document.getElementById('p-details').innerText = project.details;

    // 5. Cursor Movement (Custom)
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
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 8, backgroundColor: "rgba(255,255,255,0.2)" }));
            el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, backgroundColor: "white" }));
        });
    }

    // 6. Handle Tech Stack
    const tagsContainer = document.getElementById('p-tags-container');
    const techList = document.getElementById('p-tech-list');
    
    if (project.tags) {
        tagsContainer.innerHTML = ''; // Clear placeholders
        techList.innerHTML = '';
        const tagArray = project.tags.split('/').map(t => t.trim());
        
        tagArray.forEach(tag => {
            const pill = document.createElement('span');
            pill.className = "text-[9px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full opacity-50";
            pill.innerText = tag;
            tagsContainer.appendChild(pill);

            const listTech = document.createElement('span');
            listTech.className = "text-sm font-medium opacity-80 bg-white/5 px-4 py-2 rounded-lg";
            listTech.innerText = tag;
            techList.appendChild(listTech);
        });
    }

    // 7. Media Injection (The Fix)
    const mediaContainer = document.getElementById('p-media');
    if (project.isVideo) {
        mediaContainer.innerHTML = `
            <video autoplay loop muted playsinline class="w-full h-full object-cover">
                <source src="${project.media}" type="video/mp4">
            </video>`;
    } else {
        // Fallback to a placeholder if image path is wrong
        const imgPath = project.media || 'assets/images/placeholder.jpg';
        mediaContainer.innerHTML = `<img src="${imgPath}" alt="${project.title}" class="w-full h-full object-cover">`;
    }

    // 8. CTA Link
    if (!project.link || project.link === "#") {
        document.getElementById('link-container').style.display = 'none';
    } else {
        document.getElementById('p-link').href = project.link;
    }

    // 9. Force GSAP Reveal
    gsap.to(".reveal", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
    });
});