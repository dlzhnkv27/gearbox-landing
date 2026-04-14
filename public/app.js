const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
const requestDemoModal = document.getElementById("request-demo-modal");
const requestDemoTriggers = Array.from(document.querySelectorAll("[data-open-demo-modal]"));
const requestDemoCloseButton = requestDemoModal?.querySelector("[data-close-demo-modal]");
const requestDemoForm = requestDemoModal?.querySelector("[data-request-demo-form]");
const requestDemoSubmitLabel = requestDemoModal?.querySelector("[data-demo-submit-label]");
const requestDemoStatus = requestDemoModal?.querySelector("[data-demo-form-status]");
const requestDemoFormPanel = requestDemoModal?.querySelector('[data-demo-modal-panel="form"]');
const requestDemoSuccessPanel = requestDemoModal?.querySelector('[data-demo-modal-panel="success"]');
const requestDemoSuccessHeading = requestDemoSuccessPanel?.querySelector("h2");
const requestDemoFields = requestDemoForm
  ? Array.from(requestDemoForm.querySelectorAll("[data-demo-field]"))
  : [];
const heroCard = document.querySelector(".hero-card");
const constraintLists = Array.from(document.querySelectorAll(".constraint-list"));
const statValueNodes = Array.from(document.querySelectorAll("[data-stat-key]"));
const productValueNodes = Array.from(document.querySelectorAll("[data-product-key]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let heroShadeFrame = 0;
const pendingRemoteSnapshots = new Map();
let activeDemoTrigger = null;
let resetDemoFormOnClose = false;
let hasAttemptedRequestDemoSubmit = false;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const toFiniteNumber = (value) => {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
};

const formatCompactCurrency = (value, withPlus = false) => {
  if (!Number.isFinite(value)) {
    return null;
  }

  const absValue = Math.abs(value);
  const units = [
    { value: 1e12, suffix: "T" },
    { value: 1e9, suffix: "B" },
    { value: 1e6, suffix: "M" },
    { value: 1e3, suffix: "K" },
  ];
  const matchedUnit = units.find((unit) => absValue >= unit.value);
  const suffix = withPlus ? "+" : "";

  if (!matchedUnit) {
    return `$${Math.round(value).toLocaleString("en-US")}${suffix}`;
  }

  const compactValue = value / matchedUnit.value;
  const maximumFractionDigits = Math.abs(compactValue) >= 100 ? 0 : 1;
  const formattedValue = compactValue.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });

  return `$${formattedValue}${matchedUnit.suffix}${suffix}`;
};

const updateHeroShade = () => {
  if (!heroCard) {
    return;
  }

  if (prefersReducedMotion.matches) {
    heroCard.style.setProperty("--hero-overlay-opacity", "0");
    return;
  }

  const heroHeight = Math.max(heroCard.offsetHeight, 1);
  const progress = clamp(window.scrollY / heroHeight, 0, 1);

  heroCard.style.setProperty("--hero-overlay-opacity", progress.toFixed(4));
};

const scheduleHeroShadeUpdate = () => {
  if (!heroCard || heroShadeFrame) {
    return;
  }

  heroShadeFrame = window.requestAnimationFrame(() => {
    heroShadeFrame = 0;
    updateHeroShade();
  });
};

const closeMenu = () => {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
};

const resetRequestDemoPanels = () => {
  if (requestDemoFormPanel) {
    requestDemoFormPanel.hidden = false;
  }

  if (requestDemoSuccessPanel) {
    requestDemoSuccessPanel.hidden = true;
  }

  if (requestDemoStatus) {
    requestDemoStatus.hidden = true;
    requestDemoStatus.textContent = "";
  }
};

const setRequestDemoFieldError = (field, message = "") => {
  const fieldWrapper = field.closest(".request-demo-field");
  const errorNode = fieldWrapper?.querySelector("[data-field-error]");

  if (!fieldWrapper || !errorNode) {
    return;
  }

  const hasError = Boolean(message);

  fieldWrapper.dataset.invalid = hasError ? "true" : "false";
  field.toggleAttribute("aria-invalid", hasError);
  errorNode.hidden = !hasError;
  errorNode.textContent = message;
};

const validateRequestDemoField = (field) => {
  const value = field.value.trim();
  let message = "";

  if (field.required && !value) {
    message = field.dataset.errorRequired || "This field is required.";
  } else if (field.type === "email" && value && !field.validity.valid) {
    message = field.dataset.errorEmail || "Enter a valid email address.";
  }

  setRequestDemoFieldError(field, message);
  return !message;
};

