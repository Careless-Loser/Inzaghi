document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    
    const project = typeof projects !== 'undefined' ? projects[projectId] : null;

    if (!project) {
        console.error("Project not found!");
        return;
    }

    document.title = `INZAGHI | ${project.title}`;
    document.getElementById('p-title').innerText = project.title;
    document.getElementById('p-description').innerText = project.description;
    document.getElementById('p-details').innerText = project.details;

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

    const tagsContainer = document.getElementById('p-tags-container');
    const techList = document.getElementById('p-tech-list');
    
    if (project.tags) {
        tagsContainer.innerHTML = ''; 
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

    const mediaContainer = document.getElementById('p-media');
    if (project.isVideo) {
        mediaContainer.innerHTML = `
            <video autoplay loop muted playsinline class="w-full h-full object-cover">
                <source src="${project.media}" type="video/mp4">
            </video>`;
    } else {
        const imgPath = project.media || 'assets/images/placeholder.jpg';
        mediaContainer.innerHTML = `<img src="${imgPath}" alt="${project.title}" class="w-full h-full object-cover">`;
    }

    if (!project.link || project.link === "#") {
        document.getElementById('link-container').style.display = 'none';
    } else {
        document.getElementById('p-link').href = project.link;
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