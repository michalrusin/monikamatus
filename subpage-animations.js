gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".subpage-hero_content > *", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5
    });

    gsap.utils.toArray('.offer-item').forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
    });

    gsap.from(".pricelist-category", {
        scrollTrigger: {
            trigger: ".pricelist-section",
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
    });

    gsap.from(".gallery-item", {
        scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    gsap.from(".contact-offer-section > *", {
        scrollTrigger: {
            trigger: ".contact-offer-section",
            start: "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

});