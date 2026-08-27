/* =========================================================
   MYSTIC STUDIO
   COMPLETE INTERACTIVE DEMO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPER
    ===================================================== */

    const $ = (id) => document.getElementById(id);

    function scrollToSection(id) {

        const section = $(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");

    if (cursor && cursorRing && window.innerWidth > 900) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let ringX = mouseX;
        let ringY = mouseY;

        document.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;
            mouseY = e.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });

        function moveRing() {

            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(moveRing);

        }

        moveRing();

        document
            .querySelectorAll("button, a, .creator-card")
            .forEach((element) => {

                element.addEventListener("mouseenter", () => {

                    cursorRing.style.width = "60px";
                    cursorRing.style.height = "60px";

                });

                element.addEventListener("mouseleave", () => {

                    cursorRing.style.width = "38px";
                    cursorRing.style.height = "38px";

                });

            });

    }


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.style.background = "rgba(8,8,8,.85)";
            navbar.style.backdropFilter = "blur(15px)";

        } else {

            navbar.style.background = "";
            navbar.style.backdropFilter = "";

        }

    });


    /* =====================================================
       NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(".navbar nav a")
        .forEach((link) => {

            link.addEventListener("click", (e) => {

                const target = link.getAttribute("href");

                if (target && target.startsWith("#")) {

                    e.preventDefault();

                    scrollToSection(
                        target.substring(1)
                    );

                }

            });

        });


    /* =====================================================
       FIND YOUR CREATOR
    ===================================================== */

    const findCreatorBtn = $("findCreatorBtn");

    if (findCreatorBtn) {

        findCreatorBtn.addEventListener("click", () => {

            scrollToSection("discover");

        });

    }


    /* =====================================================
       EXPLORE CREATORS
    ===================================================== */

    const exploreCreatorsBtn = $("exploreCreatorsBtn");

    if (exploreCreatorsBtn) {

        exploreCreatorsBtn.addEventListener("click", () => {

            scrollToSection("creators");

        });

    }


    /* =====================================================
       FINAL CTA
    ===================================================== */

    const finalFindBtn = $("finalFindBtn");

    if (finalFindBtn) {

        finalFindBtn.addEventListener("click", () => {

            scrollToSection("discover");

        });

    }


    /* =====================================================
       SEARCH DATA
    ===================================================== */

    const locations = [
        "Chennai",
        "Bengaluru",
        "Coimbatore",
        "Hyderabad",
        "Mumbai"
    ];

    const services = [
        "Photography",
        "Videography",
        "Reels",
        "Wedding Content",
        "Product Shoot"
    ];

    const budgets = [
        "₹500",
        "₹800",
        "₹1,000",
        "₹1,500",
        "₹2,000+"
    ];


    /* =====================================================
       DROPDOWN
    ===================================================== */

    function closeDropdowns() {

        document
            .querySelectorAll(".mystic-dropdown")
            .forEach((dropdown) => dropdown.remove());

    }


    function showDropdown(button, items, callback) {

        closeDropdowns();

        const rect = button.getBoundingClientRect();

        const dropdown = document.createElement("div");

        dropdown.className = "mystic-dropdown";

        dropdown.style.position = "fixed";
        dropdown.style.left = `${rect.left}px`;
        dropdown.style.top = `${rect.bottom + 8}px`;
        dropdown.style.zIndex = "50000";
        dropdown.style.minWidth =
            `${Math.max(rect.width, 180)}px`;

        items.forEach((item) => {

            const option =
                document.createElement("button");

            option.type = "button";
            option.textContent = item;

            option.addEventListener("click", (e) => {

                e.stopPropagation();

                callback(item);

                dropdown.remove();

            });

            dropdown.appendChild(option);

        });

        document.body.appendChild(dropdown);

    }


    /* =====================================================
       LOCATION
    ===================================================== */

    const locationBtn = $("locationBtn");

    if (locationBtn) {

        locationBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            showDropdown(
                locationBtn,
                locations,
                (value) => {

                    const text = $("locationText");

                    if (text) {
                        text.textContent = value;
                    }

                }
            );

        });

    }


    /* =====================================================
       SERVICE
    ===================================================== */

    const serviceBtn = $("serviceBtn");

    if (serviceBtn) {

        serviceBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            showDropdown(
                serviceBtn,
                services,
                (value) => {

                    const text = $("serviceText");

                    if (text) {
                        text.textContent = value;
                    }

                }
            );

        });

    }


    /* =====================================================
       BUDGET
    ===================================================== */

    const budgetBtn = $("budgetBtn");

    if (budgetBtn) {

        budgetBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            showDropdown(
                budgetBtn,
                budgets,
                (value) => {

                    const text = $("budgetText");

                    if (text) {

                        text.textContent =
                            value.replace("₹", "");

                    }

                }
            );

        });

    }


    document.addEventListener("click", () => {

        closeDropdowns();

    });


    /* =====================================================
       SEARCH CREATORS
    ===================================================== */

    const searchBtn = $("searchBtn");

    if (searchBtn) {

        searchBtn.addEventListener("click", () => {

            const originalHTML =
                searchBtn.innerHTML;

            searchBtn.innerHTML =
                "SEARCHING <span>•••</span>";

            searchBtn.disabled = true;

            setTimeout(() => {

                searchBtn.innerHTML =
                    "CREATORS FOUND ✓";

            }, 900);

            setTimeout(() => {

                scrollToSection("creators");

            }, 1300);

            setTimeout(() => {

                searchBtn.innerHTML =
                    originalHTML;

                searchBtn.disabled = false;

            }, 2200);

        });

    }


    /* =====================================================
       VIEW ALL CREATORS
    ===================================================== */

    const viewAllCreatorsBtn =
        $("viewAllCreatorsBtn");

    if (viewAllCreatorsBtn) {

        viewAllCreatorsBtn.addEventListener(
            "click",
            () => {

                showMessageModal(
                    "Creator Community",
                    "More verified creators are coming soon. This demo currently features 3 creators."
                );

            }
        );

    }


    /* =====================================================
       CREATOR CARDS
    ===================================================== */

    const creatorCards =
        document.querySelectorAll(".creator-card");

    creatorCards.forEach((card) => {

        card.addEventListener("click", () => {

            const name =
                card.querySelector("h3")
                    ?.textContent
                    .trim()
                || "Creator";

            const category =
                card.querySelector("p")
                    ?.textContent
                    .trim()
                || "Visual Creator";

            const rating =
                card.querySelector(".creator-rating")
                    ?.textContent
                    .trim()
                || "★ 4.9";

            const price =
                card.querySelector(
                    ".creator-price strong"
                )
                    ?.textContent
                    .trim()
                || "₹800";

            showCreatorModal(
                name,
                category,
                rating,
                price
            );

        });


        /* 3D EFFECT */

        card.addEventListener("mousemove", (e) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateX =
                ((y - rect.height / 2) /
                    (rect.height / 2)) * -4;

            const rotateY =
                ((x - rect.width / 2) /
                    (rect.width / 2)) * 4;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    /* =====================================================
       CREATOR PROFILE MODAL
    ===================================================== */

    function showCreatorModal(
        name,
        category,
        rating,
        price
    ) {

        closeAllModals();

        const modal =
            document.createElement("div");

        modal.className = "creator-modal";

        modal.innerHTML = `

            <div class="modal-backdrop"></div>

            <div class="modal-box">

                <button class="modal-close">×</button>

                <div class="modal-visual">

                    <span>
                        ✓ VERIFIED CREATOR
                    </span>

                </div>

                <div class="modal-content">

                    <p class="eyebrow">
                        CREATOR PROFILE
                    </p>

                    <h2>${name}</h2>

                    <p class="modal-category">
                        ${category}
                    </p>

                    <div class="modal-stats">

                        <div>

                            <small>RATING</small>

                            <strong>
                                ${rating}
                            </strong>

                        </div>

                        <div>

                            <small>
                                STARTING FROM
                            </small>

                            <strong>
                                ${price}
                            </strong>

                        </div>

                    </div>

                    <p class="modal-description">

                        Verified Mystic Studio creator
                        available for photography,
                        videography and visual content
                        projects.

                    </p>

                    <button class="primary-btn modal-book">

                        Book Creator

                        <span>↗</span>

                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(modal);

        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {

            modal.classList.add("active");

        });


        function close() {

            modal.classList.remove("active");

            setTimeout(() => {

                modal.remove();

                document.body.style.overflow = "";

            }, 250);

        }


        modal
            .querySelector(".modal-close")
            .addEventListener("click", close);

        modal
            .querySelector(".modal-backdrop")
            .addEventListener("click", close);

        modal
            .querySelector(".modal-book")
            .addEventListener("click", () => {

                const button =
                    modal.querySelector(".modal-book");

                button.innerHTML =
                    "REQUEST SENT ✓";

                button.style.background = "#ffffff";
                button.style.color = "#000000";

            });

    }


    /* =====================================================
       BECOME A CREATOR
       MODIFIED ONLY THIS SECTION
    ===================================================== */

    let selectedCreatorType = "Photographer";


    function showCreatorJoinModal() {

        closeAllModals();

        const modal =
            document.createElement("div");

        modal.className = "creator-modal";

        modal.innerHTML = `

            <div class="modal-backdrop"></div>

            <div class="modal-box creator-flow-box">

                <button class="modal-close">
                    ×
                </button>

<!-- STEP 1 -->

<div class="creator-step active" data-step="1">

    <div class="creator-step-top">
        <span class="creator-step-number">
            STEP 01 / 04
        </span>

    </div>

    <div class="creator-heading-clean">

    <p class="creator-program">
        MYSTIC CREATOR PROGRAM
    </p>

    <h2>
        What type of creator are you?
    </h2>

</div>


    <!-- 2 × 2 CREATOR GRID -->

    <div class="creator-type-grid">

        <button
            type="button"
            class="creator-type selected"
            data-type="Photographer">

            <div class="creator-type-icon">
                📸
            </div>

            <div class="creator-type-content">

                <strong>
                    Photographer
                </strong>

                <small>
                    Capture moments
                </small>

            </div>

        </button>


        <button
            type="button"
            class="creator-type"
            data-type="Videographer">

            <div class="creator-type-icon">
                🎥
            </div>

            <div class="creator-type-content">

                <strong>
                    Videographer
                </strong>

                <small>
                    Shoot cinematic videos
                </small>

            </div>

        </button>


        <button
            type="button"
            class="creator-type"
            data-type="Reel Creator">

            <div class="creator-type-icon">
                🎬
            </div>

            <div class="creator-type-content">

                <strong>
                    Reel Creator
                </strong>

                <small>
                    Create social content
                </small>

            </div>

        </button>


        <button
            type="button"
            class="creator-type"
            data-type="Content Creator">

            <div class="creator-type-icon">
                ✦
            </div>

            <div class="creator-type-content">

                <strong>
                    Content Creator
                </strong>

                <small>
                    Create visual content
                </small>

            </div>

        </button>

    </div>


    <!-- CONTINUE -->

    <button
        type="button"
        class="primary-btn creator-next">

        Continue
        <span>→</span>

    </button>

</div>
                
                <!-- =========================================
                     STEP 2
                ========================================== -->

                <div class="creator-step"
                     data-step="2">

                    <p class="eyebrow">
                        STEP 02 / 04
                    </p>

                    <h2>
                        Why join Mystic?
                    </h2>

                    <p class="modal-category">
                        Turn your creativity into real opportunities.
                    </p>


                    <div class="creator-benefits">

                        <div class="benefit-card">

                            <span>01</span>

                            <h3>
                                Get Discovered
                            </h3>

                            <p>
                                Let people looking for creators
                                discover your work.
                            </p>

                        </div>


                        <div class="benefit-card">

                            <span>02</span>

                            <h3>
                                Showcase Portfolio
                            </h3>

                            <p>
                                Present your best creative work
                                in one professional profile.
                            </p>

                        </div>


                        <div class="benefit-card">

                            <span>03</span>

                            <h3>
                                Get Bookings
                            </h3>

                            <p>
                                Connect with clients looking
                                for photography and content.
                            </p>

                        </div>


                        <div class="benefit-card">

                            <span>04</span>

                            <h3>
                                Build Your Brand
                            </h3>

                            <p>
                                Grow your creator identity
                                with Mystic Studio.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="primary-btn benefits-next">

                        Continue

                        <span>
                            →
                        </span>

                    </button>

                </div>


                <!-- =========================================
                     STEP 3
                ========================================== -->

                <div class="creator-step"
                     data-step="3">

                    <p class="eyebrow">
                        STEP 03 / 04
                    </p>

                    <h2>
                        Start your creator journey.
                    </h2>

                    <p class="modal-category">
                        Tell us a little about yourself.
                    </p>


                    <div class="creator-form">

                        <label>

                            CREATOR NAME

                            <input
                                type="text"
                                id="creatorName"
                                placeholder="Example: Arun Visuals">

                        </label>


                        <label>

                            LOCATION

                            <input
                                type="text"
                                id="creatorLocation"
                                placeholder="Example: Chennai">

                        </label>


                        <label>

                            STARTING PRICE

                            <input
                                type="number"
                                id="creatorPrice"
                                placeholder="Example: 1000">

                        </label>

                    </div>


                    <button
                        type="button"
                        class="primary-btn create-profile-btn">

                        Start Profile

                        <span>
                            ↗
                        </span>

                    </button>

                </div>


                <!-- =========================================
                     STEP 4
                ========================================== -->

                <div class="creator-step"
                     data-step="4">

                    <div class="success-icon">
                        ✓
                    </div>

                    <p class="eyebrow">
                        PROFILE READY
                    </p>

                    <h2>
                        Welcome to Mystic.
                    </h2>

                    <p class="modal-category">
                        Your creator journey has started.
                    </p>


                    <div class="success-card">

                        <small>
                            CREATOR
                        </small>

                        <strong class="success-name">
                            Creator
                        </strong>

                        <small>
                            CREATIVE TYPE
                        </small>

                        <strong class="success-type">
                            Photographer
                        </strong>

                    </div>


                    <button
                        type="button"
                        class="primary-btn creator-done">

                        Explore Mystic

                        <span>
                            →
                        </span>

                    </button>

                </div>

            </div>
        `;


        document.body.appendChild(modal);

        document.body.style.overflow = "hidden";


        requestAnimationFrame(() => {

            modal.classList.add("active");

        });


        /* =================================================
           CLOSE
        ================================================= */

        function closeCreatorFlow() {

            modal.classList.remove("active");

            setTimeout(() => {

                modal.remove();

                document.body.style.overflow = "";

            }, 250);

        }


        modal
            .querySelector(".modal-close")
            .addEventListener(
                "click",
                closeCreatorFlow
            );


        modal
            .querySelector(".modal-backdrop")
            .addEventListener(
                "click",
                closeCreatorFlow
            );


        /* =================================================
           STEP SYSTEM
        ================================================= */

        const steps =
            modal.querySelectorAll(".creator-step");


        function showStep(number) {

            steps.forEach((step) => {

                step.classList.remove("active");

            });

            const target =
                modal.querySelector(
                    `[data-step="${number}"]`
                );

            if (target) {

                target.classList.add("active");

            }

        }


        /* =================================================
           CREATOR TYPE
        ================================================= */

        const creatorTypes =
            modal.querySelectorAll(".creator-type");


        creatorTypes.forEach((type) => {

            type.addEventListener("click", () => {

                creatorTypes.forEach((item) => {

                    item.classList.remove("selected");

                });

                type.classList.add("selected");

                selectedCreatorType =
                    type.dataset.type || "Creator";

            });

        });


        /* =================================================
           STEP 1 → STEP 2
        ================================================= */

        modal
            .querySelector(".creator-next")
            .addEventListener("click", () => {

                showStep(2);

            });


        /* =================================================
           STEP 2 → STEP 3
        ================================================= */

        modal
            .querySelector(".benefits-next")
            .addEventListener("click", () => {

                showStep(3);

            });


        /* =================================================
           STEP 3 → STEP 4
        ================================================= */

        modal
            .querySelector(".create-profile-btn")
            .addEventListener("click", () => {

                const name =
                    modal.querySelector(
                        "#creatorName"
                    ).value.trim();


                const location =
                    modal.querySelector(
                        "#creatorLocation"
                    ).value.trim();


                const price =
                    modal.querySelector(
                        "#creatorPrice"
                    ).value.trim();


                if (!name || !location || !price) {

                    alert(
                        "Please complete your creator profile."
                    );

                    return;

                }


                modal.querySelector(
                    ".success-name"
                ).textContent = name;


                modal.querySelector(
                    ".success-type"
                ).textContent =
                    selectedCreatorType;


                showStep(4);

            });


        /* =================================================
           DONE
        ================================================= */

        modal
            .querySelector(".creator-done")
            .addEventListener("click", () => {

                closeCreatorFlow();

                setTimeout(() => {

                    scrollToSection("creators");

                }, 300);

            });

    }


    /* =====================================================
       BECOME CREATOR BUTTON
       ONLY ONE EVENT LISTENER
    ===================================================== */

    const becomeCreatorBtn =
        $("becomeCreatorBtn");

    if (becomeCreatorBtn) {

        becomeCreatorBtn.addEventListener(
            "click",
            () => {

                showCreatorJoinModal();

            }
        );

    }


    /* =====================================================
       SIMPLE MESSAGE MODAL
    ===================================================== */

    function showMessageModal(title, message) {

        closeAllModals();

        const modal =
            document.createElement("div");

        modal.className =
            "creator-modal";

        modal.innerHTML = `

            <div class="modal-backdrop"></div>

            <div class="modal-box">

                <button class="modal-close">
                    ×
                </button>

                <div
                    class="modal-content"
                    style="grid-column:1/-1">

                    <p class="eyebrow">
                        MYSTIC STUDIO
                    </p>

                    <h2>
                        ${title}
                    </h2>

                    <p class="modal-description">
                        ${message}
                    </p>

                    <button
                        class="primary-btn message-ok">

                        Continue

                        <span>
                            →
                        </span>

                    </button>

                </div>

            </div>
        `;


        document.body.appendChild(modal);

        document.body.style.overflow = "hidden";


        requestAnimationFrame(() => {

            modal.classList.add("active");

        });


        function close() {

            modal.classList.remove("active");

            setTimeout(() => {

                modal.remove();

                document.body.style.overflow = "";

            }, 250);

        }


        modal
            .querySelector(".modal-close")
            .addEventListener(
                "click",
                close
            );


        modal
            .querySelector(".modal-backdrop")
            .addEventListener(
                "click",
                close
            );


        modal
            .querySelector(".message-ok")
            .addEventListener(
                "click",
                close
            );

    }


    /* =====================================================
       CLOSE ALL MODALS
    ===================================================== */

    function closeAllModals() {

        document
            .querySelectorAll(".creator-modal")
            .forEach((modal) => {

                modal.remove();

            });

        document.body.style.overflow = "";

    }


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeAllModals();
            closeDropdowns();

        }

    });


    /* =====================================================
       MAGNETIC BUTTON
    ===================================================== */

    document
        .querySelectorAll(
            ".primary-btn, .nav-btn"
        )
        .forEach((button) => {

            button.addEventListener(
                "mousemove",
                (e) => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        e.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        e.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(
                            ${x * 0.10}px,
                            ${y * 0.10}px
                        )`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "translate(0,0)";

                }
            );

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, .search-panel, .creator-card, .step, .final-cta"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (
        heroVisual &&
        window.innerWidth > 900
    ) {

        document.addEventListener(
            "mousemove",
            (e) => {

                const x =
                    (
                        e.clientX /
                        window.innerWidth -
                        0.5
                    ) * 2;


                const y =
                    (
                        e.clientY /
                        window.innerHeight -
                        0.5
                    ) * 2;


                heroVisual.style.transform =
                    `translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )`;

            }
        );

    }


    /* =====================================================
       FINAL CHECK
    ===================================================== */

    console.log(
        "✓ Mystic Studio loaded successfully"
    );

});