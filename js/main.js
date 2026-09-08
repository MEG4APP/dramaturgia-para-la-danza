// ============================================================
// DRAMATURGIA PARA LA DANZA — RAÍZ Colectiva Teatro
// Lógica interactiva: Intro Loader, Cotizador por país,
// Tabs de módulos, FAQ Accordion y Generador de WhatsApp
// ============================================================

const WHATSAPP_PRIMARY = "59176465010";
const WHATSAPP_SECONDARY = "59176564010";
const CONTACT_EMAIL = "raizcolectivateatro@gmail.com";

// Datos de aranceles y medios de pago por país
const COUNTRIES_DATA = [
  { code: "BO", name: "Bolivia", currency: "BOB", symbol: "Bs.", priceDiscount: "350", priceRegular: "430", payment: "Transferencia bancaria / QR (Banco Unión, BNB, BCP)" },
  { code: "AR", name: "Argentina", currency: "ARS", symbol: "$", priceDiscount: "60.000", priceRegular: "75.000", payment: "Transferencia en pesos / Alias / Mercado Pago" },
  { code: "PE", name: "Perú", currency: "PEN", symbol: "S/.", priceDiscount: "190", priceRegular: "235", payment: "Yape / Plin / Transferencia BCP / Interbank" },
  { code: "CO", name: "Colombia", currency: "COP", symbol: "$", priceDiscount: "190.000", priceRegular: "235.000", payment: "Nequi / Bancolombia / PSE" },
  { code: "PY", name: "Paraguay", currency: "PYG", symbol: "Gs.", priceDiscount: "280.000", priceRegular: "350.000", payment: "Giro / Transferencia Bancaria (SIPAP)" },
  { code: "MX", name: "México", currency: "MXN", symbol: "$", priceDiscount: "1.100", priceRegular: "1.350", payment: "Transferencia SPEI / OXXO / Mercado Pago" },
  { code: "CL", name: "Chile", currency: "CLP", symbol: "$", priceDiscount: "45.000", priceRegular: "55.000", payment: "Transferencia Cuenta RUT / Bancaria" },
  { code: "OT", name: "Otros países / Internacional", currency: "USD", symbol: "$", priceDiscount: "45", priceRegular: "55", payment: "PayPal / Tarjeta de Crédito y Débito / Western Union" }
];

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initCountryCalculator();
  initDayTabs();
  initFaqAccordion();
  initRegisterForm();
  initScrollReveal();
});

// ------------------------------------------------------------
// 1. INTRO LOADER CON RESPIRACIÓN Y FASES POÉTICAS
// ------------------------------------------------------------
function initLoader() {
  const loader = document.getElementById("intro-loader");
  const phaseEl = document.getElementById("loader-phase-text");
  const skipBtn = document.getElementById("loader-skip-btn");

  if (!loader || !phaseEl) return;

  const phases = [
    "El cuerpo que escribe...",
    "La palabra que danza...",
    "Habitar la escena"
  ];

  let currentPhase = 0;
  phaseEl.textContent = phases[0];
  phaseEl.classList.add("active");

  const interval = setInterval(() => {
    currentPhase++;
    if (currentPhase < phases.length) {
      phaseEl.classList.remove("active");
      setTimeout(() => {
        phaseEl.textContent = phases[currentPhase];
        phaseEl.classList.add("active");
      }, 300);
    }
  }, 1100);

  function dismissLoader() {
    clearInterval(interval);
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.remove();
    }, 1000);
  }

  // Cierre automático tras 3.6s o al hacer clic en saltar
  const autoClose = setTimeout(dismissLoader, 3600);

  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      clearTimeout(autoClose);
      dismissLoader();
    });
  }
}

