(function () {
  'use strict';

  const eventDateIso = window.TECHCONNECT_EVENT_DATE || '2025-12-01T09:00:00-03:00';
  const target = new Date(eventDateIso);

  const el = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    signup: document.getElementById('signup'),
    countdown: document.getElementById('countdown')
  };

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function getTimeParts(diff) {
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor(diff / (1000 * 60 * 60)) % 24,
      minutes: Math.floor(diff / (1000 * 60)) % 60,
      seconds: Math.floor(diff / 1000) % 60
    };
  }

  function update() {
    if (Number.isNaN(target.getTime())) {
      el.countdown.textContent = 'Data do evento inválida';
      clearInterval(timer);
      return;
    }

    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      ['days', 'hours', 'minutes', 'seconds'].forEach(unit => {
        el[unit].textContent = '00';
      });

      const msg = document.createElement('p');
      msg.className = 'subtitle';
      msg.setAttribute('role', 'status');
      msg.textContent = 'O evento começou! 🎉';
      el.countdown.insertAdjacentElement('afterend', msg);

      clearInterval(timer);
      return;
    }

    const { days, hours, minutes, seconds } = getTimeParts(diff);

    el.days.textContent = pad(days);
    el.hours.textContent = pad(hours);
    el.minutes.textContent = pad(minutes);
    el.seconds.textContent = pad(seconds);
  }

  const timer = setInterval(update, 1000);
  update();

  if (el.signup) {
    el.signup.addEventListener('click', ev => {
      ev.preventDefault();
      alert('Inscrições abrem em breve! Fique de olho!');
    });
  }
})();
