document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
       ===================================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 700);

    });


    /* =====================================================
       NAVBAR
       ===================================================== */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const icon =
            menuToggle.querySelector("i");

        if (navLinks.classList.contains("open")) {

            icon.className = "fas fa-times";

        } else {

            icon.className = "fas fa-bars";

        }

    });


    document.querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.querySelector("i")
                    .className = "fas fa-bars";

            });

        });


    /* =====================================================
       DARK MODE
       ===================================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';

    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");


        if (isDark) {

            localStorage.setItem("theme", "dark");

            themeToggle.innerHTML =
                '<i class="fas fa-sun"></i>';

            themeToggle.title =
                "Light Mode";

        } else {

            localStorage.setItem("theme", "light");

            themeToggle.innerHTML =
                '<i class="fas fa-moon"></i>';

            themeToggle.title =
                "Dark Mode";

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "header[id], section[id]"
        );

    const links =
        document.querySelectorAll(".nav-link");


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        links.forEach(link => {

                            link.classList.remove("active");

                        });


                        const activeLink =
                            document.querySelector(
                                `.nav-link[href="#${entry.target.id}"]`
                            );


                        if (activeLink) {

                            activeLink.classList.add("active");

                        }

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       STATISTICS COUNTER
       ===================================================== */

    const counters =
        document.querySelectorAll(".counter");

    let countersStarted = false;


    const statsSection =
        document.querySelector(".stats-section");


    const counterObserver =
        new IntersectionObserver(
            entries => {

                if (
                    entries[0].isIntersecting &&
                    !countersStarted
                ) {

                    countersStarted = true;

                    counters.forEach(counter => {

                        const target =
                            Number(
                                counter.dataset.target
                            );

                        let current = 0;

                        const increment =
                            Math.max(
                                1,
                                Math.ceil(target / 80)
                            );


                        const updateCounter = () => {

                            current += increment;

                            if (current >= target) {

                                counter.textContent =
                                    target;

                                return;

                            }

                            counter.textContent =
                                current;

                            requestAnimationFrame(
                                updateCounter
                            );

                        };


                        updateCounter();

                    });

                }

            },
            {
                threshold: 0.4
            }
        );


    counterObserver.observe(statsSection);


    /* =====================================================
       ACTIVITY FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const activityCards =
        document.querySelectorAll(".activity-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            const filter =
                button.dataset.filter;


            activityCards.forEach(card => {

                const category =
                    card.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       POST SEARCH
       ===================================================== */

    const searchInput =
        document.getElementById("postSearch");

    const postCards =
        document.querySelectorAll(".post-card");

    const noPosts =
        document.getElementById("noPosts");


    searchInput.addEventListener("input", () => {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        let visiblePosts = 0;


        postCards.forEach(card => {

            const text =
                card.textContent.toLowerCase();


            if (text.includes(search)) {

                card.classList.remove("hidden");

                visiblePosts++;

            } else {

                card.classList.add("hidden");

            }

        });


        if (visiblePosts === 0) {

            noPosts.style.display = "block";

        } else {

            noPosts.style.display = "none";

        }

    });


    /* =====================================================
       IMAGE MODAL
       ===================================================== */

    const modal =
        document.getElementById("imageModal");

    const modalImage =
        document.getElementById("modalImage");

    const closeModal =
        document.getElementById("closeModal");

    const modalOverlay =
        document.querySelector(".modal-overlay");


    const imageButtons =
        document.querySelectorAll(".view-image-btn");


    imageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const image =
                button.dataset.image;


            modalImage.src = image;

            modal.classList.add("open");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        });

    });


    function closeImageModal() {

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    closeModal.addEventListener(
        "click",
        closeImageModal
    );


    modalOverlay.addEventListener(
        "click",
        closeImageModal
    );


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {

            closeImageModal();

        }

    });


    /* =====================================================
       COPY BANK ACCOUNT
       ===================================================== */

    const copyButton =
        document.getElementById("copyAccount");

    const accountNumber =
        document.getElementById("accountNumber");

    const copyMessage =
        document.getElementById("copyMessage");


    copyButton.addEventListener("click", async () => {

        const number =
            accountNumber.textContent.trim();


        try {

            await navigator.clipboard.writeText(
                number
            );

            copyMessage.classList.add("show");

            copyButton.innerHTML =
                '<i class="fas fa-check"></i> تم النسخ';


            setTimeout(() => {

                copyMessage.classList.remove(
                    "show"
                );

                copyButton.innerHTML =
                    '<i class="fas fa-copy"></i> نسخ';

            }, 2500);


        } catch (error) {

            alert(
                "لم نتمكن من نسخ الرقم تلقائيًا."
            );

        }

    });


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".stat-card, .about-card, .activity-card, .post-card, .donation-card, .contact-item"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const year =
        document.getElementById("currentYear");

    year.textContent =
        new Date().getFullYear();


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    document.querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.opacity = "0.5";

                }
            );

        });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Home") {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });

});