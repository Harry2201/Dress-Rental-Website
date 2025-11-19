const testimonials = {
  Weddings: [
    {
      quote:
        "“My Jaipur mehendi look arrived with handwritten draping tips. I felt like royalty without buying another heavy lehenga.”",
      name: "Riya • PR lead",
      detail: "Rented Heritage Baraat capsule",
    },
    {
      quote:
        "“They matched my partner’s sherwani palette perfectly. The fit notes saved me from any last-minute panic.”",
      name: "Avantika • Product lead",
      detail: "Rented Festive Royale capsule",
    },
  ],
  Cocktail: [
    {
      quote:
        "“The stylist called me with backup jewelry ideas! Felt as polished as a luxe runway drop.”",
      name: "Natasha • Architect",
      detail: "Rented Cocktail Club capsule",
    },
    {
      quote:
        "“Loved the ready-made accessory kit. Sequin gown arrived steamed and photo ready.”",
      name: "Kiara • Brand strategist",
      detail: "Rented Galaxy Capsule",
    },
  ],
  Festive: [
    {
      quote:
        "“Booked the Try-at-Home and confirmed my Navratri looks in 24 hours. Zero hassle returns.”",
      name: "Anushka • Consultant",
      detail: "Rented Festive Royale capsule",
    },
    {
      quote:
        "“Royal Rewards crowned me with a complimentary saree. Delivery was faster than most purchases.”",
      name: "Shruthi • Designer",
      detail: "Rented Banarasi edit",
    },
  ],
};

const pills = document.querySelectorAll(".pill");
const storiesEl = document.querySelector(".stories");

pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    pills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    const key = pill.textContent.trim();
    const entries = testimonials[key];
    if (!entries) return;
    storiesEl.innerHTML = entries
      .map(
        (item) => `
      <article>
        <p>${item.quote}</p>
        <div class="story-meta">
          <strong>${item.name}</strong>
          <span>${item.detail}</span>
        </div>
      </article>`
      )
      .join("");
  });
});

const catalog = document.getElementById("catalog");
const searchInput = document.querySelector("#inventory-search");
const catalogOpeners = document.querySelectorAll("[data-open-catalog]");
const catalogClose = catalog?.querySelector(".close-modal");
const catalogTabs = catalog?.querySelectorAll("[data-panel-trigger]");
const catalogGroups = catalog?.querySelectorAll(".catalog-group");
let activePanel = "women";

const filterInventory = () => {
  if (!searchInput || !catalog) return;
  const term = searchInput.value.trim().toLowerCase();
  const activeGroup = catalog.querySelector(
    `.catalog-group[data-panel="${activePanel}"]`
  );
  if (!activeGroup) return;
  activeGroup.querySelectorAll(".inventory-card").forEach((card) => {
    const name = card.dataset.name?.toLowerCase() || "";
    const tags = card.dataset.tags?.toLowerCase() || "";
    const matches =
      term.length === 0 || name.includes(term) || tags.includes(term);
    card.style.display = matches ? "" : "none";
  });
};

const setCatalogPanel = (panel) => {
  if (!catalogTabs || !catalogGroups) return;
  activePanel = panel;
  catalogTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.panelTrigger === panel);
  });
  catalogGroups.forEach((group) => {
    const isActive = group.dataset.panel === panel;
    group.classList.toggle("hidden", !isActive);
  });
  requestAnimationFrame(() => {
    catalog
      ?.querySelectorAll(`[data-panel="${panel}"] .inventory-card`)
      .forEach((card, index) => {
        card.classList.add("in-view");
        card.style.transitionDelay = `${index * 40}ms`;
      });
  });
  filterInventory();
};

const openCatalog = (panel = activePanel) => {
  if (!catalog) return;
  catalog.classList.add("open");
  catalog.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  setCatalogPanel(panel);
};

const closeCatalog = () => {
  if (!catalog) return;
  catalog.classList.remove("open");
  catalog.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
};

catalogOpeners.forEach((btn) => {
  btn.addEventListener("click", () => openCatalog(btn.dataset.openCatalog));
});

catalogTabs?.forEach((tab) => {
  tab.addEventListener("click", () => setCatalogPanel(tab.dataset.panelTrigger));
});

catalogClose?.addEventListener("click", closeCatalog);

catalog?.addEventListener("click", (event) => {
  if (event.target === catalog) closeCatalog();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCatalog();
});

if (searchInput) {
  searchInput.addEventListener("input", filterInventory);
}

const animatedCards = document.querySelectorAll(".dress-card");
if (animatedCards.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animatedCards.forEach((card) => revealObserver.observe(card));
}

