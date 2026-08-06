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

/*=================================
        METRIC COUNTERS
=================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const counter = entry.target;

        const target = +counter.dataset.target;

        let current = 0;

        const increment = target / 60;

        const update = ()=>{

            current += increment;

            if(current < target){

                counter.innerText = Math.ceil(current);

                requestAnimationFrame(update);

            }else{

                if(target === 100){

                    counter.innerText = "100%";

                }

                else if(target === 25){

                    counter.innerText = "25+";

                }

                else if(target === 10){

                    counter.innerText = "10+";

                }

                else if(target === 5){

                    counter.innerText = "5+";

                }

                else{

                    counter.innerText = target;

                }

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

},{
    threshold:.5
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});