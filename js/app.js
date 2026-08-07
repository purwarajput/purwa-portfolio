const roles = [

    "Software Developer",

    "Frontend Developer",

    "Full Stack Developer",

    "Data Analyst",

    "Business Analyst",

    "Problem Solver"

];

const typingText = document.getElementById("typing-text");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {

    const current = roles[roleIndex];

    if (!deleting) {

        typingText.textContent = current.substring(0, charIndex);

        charIndex++;

        if (charIndex > current.length) {

            deleting = true;

            setTimeout(type, 1500);

            return;
        }

    }

    else {

        typingText.textContent = current.substring(0, charIndex);

        charIndex--;

        if (charIndex < 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length)

                roleIndex = 0;

        }

    }

    setTimeout(type, deleting ? 45 : 90);

}

type();

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

    reveals.forEach((item) => {

        const windowHeight = window.innerHeight;
        const revealTop = item.getBoundingClientRect().top;

        if (revealTop < windowHeight - 120) {
            item.classList.add("active");
        }

    });

});

/*=================================
        EMAIL JS
=================================*/

emailjs.init("0oEo1KPfH7iAGN-EK");

const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const button = form.querySelector("button");

        const originalText = button.innerHTML;

        button.disabled = true;

        button.innerHTML = `
            <i data-lucide="loader-circle"></i>
            Sending...
        `;

        lucide.createIcons();

        emailjs.sendForm(
            "service_dy1gv7o",
            "template_v6ateu7",
            this
        )
        .then(() => {

            button.innerHTML = `
                <i data-lucide="check"></i>
                Message Sent
            `;

            lucide.createIcons();

            alert("✅ Thank you! Your message has been sent successfully.");

            form.reset();

        })
        .catch((error) => {

            console.error(error);

            alert("❌ Failed to send message. Please try again.");

        })
        .finally(() => {

            setTimeout(() => {

                button.disabled = false;

                button.innerHTML = originalText;

                lucide.createIcons();

            }, 2000);

        });

    });

}



       