(function () {
  var shop = window.SHOP || {};

  function placeholder(el, label) {
    el.textContent = label;
    el.classList.add("is-placeholder");
  }

  // Text fields
  document.querySelectorAll("[data-field]").forEach(function (el) {
    var key = el.getAttribute("data-field");
    var value = shop[key];
    if (value) {
      el.textContent = value;
    } else {
      placeholder(el, el.textContent);
    }
  });

  // Phone + SMS links
  var digits = (shop.phoneDigits || "").replace(/\D/g, "");
  if (digits.length === 10) digits = "1" + digits;
  var tel = digits ? "tel:+" + digits : null;
  // "?&body=" works on both iOS and Android.
  var sms = digits
    ? "sms:+" + digits + "?&body=" + encodeURIComponent(shop.smsBody || "")
    : null;

  document.querySelectorAll("[data-tel]").forEach(function (a) {
    if (tel) a.href = tel;
  });
  document.querySelectorAll("[data-sms]").forEach(function (a) {
    if (sms) a.href = sms;
  });

  // On desktop, "Text us photos" can't open a messaging app. Show the number instead.
  var isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  if (!isTouch && shop.phoneDisplay) {
    document.querySelectorAll("[data-sms]").forEach(function (a) {
      a.setAttribute("title", "Text photos to " + shop.phoneDisplay);
      a.addEventListener("click", function (e) {
        e.preventDefault();
        showTextHint(a);
      });
    });
  }

  function showTextHint(anchor) {
    var existing = document.querySelector(".text-hint");
    if (existing) existing.remove();
    var hint = document.createElement("div");
    hint.className = "text-hint";
    hint.setAttribute("role", "status");
    hint.innerHTML =
      "Text your photos to <strong>" + shop.phoneDisplay + "</strong>" +
      '<button type="button" class="text-hint-copy">Copy number</button>';
    document.body.appendChild(hint);

    var btn = hint.querySelector(".text-hint-copy");
    btn.addEventListener("click", function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shop.phoneDisplay).then(function () {
          btn.textContent = "Copied";
        });
      }
    });

    setTimeout(function () { hint.classList.add("is-visible"); }, 10);
    setTimeout(function () {
      hint.classList.remove("is-visible");
      setTimeout(function () { hint.remove(); }, 300);
    }, 6000);
  }

  // Email
  document.querySelectorAll("[data-mail]").forEach(function (a) {
    if (shop.email) {
      a.href = "mailto:" + shop.email + "?subject=" + encodeURIComponent("Estimate request");
    }
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Header border once scrolled
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
