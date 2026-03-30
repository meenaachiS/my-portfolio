document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio offline script loaded successfully.");

    // Smooth Scrolling for "View My Work" Button
    const viewWorkBtn = document.getElementById("view-work-btn");
    
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener("click", function(e) {
            e.preventDefault(); // Prevent standard fast CSS jump if any
            
            const targetId = this.getAttribute("href").substring(1); // 'projects'
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Offset for the sticky header height (approx 80px)
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    
    if (contactForm && feedback) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const nameField = document.getElementById("name").value.trim();
            const emailField = document.getElementById("email").value.trim();
            const messageField = document.getElementById("message").value.trim();
            
            let errors = [];
            
            // Validation rules
            if (!nameField) errors.push("Please enter your name.");
            if (!emailField) {
                errors.push("Please enter an email address.");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField)) {
                errors.push("Please provide a valid email address.");
            }
            if (!messageField) errors.push("Please leave me a message.");
            
            // Clear current feedback classes
            feedback.classList.remove("hidden", "bg-red-50", "text-red-600", "border-red-200", "bg-emerald-50", "text-emerald-700", "border-emerald-200");
            
            // Error/Success Handling
            if (errors.length > 0) {
                feedback.classList.add("bg-red-50", "text-red-600", "border-red-200", "block");
                feedback.innerHTML = `<ul class="list-disc pl-5">${errors.map(err => `<li>${err}</li>`).join('')}</ul>`;
            } else {
                feedback.classList.add("bg-emerald-50", "text-emerald-700", "border-emerald-200", "block");
                feedback.innerHTML = "<strong>Success!</strong> Your message has been saved successfully. (Offline mode active)";
                contactForm.reset();
                
                // Optional: remove success message after 5 seconds
                setTimeout(() => {
                    feedback.classList.add("hidden");
                    feedback.classList.remove("block");
                }, 5000);
            }
        });
    }
});
