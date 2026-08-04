/* ===========================================
        PROJECT GALLERY
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

        "assets/projects/thinkstack/thinkstack-dashboard.png",
        "assets/projects/thinkstack/thinkstack-auth.png",
        "assets/projects/thinkstack/thinkstack-comparison.png"

    ],

    quickai: [

        "assets/projects/quickai/quickai-dashboard.png",
        "assets/projects/quickai/quickai-home.png",
        "assets/projects/quickai/quickai-login.png",
        "assets/projects/quickai/quickai-image-tool.png",
        "assets/projects/quickai/quickai-generated.png",
        "assets/projects/quickai/quickai-profile.png"

    ],

    blinkit: [

        "assets/projects/blinkit/blinkit-dashboard.png",
        "assets/projects/blinkit/power-query-editor.png",
        "assets/projects/blinkit/dax-kpi-measures.png",
        "assets/projects/blinkit/outlet-location-analysis.png",
        "assets/projects/blinkit/outlet-size-analysis.png"

    ]

};

let currentGallery = [];

let currentIndex = 0;

const modal = document.getElementById("galleryModal");

const galleryImage = document.getElementById("galleryImage");

const galleryCounter = document.getElementById("galleryCounter");

const closeBtn = document.querySelector(".gallery-close");

const prevBtn = document.querySelector(".gallery-prev");

const nextBtn = document.querySelector(".gallery-next");

/* ---------- Open Gallery ---------- */

document.querySelectorAll(".gallery-open").forEach(button => {

    button.addEventListener("click", () => {

        const project = button.dataset.project;

        currentGallery = projectImages[project];

        currentIndex = 0;

        console.log("Button clicked");
        console.log(galleryImage);
        console.log(currentGallery);

        updateGallery();

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

/* ---------- Update Image ---------- */

/* ---------- Update Image ---------- */

function updateGallery() {

    // Fade Out
    galleryImage.style.opacity = 0;

    galleryImage.style.transform = "scale(0.96)";

    setTimeout(() => {

        // Change Image
        galleryImage.src = currentGallery[currentIndex];

        // Counter
        galleryCounter.textContent =
            `${currentIndex + 1} / ${currentGallery.length}`;

        // Fade In
        galleryImage.style.opacity = 1;
        galleryImage.style.transform = "scale(1)";

    }, 150);

    // Create Thumbnails
    const thumbs = document.getElementById("galleryThumbnails");

    thumbs.innerHTML = "";

    currentGallery.forEach((img, index) => {

        const image = document.createElement("img");

        image.src = img;

        if (index === currentIndex) {
            image.classList.add("active");
        }

        image.onclick = () => {

            currentIndex = index;

            updateGallery();

        };

        thumbs.appendChild(image);

    });

}

/* ---------- Next ---------- */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= currentGallery.length) {

        currentIndex = 0;

    }

    updateGallery();

});

/* ---------- Previous ---------- */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentGallery.length - 1;

    }

    updateGallery();

});

/* ---------- Close ---------- */

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

/* ---------- Keyboard ---------- */

document.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("active")) return;

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

    if (e.key === "Escape") {

        closeGallery();

    }

});