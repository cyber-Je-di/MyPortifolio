// main.js

// ----------------------------------------------------------------------
// 1. TAB FUNCTIONALITY (MUST BE IN THE GLOBAL SCOPE)
// ----------------------------------------------------------------------
window.opentab = function (tabname, ele) { 
    // Query for the element collections inside the function on every click.
    const tablinks = document.querySelectorAll(".tab-links");
    const tabcontents = document.querySelectorAll(".tab-content");

    // Remove 'active-link' from all tab links
    tablinks.forEach(link => {
        link.classList.remove("active-link");
    });
    
    // Remove 'active-tab' from all tab contents
    tabcontents.forEach(content => {
        content.classList.remove("active-tab");
    });
    
    // Add 'active-link' to the element that was clicked (passed as 'ele')
    ele.classList.add("active-link");
    
    // Add 'active-tab' to the target content div (Education, Experience, or Skills)
    document.getElementById(tabname).classList.add("active-tab");
}
// ----------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function () {
    // Typed.js initialization
    var typedOptions = {
        strings: ["", '<span class="mad">Madalitso Tembo</span>', 'a Software Developer'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
        contentType: 'html', // Important to render HTML tags
    };
    var typed = new Typed("#typed", typedOptions);

    // AOS initialization
    AOS.init();

    // Vanilla-tilt initialization
    VanillaTilt.init(document.querySelectorAll(".work"), {
        max: 25,
        speed: 400,
        perspective: 500,
        glare: true,
        "max-glare": 0.5
    });

    // particles.js initialization
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });


    // Sidemenu functionality
    var sidemenu = document.getElementById("sidemenu");
    window.openmenu = function () {
        sidemenu.style.right = "0";
    }
    window.closemenu = function () {
        sidemenu.style.right = "-500px";
    }

    // Contact form submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwiLWrrw0vHJibDJbfX6gKhZKuHJh0Y3_RC3Mq18NLV1C7xE2sqJ3DU_PZ5CdCFg5Fn/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    msg.innerHTML = "Message sent successfully";
                    setTimeout(function () {
                        msg.innerHTML = "";
                    }, 5000);
                    form.reset();
                })
                .catch(error => console.error('Error!', error.message));
        });
    }

    // Scroll-to-top button
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.onscroll = function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };
    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});