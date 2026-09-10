document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.navlinks');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('form[data-formspree]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const endpoint = form.dataset.endpoint;
      if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
        status.className = 'form-status error';
        status.textContent = 'This form is ready, but the Formspree endpoint still needs to be connected before launch.';
        return;
      }
      status.className = 'form-status';
      status.textContent = '';
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        status.className = 'form-status success';
        status.innerHTML = '<strong>Thank You for Considering SiteSure.</strong><br>Your request has been received. A SiteSure representative will review it and contact you to confirm your walkthrough.';
      } catch (err) {
        status.className = 'form-status error';
        status.textContent = 'We could not send your request. Please email latasha@sitesurecleaning.com instead.';
      }
    });
  });
});