// ------------------------------------------------------------
// 2. COTIZADOR Y SELECTOR POR PAÍS
// ------------------------------------------------------------
function initCountryCalculator() {
  const select = document.getElementById("calc-country-select");
  const priceDisplay = document.getElementById("calc-price-display");
  const paymentDisplay = document.getElementById("calc-payment-display");
  const whatsAppBtn = document.getElementById("calc-whatsapp-btn");

  if (!select) return;

  // Llenar opciones si está vacío
  if (select.options.length === 0) {
    COUNTRIES_DATA.forEach((country) => {
      const opt = document.createElement("option");
      opt.value = country.code;
      opt.textContent = `${country.name} (${country.currency})`;
      select.appendChild(opt);
    });
  }

  function updateCountry(countryCode) {
    const data = COUNTRIES_DATA.find((c) => c.code === countryCode) || COUNTRIES_DATA[0];

    if (priceDisplay) {
      priceDisplay.textContent = `${data.symbol} ${data.priceDiscount} ${data.currency}`;
    }

    if (paymentDisplay) {
      paymentDisplay.innerHTML = `<strong>Medios habilitados en ${data.name}:</strong> ${data.payment}.`;
    }

    if (whatsAppBtn) {
      const msg = encodeURIComponent(
        `Hola RAÍZ Colectiva, deseo consultar los datos de pago para inscribirme al Taller de Dramaturgia para la Danza desde ${data.name} (${data.symbol} ${data.priceDiscount} ${data.currency}).`
      );
      whatsAppBtn.href = `https://wa.me/${WHATSAPP_PRIMARY}?text=${msg}`;
    }
  }

  select.addEventListener("change", (e) => {
    updateCountry(e.target.value);
  });

  // Inicializar con Bolivia o primera opción
  updateCountry(select.value || "BO");
}

// ------------------------------------------------------------
// 3. TABS DÍA 1 Y DÍA 2
// ------------------------------------------------------------
function initDayTabs() {
  const tabButtons = document.querySelectorAll(".day-tab-btn");
  const dayCards = document.querySelectorAll(".day-content-card");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetDay = btn.getAttribute("data-day");

      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      dayCards.forEach((card) => {
        if (card.getAttribute("data-day") === targetDay) {
          card.style.display = "block";
          card.classList.add("in-view");
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// ------------------------------------------------------------
// 4. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
// ------------------------------------------------------------
function initFaqAccordion() {
  const faqCards = document.querySelectorAll(".faq-card");

  faqCards.forEach((card) => {
    const trigger = card.querySelector(".faq-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isOpen = card.classList.contains("open");

      // Cerrar otros si se prefiere acordeón estricto
      faqCards.forEach((c) => c.classList.remove("open"));

      if (!isOpen) {
        card.classList.add("open");
      }
    });
  });
}

// ------------------------------------------------------------
// 5. FORMULARIO DE REGISTRO CONECTADO A WHATSAPP
// ------------------------------------------------------------
function initRegisterForm() {
  const form = document.getElementById("workshop-reg-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.querySelector('[name="nombre"]')?.value || "";
    const email = form.querySelector('[name="email"]')?.value || "";
    const whatsapp = form.querySelector('[name="whatsapp"]')?.value || "";
    const pais = form.querySelector('[name="pais"]')?.value || "";
    const perfil = form.querySelector('[name="perfil"]')?.value || "";
    const mensaje = form.querySelector('[name="mensaje"]')?.value || "";

    const textLines = [
      "🎭 *SOLICITUD DE INSCRIPCIÓN · DRAMATURGIA PARA LA DANZA*",
      "----------------------------------------",
      `👤 *Nombre:* ${nombre}`,
      `📧 *Email:* ${email}`,
      `📱 *WhatsApp:* ${whatsapp}`,
      `🌎 *País:* ${pais}`,
      `🩰 *Perfil:* ${perfil}`,
      `💬 *Mensaje:* ${mensaje || "Deseo apartar mi cupo con arancel promocional y recibir las instrucciones de pago."}`,
      "----------------------------------------",
      "Vía Zoom · 12 y 13 de Septiembre"
    ];

    const waUrl = `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(textLines.join("\n"))}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
}

// ------------------------------------------------------------
// 6. SCROLL REVEAL EN CASCADA
// ------------------------------------------------------------
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}