const validateRequestDemoForm = () => {
  if (!requestDemoFields.length) {
    return true;
  }

  let firstInvalidField = null;
  const isValid = requestDemoFields.every((field) => {
    const fieldIsValid = validateRequestDemoField(field);

    if (!fieldIsValid && !firstInvalidField) {
      firstInvalidField = field;
    }

    return fieldIsValid;
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
  }

  return isValid;
};

const resetRequestDemoFieldErrors = () => {
  requestDemoFields.forEach((field) => setRequestDemoFieldError(field));
};

const resetRequestDemoFormState = () => {
  if (requestDemoForm) {
    requestDemoForm.reset();
    requestDemoForm.removeAttribute("aria-busy");
  }

  hasAttemptedRequestDemoSubmit = false;
  resetRequestDemoFieldErrors();
  resetRequestDemoPanels();

  if (requestDemoSubmitLabel) {
    requestDemoSubmitLabel.textContent = "Send";
  }
};

const setRequestDemoSubmitting = (isSubmitting) => {
  if (requestDemoForm) {
    requestDemoForm.setAttribute("aria-busy", isSubmitting ? "true" : "false");
  }

  if (requestDemoSubmitLabel) {
    requestDemoSubmitLabel.textContent = isSubmitting ? "Sending..." : "Send";
  }

  const submitButton = requestDemoForm?.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.disabled = isSubmitting;
  }
};

const showRequestDemoSuccess = () => {
  if (requestDemoFormPanel) {
    requestDemoFormPanel.hidden = true;
  }

  if (requestDemoSuccessPanel) {
    requestDemoSuccessPanel.hidden = false;
  }

  if (requestDemoSuccessHeading) {
    requestDemoSuccessHeading.focus();
  }
};

const openRequestDemoModal = (trigger) => {
  if (!requestDemoModal || requestDemoModal.open) {
    return;
  }

  closeMenu();
  activeDemoTrigger = trigger;
  requestDemoModal.showModal();
  document.body.classList.add("demo-modal-open");
  window.requestAnimationFrame(() => {
    requestDemoForm?.querySelector("input, textarea")?.focus();
  });
};

const closeRequestDemoModal = () => {
  if (!requestDemoModal?.open) {
    return;
  }

  requestDemoModal.close();
};

const isPlaceholderRequestDemoAction = (action) => {
  return /your-form-id|placeholder/i.test(action);
};

const remoteFormatters = {
  currencyCompactPlus(value) {
    return formatCompactCurrency(value, true);
  },

  currencyCompact(value) {
    return formatCompactCurrency(value, false);
  },

  integerGrouped(value) {
    if (!Number.isFinite(value)) {
      return null;
    }

    return Math.round(value).toLocaleString("en-US");
  },

  percentFixed1(value) {
    if (!Number.isFinite(value)) {
      return null;
    }

    return `${value.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}%`;
  },
};

const remoteSourceConfigs = {
  stakingStats: {
    endpoint: "https://charts-server.fly.dev/api/staking_stats",
    cacheKey: "gearbox-landing:remote:staking:v3",
    normalize(payload) {
      const txVolume = Number(payload?.txVolume);
      const supportedVaults = Array.isArray(payload?.supportedVaults) ? payload.supportedVaults : [];
      const savingsTotalSupply = supportedVaults.reduce(
        (sum, vault) => sum + toFiniteNumber(vault?.balanceUSD),
        0,
      );
      const savingsTotalBorrowed = supportedVaults.reduce(
        (sum, vault) => sum + toFiniteNumber(vault?.borrowedUSD),
        0,
      );
      const savingsMaxApy = supportedVaults.reduce((maxApy, vault) => {
        const nextApy = toFiniteNumber(vault?.DepositApy ?? vault?.apr);

        return Math.max(maxApy, nextApy);
      }, 0);
      const savingsUtilizationRate =
        savingsTotalSupply > 0 ? (savingsTotalBorrowed / savingsTotalSupply) * 100 : null;

      if (!Number.isFinite(txVolume)) {
        return null;
      }

      return {
        txVolume,
        savingsTotalSupply,
        savingsTotalBorrowed,
        savingsMaxApy,
        savingsUtilizationRate,
      };
    },
  },

  creditManagersAllNetworks: {
    endpoint: "https://charts-server.fly.dev/api/gearbox/credit_managers/aggregated/stats",
    cacheKey: "gearbox-landing:remote:credit-managers-all-networks:v1",
    normalize(payload) {
      const creditManagers = Array.isArray(payload?.data) ? payload.data : [];

      if (creditManagers.length === 0) {
        return null;
      }

      return {
        primeOpenedAccounts: creditManagers.reduce(
          (sum, manager) => sum + toFiniteNumber(manager?.openedAccountsCount),
          0,
        ),
        primeTotalBorrowed: creditManagers.reduce(
          (sum, manager) => sum + toFiniteNumber(manager?.totalBorrowedInUSD),
          0,
        ),
      };
    },
  },
};

