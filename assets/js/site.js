(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var panel = document.getElementById('menu-panel');

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    panel.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(panel.hidden); });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { setMenu(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 1080px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  // MailerLite forms post into a hidden frame so the visitor stays on the page.
  // Without JS they fall back to a normal full-page POST to the same endpoint.
  document.querySelectorAll('form[data-form]').forEach(function (form, i) {
    var sink = document.createElement('iframe');
    sink.name = 'form-sink-' + i;
    sink.className = 'form-sink';
    sink.title = 'Form submission';
    sink.setAttribute('aria-hidden', 'true');
    sink.tabIndex = -1;
    form.appendChild(sink);
    form.target = sink.name;

    var button = form.querySelector('[type="submit"]');
    var success = form.querySelector('.form-success');
    var pending = false;
    var fallback;

    function done() {
      if (!pending) return;
      pending = false;
      clearTimeout(fallback);
      Array.prototype.forEach.call(form.children, function (el) {
        if (el !== success && el !== sink && el.type !== 'hidden') el.hidden = true;
      });
      success.hidden = false;
    }

    sink.addEventListener('load', done);
    form.addEventListener('submit', function () {
      pending = true;
      setTimeout(function () { button.disabled = true; button.textContent = 'Sending…'; }, 0);
      fallback = setTimeout(done, 8000);
    });
  });

  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(function (el) { io.observe(el); });
})();
