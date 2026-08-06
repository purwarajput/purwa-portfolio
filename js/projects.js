/* ===========================================
        PREMIUM PROJECT GALLERY
=========================================== */

const projectImages = {

    claimcore: [

        "assets/projects/claimcore/claimcore-home.png",
        "assets/projects/claimcore/claimcore-register.png",
        "assets/projects/claimcore/claimcore-plans.png",
        "assets/projects/claimcore/claimcore-kyc-upload.png",
        "assets/projects/claimcore/claimcore-verified.png",
        "assets/projects/claimcore/claimcore-dashboard.png",
        "assets/projects/claimcore/claimcore-payment.png",
        "assets/projects/claimcore/claimcore-claims.png",
        "assets/projects/claimcore/claimcore-admin-kyc.png",
        "assets/projects/claimcore/claimcore-dependents.png"

    ],

    thinkstack: [
        "assets/projects/thinkstack/thinkstack-auth.png",
        "assets/projects/thinkstack/thinkstack-dashboard.png",
        "assets/projects/thinkstack/thinkstack-comparison.png"

    ],

    quickai: [
        "assets/projects/quickai/quickai-home.png",
        "assets/projects/quickai/quickai-login.png",
        "assets/projects/quickai/quickai-dashboard.png",
        "assets/projects/quickai/quickai-image-tool.png",
        "assets/projects/quickai/quickai-generated.png",
        "assets/projects/quickai/quickai-profile.png"

    ],

    blinkit: [

        "assets/projects/blinkit/blinkit-dashboard.png",
        "assets/projects/blinkit/blinkit-power-query.png",
        "assets/projects/blinkit/blinkit-dax-kpis.png",
        "assets/projects/blinkit/blinkit-outlet-location.png",
        "assets/projects/blinkit/blinkit-outlet-size.png"

    ]

};

let currentGallery = [];
let currentIndex = 0;
let isAnimating = false;
let imageCache = [];

/* ===========================================
        ELEMENTS
=========================================== */

const modal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const galleryCounter = document.getElementById("galleryCounter");

const closeBtn = document.querySelector(".gallery-close");
const prevBtn = document.querySelector(".gallery-prev");
const nextBtn = document.querySelector(".gallery-next");

const progressBar =
    document.querySelector(".gallery-progress-fill");

const thumbsContainer =
    document.getElementById("galleryThumbnails");

/* ===========================================
        IMAGE PRELOAD
=========================================== */

function preloadImages(images) {

    imageCache = [];

    images.forEach(src => {

        const img = new Image();

        img.src = src;

        imageCache.push(img);

    });

}

/* ===========================================
        OPEN GALLERY
=========================================== */

document.querySelectorAll(".gallery-open").forEach(button => {

    button.addEventListener("click", () => {

        currentGallery =
            projectImages[button.dataset.project];

        currentIndex = 0;

        preloadImages(currentGallery);

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

        loadImage(currentIndex);

    });

});

/* ===========================================
        LOAD IMAGE
=========================================== */

function loadImage(index) {

    if (isAnimating) return;

    isAnimating = true;

    galleryImage.classList.add("fade-out");

    setTimeout(() => {

        galleryImage.src = currentGallery[index];

        galleryImage.removeAttribute("width");
        galleryImage.removeAttribute("height");

        galleryImage.style.width = "auto";
        galleryImage.style.height = "auto";
        galleryImage.style.maxWidth = "100%";
        galleryImage.style.maxHeight = "calc(85vh - 40px)";
        galleryImage.style.objectFit = "contain";

        galleryImage.onload = () => {

            galleryImage.classList.remove("fade-out");

            galleryImage.classList.add("fade-in");

            updateCounter();

            updateProgress();

            updateThumbnails();

            setTimeout(() => {

                galleryImage.classList.remove("fade-in");

                isAnimating = false;

            }, 300);

        };

    }, 180);

}

/* ===========================================
        COUNTER
=========================================== */

