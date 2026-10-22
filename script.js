/* PAGE SWITCH ENGINE */
let currentPage = 1;
function goToPage(pageNum) {
    currentPage = pageNum;
    for (let i = 1; i <= 6; i++) {
        const pageEl = document.getElementById(`page-${i}`);
        const navBtn = document.getElementById(`nav-btn-${i}`);
        if (pageEl) {
            if (i === pageNum) {
                pageEl.classList.remove('hidden');
                pageEl.classList.add('block', 'page-transition');
            } else {
                pageEl.classList.add('hidden');
                pageEl.classList.remove('block', 'page-transition');
            }
        }
        if (navBtn) {
            if (i === pageNum) {
                navBtn.className = "px-3 py-2 rounded-xl border border-cyber-cyan/50 bg-cyber-cyan/20 text-cyber-cyan font-bold transition-all shadow-neon-cyan flex items-center gap-1.5";
            } else {
                navBtn.className = "px-3 py-2 rounded-xl border border-transparent text-gray-400 hover:text-white transition-all flex items-center gap-1.5";
            }
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playToneSFX('click');
}

/* TONE.JS AUDIO SYNTHESIZER ENGINE */
let isAudioEnabled = true;
function toggleAudioSFX() {
    isAudioEnabled = !isAudioEnabled;
    const icon = document.getElementById('audio-icon');
    const btn = document.getElementById('audio-toggle-btn');
    if (isAudioEnabled) {
        icon.className = "fa-solid fa-volume-high";
        btn.classList.add('text-cyber-cyan');
        playToneSFX('cert');
    } else {
        icon.className = "fa-solid fa-volume-xmark";
        btn.classList.remove('text-cyber-cyan');
    }
}

function playToneSFX(type) {
    if (!isAudioEnabled) return;
    try {
        const synth = new Tone.Synth().toDestination();
        if (type === 'click') {
            synth.triggerAttackRelease("C5", "16n");
        } else if (type === 'cert') {
            synth.triggerAttackRelease("G5", "8n");
        } else if (type === 'hack') {
            synth.triggerAttackRelease("E6", "8n");
        }
    } catch (e) {}
}

function playCyberSound(soundType) {
    if (!isAudioEnabled) return;
    try {
        if (soundType === 'laser') {
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease("C6", "16n");
        } else if (soundType === 'blaster') {
            const synth = new Tone.PolySynth().toDestination();
            synth.triggerAttackRelease(["E5", "G#5", "B5"], "8n");
        } else if (soundType === 'cyber-chord') {
            const synth = new Tone.PolySynth().toDestination();
            synth.triggerAttackRelease(["C5", "E5", "G5", "B5"], "4n");
        }
    } catch (e) {}
}

/* MODAL HANDLERS */
function openCertModal(type = 'usn') {
    const modal = document.getElementById('cert-modal');
    const box = document.getElementById('cert-modal-box');
    const icon = document.getElementById('cert-modal-icon');
    const title = document.getElementById('cert-modal-title');
    const subtitle = document.getElementById('cert-modal-subtitle');
    const body = document.getElementById('cert-modal-body');
    const img = document.getElementById('cert-modal-img');

    if (type === 'edukasi') {
        box.className = "w-full max-w-3xl glass-card border-2 border-cyber-cyan rounded-3xl p-6 sm:p-8 shadow-neon-strong relative font-mono space-y-4 my-auto";
        icon.className = "fa-solid fa-graduation-cap text-4xl text-cyber-cyan animate-pulse";
        title.textContent = "Poster Edukasi: Ketekunan & Disiplin";
        subtitle.textContent = "KARYA DESAIN GRAFIS EDUKASI DIGITAL DIKSAN";
        img.src = "image/poster 2.png"
        body.innerHTML = `
            <p><strong>Kreator:</strong> Diksan (SMKN 1 Kolaka)</p>
            <p><strong>Kategori:</strong> Desain Poster Edukasi Motivasi Belajar</p>
            <p><strong>Pesan Utama:</strong> <em>"Ketekunan dan disiplin dalam belajar adalah kunci untuk meraih prestasi. Setiap usaha yang kamu lakukan hari ini akan memberikan hasil di masa depan."</em></p>
        `;
    } else {
        box.className = "w-full max-w-3xl glass-card border-2 border-cyber-gold rounded-3xl p-6 sm:p-8 shadow-gold-glow relative font-mono space-y-4 my-auto";
        icon.className = "fa-solid fa-award text-4xl text-cyber-gold animate-pulse";
        title.textContent = "Poster Juara 3 USN (Kelestarian Lingkungan)";
        subtitle.textContent = "UNIVERSITAS SEMBILANBELAS NOVEMBER (USN) KOLAKA";
        img.src = "image/poster 1.png"
        body.innerHTML = `
            <p><strong>Pemenang:</strong> Diksan (11 TJKT SMKN 1 Kolaka)</p>
            <p><strong>Judul Karya:</strong> "Kearifan Lokal Kelestarian Lingkungan - Gotong Royong dan Nilai Lokal Untuk Kehidupan Bersama"</p>
            <p><strong>Penyelenggara:</strong> Universitas Sembilanbelas November (USN) Kolaka</p>
            <p><strong>Pesan Karya:</strong> <em>"Bumi bukan sekadar warisan dari nenek moyang, melainkan pinjaman dari generasi mendatang yang wajib kita jaga keberlanjutannya."</em></p>
        `;
    }

    modal.classList.remove('hidden');
    playToneSFX('cert');
}

function closeCertModal() {
    document.getElementById('cert-modal').classList.add('hidden');
    playToneSFX('click');
}

let isModalZoomed = false;
function toggleModalPosterZoom() {
    const img = document.getElementById('cert-modal-img');
    isModalZoomed = !isModalZoomed;
    if (isModalZoomed) {
        img.classList.add('scale-125');
        playToneSFX('cert');
    } else {
        img.classList.remove('scale-125');
        playToneSFX('click');
    }
}

/* SKILL MODAL DATA */
const skillData = {
    poster: { title: "Editing Poster", level: "95%", desc: "Keahlian utama Diksan dalam merancang poster digital bernilai tinggi dengan pemahaman warna dan hirarki tipografi.", stack: ["Adobe Photoshop", "Canva Pro", "Vector Design", "Color Theory", "Typography"] },
    photo: { title: "Editing Foto", level: "90%", desc: "Manipulasi foto digital, retouching wajah/produk, pemotongan objek latar belakang presisi, serta tata cahaya digital.", stack: ["Photoshop", "Lightroom", "Background Removal", "Color Grading", "Lighting FX"] },
    web: { title: "Web Development", level: "85%", desc: "Pengembangan antarmuka website responsif, interaktif, dan ringan menggunakan HTML5, Tailwind CSS, serta JS.", stack: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript ES6", "Responsive Design"] },
    network: { title: "Jaringan TJKT", level: "88%", desc: "Konfigurasi Router MikroTik via WinBox, manajemen IP Subnetting, kabel LAN UTP, dan troubleshooting jaringan.", stack: ["MikroTik", "WinBox", "Crimping Cable", "Subnetting IPv4", "Packet Tracer"] },
    tech: { title: "Teknisi PC Hardware", level: "92%", desc: "Perakitan PC, instalasi OS Windows & Linux, perbaikan thermal paste, serta perawatan komponen hardware.", stack: ["Hardware Assembly", "Windows/Linux OS", "PC Maintenance", "Troubleshooting"] },
    media: { title: "Media TikTok", level: "87%", desc: "Pembuatan konten multimedia video pendek CapCut/Reels, skrip alur cerita, dan strategi tren audio.", stack: ["CapCut", "TikTok Creator", "Instagram Reels", "Video Editing"] }
};

function openSkillModal(key) {
    const data = skillData[key];
    if (!data) return;
    document.getElementById('skill-modal-title').textContent = data.title;
    document.getElementById('skill-modal-level').textContent = `Tingkat Penguasaan: ${data.level}`;
    document.getElementById('skill-modal-desc').textContent = data.desc;
    
    const stackContainer = document.getElementById('skill-modal-stack');
    stackContainer.innerHTML = '';
    data.stack.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'px-2.5 py-1 rounded-lg bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan text-[10px]';
        tag.textContent = tech;
        stackContainer.appendChild(tag);
    });

    document.getElementById('skill-modal').classList.remove('hidden');
    playToneSFX('click');
}

function closeSkillModal() {
    document.getElementById('skill-modal').classList.add('hidden');
    playToneSFX('click');
}

/* TERMINAL CLI CONTROLLER */
function openTerminalHUD() {
    document.getElementById('terminal-modal').classList.remove('hidden');
    playToneSFX('click');
}
function closeTerminalHUD() {
    document.getElementById('terminal-modal').classList.add('hidden');
    playToneSFX('click');
}
function handleTerminalCommand(e) {
    if (e.key === 'Enter') {
        const input = document.getElementById('terminal-input');
        const output = document.getElementById('terminal-output');
        const cmd = input.value.trim().toLowerCase();
        
        const p = document.createElement('p');
        p.textContent = `$ ${input.value}`;
        output.appendChild(p);

        const res = document.createElement('p');
        res.className = "text-cyber-gold";

        if (cmd === 'help') {
            res.textContent = "Commands: bio, prestasi, skills, proyek, roadmap, kontak, matrix-rain, hack, synth, clear";
        } else if (cmd === 'proyek' || cmd === 'projects') {
            res.textContent = "1. MikroTik Hotspot Setup | 2. Campaign Poster USN | 3. Cyber Portfolio v5.0 Final";
        } else if (cmd === 'roadmap') {
            res.textContent = "2023: OSN Math SMPN 3 -> 2024: Juara 3 USN -> 2026: 11 TJKT -> Future: MTCNA Cert";
        } else if (cmd === 'bio') {
            res.textContent = "DIKSAN • 11 TJKT Teknisi SMKN 1 Kolaka • Asal SMPN 3 Kolaka";
        } else if (cmd === 'prestasi') {
            res.textContent = "1. Juara 3 Poster USN Kolaka | 2. OSN Matematika SMPN 3 | 3. Top 5 Juara Kelas SMPN 3";
        } else if (cmd === 'skills') {
            res.textContent = "Poster Editing, Retouch Foto, Frontend Web, MikroTik Network, PC Hardware";
        } else if (cmd === 'kontak') {
            res.textContent = "WhatsApp: +62 857-8700-2588 | Email: disankolo4@gmail.com";
        } else if (cmd === 'synth') {
            playCyberSound('cyber-chord');
            res.textContent = "> CYBER AUDIO SYNTHESIZER EXECUTED.";
        } else if (cmd === 'hack') {
            res.className = "text-cyber-pink font-bold";
            res.textContent = "> ACCESS GRANTED! Cyber System v5.0 Unlocked by Diksan.";
            playToneSFX('hack');
        } else if (cmd === 'matrix-rain') {
            res.className = "text-cyber-emerald font-bold";
            res.textContent = "> INITIALIZING DIGITAL MATRIX RAIN...";
            toggleMatrixRain();
        } else if (cmd === 'clear') {
            output.innerHTML = '';
            input.value = '';
            return;
        } else {
            res.textContent = `Command '${cmd}' not recognized. Type 'help' for options.`;
        }

        output.appendChild(res);
        output.scrollTop = output.scrollHeight;
        input.value = '';
        playToneSFX('click');
    }
}

/* LIVE POSTER STUDIO & PNG DOWNLOAD EXPORTER */
function updateLivePoster() {
    const titleInput = document.getElementById('poster-text-input').value;
    const subInput = document.getElementById('poster-sub-input').value;
    const iconSelect = document.getElementById('poster-icon-select').value;
    
    document.getElementById('live-poster-title').textContent = titleInput || "POSTER JUDUL";
    document.getElementById('live-poster-sub').textContent = subInput || "Pesan Poster Utama";
    document.getElementById('live-poster-icon').className = `fa-solid ${iconSelect} text-6xl text-cyber-cyan animate-pulse`;
}

function setPosterTheme(color) {
    const frame = document.getElementById('live-poster-frame');
    const title = document.getElementById('live-poster-title');
    const icon = document.getElementById('live-poster-icon');

    if (color === 'gold') {
        frame.className = "w-full max-w-sm h-96 rounded-2xl border-2 border-cyber-gold bg-black p-6 flex flex-col justify-between text-center relative overflow-hidden shadow-gold-glow transition-all";
        title.className = "text-xl font-cyber font-black text-white uppercase pt-2";
        icon.className = icon.className.replace(/text-\S+/, 'text-cyber-gold');
    } else if (color === 'purple') {
        frame.className = "w-full max-w-sm h-96 rounded-2xl border-2 border-cyber-purple bg-black p-6 flex flex-col justify-between text-center relative overflow-hidden shadow-purple-glow transition-all";
        title.className = "text-xl font-cyber font-black text-purple-300 uppercase pt-2";
        icon.className = icon.className.replace(/text-\S+/, 'text-cyber-purple');
    } else if (color === 'emerald') {
        frame.className = "w-full max-w-sm h-96 rounded-2xl border-2 border-cyber-emerald bg-black p-6 flex flex-col justify-between text-center relative overflow-hidden shadow-neon-cyan transition-all";
        title.className = "text-xl font-cyber font-black text-emerald-300 uppercase pt-2";
        icon.className = icon.className.replace(/text-\S+/, 'text-cyber-emerald');
    } else {
        frame.className = "w-full max-w-sm h-96 rounded-2xl border-2 border-cyber-cyan bg-black p-6 flex flex-col justify-between text-center relative overflow-hidden shadow-neon-strong transition-all";
        title.className = "text-xl font-cyber font-black text-white uppercase pt-2";
        icon.className = icon.className.replace(/text-\S+/, 'text-cyber-cyan');
    }
    playToneSFX('click');
}

function downloadGeneratedPoster() {
    const titleText = document.getElementById('poster-text-input').value || "POSTER JUDUL";
    const subText = document.getElementById('poster-sub-input').value || "Pesan Poster Utama";

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Canvas Background
    ctx.fillStyle = '#02040a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border Glow Line
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Poster Header Badge
    ctx.fillStyle = '#00f3ff';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('POSTER CREATOR DIKSAN', canvas.width / 2, 80);

    // Main Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Orbitron, sans-serif';
    ctx.fillText(titleText.toUpperCase(), canvas.width / 2, 180);

    // Center Symbol Graphic
    ctx.fillStyle = '#00f3ff';
    ctx.font = 'bold 100px sans-serif';
    ctx.fillText('🌍', canvas.width / 2, 420);

    // Subtitle
    ctx.fillStyle = '#e5e7eb';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(subText, canvas.width / 2, 600);

    // Footer Credits
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px monospace';
    ctx.fillText('CREATED BY DIKSAN • 11 TJKT SMKN 1 KOLAKA', canvas.width / 2, 720);

    // Trigger Download
    const link = document.createElement('a');
    link.download = 'Poster_Diksan_Lab.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    playToneSFX('cert');
}

/* THREE.JS 3D HOLOGRAM BACKGROUND SIMULATION */
let scene, camera, renderer, holoMesh;
function init3DHologram() {
    const container = document.getElementById('three-container');
    if(!container) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1.4, 0.35, 100, 16);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });

    holoMesh = new THREE.Mesh(geometry, material);
    scene.add(holoMesh);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate3DHologram() {
    requestAnimationFrame(animate3DHologram);
    if(holoMesh) {
        holoMesh.rotation.x += 0.005;
        holoMesh.rotation.y += 0.008;
    }
    if(renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

window.onload = function() {
    init3DHologram();
    animate3DHologram();
    initTypewriter();
};

/* TYPEWRITER ANIMATION ENGINE */
const typewriterPhrases = [
    "Siswa 11 TJKT SMKN 1 Kolaka",
    "Digital Content & Poster Creator",
    "Winner Juara 3 Poster USN",
    "Teknisi Jaringan & Web Dev"
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function initTypewriter() {
    const targetEl = document.getElementById('typewriter-text');
    if (!targetEl) return;

    const currentPhrase = typewriterPhrases[phraseIdx];

    if (isDeleting) {
        targetEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        targetEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % typewriterPhrases.length;
        typeSpeed = 500;
    }

    setTimeout(initTypewriter, typeSpeed);
}

/* BACKGROUND PARTICLE CANVAS ENGINE */
const canvas = document.getElementById('cyber-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 140 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('touchmove', (e) => {
    if(e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
});

class CyberParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = (Math.random() - 0.5) * 1.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            this.size = Math.min(this.size + 0.15, 4.5);
        } else if (this.size > 2) {
            this.size -= 0.05;
        }
    }
    draw() {
        ctx.fillStyle = '#00f3ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    let count = Math.min(Math.floor(window.innerWidth / 20), 45);
    for (let i = 0; i < count; i++) {
        particles.push(new CyberParticle());
    }
}

function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
                ctx.strokeStyle = `rgba(0, 243, 255, ${1 - dist / 110})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.items?.forEach?.(p => { p.update(); p.draw(); }); // safe check
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();

/* EASTER EGG MATRIX DIGITAL RAIN ENGINE */
let matrixActive = false;
function toggleMatrixRain() {
    const mCanvas = document.getElementById('matrix-rain-canvas');
    matrixActive = !matrixActive;
    if (matrixActive) {
        mCanvas.classList.remove('hidden');
        mCanvas.width = window.innerWidth;
        mCanvas.height = window.innerHeight;
        runMatrixRain(mCanvas);
    } else {
        mCanvas.classList.add('hidden');
    }
}

function runMatrixRain(mCanvas) {
    const mCtx = mCanvas.getContext('2d');
    const chars = '01DIKSAN_TJKT_COLAKA_2026_CYBER_MATRIX';
    const fontSize = 14;
    const columns = Math.floor(mCanvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        if (!matrixActive) return;
        mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        mCtx.fillRect(0, 0, mCanvas.width, mCanvas. mCanvas.height); // perbaikan minor sintaksis
        mCtx.fillStyle = '#10b981';
        mCtx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        requestAnimationFrame(drawMatrix);
    }
    drawMatrix();
}
