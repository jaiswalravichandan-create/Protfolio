// Mobile Menu System (Clean & No Animation)
document.addEventListener("DOMContentLoaded", () => {

    const menuIcon = document.getElementById("menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeBtn = document.getElementById("close-menu");

    if (!menuIcon || !mobileMenu) return;

    const menu = {
        isOpen: false,
        toggle(show) {
            if (typeof show === "undefined") show = !this.isOpen;
            this.isOpen = show;
            mobileMenu.classList.toggle("open", show);
            document.body.classList.toggle("no-scroll", show);
        }
    };

    menuIcon.addEventListener("click", () => menu.toggle(true));
    closeBtn?.addEventListener("click", () => menu.toggle(false));

    document.addEventListener("click", (event) => {
        if (
            menu.isOpen &&
            !mobileMenu.contains(event.target) &&
            !menuIcon.contains(event.target)
        ) {
            menu.toggle(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menu.isOpen) menu.toggle(false);
    });

});
// ===========================
// CENTER FOCUS SKILLS CAROUSEL
// ===========================

const track2 = document.querySelector(".focus-track");
const slides = Array.from(track2.children);
const prev2 = document.getElementById("prevSkill");
const next2 = document.getElementById("nextSkill");

let currentIndex = 0;

// Update positions + focus classes
function updateFocusCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;

    track2.style.transform = `translateX(${-(currentIndex * slideWidth)}px)`;

    slides.forEach((slide, i) => {
        slide.classList.remove("left", "center", "right");

        if (i === currentIndex) slide.classList.add("center");
        if (i === currentIndex - 1) slide.classList.add("left");
        if (i === currentIndex + 1) slide.classList.add("right");
    });
}

// Right slide
next2?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateFocusCarousel();
});

// Left slide
prev2?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateFocusCarousel();
});

// Auto-slide only on mobile/tablet
setInterval(() => {
    if (window.innerWidth <= 1024) {
        currentIndex = (currentIndex + 1) % slides.length;
        updateFocusCarousel();
    }
}, 2500);

// Swipe for mobile
let startX2 = 0;

track2.addEventListener("touchstart", (e) => {
    startX2 = e.touches[0].clientX;
});

track2.addEventListener("touchend", (e) => {
    let endX2 = e.changedTouches[0].clientX;

    if (startX2 - endX2 > 50) {
        currentIndex = (currentIndex + 1) % slides.length;
    } else if (endX2 - startX2 > 50) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }

    updateFocusCarousel();
});

// Init
updateFocusCarousel();
