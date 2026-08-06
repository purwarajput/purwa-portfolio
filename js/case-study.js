const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            setTimeout(() => {

                entry.target.classList.add("active");

            }, entry.target.dataset.delay);

        }

    });

}, {
    threshold: .2
});

reveals.forEach(card => observer.observe(card));

document.querySelectorAll(".showcase-card").forEach(card=>{

    const browser=card.querySelector(".browser-frame");

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=(e.clientX-rect.left)/rect.width-.5;
        const y=(e.clientY-rect.top)/rect.height-.5;

        browser.style.transform=
        `perspective(1200px)
         rotateY(${x*8}deg)
         rotateX(${-y*8}deg)
         translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        browser.style.transform="";

    });

});