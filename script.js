/* ═══════════════════════════════════════════════════════════════════════
   XYNAPSE — JavaScript
   Copy-to-clipboard, mobile nav, scroll animations, active nav tracking
   ═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {



  // ── Copy-to-Clipboard ────────────────────────────────────────────────
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeId = btn.getAttribute('data-copy');
      const codeEl = document.getElementById(codeId);
      if (!codeEl) return;

      // Get text content (strips HTML tags)
      const text = codeEl.textContent;

      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');

        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // ── Scroll: Fade-in Animation ────────────────────────────────────────
  const fadeTargets = [
    ...document.querySelectorAll('.script-card'),
    ...document.querySelectorAll('.feature-card'),
    ...document.querySelectorAll('.section-header'),
    ...document.querySelectorAll('.discord-inner'),
    ...document.querySelectorAll('.hero-content'),
    ...document.querySelectorAll('.hero-visual'),
  ];

  fadeTargets.forEach(el => el.classList.add('fade-in'));

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add slight stagger for grid items
        const parent = entry.target.parentElement;
        if (parent && (parent.classList.contains('scripts-grid') || parent.classList.contains('features-grid'))) {
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 80}ms`;
        }

        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeTargets.forEach(el => fadeObserver.observe(el));



});
