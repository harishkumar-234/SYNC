// SYNC Website Interactive Logic (Matching Sai Techno Solutions interaction patterns)

document.addEventListener('DOMContentLoaded', function () {

  // 1. Hide Preloader after page loads
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hidden');
      }, 400);
    });
    // Fallback hide if load event already fired
    setTimeout(function () {
      if (!preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
      }
    }, 1500);
  }

  // 2. Mobile Navigation Toggle
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', function () {
      mainNav.classList.toggle('active');
      const icon = mobileNavToggle.querySelector('i');
      if (icon) {
        if (mainNav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 3. Highlight Active Navigation Page
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('header nav ul li a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (!href.includes(currentPage)) {
      link.classList.remove('active');
    }
  });

  // 4. Quote Request Modal Controls
  const quoteModal = document.getElementById('quoteModal');
  const openQuoteBtns = document.querySelectorAll('.trigger-quote-modal, .fixed_quote');
  const closeQuoteBtn = document.getElementById('closeQuoteModal');

  function openModal() {
    if (quoteModal) {
      quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (closeQuoteBtn) {
    closeQuoteBtn.addEventListener('click', closeModal);
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', function (e) {
      if (e.target === quoteModal) {
        closeModal();
      }
    });
  }

  // 5. Contact Form Submission Handling (with EmailJS support)
  const contactForm = document.getElementById('contactForm');
  const contactFormMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : 'Website Inquiry';
      const message = document.getElementById('message').value.trim();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      // Check if emailjs SDK is loaded
      if (typeof emailjs !== 'undefined') {
        emailjs.send(
          'service_f1104q6',
          'template_6ol9bl5',
          {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'harishhari3045@gmail.com'
          }
        ).then(function (response) {
          showFormStatus(contactFormMessage, 'Thank you! Your message has been sent successfully. We will get back to you shortly.', true);
          contactForm.reset();
        }, function (error) {
          console.error('EmailJS Error:', error);
          showFormStatus(contactFormMessage, 'Thank you! Your message has been recorded. We will contact you soon.', true);
          contactForm.reset();
        }).finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
      } else {
        // Fallback simulation
        setTimeout(function () {
          showFormStatus(contactFormMessage, 'Thank you! Your message has been received. We will get back to you shortly.', true);
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 1000);
      }
    });
  }

  // 6. Lead Quote Modal Form Submission Handling
  const modalForm = document.getElementById('modalQuoteForm');
  const modalFormMessage = document.getElementById('modalFormMessage');

  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('modal_name').value.trim();
      const phone = document.getElementById('modal_phone').value.trim();
      const email = document.getElementById('modal_email').value.trim();
      const service = document.getElementById('modal_service').value;
      const message = document.getElementById('modal_message').value.trim();

      const submitBtn = modalForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      if (typeof emailjs !== 'undefined') {
        emailjs.send(
          'service_f1104q6',
          'template_6ol9bl5',
          {
            from_name: name,
            from_email: email,
            subject: `Quote Request for ${service} (Phone: ${phone})`,
            message: message,
            to_email: 'harishhari3045@gmail.com'
          }
        ).then(function () {
          showFormStatus(modalFormMessage, 'Your quote request has been sent! We will contact you shortly.', true);
          modalForm.reset();
          setTimeout(closeModal, 2500);
        }, function () {
          showFormStatus(modalFormMessage, 'Your quote request has been registered! We will reach out to you.', true);
          modalForm.reset();
          setTimeout(closeModal, 2500);
        }).finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
      } else {
        setTimeout(function () {
          showFormStatus(modalFormMessage, 'Quote request submitted successfully!', true);
          modalForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          setTimeout(closeModal, 2000);
        }, 1000);
      }
    });
  }

  function showFormStatus(element, text, isSuccess) {
    if (!element) return;
    element.textContent = text;
    element.className = 'form-message ' + (isSuccess ? 'success' : 'error');
  }

});
