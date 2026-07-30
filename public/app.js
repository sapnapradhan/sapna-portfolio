/* ==========================================================================
   SAPNA PRADHAN PORTFOLIO ENGINE & INTERACTIVE THREE.JS WEBGL OPERATING SYSTEM
   ========================================================================== */

(function() {
  'use strict';

  // State Management
  const state = {
    audioMuted: false,
    aiAssistantOpen: false,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    typingIndex: 0,
    typingText: ["Full Stack Developer", "AI Engineer", "Backend Developer", "Problem Solver", "Tech Enthusiast", "Innovator"],
    typingWordIndex: 0,
    typingCharIndex: 0,
    isDeleting: false
  };

  // Audio FX Synthesizer (Web Audio API)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  function playSound(type) {
    if (state.audioMuted) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      const now = audioCtx.currentTime;
      if (type === 'boot') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.5);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'click') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch(e) {}
  }

  // ==========================================================================
  // CUSTOM CURSOR
  // ==========================================================================
  function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
      posX = e.clientX;
      posY = e.clientY;
      state.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      state.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      cursor.style.left = `${posX}px`;
      cursor.style.top = `${posY}px`;
    });

    function renderCursor() {
      followerX += (posX - followerX) * 0.2;
      followerY += (posY - followerY) * 0.2;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverables = document.querySelectorAll('a, button, input, textarea, .netflix-movie-card, .hologram-card-stage, .suggest-pill, .gallery-card');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        playSound('hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
      el.addEventListener('click', () => {
        playSound('click');
      });
    });
  }

  // ==========================================================================
  // CINEMATIC BOOT SEQUENCE
  // ==========================================================================
  function initBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const logText = document.getElementById('boot-log-text');
    const fill = document.getElementById('boot-progress-fill');
    if (!bootScreen) return;

    const logs = [
      "INITIALIZING AI OS CORE...",
      "LOADING PROFILE: SAPNA PRADHAN...",
      "CONNECTING DATABASE & SUPABASE...",
      "LOADING PROJECTS & REPOSITORIES...",
      "SCANNING SKILLS & 3D GALAXY...",
      "AUTHENTICATION SUCCESSFUL.",
      "WELCOME TO SAPNA AI OS."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        logText.textContent = logs[currentLog];
        fill.style.width = `${((currentLog + 1) / logs.length) * 100}%`;
        playSound('boot');
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          bootScreen.style.opacity = '0';
          bootScreen.style.visibility = 'hidden';
          setTimeout(() => bootScreen.remove(), 1200);
        }, 600);
      }
    }, 450);
  }

  // ==========================================================================
  // THREE.JS BACKGROUND CANVAS & PARTICLES
  // ==========================================================================
  function initThreeBackground() {
    const container = document.getElementById('webgl-bg');
    if (!container || !window.THREE) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.0015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Cloud
    const particleCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xE50914); // Netflix Red
    const color2 = new THREE.Color(0x00F0FF); // Cyan Electric

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1600;

      const mix = Math.random();
      const mixedColor = color1.clone().lerp(color2, mix);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Floating Cubes Grid
    const cubeGroup = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(15, 15, 15);
    const cubeMat = new THREE.MeshBasicMaterial({ color: 0x00F0FF, wireframe: true, transparent: true, opacity: 0.15 });

    for (let i = 0; i < 35; i++) {
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set((Math.random() - 0.5) * 1200, (Math.random() - 0.5) * 1200, (Math.random() - 0.5) * 1000);
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      cubeGroup.add(cube);
    }
    scene.add(cubeGroup);

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;

      cubeGroup.children.forEach(cube => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
      });

      camera.position.x += (state.mouse.targetX * 50 - camera.position.x) * 0.05;
      camera.position.y += (-state.mouse.targetY * 50 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ==========================================================================
  // 3D HOLOGRAM AVATAR STAGE
  // ==========================================================================
  function initHologramAvatar() {
    const container = document.getElementById('hologram-canvas-container');
    if (!container || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Hologram Avatar Head Mesh (Synthesized Sphere/Head Grid with Face Texture)
    const headGroup = new THREE.Group();

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const avatarTexture = textureLoader.load('/assets/hologram_avatar.jpg');

    const faceGeo = new THREE.PlaneGeometry(3.2, 3.8, 32, 32);
    const faceMat = new THREE.MeshBasicMaterial({
      map: avatarTexture,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    headGroup.add(faceMesh);

    // Holographic Energy Rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00F0FF, wireframe: true, transparent: true, opacity: 0.7 });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 2;
    headGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xE50914, wireframe: true, transparent: true, opacity: 0.5 }));
    ringMesh2.rotation.x = Math.PI / 2.4;
    headGroup.add(ringMesh2);

    // Particle Aura around Face
    const auraCount = 600;
    const auraGeo = new THREE.BufferGeometry();
    const auraPos = new Float32Array(auraCount * 3);
    for (let i = 0; i < auraCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI;
      const r = 2.2 + Math.random() * 0.4;
      auraPos[i * 3] = r * Math.sin(v) * Math.cos(u);
      auraPos[i * 3 + 1] = r * Math.sin(v) * Math.sin(u);
      auraPos[i * 3 + 2] = r * Math.cos(v);
    }
    auraGeo.setAttribute('position', new THREE.BufferAttribute(auraPos, 3));
    const auraMat = new THREE.PointsMaterial({ size: 0.04, color: 0x00F0FF, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const auraPoints = new THREE.Points(auraGeo, auraMat);
    headGroup.add(auraPoints);

    scene.add(headGroup);

    // Click Dissolve Animation Handler
    const stageCard = document.querySelector('.hologram-card-stage');
    let isDissolving = false;

    stageCard?.addEventListener('click', () => {
      if (isDissolving) return;
      isDissolving = true;
      playSound('click');
      let scale = 1;
      let opacity = 0.85;

      const dissolveInterval = setInterval(() => {
        scale *= 1.05;
        opacity -= 0.08;
        headGroup.scale.set(scale, scale, scale);
        faceMat.opacity = Math.max(0, opacity);

        if (opacity <= 0) {
          clearInterval(dissolveInterval);
          setTimeout(() => {
            headGroup.scale.set(1, 1, 1);
            faceMat.opacity = 0.85;
            isDissolving = false;
          }, 300);
        }
      }, 30);
    });

    // Render loop with breathing & mouse follow
    let clock = new THREE.Clock();
    function animateHologram() {
      requestAnimationFrame(animateHologram);
      const elapsedTime = clock.getElapsedTime();

      // Breathing effect
      headGroup.position.y = Math.sin(elapsedTime * 2) * 0.08;
      ringMesh1.rotation.z += 0.01;
      ringMesh2.rotation.z -= 0.015;
      auraPoints.rotation.y += 0.005;

      // Mouse tracking (10-15 degree face turn)
      const targetRotY = state.mouse.targetX * 0.35;
      const targetRotX = -state.mouse.targetY * 0.25;

      headGroup.rotation.y += (targetRotY - headGroup.rotation.y) * 0.1;
      headGroup.rotation.x += (targetRotX - headGroup.rotation.x) * 0.1;

      renderer.render(scene, camera);
    }
    animateHologram();

    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  // ==========================================================================
  // 3D SKILL GALAXY ENGINE
  // ==========================================================================
  function initSkillGalaxy() {
    const container = document.getElementById('skill-canvas');
    if (!container || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const skills = [
      { name: "React.js / Next.js", category: "Frontend", level: "95%", color: 0x00F0FF, pos: [-4, 3, 0] },
      { name: "Python / Django", category: "Backend", level: "92%", color: 0xE50914, pos: [4, 2, -2] },
      { name: "PostgreSQL / Supabase", category: "Database", level: "90%", color: 0x0072FF, pos: [-3, -3, 1] },
      { name: "Java / Core CS", category: "Languages", level: "88%", color: 0xFFD700, pos: [3, -3, -1] },
      { name: "TypeScript / JS", category: "Languages", level: "94%", color: 0x3178C6, pos: [0, 4, -3] },
      { name: "Web3 / Blockchain", category: "Emerging Tech", level: "85%", color: 0x9945FF, pos: [0, -4, 2] },
      { name: "Tailwind / Three.js", category: "UI/UX & WebGL", level: "90%", color: 0x06B6D4, pos: [5, 0, 1] }
    ];

    const planetGroup = new THREE.Group();
    const planetMeshes = [];

    skills.forEach(skill => {
      const geo = new THREE.SphereGeometry(0.85, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: skill.color,
        roughness: 0.3,
        metalness: 0.8,
        emissive: skill.color,
        emissiveIntensity: 0.4
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...skill.pos);
      mesh.userData = skill;
      planetGroup.add(mesh);
      planetMeshes.push(mesh);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const pointLight = new THREE.PointLight(0x00F0FF, 2, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(ambientLight, pointLight, planetGroup);

    // Raycaster for hover
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();
    const overlay = document.getElementById('skill-info-overlay');

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(planetMeshes);

      if (intersects.length > 0) {
        const target = intersects[0].object;
        target.scale.set(1.3, 1.3, 1.3);
        if (overlay) {
          overlay.querySelector('.skill-name').textContent = target.userData.name;
          overlay.querySelector('.skill-category').textContent = target.userData.category;
          overlay.querySelector('.skill-level').textContent = `Proficiency: ${target.userData.level}`;
          overlay.classList.add('active');
        }
      } else {
        planetMeshes.forEach(p => p.scale.set(1, 1, 1));
        if (overlay) overlay.classList.remove('active');
      }
    });

    function animateGalaxy() {
      requestAnimationFrame(animateGalaxy);
      planetGroup.rotation.y += 0.003;
      renderer.render(scene, camera);
    }
    animateGalaxy();
  }

  // ==========================================================================
  // TYPING ANIMATION IN HERO
  // ==========================================================================
  function initTypingAnimation() {
    const target = document.getElementById('hero-typing-target');
    if (!target) return;

    function type() {
      const currentWord = state.typingText[state.typingWordIndex];
      if (state.isDeleting) {
        state.typingCharIndex--;
      } else {
        state.typingCharIndex++;
      }

      target.textContent = currentWord.substring(0, state.typingCharIndex);

      let speed = state.isDeleting ? 50 : 100;
      if (!state.isDeleting && state.typingCharIndex === currentWord.length) {
        speed = 2000;
        state.isDeleting = true;
      } else if (state.isDeleting && state.typingCharIndex === 0) {
        state.isDeleting = false;
        state.typingWordIndex = (state.typingWordIndex + 1) % state.typingText.length;
        speed = 500;
      }
      setTimeout(type, speed);
    }
    type();
  }

  // ==========================================================================
  // JARVIS AI ASSISTANT CHAT LOGIC
  // ==========================================================================
  function initAiAssistant() {
    const toggleBtn = document.getElementById('ai-assistant-toggle');
    const modal = document.getElementById('ai-assistant-modal');
    const closeBtn = document.getElementById('ai-assistant-close');
    const sendBtn = document.getElementById('ai-send-btn');
    const inputField = document.getElementById('ai-chat-input');
    const chatBody = document.getElementById('ai-chat-body');

    if (!toggleBtn || !modal) return;

    toggleBtn.addEventListener('click', () => {
      state.aiAssistantOpen = !state.aiAssistantOpen;
      modal.classList.toggle('active', state.aiAssistantOpen);
      playSound('click');
    });

    closeBtn?.addEventListener('click', () => {
      state.aiAssistantOpen = false;
      modal.classList.remove('active');
    });

    function sendMessage(text) {
      const userText = text || inputField?.value.trim();
      if (!userText || !chatBody) return;

      // Append User Bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble chat-bubble-user';
      userBubble.textContent = userText;
      chatBody.appendChild(userBubble);
      if (inputField) inputField.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;

      // Simulated AI Thinking
      const thinkingBubble = document.createElement('div');
      thinkingBubble.className = 'chat-bubble chat-bubble-ai';
      thinkingBubble.textContent = "Processing neural response...";
      chatBody.appendChild(thinkingBubble);
      chatBody.scrollTop = chatBody.scrollHeight;

      fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText })
      })
      .then(res => res.json())
      .then(data => {
        thinkingBubble.textContent = data.answer;
        chatBody.scrollTop = chatBody.scrollHeight;
        playSound('hover');
      })
      .catch(() => {
        // Fallback responses
        const q = userText.toLowerCase();
        let fallback = "Sapna is a Full Stack Developer & AI Engineer proficient in React, Next.js, Python, Django, Supabase, and PostgreSQL!";
        if (q.includes('bccl') || q.includes('experience')) fallback = "Sapna served as a System Intern at BCCL, building a full-stack Employee Management System with React and Supabase.";
        if (q.includes('education')) fallback = "Sapna holds a 8.43/10 CGPA in Computer Science & Engineering at ITER, SOA University.";
        thinkingBubble.textContent = fallback;
        chatBody.scrollTop = chatBody.scrollHeight;
      });
    }

    sendBtn?.addEventListener('click', () => sendMessage());
    inputField?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    document.querySelectorAll('.suggest-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        sendMessage(pill.textContent);
      });
    });
  }

  // ==========================================================================
  // AI RESUME ANALYZER TOOL
  // ==========================================================================
  function initResumeAnalyzer() {
    const analyzeBtn = document.getElementById('analyze-resume-btn');
    const jdInput = document.getElementById('jd-input');
    const scoreVal = document.getElementById('match-score-val');
    const matchDetails = document.getElementById('match-details');

    if (!analyzeBtn || !jdInput) return;

    analyzeBtn.addEventListener('click', () => {
      const text = jdInput.value.trim().toLowerCase();
      if (!text) return;

      playSound('click');
      let score = 85;
      let matches = [];

      if (text.includes('react') || text.includes('frontend')) { score += 4; matches.push("React.js & Next.js Expertise"); }
      if (text.includes('python') || text.includes('django') || text.includes('backend')) { score += 4; matches.push("Python & Django REST Framework"); }
      if (text.includes('sql') || text.includes('postgres') || text.includes('database')) { score += 3; matches.push("PostgreSQL & Supabase RLS"); }
      if (text.includes('ai') || text.includes('full stack')) { score += 4; matches.push("Full Stack & AI Systems Architecture"); }

      score = Math.min(99, score);
      if (scoreVal) scoreVal.textContent = `${score}%`;
      if (matchDetails) {
        matchDetails.innerHTML = `<strong>Top Matching Qualifications:</strong><br/>` + matches.map(m => `✔ ${m}`).join('<br/>');
      }
    });
  }

  // ==========================================================================
  // CLOCK & WEATHER WIDGET
  // ==========================================================================
  function initLiveWidgets() {
    const clockEl = document.getElementById('live-utc-clock');
    if (!clockEl) return;

    function updateClock() {
      const now = new Date();
      clockEl.textContent = `${now.toISOString().substring(11, 19)} UTC | ${now.toLocaleTimeString()}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
  }

  // Initializer
  window.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initBootSequence();
    initThreeBackground();
    initHologramAvatar();
    initSkillGalaxy();
    initTypingAnimation();
    initAiAssistant();
    initResumeAnalyzer();
    initLiveWidgets();

    // Audio Mute Toggle
    const audioBtn = document.getElementById('audio-toggle-btn');
    audioBtn?.addEventListener('click', () => {
      state.audioMuted = !state.audioMuted;
      audioBtn.innerHTML = state.audioMuted ? '🔇' : '🔊';
      playSound('click');
    });
  });

})();
