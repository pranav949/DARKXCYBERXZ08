document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DARKXCYBERXZ08 // CORE SYSTEM
    ===================================================== */

    "use strict";


    /* =====================================================
       SUPABASE CONFIG
    ===================================================== */

    const SUPABASE_URL =
        "https://psvtztjxgsothlyhyspr.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_m0kCKzljY5jiV8mB6NgQ1w_taOYxbXA";

    let supabaseClient = null;


    /* =====================================================
       DOM HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];


    /* =====================================================
       SUPABASE LOADER
    ===================================================== */

    function loadSupabase() {

        return new Promise((resolve, reject) => {

            if (window.supabase) {

                try {

                    supabaseClient =
                        window.supabase.createClient(
                            SUPABASE_URL,
                            SUPABASE_KEY
                        );

                    resolve();

                } catch (error) {

                    reject(error);

                }

                return;
            }


            const existingScript =
                document.querySelector(
                    'script[data-supabase-loader="true"]'
                );


            if (existingScript) {

                existingScript.addEventListener(
                    "load",
                    () => {

                        try {

                            supabaseClient =
                                window.supabase.createClient(
                                    SUPABASE_URL,
                                    SUPABASE_KEY
                                );

                            resolve();

                        } catch (error) {

                            reject(error);

                        }

                    }
                );

                existingScript.addEventListener(
                    "error",
                    () => {

                        reject(
                            new Error(
                                "Supabase library failed to load."
                            )
                        );

                    }
                );

                return;
            }


            const script =
                document.createElement("script");

            script.src =
                "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

            script.async = true;

            script.dataset.supabaseLoader =
                "true";


            script.onload = () => {

                try {

                    supabaseClient =
                        window.supabase.createClient(
                            SUPABASE_URL,
                            SUPABASE_KEY
                        );

                    resolve();

                } catch (error) {

                    reject(error);

                }

            };


            script.onerror = () => {

                reject(
                    new Error(
                        "Supabase library failed to load."
                    )
                );

            };


            document.head.appendChild(script);

        });

    }


    /* =====================================================
       BOOT SYSTEM
    ===================================================== */

    const bootScreen =
        $("#boot-screen");

    const mainSite =
        $("#main-site");

    const progressBar =
        $("#boot-progress-bar");


    let bootProgress = 0;


    function runBootSequence() {

        if (!bootScreen || !mainSite) {

            initThreeEnvironment();

            return;

        }


        const bootInterval =
            setInterval(() => {

                bootProgress +=
                    Math.floor(
                        Math.random() * 8
                    ) + 3;


                if (bootProgress >= 100) {

                    bootProgress = 100;

                }


                if (progressBar) {

                    progressBar.style.width =
                        `${bootProgress}%`;

                }


                if (bootProgress >= 100) {

                    clearInterval(
                        bootInterval
                    );


                    setTimeout(() => {

                        bootScreen.classList.add(
                            "hidden"
                        );

                        mainSite.classList.add(
                            "visible"
                        );


                        initThreeEnvironment();

                    }, 650);

                }

            }, 150);

    }


    /* =====================================================
       THREE.JS CYBER ENVIRONMENT
    ===================================================== */

    function initThreeEnvironment() {

        if (
            typeof THREE === "undefined"
        ) {

            console.warn(
                "Three.js unavailable."
            );

            return;

        }


        const container =
            $("#cyber-environment");


        if (!container) return;


        if (
            container.dataset.initialized ===
            "true"
        ) {

            return;

        }


        container.dataset.initialized =
            "true";


        /* =================================================
           SCENE
        ================================================= */

        const scene =
            new THREE.Scene();


        scene.fog =
            new THREE.FogExp2(
                0x020309,
                0.028
            );


        /* =================================================
           CAMERA
        ================================================= */

        const camera =
            new THREE.PerspectiveCamera(
                55,
                window.innerWidth /
                window.innerHeight,
                0.1,
                200
            );


        camera.position.set(
            0,
            1,
            15
        );


        /* =================================================
           RENDERER
        ================================================= */

        const renderer =
            new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference:
                    "high-performance"
            });


        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                2
            )
        );


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        if (THREE.sRGBEncoding) {

            renderer.outputEncoding =
                THREE.sRGBEncoding;

        }


        container.appendChild(
            renderer.domElement
        );


        /* =================================================
           WORLD
        ================================================= */

        const world =
            new THREE.Group();


        scene.add(world);


        /* =================================================
           GLOBE
        ================================================= */

        const globeGroup =
            new THREE.Group();


        globeGroup.scale.setScalar(
            0.88
        );


        globeGroup.position.set(
            3.0,
            0.05,
            0
        );


        world.add(
            globeGroup
        );


        /* =================================================
           MAIN CORE
        ================================================= */

        const coreGeometry =
            new THREE.IcosahedronGeometry(
                3.1,
                2
            );


        const coreMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x00e5ff,
                wireframe: true,
                transparent: true,
                opacity: 0.24
            });


        const core =
            new THREE.Mesh(
                coreGeometry,
                coreMaterial
            );


        globeGroup.add(
            core
        );


        /* =================================================
           INNER CORE
        ================================================= */

        const innerGeometry =
            new THREE.IcosahedronGeometry(
                1.25,
                2
            );


        const innerMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x00e5ff,
                wireframe: true,
                transparent: true,
                opacity: 0.55
            });


        const innerCore =
            new THREE.Mesh(
                innerGeometry,
                innerMaterial
            );


        globeGroup.add(
            innerCore
        );


        /* =================================================
           CYAN RING
        ================================================= */

        const ringGeometry =
            new THREE.TorusGeometry(
                4.2,
                0.014,
                8,
                160
            );


        const ringMaterial =
            new THREE.MeshBasicMaterial({
                color: 0x00e5ff,
                transparent: true,
                opacity: 0.42
            });


        const ring =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );


        ring.rotation.x =
            Math.PI / 2.5;


        globeGroup.add(
            ring
        );


        /* =================================================
           MAGENTA RING
        ================================================= */

        const ring2Geometry =
            new THREE.TorusGeometry(
                5.3,
                0.009,
                8,
                160
            );


        const ring2Material =
            new THREE.MeshBasicMaterial({
                color: 0xff2daa,
                transparent: true,
                opacity: 0.28
            });


        const ring2 =
            new THREE.Mesh(
                ring2Geometry,
                ring2Material
            );


        ring2.rotation.y =
            Math.PI / 2.2;


        globeGroup.add(
            ring2
        );


        /* =================================================
           SCAN RINGS
        ================================================= */

        const scanGroup =
            new THREE.Group();


        for (
            let i = -4;
            i <= 4;
            i++
        ) {

            const size =
                Math.abs(i) * 0.8 + 1;


            const geometry =
                new THREE.RingGeometry(
                    size,
                    size + 0.008,
                    96
                );


            const material =
                new THREE.MeshBasicMaterial({
                    color: 0x00e5ff,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity:
                        0.025 +
                        Math.random() * 0.035
                });


            const scan =
                new THREE.Mesh(
                    geometry,
                    material
                );


            scan.rotation.x =
                Math.PI / 2;


            scan.position.y =
                i * 0.55;


            scanGroup.add(
                scan
            );

        }


        globeGroup.add(
            scanGroup
        );


        /* =================================================
           PARTICLES
        ================================================= */

        const particleCount =
            window.innerWidth < 700
                ? 700
                : 1800;


        const particlePositions =
            new Float32Array(
                particleCount * 3
            );


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const radius =
                7 +
                Math.random() * 35;


            const theta =
                Math.random() *
                Math.PI * 2;


            const phi =
                Math.acos(
                    Math.random() * 2 - 1
                );


            particlePositions[
                i * 3
            ] =
                radius *
                Math.sin(phi) *
                Math.cos(theta);


            particlePositions[
                i * 3 + 1
            ] =
                radius *
                Math.sin(phi) *
                Math.sin(theta);


            particlePositions[
                i * 3 + 2
            ] =
                radius *
                Math.cos(phi);

        }


        const particleGeometry =
            new THREE.BufferGeometry();


        particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                particlePositions,
                3
            )
        );


        const particleMaterial =
            new THREE.PointsMaterial({
                color: 0x00e5ff,
                size:
                    window.innerWidth < 700
                        ? 0.028
                        : 0.035,
                transparent: true,
                opacity: 0.55,
                depthWrite: false
            });


        const particles =
            new THREE.Points(
                particleGeometry,
                particleMaterial
            );


        world.add(
            particles
        );


        /* =================================================
           NETWORK NODES
        ================================================= */

        const nodeCount =
            window.innerWidth < 700
                ? 35
                : 80;


        const nodes = [];


        for (
            let i = 0;
            i < nodeCount;
            i++
        ) {

            const geometry =
                new THREE.SphereGeometry(
                    0.025 +
                    Math.random() * 0.035,
                    8,
                    8
                );


            const nodeMaterial =
                new THREE.MeshBasicMaterial({
                    color:
                        Math.random() > 0.82
                            ? 0xff2daa
                            : 0x00e5ff
                });


            const node =
                new THREE.Mesh(
                    geometry,
                    nodeMaterial
                );


            node.position.set(
                (Math.random() - 0.5) * 17,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 12
            );


            world.add(
                node
            );


            nodes.push(
                node
            );

        }


        /* =================================================
           NETWORK CONNECTIONS
        ================================================= */

        for (
            let i = 0;
            i < nodes.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < nodes.length;
                j++
            ) {

                const distance =
                    nodes[i]
                        .position
                        .distanceTo(
                            nodes[j].position
                        );


                if (
                    distance < 3.5
                ) {

                    const geometry =
                        new THREE.BufferGeometry()
                            .setFromPoints([
                                nodes[i].position,
                                nodes[j].position
                            ]);


                    const material =
                        new THREE.LineBasicMaterial({
                            color: 0x00e5ff,
                            transparent: true,
                            opacity: 0.075
                        });


                    const line =
                        new THREE.Line(
                            geometry,
                            material
                        );


                    world.add(
                        line
                    );

                }

            }

        }


        /* =================================================
           POINTER
        ================================================= */

        let mouseX = 0;
        let mouseY = 0;

        let targetX = 0;
        let targetY = 0;


        function updatePointer(
            clientX,
            clientY
        ) {

            targetX =
                clientX /
                window.innerWidth -
                0.5;


            targetY =
                clientY /
                window.innerHeight -
                0.5;

        }


        window.addEventListener(
            "mousemove",
            (event) => {

                updatePointer(
                    event.clientX,
                    event.clientY
                );

            },
            {
                passive: true
            }
        );


        window.addEventListener(
            "touchmove",
            (event) => {

                if (
                    !event.touches.length
                ) {

                    return;

                }


                updatePointer(
                    event.touches[0].clientX,
                    event.touches[0].clientY
                );

            },
            {
                passive: true
            }
        );


        /* =================================================
           ANIMATION
        ================================================= */

        const clock =
            new THREE.Clock();


        function animate() {

            requestAnimationFrame(
                animate
            );


            const elapsed =
                clock.getElapsedTime();


            mouseX +=
                (
                    targetX -
                    mouseX
                ) * 0.025;


            mouseY +=
                (
                    targetY -
                    mouseY
                ) * 0.025;


            camera.position.x =
                mouseX * 1.2;


            camera.position.y =
                1 -
                mouseY * 0.8;


            camera.lookAt(
                0,
                0,
                0
            );


            /* CORE */

            core.rotation.x =
                elapsed * 0.08;


            core.rotation.y =
                elapsed * 0.12;


            core.rotation.z =
                elapsed * 0.035;


            /* INNER */

            innerCore.rotation.x =
                -elapsed * 0.16;


            innerCore.rotation.y =
                elapsed * 0.2;


            /* RINGS */

            ring.rotation.z =
                elapsed * 0.08;


            ring.rotation.x =
                Math.PI / 2.5 +
                Math.sin(
                    elapsed * 0.3
                ) * 0.12;


            ring2.rotation.x =
                elapsed * 0.055;


            ring2.rotation.y =
                Math.PI / 2.2 +
                Math.cos(
                    elapsed * 0.25
                ) * 0.1;


            /* SCAN */

            scanGroup.rotation.z =
                Math.sin(
                    elapsed * 0.18
                ) * 0.08;


            /* PARTICLES */

            particles.rotation.y =
                elapsed * 0.012;


            particles.rotation.x =
                Math.sin(
                    elapsed * 0.08
                ) * 0.04;


            /* NODES */

            nodes.forEach(
                (node, index) => {

                    node.position.y +=
                        Math.sin(
                            elapsed * 0.25 +
                            index
                        ) * 0.0007;

                }
            );


            /* WORLD */

            world.rotation.y +=
                (
                    mouseX * 0.045 -
                    world.rotation.y
                ) * 0.01;


            world.rotation.x +=
                (
                    -mouseY * 0.025 -
                    world.rotation.x
                ) * 0.01;


            renderer.render(
                scene,
                camera
            );

        }


        animate();


        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            () => {

                camera.aspect =
                    window.innerWidth /
                    window.innerHeight;


                camera.updateProjectionMatrix();


                renderer.setSize(
                    window.innerWidth,
                    window.innerHeight
                );


                renderer.setPixelRatio(
                    Math.min(
                        window.devicePixelRatio || 1,
                        2
                    )
                );

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        $$("section[id]");


    const navLinks =
        $$(".nav-links a");


    if (
        sections.length &&
        navLinks.length
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            navLinks.forEach(
                                (link) => {

                                    link.classList.remove(
                                        "active"
                                    );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${entry.target.id}`
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        }
                    );

                },
                {
                    threshold: 0.45
                }
            );


        sections.forEach(
            (section) => {

                observer.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       BUTTON MICRO INTERACTION
    ===================================================== */

    $$(".btn-primary, .btn-secondary")
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        button.style.transform =
                            "translateY(1px)";


                        setTimeout(
                            () => {

                                button.style.transform =
                                    "";

                            },
                            120
                        );

                    }
                );

            }
        );


    /* =====================================================
       MAGNETIC EFFECT
    ===================================================== */

    function initMagneticElements() {

        const elements =
            $$(".magnetic");


        if (
            window.matchMedia(
                "(pointer: coarse)"
            ).matches
        ) {

            return;

        }


        elements.forEach(
            (element) => {

                element.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            element.getBoundingClientRect();


                        const x =
                            event.clientX -
                            (
                                rect.left +
                                rect.width / 2
                            );


                        const y =
                            event.clientY -
                            (
                                rect.top +
                                rect.height / 2
                            );


                        element.style.transform =
                            `translate(${x * 0.12}px, ${y * 0.12}px)`;

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.style.transform =
                            "";

                    }
                );

            }
        );

    }


    initMagneticElements();


    /* =====================================================
       AUTH UI CSS
    ===================================================== */

    function injectAuthStyles() {

        if (
            $("#darkx-auth-runtime-style")
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "darkx-auth-runtime-style";


        style.textContent = `

            .oauth-divider {
                display: flex;
                align-items: center;
                gap: 12px;
                margin: 22px 0 15px;
                color: rgba(225, 250, 255, 0.25);
                font-size: 8px;
                letter-spacing: 0.12em;
            }

            .oauth-divider::before,
            .oauth-divider::after {
                content: "";
                flex: 1;
                height: 1px;
                background:
                    rgba(0, 229, 255, 0.10);
            }

            .oauth-button {
                width: 100%;
                min-height: 46px;
                border:
                    1px solid rgba(225, 250, 255, 0.18);
                background:
                    rgba(255, 255, 255, 0.025);
                color:
                    rgba(235, 250, 255, 0.75);
                cursor: pointer;
                font-family:
                    "Courier New",
                    Courier,
                    monospace;
                font-size: 10px;
                letter-spacing: 0.12em;
                transition:
                    background 0.2s ease,
                    color 0.2s ease,
                    border-color 0.2s ease,
                    box-shadow 0.2s ease,
                    transform 0.2s ease;
            }

            .oauth-button + .oauth-button {
                margin-top: 10px;
            }

            .oauth-button:hover {
                background:
                    rgba(255, 255, 255, 0.08);
                color: #ffffff;
                border-color:
                    rgba(255, 255, 255, 0.45);
                box-shadow:
                    0 0 20px
                    rgba(255, 255, 255, 0.06);
            }

            .oauth-button:active {
                transform:
                    translateY(1px);
            }

            .oauth-button:disabled {
                opacity: 0.45;
                cursor: wait;
            }

            .google-button {
                border-color:
                    rgba(255, 255, 255, 0.18);
            }

            .auth-loading {
                opacity: 0.55;
                pointer-events: none;
            }

            .user-panel {
                animation:
                    darkxAccessIn 0.45s ease both;
            }

            @keyframes darkxAccessIn {

                from {
                    opacity: 0;
                    transform:
                        translateY(8px);
                }

                to {
                    opacity: 1;
                    transform:
                        translateY(0);
                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =====================================================
       AUTH INITIALIZATION
    ===================================================== */

    async function initAuth() {

        const authContainer =
            $("#auth-container");


        if (!authContainer) {

            return;

        }


        injectAuthStyles();


        try {

            await loadSupabase();

            renderAuthUI();

            await checkCurrentUser();

            setupAuthListener();


        } catch (error) {

            console.error(
                "AUTH INITIALIZATION ERROR:",
                error
            );


            authContainer.innerHTML = `
                <div class="auth-error">
                    AUTH SYSTEM OFFLINE
                </div>
            `;

        }

    }


    /* =====================================================
       AUTH UI
    ===================================================== */

    function renderAuthUI() {

        const authContainer =
            $("#auth-container");


        if (!authContainer) {

            return;

        }


        authContainer.innerHTML = `

            <div class="auth-panel">

                <div class="auth-header">
                    DARKX // SECURE ACCESS
                </div>


                <div class="auth-tabs">

                    <button
                        type="button"
                        id="login-tab"
                        class="auth-tab active"
                    >
                        LOGIN
                    </button>

                    <button
                        type="button"
                        id="signup-tab"
                        class="auth-tab"
                    >
                        SIGN UP
                    </button>

                </div>


                <form
                    id="auth-form"
                    class="auth-form"
                >

                    <label for="auth-email">
                        EMAIL
                    </label>

                    <input
                        id="auth-email"
                        type="email"
                        autocomplete="email"
                        placeholder="user@darkx.local"
                        required
                    >


                    <label for="auth-password">
                        PASSWORD
                    </label>

                    <input
                        id="auth-password"
                        type="password"
                        autocomplete="current-password"
                        placeholder="••••••••"
                        minlength="6"
                        required
                    >


                    <button
                        type="submit"
                        id="auth-submit"
                        class="auth-submit"
                    >
                        INITIALIZE LOGIN
                    </button>

                </form>


                <div class="oauth-divider">
                    <span>
                        OR CONTINUE WITH
                    </span>
                </div>


                <button
                    type="button"
                    id="github-login"
                    class="oauth-button"
                >
                    ◉ CONTINUE WITH GITHUB
                </button>


                <button
                    type="button"
                    id="google-login"
                    class="oauth-button google-button"
                >
                    G CONTINUE WITH GOOGLE
                </button>


                <div
                    id="auth-message"
                    class="auth-message"
                    aria-live="polite"
                ></div>


                <div
                    id="user-panel"
                    class="user-panel"
                    hidden
                >

                    <div class="user-status">
                        ACCESS GRANTED
                    </div>


                    <div
                        id="user-email"
                        class="user-email"
                    ></div>


                    <button
                        type="button"
                        id="logout-button"
                        class="auth-submit"
                    >
                        TERMINATE SESSION
                    </button>

                </div>

            </div>

        `;


        setupAuthControls();

    }


    /* =====================================================
       AUTH CONTROLS
    ===================================================== */

    function setupAuthControls() {

        const loginTab =
            $("#login-tab");


        const signupTab =
            $("#signup-tab");


        const authForm =
            $("#auth-form");


        let mode =
            "login";


        function setMode(
            newMode
        ) {

            mode =
                newMode;


            loginTab?.classList.toggle(
                "active",
                mode === "login"
            );


            signupTab?.classList.toggle(
                "active",
                mode === "signup"
            );


            const submit =
                $("#auth-submit");


            if (submit) {

                submit.textContent =
                    mode === "login"
                        ? "INITIALIZE LOGIN"
                        : "CREATE ACCESS ID";

            }


            clearAuthMessage();

        }


        loginTab?.addEventListener(
            "click",
            () => {

                setMode(
                    "login"
                );

            }
        );


        signupTab?.addEventListener(
            "click",
            () => {

                setMode(
                    "signup"
                );

            }
        );


        /* =================================================
           EMAIL AUTH
        ================================================= */

        authForm?.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                const email =
                    $("#auth-email")
                        ?.value
                        ?.trim()
                        ?.toLowerCase();


                const password =
                    $("#auth-password")
                        ?.value || "";


                if (
                    !email ||
                    !password
                ) {

                    showAuthMessage(
                        "EMAIL AND PASSWORD REQUIRED",
                        true
                    );

                    return;

                }


                const submit =
                    $("#auth-submit");


                if (submit) {

                    submit.disabled =
                        true;

                    submit.textContent =
                        mode === "login"
                            ? "AUTHENTICATING..."
                            : "CREATING ID...";

                }


                try {

                    if (
                        mode === "login"
                    ) {

                        const {
                            error
                        } =
                            await supabaseClient
                                .auth
                                .signInWithPassword({
                                    email,
                                    password
                                });


                        if (error) {

                            throw error;

                        }


                        showAuthMessage(
                            "ACCESS GRANTED",
                            false
                        );


                    } else {

                        const {
                            data,
                            error
                        } =
                            await supabaseClient
                                .auth
                                .signUp({
                                    email,
                                    password
                                });


                        if (error) {

                            throw error;

                        }


                        if (
                            data?.user &&
                            !data?.session
                        ) {

                            showAuthMessage(
                                "ACCOUNT CREATED — CHECK YOUR EMAIL TO VERIFY ACCESS.",
                                false
                            );

                        } else {

                            showAuthMessage(
                                "ACCESS ID CREATED SUCCESSFULLY.",
                                false
                            );

                        }

                    }


                    await checkCurrentUser();


                } catch (error) {

                    console.error(
                        "AUTH ERROR:",
                        error
                    );


                    showAuthMessage(
                        getAuthErrorMessage(
                            error
                        ),
                        true
                    );


                } finally {

                    if (submit) {

                        submit.disabled =
                            false;

                        submit.textContent =
                            mode === "login"
                                ? "INITIALIZE LOGIN"
                                : "CREATE ACCESS ID";

                    }

                }

            }
        );


        /* =================================================
           GITHUB
        ================================================= */

        const githubLogin =
            $("#github-login");


        githubLogin?.addEventListener(
            "click",
            async () => {

                githubLogin.disabled =
                    true;


                githubLogin.textContent =
                    "CONNECTING TO GITHUB...";


                try {

                    const {
                        error
                    } =
                        await supabaseClient
                            .auth
                            .signInWithOAuth({
                                provider: "github",
                                options: {

                                    redirectTo:
                                        window.location.origin

                                }
                            });


                    if (error) {

                        throw error;

                    }


                } catch (error) {

                    console.error(
                        "GITHUB AUTH ERROR:",
                        error
                    );


                    showAuthMessage(
                        getAuthErrorMessage(
                            error
                        ),
                        true
                    );


                    githubLogin.disabled =
                        false;


                    githubLogin.textContent =
                        "◉ CONTINUE WITH GITHUB";

                }

            }
        );


        /* =================================================
           GOOGLE
        ================================================= */

        const googleLogin =
            $("#google-login");


        googleLogin?.addEventListener(
            "click",
            async () => {

                googleLogin.disabled =
                    true;


                googleLogin.textContent =
                    "CONNECTING TO GOOGLE...";


                try {

                    const {
                        error
                    } =
                        await supabaseClient
                            .auth
                            .signInWithOAuth({
                                provider: "google",
                                options: {

                                    redirectTo:
                                        window.location.origin

                                }
                            });


                    if (error) {

                        throw error;

                    }


                } catch (error) {

                    console.error(
                        "GOOGLE AUTH ERROR:",
                        error
                    );


                    showAuthMessage(
                        getAuthErrorMessage(
                            error
                        ),
                        true
                    );


                    googleLogin.disabled =
                        false;


                    googleLogin.textContent =
                        "G CONTINUE WITH GOOGLE";

                }

            }
        );


        /* =================================================
           LOGOUT
        ================================================= */

        const logoutButton =
            $("#logout-button");


        logoutButton?.addEventListener(
            "click",
            async () => {

                logoutButton.disabled =
                    true;


                logoutButton.textContent =
                    "TERMINATING...";


                try {

                    const {
                        error
                    } =
                        await supabaseClient
                            .auth
                            .signOut();


                    if (error) {

                        throw error;

                    }


                    showAuthMessage(
                        "SESSION TERMINATED.",
                        false
                    );


                    showLoggedOutState();


                } catch (error) {

                    console.error(
                        "LOGOUT ERROR:",
                        error
                    );


                    showAuthMessage(
                        getAuthErrorMessage(
                            error
                        ),
                        true
                    );


                } finally {

                    logoutButton.disabled =
                        false;


                    logoutButton.textContent =
                        "TERMINATE SESSION";

                }

            }
        );

    }


    /* =====================================================
       CURRENT USER
    ===================================================== */

    async function checkCurrentUser() {

        if (
            !supabaseClient
        ) {

            return;

        }


        try {

            const {
                data,
                error
            } =
                await supabaseClient
                    .auth
                    .getUser();


            if (
                error ||
                !data?.user
            ) {

                showLoggedOutState();

                return;

            }


            showLoggedInState(
                data.user
            );


        } catch (error) {

            console.error(
                "CURRENT USER ERROR:",
                error
            );


            showLoggedOutState();

        }

    }


    /* =====================================================
       LOGGED IN STATE
    ===================================================== */

    function showLoggedInState(
        user
    ) {

        const form =
            $("#auth-form");


        const tabs =
            $(".auth-tabs");


        const githubButton =
            $("#github-login");


        const googleButton =
            $("#google-login");


        const divider =
            $(".oauth-divider");


        const userPanel =
            $("#user-panel");


        const email =
            $("#user-email");


        if (form) {

            form.hidden =
                true;

        }


        if (tabs) {

            tabs.hidden =
                true;

        }


        if (githubButton) {

            githubButton.hidden =
                true;

        }


        if (googleButton) {

            googleButton.hidden =
                true;

        }


        if (divider) {

            divider.hidden =
                true;

        }


        if (userPanel) {

            userPanel.hidden =
                false;

        }


        if (email) {

            email.textContent =
                user?.email ||
                user?.user_metadata?.full_name ||
                "AUTHORIZED USER";

        }

    }


    /* =====================================================
       LOGGED OUT STATE
    ===================================================== */

    function showLoggedOutState() {

        const form =
            $("#auth-form");


        const tabs =
            $(".auth-tabs");


        const githubButton =
            $("#github-login");


        const googleButton =
            $("#google-login");


        const divider =
            $(".oauth-divider");


        const userPanel =
            $("#user-panel");


        if (form) {

            form.hidden =
                false;

        }


        if (tabs) {

            tabs.hidden =
                false;

        }


        if (githubButton) {

            githubButton.hidden =
                false;

        }


        if (googleButton) {

            googleButton.hidden =
                false;

        }


        if (divider) {

            divider.hidden =
                false;

        }


        if (userPanel) {

            userPanel.hidden =
                true;

        }

    }


    /* =====================================================
       AUTH MESSAGE
    ===================================================== */

    function showAuthMessage(
        message,
        isError = false
    ) {

        const element =
            $("#auth-message");


        if (!element) {

            return;

        }


        element.textContent =
            message;


        element.classList.toggle(
            "error",
            isError
        );


        element.classList.toggle(
            "success",
            !isError
        );

    }


    function clearAuthMessage() {

        const element =
            $("#auth-message");


        if (!element) {

            return;

        }


        element.textContent =
            "";


        element.classList.remove(
            "error",
            "success"
        );

    }


    /* =====================================================
       FRIENDLY AUTH ERRORS
    ===================================================== */

    function getAuthErrorMessage(
        error
    ) {

        if (!error) {

            return "AUTHENTICATION FAILED.";

        }


        const message =
            String(
                error.message || ""
            );


        const lower =
            message.toLowerCase();


        if (
            lower.includes(
                "invalid login credentials"
            )
        ) {

            return "INVALID EMAIL OR PASSWORD.";

        }


        if (
            lower.includes(
                "user already registered"
            )
        ) {

            return "ACCOUNT ALREADY EXISTS. USE LOGIN.";

        }


        if (
            lower.includes(
                "email not confirmed"
            )
        ) {

            return "EMAIL NOT VERIFIED. CHECK YOUR INBOX.";

        }


        if (
            lower.includes(
                "password should be at least"
            )
        ) {

            return "PASSWORD DOES NOT MEET THE MINIMUM REQUIREMENT.";

        }


        if (
            lower.includes(
                "rate limit"
            )
        ) {

            return "TOO MANY REQUESTS. TRY AGAIN LATER.";

        }


        if (!message) {

            return "AUTHENTICATION FAILED.";

        }


        return message.toUpperCase();

    }


    /* =====================================================
       AUTH STATE LISTENER
    ===================================================== */

    function setupAuthListener() {

        if (
            !supabaseClient
        ) {

            return;

        }


        supabaseClient.auth.onAuthStateChange(
            (event, session) => {

                console.log(
                    "AUTH EVENT:",
                    event
                );


                if (
                    session?.user
                ) {

                    showLoggedInState(
                        session.user
                    );

                } else {

                    showLoggedOutState();

                }

            }
        );

    }


    /* =====================================================
       MOBILE MATRIX RAIN FALLBACK
    ===================================================== */

    if (window.innerWidth <= 1024) {
        window.addEventListener('load', function() {
            const container = document.getElementById('cyber-environment');
            if (!container) return;
            
            container.innerHTML = '<canvas id="matrix-canvas"></canvas>';
            const canvas = document.getElementById('matrix-canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const characters = '01AZ010101DX08CYBER#$<>*+';
            const fontSize = 14;
            const columns = canvas.width / fontSize;
            const drops = [];

            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }

            function drawMatrix() {
                ctx.fillStyle = 'rgba(2, 3, 4, 0.18)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#00e5ff';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = characters.charAt(Math.floor(Math.random() * characters.length));
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }

            setInterval(drawMatrix, 30);
        });
    }


    
        


    /* =====================================================
       START EVERYTHING
    ===================================================== */

    runBootSequence();

    initAuth();


    /* =====================================================
       GLOBAL ERROR MONITOR
    ===================================================== */

    window.addEventListener(
        "error",
        (event) => {

            console.error(
                "DARKX SYSTEM ERROR:",
                event.error ||
                event.message
            );

        }
    );


    window.addEventListener(
        "unhandledrejection",
        (event) => {

            console.error(
                "DARKX ASYNC ERROR:",
                event.reason
            );

        }
    );

});