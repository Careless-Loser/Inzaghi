document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    
    if (typeof projects === 'undefined') {
        console.error("Project data file (project-data.js) is missing!");
        return;
    }

    const project = projects[projectId];

    if (!project) {
        console.warn("Project Node not found in system. Redirecting...");
        window.location.href = 'works.html';
        return;
    }

    document.title = `INZAGHI | ${project.title}`;
    
    const elements = {
        title: document.getElementById('p-title'),
        desc: document.getElementById('p-description'),
        details: document.getElementById('p-details'),
        media: document.getElementById('p-media'),
        link: document.getElementById('p-link'),
        linkContainer: document.getElementById('link-container'),
        tagsContainer: document.getElementById('p-tags-container'),
        techList: document.getElementById('p-tech-list')
    };

    if (elements.title) elements.title.innerText = project.title;
    if (elements.desc) elements.desc.innerText = project.description;
    if (elements.details) elements.details.innerText = project.details;

    if (project.tags) {
        const tagArray = project.tags.split('/').map(t => t.trim());
        
        if (elements.tagsContainer) elements.tagsContainer.innerHTML = '';
        if (elements.techList) elements.techList.innerHTML = '';

        tagArray.forEach(tag => {
            const pill = document.createElement('span');
            pill.className = "text-[9px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full opacity-50";
            pill.innerText = tag;
            elements.tagsContainer?.appendChild(pill);

            const listTech = document.createElement('span');
            listTech.className = "text-[11px] md:text-sm font-medium opacity-80 bg-white/5 px-4 py-2 rounded-lg border border-white/5";
            listTech.innerText = tag;
            elements.techList?.appendChild(listTech);
        });
    }

    if (elements.media) {
        if (project.isVideo || project.media.endsWith('.mp4')) {
            elements.media.innerHTML = `
                <video autoplay loop muted playsinline class="w-full h-full object-cover rounded-2xl md:rounded-[48px]">
                    <source src="${project.media}" type="video/mp4">
                </video>`;
        } else {
            const imgPath = project.media || 'assets/images/placeholder.jpg';
            elements.media.innerHTML = `
                <img src="${imgPath}" alt="${project.title}" 
                     class="w-full h-full object-cover rounded-2xl md:rounded-[48px] shadow-2xl">`;
        }
    }

    if (!project.link || project.link === "#" || project.link === "") {
        if (elements.linkContainer) elements.linkContainer.style.display = 'none';
    } else {
        if (elements.link) elements.link.href = project.link;
    }

    const cursor = document.querySelector("#cursor");
    if (window.matchMedia("(pointer: fine)").matches && cursor) {
        document.addEventListener("mousemove", (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "none" });
        });
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 8, backgroundColor: "rgba(255,255,255,0.2)" }));
            el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, backgroundColor: "white" }));
        });
    }

    gsap.to(".reveal", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
    });
});