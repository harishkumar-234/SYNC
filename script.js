// Contact form handling with EmailJS
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.classList.add('loading');
      
      // Send email using EmailJS
      emailjs.send(
        'service_f1104q6', // Replace with your EmailJS service ID
        'template_6ol9bl5', // Replace with your EmailJS template ID
        {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          to_email: 'harishhari3045@gmail.com'
        }
      )
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        formMessage.textContent = 'Your message has been sent successfully! We will get back to you soon.';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        
        // Reset form
        contactForm.reset();
      }, function(error) {
        console.log('FAILED...', error);
        
        // Show error message
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later or contact us directly at harishhari3045@gmail.com';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
      })
      .finally(function() {
        // Remove loading state
        submitBtn.classList.remove('loading');
      });
    });
  }
  
  // Set active page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});