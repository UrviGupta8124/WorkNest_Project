{/* <script>
        document.addEventListener('DOMContentLoaded', function() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });
            
            fadeElements.forEach(element => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                observer.observe(element);
            });
            
            // Testimonial Carousel
            const dots = document.querySelectorAll('.dot');
            const testimonials = document.querySelectorAll('.testimonial');
            
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const testimonialId = this.getAttribute('data-testimonial');
                    
                    // Hide all testimonials
                    testimonials.forEach(testimonial => {
                        testimonial.classList.remove('active');
                    });
                    
                    // Show selected testimonial
                    document.getElementById(testimonialId).classList.add('active');
                    
                    // Update active dot
                    dots.forEach(d => {
                        d.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
        });
</script> */


{/* <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Fade-in animation
        const fadeElements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        fadeElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(element);
        });

        // Testimonial Carousel
        const dots = document.querySelectorAll('.dot');
        const testimonials = document.querySelectorAll('.testimonial');
        let current = 0;

        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
        }

        // Dot click handler
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                current = index;
                showTestimonial(current);
            });
        });

        // Auto-slide testimonials every 5 seconds
        setInterval(() => {
            current = (current + 1) % testimonials.length;
            showTestimonial(current);
        }, 5000);
    });
</script>} */

<script>
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let interval;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            dots[i].classList.remove('active');
        });

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Auto slide
    function startAutoSlide() {
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, 5000); // Change every 5 seconds
    }

    // Manual click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(interval); // Stop auto when clicked
            showTestimonial(index);
            startAutoSlide(); // Restart auto
        });
    });

    // Initialize
    showTestimonial(currentIndex);
    startAutoSlide();
</script>}