const applyRemoteValue = (node, rawValue) => {
  const formatter = remoteFormatters[node.dataset.statFormat || node.dataset.productFormat || ""];

  if (!formatter) {
    node.textContent = String(rawValue);
    return;
  }

  const formattedValue = formatter(rawValue);

  if (!formattedValue) {
    return;
  }

  node.textContent = formattedValue;
};

const getRemoteBindingsBySource = (nodes, sourceAttribute, keyAttribute, cardSelector) => {
  const bindings = new Map();

  nodes.forEach((node) => {
    const source = node.dataset[sourceAttribute];
    const key = node.dataset[keyAttribute];

    if (!source || !key) {
      return;
    }

    if (!bindings.has(source)) {
      bindings.set(source, []);
    }

    bindings.get(source).push({
      node,
      key,
      card: node.closest(cardSelector),
    });
  });

  return bindings;
};

const getStatBindingsBySource = () => {
  return getRemoteBindingsBySource(statValueNodes, "statSource", "statKey", "[data-stat-card]");
};

const getProductBindingsBySource = () => {
  return getRemoteBindingsBySource(
    productValueNodes,
    "productSource",
    "productKey",
    "[data-product-card]",
  );
};

const readRemoteCache = (cacheKey) => {
  try {
    const cachedValue = window.localStorage.getItem(cacheKey);

    if (!cachedValue) {
      return null;
    }

    const parsedValue = JSON.parse(cachedValue);

    if (!parsedValue || typeof parsedValue !== "object" || !parsedValue.data) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
};

const writeRemoteCache = (cacheKey, data) => {
  try {
    window.localStorage.setItem(
      cacheKey,
      JSON.stringify({
        version: 1,
        updatedAt: new Date().toISOString(),
        data,
      }),
    );
  } catch {
    // Ignore storage failures and keep the current DOM state.
  }
};

const applyRemoteSnapshot = (bindings, snapshot) => {
  bindings.forEach(({ node, key }) => {
    const rawValue = snapshot?.[key];

    if (!Number.isFinite(rawValue)) {
      return;
    }

    applyRemoteValue(node, rawValue);
  });
};

const setRemoteLoadingState = (bindings, isLoading, loadingClass) => {
  bindings.forEach(({ card }) => {
    if (!card) {
      return;
    }

    card.classList.toggle(loadingClass, isLoading);
    card.setAttribute("aria-busy", isLoading ? "true" : "false");
  });
};

const fetchRemoteSnapshot = async (source, sourceConfig) => {
  if (pendingRemoteSnapshots.has(source)) {
    return pendingRemoteSnapshots.get(source);
  }

  const request = (async () => {
    const response = await fetch(sourceConfig.endpoint, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const normalizedSnapshot = sourceConfig.normalize(payload);

    if (!normalizedSnapshot) {
      throw new Error("API payload did not produce a valid remote snapshot");
    }

    writeRemoteCache(sourceConfig.cacheKey, normalizedSnapshot);

    return normalizedSnapshot;
  })();

  pendingRemoteSnapshots.set(source, request);

  try {
    return await request;
  } finally {
    pendingRemoteSnapshots.delete(source);
  }
};

const hydrateRemoteBindings = (bindingsBySource, loadingClass, fallbackAttribute) => {
  bindingsBySource.forEach(async (bindings, source) => {
    const sourceConfig = remoteSourceConfigs[source];

    if (!sourceConfig) {
      return;
    }

    const cachedSnapshot = readRemoteCache(sourceConfig.cacheKey);

    if (cachedSnapshot?.data) {
      applyRemoteSnapshot(bindings, cachedSnapshot.data);
    }

    setRemoteLoadingState(bindings, true, loadingClass);

    try {
      const normalizedSnapshot = await fetchRemoteSnapshot(source, sourceConfig);
      applyRemoteSnapshot(bindings, normalizedSnapshot);
    } catch {
      bindings.forEach(({ node }) => {
        if (!node.textContent?.trim()) {
          node.textContent = node.dataset[fallbackAttribute] || "";
        }
      });
    } finally {
      setRemoteLoadingState(bindings, false, loadingClass);
    }
  });
};

const hydrateRemoteStats = () => {
  if (statValueNodes.length === 0) {
    return;
  }

  hydrateRemoteBindings(getStatBindingsBySource(), "is-stat-loading", "statFallback");
};

const hydrateRemoteProducts = () => {
  if (productValueNodes.length === 0) {
    return;
  }

  hydrateRemoteBindings(getProductBindingsBySource(), "is-product-loading", "productFallback");
};

const openMenu = () => {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close menu");
  mobileMenu.hidden = false;
  document.body.classList.add("menu-open");
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    if (mobileMenu.hidden) {
      openMenu();
      return;
    }

    closeMenu();
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

requestDemoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openRequestDemoModal(trigger);
  });
});