function updateCounter() {

    galleryCounter.textContent =
        `${currentIndex + 1} / ${currentGallery.length}`;

}

/* ===========================================
        PROGRESS BAR
=========================================== */

function updateProgress() {

    progressBar.style.width =
        `${((currentIndex + 1) / currentGallery.length) * 100}%`;

}

/* ===========================================
        THUMBNAILS
=========================================== */

function updateThumbnails() {

    thumbsContainer.innerHTML = "";

    currentGallery.forEach((src, index) => {

        const thumb = document.createElement("img");

        thumb.src = src;

        if (index === currentIndex) {

            thumb.classList.add("active");

        }

        thumb.addEventListener("click", () => {

            if (index === currentIndex) return;

            currentIndex = index;

            loadImage(currentIndex);

        });

        thumbsContainer.appendChild(thumb);

    });

}

/* ===========================================
        NEXT IMAGE
=========================================== */

function nextImage() {

    if (isAnimating) return;

    currentIndex++;

    if (currentIndex >= currentGallery.length) {

        currentIndex = 0;

    }

    loadImage(currentIndex);

}

/* ===========================================
        PREVIOUS IMAGE
=========================================== */

function prevImage() {

    if (isAnimating) return;

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentGallery.length - 1;

    }

    loadImage(currentIndex);

}

/* ===========================================
        BUTTON EVENTS
=========================================== */

nextBtn.addEventListener("click", nextImage);

prevBtn.addEventListener("click", prevImage);

/* ===========================================
        CLOSE GALLERY
=========================================== */

function closeGallery() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeGallery);

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        closeGallery();

    }

});

/* ===========================================
        KEYBOARD NAVIGATION
=========================================== */

document.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("active")) return;

    switch (e.key) {

        case "ArrowRight":
            nextImage();
            break;

        case "ArrowLeft":
            prevImage();
            break;

        case "Escape":
            closeGallery();
            break;

    }

});

/* ===========================================
        MOUSE WHEEL NAVIGATION
=========================================== */

let wheelLock = false;

modal.addEventListener("wheel", (e) => {

    if (!modal.classList.contains("active")) return;

    e.preventDefault();

    if (wheelLock) return;

    wheelLock = true;

    if (e.deltaY > 0) {

        nextImage();

    } else {

        prevImage();

    }

    setTimeout(() => {

        wheelLock = false;

    }, 250);

}, { passive: false });

/* ===========================================
        SWIPE GESTURES
=========================================== */

let touchStartX = 0;

let touchEndX = 0;

galleryImage.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});

galleryImage.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) < 60) return;

    if (distance > 0) {

        nextImage();

    } else {

        prevImage();

    }

});

/* ===========================================
        APPLE PARALLAX
=========================================== */

const wrapper = document.querySelector(".gallery-image-wrapper");

wrapper.addEventListener("mousemove", (e) => {

    const rect = wrapper.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) - 0.5;

    const y = ((e.clientY - rect.top) / rect.height) - 0.5;

    wrapper.style.transform = `

        perspective(1600px)

        rotateY(${x * 5}deg)

        rotateX(${-y * 5}deg)

        translateY(-6px)

    `;

});

wrapper.addEventListener("mouseleave", () => {

    wrapper.style.transform = "none";

});

/* ===========================================
        IMAGE ZOOM
=========================================== */

galleryImage.addEventListener("mouseenter", () => {

    galleryImage.style.transition = "transform .35s ease";

    galleryImage.style.transform = "scale(1.04)";

});

galleryImage.addEventListener("mouseleave", () => {

    galleryImage.style.transform = "scale(1)";

});

/* ===========================================
        PRELOAD NEXT IMAGE
=========================================== */

function preloadNext() {

    const next = (currentIndex + 1) % currentGallery.length;

    const img = new Image();

    img.src = currentGallery[next];

}

galleryImage.addEventListener("load", preloadNext);

/* ===========================================
        LUCIDE REFRESH
=========================================== */

if (window.lucide) {

    lucide.createIcons();

}