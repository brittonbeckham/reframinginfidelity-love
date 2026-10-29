(function () {
  // Sticky section bar: appears once the hero has scrolled away and highlights the section in view.
  var hero = document.querySelector('.hero');
  var bar = document.querySelector('.program-bar');
  var spy = bar && bar.querySelector('[data-spy]');
  var links = spy ? Array.prototype.slice.call(spy.querySelectorAll('a[href^="#"]')) : [];
  var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var current = null;
  var ticking = false;

  function update() {
    ticking = false;
    var visible = hero.getBoundingClientRect().bottom < 0;
    bar.classList.toggle('is-visible', visible);

    var line = bar.offsetHeight + 48;
    var active = null;
    targets.forEach(function (t, i) {
      if (t && t.getBoundingClientRect().top <= line) active = links[i];
    });
    if (active === current) return;
    if (current) current.removeAttribute('aria-current');
    current = active;
    if (!current) return;
    current.setAttribute('aria-current', 'true');
    if (spy.scrollWidth > spy.clientWidth) {
      spy.scrollTo({ left: current.parentElement.offsetLeft - 8, behavior: 'smooth' });
    }
  }

  if (hero && bar) {
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

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
