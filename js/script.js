document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel-list");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    const homeButton = document.getElementById("homeButton");
    
    let currentIndex = 0;
    
    // top bar menu for mobile
    const mobileIcon = document.querySelector(".mobile-icon");
    const navLink = document.querySelector(".nav-link");
    const body = document.body;

    mobileIcon.addEventListener("click", function () {
        navLink.classList.toggle("active");
    });

    // Close the navbar when clicking outside the navbar area
    body.addEventListener("click", function (event) {
        if (!navLink.contains(event.target) && !mobileIcon.contains(event.target)) {
            navLink.classList.remove("active");
        }
    });

    // Prevent clicks inside the navbar from closing the navbar
    navLink.addEventListener("click", function (event) {
        event.stopPropagation();
    });
    
    // Define the email adress
    emailIcon = document.querySelector(".email-icon");
    emailIcon.addEventListener("click", function() {
        const username = "d.zahoruiko";
        const domain = "web.de";
        const emailAddress = username + "@" + domain;

        window.location.href = "mailto:" + emailAddress;
    })

    const phoneButton = document.getElementById("phone-button");
    const phoneTooltip = document.getElementById("phone-tooltip");
    const tooltipPhoneNumber = document.getElementById("tooltip-phone-number");

    phoneButton.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent click from reaching document
        phoneTooltip.classList.toggle("active");
        
        // Generate and insert the obfuscated phone number
        const obfuscatedPhoneNumber = generateObfuscatedPhoneNumber();
        tooltipPhoneNumber.textContent = obfuscatedPhoneNumber;
    });

    // Close the tooltip when clicking outside the tooltip area
    document.addEventListener("click", function(event) {
        if (!phoneTooltip.contains(event.target) && !phoneButton.contains(event.target)) {
            phoneTooltip.classList.remove("active");
        }
    });

    // Prevent clicks within the tooltip from closing it
    phoneTooltip.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    
    // Scroll to top smoothly when the "Home" button is clicked
    homeButton.addEventListener("click", function (event) {
        event.preventDefault();

        const duration = 200; // Total duration of the animation in milliseconds
        const start = window.scrollY;
        const end = 0;
        let startTime;

        function animateScroll(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            // Apply easing function for smoother animation (e.g., quadratic easing)
            const easingProgress = Math.pow(progress / duration, 2);

            const newPosition = start + (end - start) * easingProgress;
            window.scrollTo(0, newPosition);

            if (progress < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    });
    
    // Show/hide the "Home" button based on scroll position
    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            homeButton.style.display = "block";
        } else {
            homeButton.style.display = "none";
        }
    });            
    
    function showCurrentSlide() {
        carouselItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    // carousel navigation
    
    function showSlide(index) {
        currentIndex = index;
        const translateValue = -currentIndex * 100;
        carousel.style.transform = `translateX(${translateValue}%)`;
    }
    
    prevButton.addEventListener("click", () => {
        const prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(prevIndex);
    });
    
    nextButton.addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(nextIndex);
    });

    // Show the initial slide
    showSlide(currentIndex);

    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            const targetSectionId = this.getAttribute("href");
            const targetSection = document.querySelector(targetSectionId);

            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get the height of the navigation bar
                const scrollToPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth" // Use smooth scrolling animation
                });
            }
        });
    });

    // animation of the career path
    const entries = document.querySelectorAll('.entry');
    const bodies = document.querySelectorAll('.body');
    // const timelines = document.querySelector('.timeline');

    // // Create an Intersection Observer instance
    // const observerTimeline = new IntersectionObserver((timelines, observerTimeline) => {
    //     timelines.forEach(timeline => {
    //     if (timeline.isIntersecting) {
    //         timeline.target.classList.add('visible');
    //     }
    //     });
    // });

    // // Observe each entry element
    // timelines.forEach(timeline => {
    //     observerTimeline.observe(timeline);
    // });

    // Create an Intersection Observer instance
    const observerEntry = new IntersectionObserver((entries, observerEntry) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
        });
    });

    // Observe each entry element
    entries.forEach(entry => {
        observerEntry.observe(entry);
    });

    // Create an Intersection Observer instance
    const observerBody = new IntersectionObserver((bodies, observerBody) => {
        bodies.forEach(body => {
        if (body.isIntersecting) {
            body.target.classList.add('visible');
        }
        });
    });

    // Observe each entry element
    bodies.forEach(body => {
        observerBody.observe(body);
    });


    const navLinksColor = document.querySelectorAll(".nav-link a");
    const sections = document.querySelectorAll("section");
    
    // Function to update active link
    function updateActiveLink() {
        const middleOfScreen = window.innerHeight / 2;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= middleOfScreen && rect.bottom >= middleOfScreen) {
                navLinksColor.forEach(navLink => navLink.classList.remove("active-link"));
                navLinksColor[index].classList.add("active-link");
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener("scroll", updateActiveLink);
    
    // Update active link on page load
    updateActiveLink();
});


// Function to generate an obfuscated phone number
function generateObfuscatedPhoneNumber() {
    const firstPart = "+49"; // Replace with the actual obfuscated digits
    const secondPart = "178"; // Replace with the actual obfuscated digits
    const thirdPart = "4919857"; // Replace with the actual obfuscated digits

    return `${firstPart}-${secondPart}-${thirdPart}`;
}