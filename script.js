/**
 * SYNC Agency Website Interactive Features
 * Modern, robust, and clean logic for responsive navigation, filter states,
 * custom lead generation forms, and project case study popups.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Preloader Hide ---
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 300);
    });
    // Fallback liveness check
    setTimeout(() => {
      if (!preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
      }
    }, 1200);
  }

  // --- 2. Compact Header on Scroll ---
  const header = document.querySelector('header');
  if (header) {
    const checkScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once in case refreshed while scrolled down
  }

  // --- 3. Mobile Navigation Drawer ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNav.classList.toggle('active');
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        if (mainNav.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && e.target !== hamburgerBtn) {
        mainNav.classList.remove('active');
        const icon = hamburgerBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // --- 4. Highlighting Active Navigation Link ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header nav ul li a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href === '#')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- 5. Custom Quote Request & Case Study Modals ---
  const quoteModal = document.getElementById('quoteModal');
  const caseStudyModal = document.getElementById('caseStudyModal');
  const closeBtns = document.querySelectorAll('.modal-close');

  const openModal = (modal) => {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Bind quote trigger buttons
  const quoteTriggers = document.querySelectorAll('.trigger-quote-modal');
  quoteTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModal);
    });
  });

  // Close buttons
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(quoteModal);
      closeModal(caseStudyModal);
    });
  });

  // Click outside to close
  [quoteModal, caseStudyModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // --- 6. Case Study Popup Loader ---
  // Pre-configured case study data for professional previews
  const caseStudies = {
    'restaurant-management': {
      title: 'Restaurant Management System',
      industry: 'Restaurants & Hospitality',
      challenge: 'The client faced manual order entry bottlenecks, high staff coordinate errors, and lack of real-time inventory tracking, causing slow table turns.',
      solution: 'Built a sleek cloud dashboard enabling order taking, kitchen display sync, automatic inventory reduction, and transaction management with multi-terminal support.',
      features: 'Table Booking, POS Invoicing, Live Kitchen Queue, Inventory Analytics, Multi-tier Roles.',
      tech: 'PHP / Laravel / Bootstrap / MySQL',
      outcome: 'A unified responsive tool resolving restaurant queueing delays and optimizing supply waste.'
    },
    'clinic-appointment': {
      title: 'Clinic Appointment System',
      industry: 'Healthcare',
      challenge: 'Overlapping bookings, long patient wait times, and manual prescription record-keeping that was prone to organization slipups.',
      solution: 'Developed an automated appointment scheduler with automatic time-slot allocation, patient profiles, electronic medical record storage, and SMS alerts.',
      features: 'Patient Registration, Doctor Availability Matrix, Appointment Reminders, Digital Prescriptions.',
      tech: 'PHP / Laravel / React / SQLite',
      outcome: 'Reduced patient wait room crowding by scheduling time frames accurately.'
    },
    'real-estate': {
      title: 'Real Estate Platform',
      industry: 'Real Estate',
      challenge: 'Inefficient lead distribution, poor property filters, and agent panels that failed to present listings with interactive details.',
      solution: 'Designed a high-performance portal with advanced query configurations, listing galleries, real-time lead capture forms, and agent dashboard.',
      features: 'Interactive Search, Agent Dashboards, Media Galleries, Map Location Integration.',
      tech: 'React / Tailwind CSS / Node.js / MySQL',
      outcome: 'Established a premium platform optimized for listing discoverability.'
    },
    'ecommerce': {
      title: 'E-Commerce Platform',
      industry: 'Retail & Consumer Goods',
      challenge: 'Slow page loads on product catalog indexes, high checkout abandonment, and lack of order state flows.',
      solution: 'Engineered a highly responsive custom storefront with microsecond page load times, integrated local payments, dynamic cart operations, and merchant control panel.',
      features: 'Interactive Filters, Coupon engines, Secure gateway integration, Invoice automation.',
      tech: 'React / Tailwind CSS / Laravel / MySQL',
      outcome: 'Provides a clean, accessible catalog for higher user conversion.'
    },
    'inventory-management': {
      title: 'Inventory Management System',
      industry: 'Retail & Manufacturing',
      challenge: 'Stock level discrepancies, manual inventory audits, and poor alerts on low materials leading to project execution delays.',
      solution: 'Engineered a multi-warehouse stock tracker with real-time barcode ingestion, automated purchase triggers, and analytics dashboards.',
      features: 'Reorder Trigger Alerts, Barcode scanning module, Bulk import, Analytics graphs.',
      tech: 'HTML5 / CSS3 / JavaScript / PHP / SQLite',
      outcome: 'Improved storage transparency across multiple branch centers.'
    },
    'student-management': {
      title: 'Student Management System',
      industry: 'Education',
      challenge: 'Fragmented student data, complex fee collection pipelines, and lack of parent access portals.',
      solution: 'Deployed a comprehensive system handling records, fee billing schedules, attendance tracking, and grading logs.',
      features: 'Student profiles, Fee payment receipt builder, Attendance logs, Exam score analytics.',
      tech: 'PHP / Laravel / Bootstrap / MySQL',
      outcome: 'Centralized school data pipelines for administrative staff and educators.'
    },
    'business-crm': {
      title: 'Business CRM System',
      industry: 'Professional Services',
      challenge: 'Sales tracking errors, lost client contact histories, and poor coordination among team agents.',
      solution: 'Constructed an intuitive pipeline tracker featuring lead lifecycle charts, contact logs, automated meeting notifications, and task assignments.',
      features: 'Deal Pipeline Visualizer, Contact History, Team Task Boards, Email reminders.',
      tech: 'React / Tailwind CSS / Laravel / MySQL',
      outcome: 'Empowers client success teams to follow up on pipeline opportunities.'
    },
    'mobile-app': {
      title: 'Mobile Business Application',
      industry: 'Retail & Startups',
      challenge: 'Lack of brand engagement and customer access options outside of desktop environments.',
      solution: 'Developed a native Android app supporting catalog browsing, profile controls, fast ordering processes, and push alerts.',
      features: 'Push notifications, Offline state storage, Fingerprint authentication, API data binding.',
      tech: 'Android SDK / Java / Kotlin / REST APIs',
      outcome: 'Accelerates customer engagement with a dedicated app icon presence.'
    }
  };

  const caseStudyTriggers = document.querySelectorAll('.trigger-case-study');
  const csTitle = document.getElementById('csTitle');
  const csIndustry = document.getElementById('csIndustry');
  const csChallenge = document.getElementById('csChallenge');
  const csSolution = document.getElementById('csSolution');
  const csFeatures = document.getElementById('csFeatures');
  const csTech = document.getElementById('csTech');
  const csOutcome = document.getElementById('csOutcome');

  caseStudyTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const studyKey = btn.getAttribute('data-study');
      const data = caseStudies[studyKey];
      if (data && caseStudyModal) {
        if (csTitle) csTitle.textContent = data.title;
        if (csIndustry) csIndustry.textContent = data.industry;
        if (csChallenge) csChallenge.textContent = data.challenge;
        if (csSolution) csSolution.textContent = data.solution;
        if (csFeatures) csFeatures.textContent = data.features;
        if (csTech) csTech.textContent = data.tech;
        if (csOutcome) csOutcome.textContent = data.outcome;
        openModal(caseStudyModal);
      }
    });
  });

  // --- 7. Portfolio Categories Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-wrapper');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Button Class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // --- 8. Accordion FAQ ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle this one
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --- 9. Quote Form & Lead Handling (EmailJS Integration) ---
  const loadEmailJS = () => {
    return new Promise((resolve) => {
      if (typeof emailjs !== 'undefined') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = () => {
        emailjs.init('jYqHk93kJN0LOfpdY');
        resolve();
      };
      document.head.appendChild(script);
    });
  };

  const handleLeadSubmit = (formId, messageId) => {
    const form = document.getElementById(formId);
    const msgElement = document.getElementById(messageId);
    if (!form || !msgElement) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Request...';

      // Read form data (flexible IDs based on template forms)
      const fullName = form.querySelector('[name="name"]') || form.querySelector('#name') || form.querySelector('#modal_name');
      const phoneNum = form.querySelector('[name="phone"]') || form.querySelector('#phone') || form.querySelector('#modal_phone');
      const emailAdd = form.querySelector('[name="email"]') || form.querySelector('#email') || form.querySelector('#modal_email');
      const projectType = form.querySelector('[name="project_type"]') || form.querySelector('#modal_service');
      const budgetRange = form.querySelector('[name="budget"]') || form.querySelector('#budget');
      const description = form.querySelector('[name="description"]') || form.querySelector('#message') || form.querySelector('#modal_message');

      const nameVal = fullName ? fullName.value.trim() : '';
      const phoneVal = phoneNum ? phoneNum.value.trim() : '';
      const emailVal = emailAdd ? emailAdd.value.trim() : '';
      const typeVal = projectType ? projectType.value : 'General Inquiry';
      const budgetVal = budgetRange ? budgetRange.value : 'Not Specified';
      const descVal = description ? description.value.trim() : '';

      const displaySuccess = () => {
        msgElement.textContent = 'Thank you! Your quote request has been sent successfully. Our lead engineer will contact you shortly.';
        msgElement.className = 'form-message success';
        msgElement.style.display = 'block';
        form.reset();
        setTimeout(() => {
          msgElement.style.display = 'none';
          // Close quote modal if that was open
          if (quoteModal && quoteModal.classList.contains('active')) {
            closeModal(quoteModal);
          }
        }, 5000);
      };

      const displayError = () => {
        msgElement.textContent = 'Something went wrong. Please try contacting us directly via WhatsApp or Email.';
        msgElement.className = 'form-message error';
        msgElement.style.display = 'block';
      };

      // Ensure EmailJS is loaded, then send the lead details
      loadEmailJS().then(() => {
        const emailParams = {
          // Supports multiple variable naming conventions in the EmailJS Template editor
          from_name: nameVal,
          from_email: emailVal,
          from_phone: phoneVal,
          phone: phoneVal,
          project_type: typeVal,
          budget: budgetVal,
          message: descVal,

          Name: nameVal,
          Email: emailVal,
          Phone: phoneVal,
          ProjectType: typeVal,
          Budget: budgetVal,
          Message: descVal
        };

        emailjs.send('service_f1104q6', 'template_6ol9bl5', emailParams)
          .then(() => {
            displaySuccess();
          })
          .catch((err) => {
            console.error('EmailJS submit error:', err);
            displayError();
          })
          .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          });
      });
    });
  };

  // Initialize forms if they exist in DOM
  handleLeadSubmit('modalQuoteForm', 'modalFormMessage');
  handleLeadSubmit('mainLeadForm', 'mainFormMessage');
});
