const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

const closeMenu = () => {
  if (!menuToggle || !mobileMenu) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
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

if (menuClose) {
  menuClose.addEventListener("click", closeMenu);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const motionGroups = Array.from(document.querySelectorAll("[data-motion-group]"));
const motionBlocks = Array.from(document.querySelectorAll("[data-motion-block]"));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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
};

window.addEventListener("scroll", setScrollDirection, { passive: true });

if (motionGroups.length > 0 || motionBlocks.length > 0) {
  const pendingItems = [];
  const pendingBlocks = [];

  const revealMotionTarget = ({ element, content, delay = 0 }, animated) => {
    if (element.dataset.motionState === "revealed") {
      return;
    }

    element.dataset.motionState = "revealed";

    if (!animated) {
      content.classList.add("is-motion-visible");
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
        return;
      }

      content.classList.add("is-motion-pending");
      pendingItems.push({
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

    const minVisible = Number.parseInt(block.dataset.motionMinVisible || "150", 10);
    const requiredVisible = Math.min(minVisible, Math.ceil(block.getBoundingClientRect().height || minVisible));
    const isAboveViewport = block.getBoundingClientRect().bottom <= 0;
    const isAlreadyVisible = getVisibleHeight(block) >= requiredVisible;

    if (prefersReducedMotion.matches || isAboveViewport || isAlreadyVisible) {
      block.dataset.motionState = "revealed";
      content.classList.add("is-motion-visible");
      return;
    }

    content.classList.add("is-motion-pending");
    pendingBlocks.push({ block, content, requiredVisible });
  });

  document.documentElement.classList.add("motion-ready");

  if (!prefersReducedMotion.matches && pendingItems.length > 0) {
    const motionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < Number.parseFloat(entry.target.dataset.motionThreshold || "0.5")) {
            return;
          }

          const item = entry.target;
          const content = item.matches("[data-motion-content]") ? item : item.querySelector("[data-motion-content]");

          if (!content) {
            observer.unobserve(item);
            return;
          }

          const delay = Number.parseInt(item.dataset.motionDelay || "0", 10);
          const shouldAnimate = scrollDirection === "down";

          revealMotionTarget({ element: item, content, delay }, shouldAnimate);
          observer.unobserve(item);
        });
      },
      {
        threshold: [0.5],
      },
    );

    pendingItems.forEach(({ item, threshold, delay }) => {
      item.dataset.motionThreshold = String(threshold);
      item.dataset.motionDelay = String(delay);
      motionObserver.observe(item);
    });
  }

  if (!prefersReducedMotion.matches && pendingBlocks.length > 0) {
    const blockObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const block = entry.target;
          const content = block.matches("[data-motion-content]") ? block : block.querySelector("[data-motion-content]");

          if (!content) {
            observer.unobserve(block);
            return;
          }

          const requiredVisible = Number.parseInt(block.dataset.motionRequiredVisible || "150", 10);

          if (getVisibleHeight(block) < requiredVisible) {
            return;
          }

          revealMotionTarget({ element: block, content }, scrollDirection === "down");
          observer.unobserve(block);
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, index) => index / 100),
      },
    );

    pendingBlocks.forEach(({ block, requiredVisible }) => {
      block.dataset.motionRequiredVisible = String(requiredVisible);
      blockObserver.observe(block);
    });
  }
}
