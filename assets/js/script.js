// =========================================================
// SRIJA GREEN GALAXY - WEBSITE JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------------------------------
    // Add animation when sections enter the screen
    // -----------------------------------------------------

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