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

// ----------------------------------------------------------------------
// 2. SIDEMENU FUNCTIONS (MOVED TO GLOBAL SCOPE FOR HTML ONCLICK)
// ----------------------------------------------------------------------
var sidemenu = document.getElementById("sidemenu");
// Check if sidemenu element exists before defining functions that use it
if (sidemenu) {
    window.openmenu = function () {
        // Correct position to show the menu
        sidemenu.style.right = "0"; 
    }
    window.closemenu = function () {
        // FIX: Hides the menu completely by pushing it off-screen to the right
        sidemenu.style.right = "-250px"; 
    }
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

    // Read-more modal handlers with autofocus and simple focus-trap
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('project-modal-title');
    const modalBody = document.getElementById('project-modal-body');
    const modalClose = document.querySelector('.project-modal-close');
    const modalPanel = document.querySelector('.project-modal-panel');
    let lastActiveElement = null;
    let modalKeyHandler = null;

    function openProjectModal(title, html) {
        lastActiveElement = document.activeElement;
        modalTitle.textContent = title;
        modalBody.innerHTML = html;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // autofocus close button (or panel) for accessibility
        setTimeout(() => {
            if (modalClose) modalClose.focus();
            else if (modalPanel) modalPanel.focus();
        }, 40);

        // add key handler to trap tab focus and detect Escape
        modalKeyHandler = function (e) {
            if (e.key === 'Escape') {
                closeProjectModal();
                return;
            }
            if (e.key === 'Tab') {
                const focusable = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])');
                const focusables = Array.prototype.filter.call(focusable, function (el) {
                    return el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement;
                });
                if (focusables.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', modalKeyHandler);
    }

    function closeProjectModal() {
        modal.setAttribute('aria-hidden', 'true');
        modalTitle.textContent = '';
        modalBody.innerHTML = '';
        document.body.style.overflow = '';
        if (modalKeyHandler) document.removeEventListener('keydown', modalKeyHandler);
        modalKeyHandler = null;
        // restore focus
        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
            lastActiveElement.focus();
        }
        lastActiveElement = null;
    }

    // Attach click handlers to all read-more buttons
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const layer = e.currentTarget.closest('.layer');
            if (!layer) return;
            const titleEl = layer.querySelector('h3');
            const contentEl = layer.querySelector('.content');
            const title = titleEl ? titleEl.textContent.trim() : '';
            const html = contentEl ? contentEl.innerHTML : '';
            openProjectModal(title, html);
        });
    });

    // Close interactions
    if (modalClose) modalClose.addEventListener('click', closeProjectModal);
    modal.addEventListener('click', function (e) {
        if (e.target.matches('[data-close]') || e.target === modal) closeProjectModal();
    });
});