requestDemoCloseButton?.addEventListener("click", closeRequestDemoModal);

requestDemoModal?.addEventListener("close", () => {
  document.body.classList.remove("demo-modal-open");

  if (resetDemoFormOnClose) {
    resetRequestDemoFormState();
    resetDemoFormOnClose = false;
  }

  activeDemoTrigger?.focus?.();
  activeDemoTrigger = null;
});

requestDemoFields.forEach((field) => {
  field.addEventListener("input", () => {
    if (hasAttemptedRequestDemoSubmit) {
      validateRequestDemoField(field);
    }
  });
});

requestDemoForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  hasAttemptedRequestDemoSubmit = true;
  resetRequestDemoPanels();

  if (!validateRequestDemoForm()) {
    return;
  }

  setRequestDemoSubmitting(true);

  try {
    if (isPlaceholderRequestDemoAction(requestDemoForm.action)) {
      await new Promise((resolve) => window.setTimeout(resolve, 400));
    } else {
      const response = await fetch(requestDemoForm.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(requestDemoForm),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
    }

    resetDemoFormOnClose = true;
    showRequestDemoSuccess();
  } catch {
    if (requestDemoStatus) {
      requestDemoStatus.hidden = false;
      requestDemoStatus.textContent =
        "Something went wrong. Please try again or book a short call with us.";
    }
  } finally {
    setRequestDemoSubmitting(false);
  }
});

hydrateRemoteStats();
hydrateRemoteProducts();

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const motionGroups = Array.from(document.querySelectorAll("[data-motion-group]"));
const motionBlocks = Array.from(document.querySelectorAll("[data-motion-block]"));
let lastScrollY = window.scrollY;
let scrollDirection = "down";

const getVisibleHeight = (element) => {
  const rect = element.getBoundingClientRect();
  return Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
};

const getVisibleRatio = (element) => {
  const rect = element.getBoundingClientRect();
  const visibleHeight = getVisibleHeight(element);

  if (rect.height <= 0) {
    return 0;
  }

  return visibleHeight / rect.height;
};

const setScrollDirection = () => {
  const nextScrollY = window.scrollY;

  if (nextScrollY > lastScrollY) {
    scrollDirection = "down";
  } else if (nextScrollY < lastScrollY) {
    scrollDirection = "up";
  }

  lastScrollY = nextScrollY;
  scheduleHeroShadeUpdate();
};

window.addEventListener("scroll", setScrollDirection, { passive: true });
window.addEventListener("resize", scheduleHeroShadeUpdate);
prefersReducedMotion.addEventListener("change", scheduleHeroShadeUpdate);
scheduleHeroShadeUpdate();

constraintLists.forEach((list) => {
  const cards = Array.from(list.querySelectorAll(".constraint-card"));

  cards.forEach((card, index) => {
    card.addEventListener("pointerenter", () => {
      list.dataset.activeIndex = String(index + 1);
    });
  });

  list.addEventListener("pointerleave", () => {
    delete list.dataset.activeIndex;
  });
});

