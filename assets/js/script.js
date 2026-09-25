// =========================================================
// SRIJA GREEN GALAXY - WEBSITE JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------------------------------
    // Add animation when sections enter the screen
    // -----------------------------------------------------

    // =========================================
// CART SIDEBAR
// =========================================

const cartBtn = document.getElementById("cartBtn");
const sideCart = document.getElementById("sideCart");
const closeCart = document.getElementById("closeCart");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openCart() {
    sideCart.classList.add("open");
    sidebarOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeCartSidebar() {
    sideCart.classList.remove("open");
    sidebarOverlay.classList.remove("open");
    document.body.style.overflow = "";
}

if (cartBtn) {
    cartBtn.addEventListener("click", openCart);
}

if (closeCart) {
    closeCart.addEventListener("click", closeCartSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeCartSidebar);
}

// =========================================
// WISHLIST SIDEBAR
// =========================================

const wishlistBtn = document.getElementById("wishlistBtn");
const sideWishlist = document.getElementById("sideWishlist");
const closeWishlist = document.getElementById("closeWishlist");
const wishlistOverlay = document.getElementById("sidebarOverlay");

function openWishlist() {
    sideWishlist.classList.add("open");
    wishlistOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeWishlistSidebar() {
    sideWishlist.classList.remove("open");
    wishlistOverlay.classList.remove("open");
    document.body.style.overflow = "";
}

if (wishlistBtn) {
    wishlistBtn.addEventListener("click", openWishlist);
}

if (closeWishlist) {
    closeWishlist.addEventListener("click", closeWishlistSidebar);
}

if (wishlistOverlay) {
    wishlistOverlay.addEventListener("click", closeWishlistSidebar);
}
    // =========================================
// HERO NUMBER COUNTING ANIMATION
// =========================================

const counters = document.querySelectorAll(".count-number");

counters.forEach(function (counter) {

    const target = Number(counter.getAttribute("data-target"));
    const duration = 2500;
    const startTime = performance.now();

    function updateCounter(currentTime) {

        const elapsed = currentTime - startTime;

        // Constant speed from 0 to target
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(target * progress);

        // Add % symbol only for percentage counter
        if (counter.dataset.suffix === "%") {
            counter.textContent = currentValue + "%";
        } else {
            counter.textContent = currentValue;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Make absolutely sure final value is correct
            if (counter.dataset.suffix === "%") {
                counter.textContent = target + "%";
            } else {
                counter.textContent = target;
            }
        }
    }

    requestAnimationFrame(updateCounter);
});


    //const sections = document.querySelectorAll("section");
    const sections = document.querySelectorAll("section:not(.gallery-section)");

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show-section");
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    sections.forEach(function (section) {
        section.classList.add("animate-section");
        observer.observe(section);
    });


    // -----------------------------------------------------
    // Smooth scrolling for same-page links
    // -----------------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });


    // -----------------------------------------------------
    // Current year in footer
    // -----------------------------------------------------

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // -----------------------------------------------------
    // Mobile navigation helper
    // -----------------------------------------------------

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.forEach(function (item) {
                    item.classList.remove("active");
                });

                this.classList.add("active");

            });

        });

    }

});
// =========================================
// TRUE EARTH-SUN STYLE IMPACT ORBIT
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const orbit = document.querySelector(".orbit-container");
    const images = document.querySelectorAll(".orbit-image");

    if (!orbit || images.length !== 6) return;

    const total = images.length;

    let angle = -90;
    let currentFront = 0;

    let lastTime = performance.now();

    // Orbit radius
    const radiusX = 220;
    const radiusY = 220;

    // Normal orbit speed
    const orbitSpeed = 0.018;

    // Front image timing
    const normalOrbitTime = 2000;
    const frontHoldTime = 2000;

    let phase = "orbit";
    let phaseStart = performance.now();

    function animate(time) {

        const delta = time - lastTime;
        lastTime = time;

        if (phase === "orbit") {

            // Move the complete group around the center
            angle += orbitSpeed * delta;

            if (time - phaseStart >= normalOrbitTime) {
                phase = "focus";
                phaseStart = time;
            }

        } else if (phase === "focus") {

            // Keep orbit moving while front image comes forward
            angle += orbitSpeed * delta;

            if (time - phaseStart >= 1500) {
                phase = "hold";
                phaseStart = time;
            }

        } else if (phase === "hold") {

            // Front image stays large for 2 seconds
            if (time - phaseStart >= frontHoldTime) {
                phase = "return";
                phaseStart = time;
            }

        } else if (phase === "return") {

            // Orbit continues while images return
            angle += orbitSpeed * delta;

            if (time - phaseStart >= 1500) {

                currentFront++;

                if (currentFront >= total) {
                    currentFront = 0;
                }

                phase = "orbit";
                phaseStart = time;
            }
        }

        updateOrbit(time);

        requestAnimationFrame(animate);
    }
    function updateOrbit(time) {

    images.forEach(function (image, index) {

        const imageAngle =
            angle + (360 / total) * index;

        const radians =
            imageAngle * Math.PI / 180;

        // Normal circular orbit position
        const orbitX =
            Math.cos(radians) * radiusX;

        const orbitY =
            Math.sin(radians) * radiusY;

        let x = orbitX;
        let y = orbitY;

        let scale = 1;
        let opacity = 1;

        /*
         * =====================================
         * IMAGE COMES TO CENTER / SUN POSITION
         * =====================================
         */

        if (phase === "focus") {

            if (index === currentFront) {

                const progress =
                    Math.min(
                        1,
                        (time - phaseStart) / 1500
                    );

                /*
                 * Orbit position -> CENTER
                 */
                const ease =
                    1 - Math.pow(1 - progress, 3);

                x = orbitX * (1 - ease);
                y = orbitY * (1 - ease);

                /*
                 * Grow only while moving
                 * towards the center.
                 */
                scale =
                    1 + (0.75 * ease);

                opacity = 1;

            } else {

                /*
                 * Other five disappear slowly.
                 */
                opacity =
                    Math.max(
                        0,
                        1 -
                        ((time - phaseStart) / 1500)
                    );

                scale = 1;
            }
        }


        /*
         * =====================================
         * CENTER / SUN POSITION
         * =====================================
         */

        else if (phase === "hold") {

            if (index === currentFront) {

                // EXACT CENTER
                x = 0;
                y = 0;

                // Large image
                scale = 1.75;

                opacity = 1;

            } else {

                x = orbitX;
                y = orbitY;

                opacity = 0;
                scale = 1;
            }
        }


        /*
         * =====================================
         * CENTER -> ORBIT
         * =====================================
         */

        else if (phase === "return") {

            if (index === currentFront) {

                const progress =
                    Math.min(
                        1,
                        (time - phaseStart) / 1500
                    );

                /*
                 * Center -> original orbit
                 */
                const ease =
                    progress * progress * (3 - 2 * progress);

                x = orbitX * ease;
                y = orbitY * ease;

                scale =
                    1.75 -
                    (0.75 * ease);

                opacity = 1;

            } else {

                /*
                 * Other five appear at the
                 * same time.
                 */
                const progress =
                    Math.min(
                        1,
                        (time - phaseStart) / 1500
                    );

                x = orbitX;
                y = orbitY;

                opacity = progress;
                scale = 1;
            }
        }


        /*
         * =====================================
         * NORMAL ORBIT
         * =====================================
         */

        else {

            x = orbitX;
            y = orbitY;

            scale = 1;
            opacity = 1;
        }


        /*
         * IMPORTANT:
         *
         * translate = position around Sun
         * scale = size
         *
         * Image itself NEVER rotates.
         */
        image.style.transform =
            `translate(${x}px, ${y}px) scale(${scale})`;

        image.style.opacity = opacity;

        image.style.zIndex =
            index === currentFront ? 20 : 5;
    });
}
    

    requestAnimationFrame(animate);

});