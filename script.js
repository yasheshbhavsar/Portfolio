/**
 * YASHESH BHAVSAR — CREATIVE PORTFOLIO
 * Integrated Sensory Audio, WebGL Spatial Canvas, Editorial Interactions,
 * and Precision Light & Dark Mode Architecture.
 * Inspired by Michael Gatt Studio Concepts
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. PROJECT DATABASE (CASE STUDIES)
       ========================================================================== */
    const PROJECT_DATA = {
        outlier: {
            title: 'Gen AI Response Auditing',
            category: 'AI EVALUATION & RLHF',
            client: 'Outlier.ai · Remote',
            role: 'Gen AI Auditor',
            timeline: 'MAR 2026 — Present',
            deliverables: 'Human-in-the-Loop Feedback, Bias Auditing, Fact-Checking',
            img: 'https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=1600&h=900&fit=crop',
            solution: 'Perform rigorous human-in-the-loop evaluations analyzing response truthfulness, logical safety guardrails, and tonal nuances to supply the critical supervisory signals required to train smarter and more reliable AI models.',
            tags: ['Generative AI', 'RLHF & Alignment', 'Fact-Checking', 'Bias Detection', 'Safety Guardrails', 'Model Auditing']
        },
        skysail: {
            title: 'Legal Drafting & Visa Consulting',
            category: 'LEGAL DRAFTING & COMPLIANCE',
            client: 'SkySail Immigration & Freelance Clients',
            role: 'Head of Department & Visa Counsellor',
            timeline: 'JAN 2022 — JUL 2026',
            deliverables: 'Legal Petitions, Comprehensive Document Audits, Team Leadership',
            img: 'https://images.unsplash.com/photo-1581656702382-9ae90e68e7b7?w=1600&h=900&fit=crop',
            solution: 'Oversaw the entire filing department, authored precise legal submission letters, resolved complex escalations, and established rigorous verification checkpoints ensuring 100% compliant, error-free petitions.',
            tags: ['Legal Drafting', 'Regulatory Compliance', 'Document Review', 'Risk Assessment', 'Escalation Management']
        },
        batball: {
            title: 'Backend Telemetry & Critical Data QA',
            category: 'LIVE DATA OPERATIONS',
            client: 'Batball11 · Ahmedabad, India',
            role: 'Administrative & Data Specialist',
            timeline: 'FEB 2021 — DEC 2021',
            deliverables: 'Real-time Anomaly Detection, Live Match Telemetry, Data Operations',
            img: (typeof window !== 'undefined' && window.BATBALL11_LOCAL_IMAGE) ? window.BATBALL11_LOCAL_IMAGE : 'batball11-dashboard.jpg',
            solution: 'Maintained absolute data accuracy, established real-time anomaly detection routines, and rapidly diagnosed edge-case anomalies to ensure seamless, uninterrupted platform operations.',
            tags: ['Data Verification', 'Anomaly Detection', 'Backend Operations', 'Quality Assurance', 'Real-time Telemetry']
        },
        newsenquire: {
            title: 'Investigative Writing & Information Research',
            category: 'JOURNALISM & FACT-CHECKING',
            client: 'NewsEnquire · Remote | Ahmedabad',
            role: 'Content Writer & Researcher',
            timeline: 'AUG 2019 — DEC 2019',
            deliverables: 'Current Affairs Articles, Multi-Source Fact Checking, Editorial Synthesis',
            img: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=1600&h=900&fit=crop',
            solution: 'Conducted in-depth investigative research, performed rigorous multi-source verification, and synthesized complex events into lucid, engaging, and accurate articles.',
            tags: ['Fact-Checking', 'Grammar & Syntax', 'Current Affairs', 'Research Synthesis', 'Editorial Standards']
        }
    };

    /* ==========================================================================
       2. SOUND ENGINE (WEBAUDIO SYNTHESIZER & AMBIENT SCORE)
       ========================================================================== */
    class SoundEngine {
        constructor() {
            this.ctx = null;
            this.bgAudio = document.getElementById('bg-ambient-audio');
            this.isMuted = true;
            this.synthGain = null;
            this.audioWidget = document.getElementById('audio-toggle');
            this.audioLabel = document.getElementById('audio-status-label');
            this.visualizerBars = document.getElementById('visualizer-bars');

            if (this.bgAudio) {
                this.bgAudio.loop = true;
                this.bgAudio.volume = 0.6;
                this.bgAudio.addEventListener('ended', () => {
                    if (!this.isMuted) {
                        this.bgAudio.currentTime = 0;
                        this.bgAudio.play().catch(() => { });
                    }
                });
            }
        }

        initContext() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.ctx = new AudioCtx();
                    this.synthGain = this.ctx.createGain();
                    this.synthGain.gain.setValueAtTime(0.32, this.ctx.currentTime);
                    this.synthGain.connect(this.ctx.destination);
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume().catch(() => { });
            }
        }

        playHover() {
            if (this.isMuted || !this.ctx) return;
            try {
                const now = this.ctx.currentTime;

                const osc1 = this.ctx.createOscillator();
                const gain1 = this.ctx.createGain();
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(680, now);
                osc1.frequency.exponentialRampToValueAtTime(920, now + 0.08);

                gain1.gain.setValueAtTime(0.12, now);
                gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

                osc1.connect(gain1);
                gain1.connect(this.synthGain);

                const osc2 = this.ctx.createOscillator();
                const gain2 = this.ctx.createGain();
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(1020, now);
                osc2.frequency.exponentialRampToValueAtTime(1360, now + 0.06);

                gain2.gain.setValueAtTime(0.06, now);
                gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

                osc2.connect(gain2);
                gain2.connect(this.synthGain);

                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + 0.13);
                osc2.stop(now + 0.10);
            } catch (e) { }
        }

        playClick() {
            if (this.isMuted || !this.ctx) return;
            try {
                const now = this.ctx.currentTime;

                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(420, now);
                osc.frequency.exponentialRampToValueAtTime(60, now + 0.11);

                gain.gain.setValueAtTime(0.24, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

                osc.connect(gain);
                gain.connect(this.synthGain);

                const clickOsc = this.ctx.createOscillator();
                const clickGain = this.ctx.createGain();
                clickOsc.type = 'sine';
                clickOsc.frequency.setValueAtTime(1800, now);
                clickOsc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

                clickGain.gain.setValueAtTime(0.17, now);
                clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

                clickOsc.connect(clickGain);
                clickGain.connect(this.synthGain);

                osc.start(now);
                clickOsc.start(now);
                osc.stop(now + 0.14);
                clickOsc.stop(now + 0.05);
            } catch (e) { }
        }

        playModalOpen() {
            if (this.isMuted || !this.ctx) return;
            try {
                const frequencies = [440, 660, 880];
                frequencies.forEach((freq, idx) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    const now = this.ctx.currentTime + (idx * 0.04);

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, now);
                    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.28);

                    gain.gain.setValueAtTime(0.14, now);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

                    osc.connect(gain);
                    gain.connect(this.synthGain);

                    osc.start(now);
                    osc.stop(now + 0.36);
                });
            } catch (e) { }
        }

        playModalClose() {
            if (this.isMuted || !this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const now = this.ctx.currentTime;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(680, now);
                osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);

                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

                osc.connect(gain);
                gain.connect(this.synthGain);

                osc.start(now);
                osc.stop(now + 0.24);
            } catch (e) { }
        }

        setMute(mute) {
            this.isMuted = mute;
            if (this.audioWidget) {
                if (mute) {
                    this.audioWidget.classList.remove('playing');
                    if (this.audioLabel) this.audioLabel.textContent = 'Sound Off';
                    if (this.bgAudio) {
                        this.bgAudio.pause();
                    }
                } else {
                    this.initContext();
                    this.audioWidget.classList.add('playing');
                    if (this.audioLabel) this.audioLabel.textContent = 'Sound On';
                    if (this.bgAudio) {
                        this.bgAudio.loop = true;
                        this.bgAudio.volume = 0.6;
                        const playPromise = this.bgAudio.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(err => {
                                console.warn('Audio play request handled:', err);
                            });
                        }
                    }
                    this.playClick();
                }
            }
        }

        toggle() {
            this.setMute(!this.isMuted);
        }
    }

    const sound = new SoundEngine();

    // Toggle Audio button
    const audioToggleBtn = document.getElementById('audio-toggle');
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            sound.toggle();
        });
    }

    /* ==========================================================================
       3. THEME CONTROLLER (LIGHT / DARK LUXURY EXPERIENCE)
       ========================================================================== */
    class ThemeController {
        constructor() {
            this.themeToggleBtn = document.getElementById('theme-toggle');
            this.themeLabel = document.getElementById('theme-status-label');
            this.currentTheme = 'dark';
            this.subscribers = [];

            this.init();
        }

        init() {
            // Dark mode is default on every reload
            this.setTheme('dark', false);

            if (this.themeToggleBtn) {
                this.themeToggleBtn.addEventListener('click', () => {
                    this.toggle();
                });
            }
        }

        subscribe(callback) {
            if (typeof callback === 'function') {
                this.subscribers.push(callback);
                // Immediately notify with current theme
                callback(this.currentTheme);
            }
        }

        setTheme(theme, isUserAction = true) {
            this.currentTheme = theme;

            if (isUserAction) {
                document.body.classList.add('theme-transitioning');
                setTimeout(() => {
                    document.body.classList.remove('theme-transitioning');
                }, 400);
            }

            document.documentElement.setAttribute('data-theme', theme);

            if (this.themeLabel) {
                this.themeLabel.textContent = theme === 'light' ? 'Light' : 'Dark';
            }

            if (this.themeToggleBtn) {
                this.themeToggleBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
                this.themeToggleBtn.setAttribute('data-cursor', theme === 'light' ? 'DARK' : 'LIGHT');
            }

            if (isUserAction) {
                sound.playClick();
            }

            // Notify all subscribers
            this.subscribers.forEach(cb => {
                try {
                    cb(theme);
                } catch (e) {
                    console.error('Theme listener error:', e);
                }
            });
        }

        toggle() {
            const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(nextTheme, true);
        }
    }

    const themeController = new ThemeController();

    /* ==========================================================================
       4. INTRO AUDIO GATEWAY
       ========================================================================== */
    const introGateway = document.getElementById('intro-gateway');
    const btnEnterSound = document.getElementById('btn-enter-sound');
    const btnEnterMute = document.getElementById('btn-enter-mute');
    const introTrigger = document.getElementById('intro-trigger');

    function closeGateway(enableSound = true) {
        sound.initContext();
        if (enableSound) {
            sound.setMute(false);
        } else {
            sound.setMute(true);
        }

        if (introGateway) {
            introGateway.classList.add('hidden');
            setTimeout(() => {
                introGateway.style.display = 'none';
            }, 850);
        }
    }

    if (btnEnterSound) btnEnterSound.addEventListener('click', () => closeGateway(true));
    if (introTrigger) introTrigger.addEventListener('click', () => closeGateway(true));
    if (btnEnterMute) btnEnterMute.addEventListener('click', () => closeGateway(false));

    /* ==========================================================================
       5. CUSTOM MOTION BLUR CURSOR (IGNACIO CORREIA CONCEPT)
       ========================================================================== */
    class MotionBlurCursorController {
        constructor() {
            this.container = document.getElementById('motion-blur-cursor');
            this.pill = document.getElementById('cursor-pill');

            this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            this.layers = [];
            this.layerCount = 18;
            this.isHovered = false;
            this.isRendering = false;

            this.init();
        }

        isTouchOrMobile() {
            const isCoarse = window.matchMedia('(pointer: coarse)').matches;
            const isHoverNone = window.matchMedia('(hover: none)').matches;
            const isMobileWidth = window.innerWidth <= 1024;
            const isPortrait = window.matchMedia('(orientation: portrait)').matches && window.innerWidth <= 1024;
            const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
            return isCoarse || isHoverNone || isMobileWidth || isPortrait || hasTouch;
        }

        init() {
            if (!this.container) return;

            // Generate motion blur layered elements
            for (let i = 0; i < this.layerCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'blur-dot' + (i === 0 ? ' lead-dot' : '');

                const progress = i / (this.layerCount - 1);
                const size = (i === 0) ? 9 : Math.max(3, Math.round(8 - progress * 4.5));
                dot.style.width = `${size}px`;
                dot.style.height = `${size}px`;

                if (i > 0) {
                    const opacity = Math.pow(1 - progress, 1.4) * 0.75;
                    dot.style.opacity = opacity.toFixed(3);
                }

                this.container.appendChild(dot);

                this.layers.push({
                    el: dot,
                    x: this.mouse.x,
                    y: this.mouse.y,
                    baseSize: size
                });
            }

            this.updateTheme(themeController.currentTheme);

            let isFirstMove = true;
            const handleMove = (x, y) => {
                if (this.isTouchOrMobile()) return;
                this.mouse.x = x;
                this.mouse.y = y;
                if (isFirstMove) {
                    isFirstMove = false;
                    this.layers.forEach(l => {
                        l.x = x;
                        l.y = y;
                    });
                }
            };

            window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
            window.addEventListener('pointermove', (e) => {
                if (e.pointerType === 'mouse') {
                    handleMove(e.clientX, e.clientY);
                }
            });

            window.addEventListener('resize', () => this.handleViewportChange());
            window.addEventListener('orientationchange', () => this.handleViewportChange());

            this.bindHoverElements();
            this.handleViewportChange();
        }

        updateTheme(theme) {
            const isLight = theme === 'light';
            this.layers.forEach((layer, i) => {
                if (i === 0) return; // lead dot styled via CSS
                const progress = i / (this.layerCount - 1);
                if (isLight) {
                    const r = Math.round(20 + progress * 60);
                    const g = Math.round(22 + progress * 40);
                    const b = Math.round(30 + progress * 190);
                    layer.el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    layer.el.style.boxShadow = `0 0 ${Math.max(2, Math.round(8 * (1 - progress)))}px rgba(104, 53, 240, 0.35)`;
                } else {
                    const r = Math.round(255 - progress * (255 - 224));
                    const g = Math.round(255 - progress * (255 - 195));
                    const b = Math.round(255 - progress * (255 - 143));
                    layer.el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    layer.el.style.boxShadow = `0 0 ${Math.max(2, Math.round(8 * (1 - progress)))}px rgba(${r}, ${g}, ${b}, 0.6)`;
                }
            });
        }

        handleViewportChange() {
            if (this.isTouchOrMobile()) {
                if (this.container) this.container.style.display = 'none';
                if (this.pill) this.pill.style.display = 'none';
                document.body.classList.remove('cursor-active', 'cursor-view');
                this.isRendering = false;
            } else {
                if (this.container) this.container.style.display = '';
                if (this.pill) this.pill.style.display = '';
                if (!this.isRendering) {
                    this.isRendering = true;
                    this.render();
                }
            }
        }

        bindHoverElements() {
            const hoverTargets = document.querySelectorAll('a, button, [data-cursor], .project-editorial-card, .lab-card, .spatial-card, .footer-pill, .btn-primary, .btn-outline, .audio-widget, .theme-widget, .intro-heading, .intro-btn, .btn-resume-download, .btn-resume-preview');

            hoverTargets.forEach(el => {
                if (el._hasCursorBound) return;
                el._hasCursorBound = true;

                el.addEventListener('mouseenter', () => {
                    if (this.isTouchOrMobile()) return;
                    this.isHovered = true;
                    const cursorLabel = el.getAttribute('data-cursor');
                    document.body.classList.add('cursor-active');

                    if (this.layers[0]) {
                        this.layers[0].el.style.width = '38px';
                        this.layers[0].el.style.height = '38px';
                    }

                    if (cursorLabel && this.pill) {
                        this.pill.textContent = cursorLabel;
                        document.body.classList.add('cursor-view');
                    }
                    sound.playHover();
                });

                el.addEventListener('mouseleave', () => {
                    if (this.isTouchOrMobile()) return;
                    this.isHovered = false;
                    document.body.classList.remove('cursor-active', 'cursor-view');
                    if (this.layers[0]) {
                        this.layers[0].el.style.width = `${this.layers[0].baseSize}px`;
                        this.layers[0].el.style.height = `${this.layers[0].baseSize}px`;
                    }
                });

                el.addEventListener('click', () => {
                    sound.playClick();
                });
            });
        }

        render() {
            if (!this.isRendering || this.isTouchOrMobile()) return;

            this.layers.forEach((layer, index) => {
                if (index === 0) {
                    layer.x += (this.mouse.x - layer.x) * 0.75;
                    layer.y += (this.mouse.y - layer.y) * 0.75;
                } else {
                    const prev = this.layers[index - 1];
                    const lerpFactor = Math.max(0.20, 0.60 - (index / this.layerCount) * 0.32);
                    layer.x += (prev.x - layer.x) * lerpFactor;
                    layer.y += (prev.y - layer.y) * lerpFactor;
                }

                layer.el.style.transform = `translate3d(${layer.x}px, ${layer.y}px, 0) translate(-50%, -50%)`;
            });

            if (this.pill && this.layers[0]) {
                this.pill.style.left = `${this.layers[0].x}px`;
                this.pill.style.top = `${this.layers[0].y}px`;
            }

            requestAnimationFrame(() => this.render());
        }
    }

    const cursorController = new MotionBlurCursorController();
    themeController.subscribe(theme => cursorController.updateTheme(theme));

    /* ==========================================================================
       6. 3D WEBGL SPATIAL GALLERY (THREE.JS SCENE)
       ========================================================================== */
    class WebGLSpatialGallery {
        constructor() {
            this.container = document.getElementById('webgl-container');
            this.canvas = document.getElementById('webgl-canvas');
            if (!this.canvas || !window.THREE) return;

            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.ambientLight = null;
            this.pointLight = null;
            this.particles = null;
            this.cards = [];
            this.raycaster = new THREE.Raycaster();
            this.mouseVec = new THREE.Vector2();

            this.isDragging = false;
            this.prevMouse = { x: 0, y: 0 };
            this.velocity = { x: 0, y: 0 };
            this.scrollPos = { x: 0, y: 0 };
            this.targetScroll = { x: 0, y: 0 };

            this.init();
        }

        init() {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;

            // Scene & Camera
            this.scene = new THREE.Scene();
            const initialFogColor = (themeController.currentTheme === 'light') ? 0xf8f8fb : 0x060608;
            this.scene.fog = new THREE.FogExp2(initialFogColor, 0.0012);

            this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
            this.camera.position.z = 850;

            // Renderer
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true
            });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Ambient & Point Lighting
            this.ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
            this.scene.add(this.ambientLight);

            const initialPointColor = (themeController.currentTheme === 'light') ? 0x6835f0 : 0x7952ff;
            this.pointLight = new THREE.PointLight(initialPointColor, 1.8, 1500);
            this.pointLight.position.set(0, 200, 500);
            this.scene.add(this.pointLight);

            // Create Spatial Project Planes
            this.createProjectPlanes();

            // Create Ambient Floating Particles
            this.createParticleField();

            // Bind Event Listeners
            this.bindEvents();

            // Render loop
            this.animate();
        }

        updateTheme(theme) {
            if (!this.scene) return;
            const isLight = theme === 'light';

            if (this.scene.fog) {
                this.scene.fog.color.setHex(isLight ? 0xf8f8fb : 0x060608);
            }
            if (this.pointLight) {
                this.pointLight.color.setHex(isLight ? 0x6835f0 : 0x7952ff);
                this.pointLight.intensity = isLight ? 1.5 : 1.8;
            }
            if (this.particles && this.particles.material) {
                this.particles.material.color.setHex(isLight ? 0x6835f0 : 0x9f82ff);
                this.particles.material.opacity = isLight ? 0.35 : 0.45;
            }
        }

        createProjectPlanes() {
            const textureLoader = new THREE.TextureLoader();
            const projectKeys = Object.keys(PROJECT_DATA);

            const layoutPositions = [
                { x: -380, y: 120, z: -50, scale: 1.0 },
                { x: 380, y: -80, z: -80, scale: 0.95 },
                { x: -180, y: -240, z: 40, scale: 1.05 },
                { x: 260, y: 260, z: -20, scale: 1.0 }
            ];

            projectKeys.forEach((key, index) => {
                const data = PROJECT_DATA[key];
                const pos = layoutPositions[index % layoutPositions.length];
                const geom = new THREE.PlaneGeometry(360, 220, 16, 16);

                if (typeof data.img === 'string' && data.img.startsWith('http')) {
                    textureLoader.setCrossOrigin('anonymous');
                } else {
                    textureLoader.setCrossOrigin(null);
                }

                const applyMesh = (mapTexture) => {
                    mapTexture.minFilter = THREE.LinearFilter;
                    mapTexture.generateMipmaps = false;

                    const mat = new THREE.MeshStandardMaterial({
                        map: mapTexture,
                        roughness: 0.25,
                        metalness: 0.1,
                        side: THREE.DoubleSide
                    });

                    const mesh = new THREE.Mesh(geom, mat);
                    mesh.position.set(pos.x, pos.y, pos.z);
                    mesh.scale.set(pos.scale, pos.scale, 1);
                    mesh.userData = {
                        projectKey: key,
                        initialPos: { ...pos },
                        title: data.title
                    };

                    this.scene.add(mesh);
                    this.cards.push(mesh);
                };

                textureLoader.load(
                    data.img,
                    (texture) => {
                        applyMesh(texture);
                    },
                    undefined,
                    () => {
                        // Resilient procedural fallback canvas if cross-origin or network fails
                        const canvas = document.createElement('canvas');
                        canvas.width = 720;
                        canvas.height = 440;
                        const ctx = canvas.getContext('2d');
                        ctx.fillStyle = '#0a0b12';
                        ctx.fillRect(0, 0, 720, 440);
                        ctx.strokeStyle = 'rgba(121, 82, 255, 0.4)';
                        ctx.lineWidth = 4;
                        ctx.strokeRect(12, 12, 696, 416);
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 30px sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText(data.title, 360, 210);
                        ctx.fillStyle = '#9f82ff';
                        ctx.font = '600 18px monospace';
                        ctx.fillText(data.category, 360, 260);

                        const fallbackTex = new THREE.CanvasTexture(canvas);
                        applyMesh(fallbackTex);
                    }
                );
            });
        }

        createParticleField() {
            const count = 180;
            const geom = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);

            for (let i = 0; i < count * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 1800;
                positions[i + 1] = (Math.random() - 0.5) * 1200;
                positions[i + 2] = (Math.random() - 0.5) * 1000;
            }

            geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const isLight = themeController.currentTheme === 'light';
            const mat = new THREE.PointsMaterial({
                color: isLight ? 0x6835f0 : 0x9f82ff,
                size: 3,
                transparent: true,
                opacity: isLight ? 0.35 : 0.45
            });

            this.particles = new THREE.Points(geom, mat);
            this.scene.add(this.particles);
        }

        bindEvents() {
            window.addEventListener('resize', () => {
                const width = this.container.clientWidth;
                const height = this.container.clientHeight;
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
            });

            // Drag navigation on canvas
            const onPointerDown = (e) => {
                this.isDragging = true;
                this.prevMouse.x = e.clientX || (e.touches && e.touches[0].clientX);
                this.prevMouse.y = e.clientY || (e.touches && e.touches[0].clientY);
            };

            const onPointerMove = (e) => {
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);

                const rect = this.canvas.getBoundingClientRect();
                this.mouseVec.x = ((clientX - rect.left) / rect.width) * 2 - 1;
                this.mouseVec.y = -((clientY - rect.top) / rect.height) * 2 + 1;

                if (this.isDragging) {
                    const deltaX = clientX - this.prevMouse.x;
                    const deltaY = clientY - this.prevMouse.y;

                    this.velocity.x = deltaX * 0.85;
                    this.velocity.y = deltaY * 0.85;

                    this.targetScroll.x += deltaX * 1.2;
                    this.targetScroll.y -= deltaY * 1.2;

                    this.prevMouse.x = clientX;
                    this.prevMouse.y = clientY;
                }
            };

            const onPointerUp = (e) => {
                if (!this.isDragging) return;
                this.isDragging = false;

                this.raycaster.setFromCamera(this.mouseVec, this.camera);
                const intersects = this.raycaster.intersectObjects(this.cards);

                if (intersects.length > 0 && Math.abs(this.velocity.x) < 2 && Math.abs(this.velocity.y) < 2) {
                    const projectKey = intersects[0].object.userData.projectKey;
                    if (projectKey && modalController) {
                        modalController.open(projectKey);
                    }
                }
            };

            this.canvas.addEventListener('mousedown', onPointerDown);
            window.addEventListener('mousemove', onPointerMove);
            window.addEventListener('mouseup', onPointerUp);

            this.canvas.addEventListener('touchstart', onPointerDown, { passive: true });
            window.addEventListener('touchmove', onPointerMove, { passive: true });
            window.addEventListener('touchend', onPointerUp);

            this.container.addEventListener('wheel', (e) => {
                this.targetScroll.y += e.deltaY * 0.5;
                this.targetScroll.x += e.deltaX * 0.5;
            }, { passive: true });
        }

        animate() {
            requestAnimationFrame(() => this.animate());

            this.scrollPos.x += (this.targetScroll.x - this.scrollPos.x) * 0.08;
            this.scrollPos.y += (this.targetScroll.y - this.scrollPos.y) * 0.08;

            const time = performance.now() * 0.001;

            this.cards.forEach((card, idx) => {
                const init = card.userData.initialPos;
                const offset = idx * 1.5;

                card.position.x = init.x + (this.scrollPos.x * 0.25) + Math.sin(time + offset) * 12;
                card.position.y = init.y + (this.scrollPos.y * 0.25) + Math.cos(time + offset) * 12;

                card.rotation.x = (this.mouseVec.y * 0.1) + Math.sin(time + offset) * 0.03;
                card.rotation.y = (this.mouseVec.x * 0.1) + Math.cos(time + offset) * 0.03;
            });

            if (this.particles) {
                this.particles.rotation.y = time * 0.02;
                this.particles.rotation.x = time * 0.01;
            }

            this.renderer.render(this.scene, this.camera);
        }
    }

    const spatialGallery = new WebGLSpatialGallery();
    themeController.subscribe(theme => spatialGallery.updateTheme(theme));

    /* ==========================================================================
       7. CASE STUDY MODAL / DRAWER CONTROLLER
       ========================================================================== */
    class ModalController {
        constructor() {
            this.modal = document.getElementById('case-study-modal');
            this.drawer = document.getElementById('modal-drawer');
            this.closeBtn = document.getElementById('modal-close-btn');

            this.titleEl = document.getElementById('modal-title');
            this.categoryEl = document.getElementById('modal-category');
            this.clientEl = document.getElementById('modal-client');
            this.roleEl = document.getElementById('modal-role');
            this.timelineEl = document.getElementById('modal-timeline');
            this.deliverablesEl = document.getElementById('modal-deliverables');
            this.imgEl = document.getElementById('modal-img');
            this.solutionEl = document.getElementById('modal-solution');
            this.tagsEl = document.getElementById('modal-tags');

            this.bindEvents();
        }

        bindEvents() {
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.close());
            }

            if (this.modal) {
                this.modal.addEventListener('click', (e) => {
                    if (e.target === this.modal) this.close();
                });
            }

            const modalCtaBtn = document.getElementById('modal-cta-btn');
            if (modalCtaBtn) {
                modalCtaBtn.addEventListener('click', () => {
                    this.close();
                    const contactSec = document.getElementById('contact');
                    if (contactSec) {
                        setTimeout(() => {
                            contactSec.scrollIntoView({ behavior: 'smooth' });
                        }, 280);
                    }
                });
            }

            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('open')) {
                    this.close();
                }
            });

            // Boundary scroll auto-minimize with progressive resistance and smooth transition
            let overscrollUp = 0;
            let overscrollDown = 0;
            let resetTimer = null;
            let isTransitioningOut = false;
            const OVERSCROLL_THRESHOLD = 260; // Accepts ~3 deliberate scrolls before minimizing

            const resetDrawerTransform = () => {
                if (isTransitioningOut || !this.drawer) return;
                this.drawer.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
                this.drawer.style.transform = 'translateY(0)';
                if (this.modal) {
                    this.modal.style.transition = 'opacity 0.45s ease';
                    this.modal.style.opacity = '1';
                }
                setTimeout(() => {
                    if (!isTransitioningOut && this.drawer) {
                        this.drawer.style.transition = '';
                        this.drawer.style.transform = '';
                    }
                    if (!isTransitioningOut && this.modal) {
                        this.modal.style.transition = '';
                        this.modal.style.opacity = '';
                    }
                }, 450);
                overscrollUp = 0;
                overscrollDown = 0;
            };

            const triggerSmoothMinimize = () => {
                if (isTransitioningOut) return;
                isTransitioningOut = true;
                overscrollUp = 0;
                overscrollDown = 0;

                // Animate drawer gliding smoothly down into minimized state
                if (this.drawer) {
                    this.drawer.style.transition = 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)';
                    this.drawer.style.transform = 'translateY(100%)';
                }
                if (this.modal) {
                    this.modal.style.transition = 'opacity 0.5s ease';
                    this.modal.style.opacity = '0';
                }

                setTimeout(() => {
                    this.close();
                    if (this.drawer) {
                        this.drawer.style.transition = '';
                        this.drawer.style.transform = '';
                    }
                    if (this.modal) {
                        this.modal.style.transition = '';
                        this.modal.style.opacity = '';
                    }
                    isTransitioningOut = false;
                }, 480);
            };

            if (this.drawer) {
                this.drawer.addEventListener('wheel', (e) => {
                    if (!this.modal.classList.contains('open') || isTransitioningOut) return;
                    if (Date.now() - (this.openedAt || 0) < 350) return;

                    const scrollTop = this.drawer.scrollTop;
                    const scrollHeight = this.drawer.scrollHeight;
                    const clientHeight = this.drawer.clientHeight;
                    const isAtTop = scrollTop <= 2;
                    const isAtBottom = (scrollTop + clientHeight) >= (scrollHeight - 6);

                    // Scrolling UP when already at top (no room to scroll up)
                    if (isAtTop && e.deltaY < 0) {
                        overscrollUp += Math.abs(e.deltaY);
                        overscrollDown = 0;

                        clearTimeout(resetTimer);
                        resetTimer = setTimeout(resetDrawerTransform, 320);

                        // Visual tactile pull feedback
                        const progress = Math.min(overscrollUp / OVERSCROLL_THRESHOLD, 1);
                        const elasticY = Math.pow(progress, 0.8) * 55;
                        this.drawer.style.transition = 'none';
                        this.drawer.style.transform = `translateY(${elasticY}px)`;
                        if (this.modal) {
                            this.modal.style.transition = 'none';
                            this.modal.style.opacity = `${1 - progress * 0.3}`;
                        }

                        if (overscrollUp >= OVERSCROLL_THRESHOLD) {
                            clearTimeout(resetTimer);
                            triggerSmoothMinimize();
                        }
                        return;
                    }

                    // Scrolling DOWN when already at bottom (no room to scroll down)
                    if (isAtBottom && e.deltaY > 0) {
                        overscrollDown += Math.abs(e.deltaY);
                        overscrollUp = 0;

                        clearTimeout(resetTimer);
                        resetTimer = setTimeout(resetDrawerTransform, 320);

                        // Visual tactile pull feedback
                        const progress = Math.min(overscrollDown / OVERSCROLL_THRESHOLD, 1);
                        const elasticY = Math.pow(progress, 0.8) * 55;
                        this.drawer.style.transition = 'none';
                        this.drawer.style.transform = `translateY(${elasticY}px)`;
                        if (this.modal) {
                            this.modal.style.transition = 'none';
                            this.modal.style.opacity = `${1 - progress * 0.3}`;
                        }

                        if (overscrollDown >= OVERSCROLL_THRESHOLD) {
                            clearTimeout(resetTimer);
                            triggerSmoothMinimize();
                        }
                        return;
                    }

                    // Normal scrolling inside content
                    if (!isAtTop && !isAtBottom) {
                        if (overscrollUp > 0 || overscrollDown > 0) {
                            resetDrawerTransform();
                        }
                    }
                }, { passive: true });

                // Touch / Trackpad swipe gestures with proportional resistance
                let touchStartY = 0;
                let touchStartX = 0;
                let isTouchActive = false;

                this.drawer.addEventListener('touchstart', (e) => {
                    if (e.touches.length > 0) {
                        touchStartY = e.touches[0].clientY;
                        touchStartX = e.touches[0].clientX;
                        isTouchActive = true;
                    }
                }, { passive: true });

                this.drawer.addEventListener('touchmove', (e) => {
                    if (!this.modal.classList.contains('open') || !isTouchActive || isTransitioningOut) return;
                    if (Date.now() - (this.openedAt || 0) < 350) return;

                    const currentY = e.touches[0].clientY;
                    const deltaY = currentY - touchStartY;
                    const deltaX = e.touches[0].clientX - touchStartX;

                    if (Math.abs(deltaY) < Math.abs(deltaX) * 1.5) return;

                    const scrollTop = this.drawer.scrollTop;
                    const scrollHeight = this.drawer.scrollHeight;
                    const clientHeight = this.drawer.clientHeight;
                    const isAtTop = scrollTop <= 2;
                    const isAtBottom = (scrollTop + clientHeight) >= (scrollHeight - 6);

                    // Pulling down at top
                    if (isAtTop && deltaY > 0) {
                        const touchPull = Math.min(deltaY * 0.45, 80);
                        this.drawer.style.transition = 'none';
                        this.drawer.style.transform = `translateY(${touchPull}px)`;
                    }
                    // Pulling up at bottom
                    else if (isAtBottom && deltaY < 0) {
                        const touchPull = Math.min(Math.abs(deltaY) * 0.45, 80);
                        this.drawer.style.transition = 'none';
                        this.drawer.style.transform = `translateY(${touchPull}px)`;
                    }
                }, { passive: true });

                this.drawer.addEventListener('touchend', (e) => {
                    if (!isTouchActive || isTransitioningOut) return;
                    isTouchActive = false;

                    const scrollTop = this.drawer.scrollTop;
                    const scrollHeight = this.drawer.scrollHeight;
                    const clientHeight = this.drawer.clientHeight;
                    const isAtTop = scrollTop <= 2;
                    const isAtBottom = (scrollTop + clientHeight) >= (scrollHeight - 6);
                    const touchDist = (e.changedTouches && e.changedTouches[0]) ? (e.changedTouches[0].clientY - touchStartY) : 0;

                    if ((isAtTop && touchDist > 140) || (isAtBottom && touchDist < -140)) {
                        triggerSmoothMinimize();
                    } else {
                        resetDrawerTransform();
                    }
                }, { passive: true });
            }

            // Scrolling on the modal backdrop also closes
            if (this.modal) {
                this.modal.addEventListener('wheel', (e) => {
                    if (e.target === this.modal && Date.now() - (this.openedAt || 0) > 350 && !isTransitioningOut) {
                        triggerSmoothMinimize();
                    }
                }, { passive: true });
            }

            const cards = document.querySelectorAll('.project-editorial-card');
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    const key = card.getAttribute('data-project');
                    if (key) this.open(key);
                });
            });
        }

        open(key) {
            const data = PROJECT_DATA[key];
            if (!data) return;

            this.openedAt = Date.now();
            if (this.drawer) {
                this.drawer.scrollTop = 0;
            }

            this.titleEl.textContent = data.title;
            this.categoryEl.textContent = data.category;
            this.clientEl.textContent = data.client;
            this.roleEl.textContent = data.role;
            this.timelineEl.textContent = data.timeline;
            this.deliverablesEl.textContent = data.deliverables;
            this.imgEl.src = (key === 'batball') ? 'images/batball11-dashboard.jpg' : data.img;
            this.solutionEl.textContent = data.solution;

            this.tagsEl.innerHTML = '';
            data.tags.forEach(t => {
                const span = document.createElement('span');
                span.className = 'project-tag';
                span.setAttribute('data-cursor', 'SKILL');
                span.textContent = t;
                this.tagsEl.appendChild(span);
            });

            if (typeof cursorController !== 'undefined' && cursorController && cursorController.bindHoverElements) {
                cursorController.bindHoverElements();
            }

            this.modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            sound.playModalOpen();
        }

        close() {
            if (this.drawer) {
                this.drawer.style.transition = '';
                this.drawer.style.transform = '';
            }
            if (this.modal) {
                this.modal.style.transition = '';
                this.modal.style.opacity = '';
                this.modal.classList.remove('open');
            }
            document.body.style.overflow = '';
            sound.playModalClose();
        }
    }

    const modalController = new ModalController();

    /* ==========================================================================
       8. VIEW SWITCHER (3D SPATIAL FLOW VS EDITORIAL GRID)
       ========================================================================== */
    const btnSpatial = document.getElementById('btn-view-spatial');
    const btnGrid = document.getElementById('btn-view-grid');
    const editorialGrid = document.getElementById('editorial-grid');

    if (btnSpatial && btnGrid) {
        btnSpatial.addEventListener('click', () => {
            btnSpatial.classList.add('active');
            btnGrid.classList.remove('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sound.playClick();
        });

        btnGrid.addEventListener('click', () => {
            btnGrid.classList.add('active');
            btnSpatial.classList.remove('active');
            const workSec = document.getElementById('work');
            if (workSec) {
                workSec.scrollIntoView({ behavior: 'smooth' });
            }
            sound.playClick();
        });
    }

    /* ==========================================================================
       9. EMAIL COPY TO CLIPBOARD & TOAST NOTICE
       ========================================================================== */
    const copyEmailBtn = document.getElementById('btn-copy-email');
    const toastNotice = document.getElementById('toast-notice');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'yasheshbhavsar61@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                sound.playClick();
                if (toastNotice) {
                    toastNotice.classList.add('show');
                    setTimeout(() => {
                        toastNotice.classList.remove('show');
                    }, 2800);
                }
            });
        });
    }

    /* ==========================================================================
       10. SIGNATURE BOTTOM NAV ACTIVE LINK TRACKER
       ========================================================================== */
    const navLinks = document.querySelectorAll('.nav-editorial-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSec = 'work';
        const scrollY = window.pageYOffset;

        sections.forEach(sec => {
            const secTop = sec.offsetTop - 300;
            const secHeight = sec.clientHeight;
            if (scrollY >= secTop && scrollY < secTop + secHeight) {
                currentSec = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSec}`) {
                link.classList.add('active');
            }
        });
    });

    console.log('✨ Yashesh Bhavsar Luxury Editorial Experience initialized with Sound, Spatial 3D Engine & Light/Dark Theming');
});