if (motionGroups.length > 0 || motionBlocks.length > 0) {
  const observedItems = [];
  const observedBlocks = [];

  const resetMotionTarget = ({ element, content }) => {
    element.dataset.motionState = "pending";
    content.classList.add("is-motion-pending");
    content.classList.remove("is-motion-visible", "is-motion-revealing");
  };

  const revealMotionTarget = ({ element, content, delay = 0 }, animated) => {
    if (element.dataset.motionState === "revealed") {
      return;
    }

    element.dataset.motionState = "revealed";
    content.classList.add("is-motion-pending");

    if (!animated) {
      content.classList.add("is-motion-visible");
      content.classList.remove("is-motion-revealing");
      return;
    }

    window.setTimeout(() => {
      content.classList.add("is-motion-revealing");

      window.requestAnimationFrame(() => {
        content.classList.add("is-motion-visible");
      });
    }, delay);
  };

  motionGroups.forEach((group) => {
    const threshold = Number.parseFloat(group.dataset.motionThreshold || "0.5");
    const items = Array.from(group.querySelectorAll("[data-motion-item]"));

    items.forEach((item) => {
      const content = item.matches("[data-motion-content]") ? item : item.querySelector("[data-motion-content]");

      if (!content) {
        return;
      }

      const isAboveViewport = item.getBoundingClientRect().bottom <= 0;
      const isAlreadyVisible = getVisibleRatio(item) >= threshold;

      if (prefersReducedMotion.matches || isAboveViewport || isAlreadyVisible) {
        item.dataset.motionState = "revealed";
        content.classList.add("is-motion-visible");
      } else {
        resetMotionTarget({ element: item, content });
      }

      observedItems.push({
        item,
        content,
        threshold,
        delay: Number.parseInt(item.dataset.motionIndex || "0", 10) * Number.parseInt(group.dataset.motionStagger || "0", 10),
      });
    });
  });

  motionBlocks.forEach((block) => {
    const content = block.matches("[data-motion-content]") ? block : block.querySelector("[data-motion-content]");

    if (!content) {
      return;
    }

    const minVisible = Number.parseInt(block.dataset.motionMinVisible || "100", 10);
    const requiredVisible = Math.min(minVisible, Math.ceil(block.getBoundingClientRect().height || minVisible));
    const isAboveViewport = block.getBoundingClientRect().bottom <= 0;
    const isAlreadyVisible = getVisibleHeight(block) >= requiredVisible;

    if (prefersReducedMotion.matches || isAboveViewport || isAlreadyVisible) {
      block.dataset.motionState = "revealed";
      content.classList.add("is-motion-visible");
    } else {
      resetMotionTarget({ element: block, content });
    }

    observedBlocks.push({ block, content, requiredVisible });
  });

  document.documentElement.classList.add("motion-ready");

  if (!prefersReducedMotion.matches && observedItems.length > 0) {
    const motionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const item = entry.target;
          const content = item.matches("[data-motion-content]") ? item : item.querySelector("[data-motion-content]");

          if (!content) {
            observer.unobserve(item);
            return;
          }

          if (!entry.isIntersecting) {
            resetMotionTarget({ element: item, content });
            return;
          }

          if (scrollDirection !== "down") {
            revealMotionTarget({ element: item, content }, false);
            return;
          }

          if (entry.intersectionRatio < Number.parseFloat(item.dataset.motionThreshold || "0.5")) {
            return;
          }

          const delay = Number.parseInt(item.dataset.motionDelay || "0", 10);
          const shouldAnimate = scrollDirection === "down";

          revealMotionTarget({ element: item, content, delay }, shouldAnimate);
        });
      },
      {
        threshold: [0, 0.5],
      },
    );

    observedItems.forEach(({ item, threshold, delay }) => {
      item.dataset.motionThreshold = String(threshold);
      item.dataset.motionDelay = String(delay);
      motionObserver.observe(item);
    });
  }

  if (!prefersReducedMotion.matches && observedBlocks.length > 0) {
    const blockObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const block = entry.target;
          const content = block.matches("[data-motion-content]") ? block : block.querySelector("[data-motion-content]");

          if (!content) {
            observer.unobserve(block);
            return;
          }

          if (!entry.isIntersecting) {
            resetMotionTarget({ element: block, content });
            return;
          }

          if (scrollDirection !== "down") {
            revealMotionTarget({ element: block, content }, false);
            return;
          }

          const requiredVisible = Number.parseInt(block.dataset.motionRequiredVisible || "100", 10);

          if (getVisibleHeight(block) < requiredVisible) {
            return;
          }

          revealMotionTarget({ element: block, content }, scrollDirection === "down");
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, index) => index / 100),
      },
    );

    observedBlocks.forEach(({ block, requiredVisible }) => {
      block.dataset.motionRequiredVisible = String(requiredVisible);
      blockObserver.observe(block);
    });
  }
}
