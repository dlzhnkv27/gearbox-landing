export const brandAssets = {
  wordmark: "/assets/brand/gearbox-wordmark.svg",
  icon: "/assets/brand/gearbox-icon.svg",
};

export const navigation = [
  { href: "#products", label: "Products" },
  { href: "#security", label: "Security" },
  { href: "https://docs.gearbox.finance/", label: "Docs" },
];

export const mobileNavigation = [
  { href: "https://app.gearbox.fi", label: "Open App" },
  ...navigation,
];

export const requestDemoModal = {
  formAction: "https://formspree.io/f/your-form-id",
  calendlyHref: "https://calendly.com/your-team/short-call",
};

export const hero = {
  image: "/assets/hero/hero-cityscape@2x.avif",
  imageMobile: "/assets/hero/hero-cityscape-mobile@2x.avif",
  imageMobileFallback: "/assets/hero/hero-cityscape-mobile@2x.png",
  title: "Tokenisation Lending Stack",
  description:
    "Real-World Assets need Real-World Lending. Gearbox provides institutional credit infrastructure: margin, prime brokerage, portfolio loans.",
};

export const stats = [
  {
    value: "$12B+",
    label: "Transaction Volume",
    apiSource: "stakingStats",
    apiField: "txVolume",
    apiFormat: "currencyCompactPlus",
  },
  { value: "$3M+", label: "Spent on Security" },
  { value: "2021", label: "Battle Tested Since" },
];

export const constraintsSection = {
  title: "On-chain assets —\noff-chain constraints",
  description:
    "Tokenised assets are not standard DeFi assets. They come with specific requirements. Traditional lending pools cannot handle this model. Gearbox was designed for such cases.",
  graphic: "/assets/constraints/constraints-cycles.svg",
  cards: [
    {
      className: "constraint-blue",
      text: "Regulatory and KYC requirements",
      number: "01",
      body:
        "Segregated accounts act as standard wallets, enforcing token whitelists and transfer rules natively — no wrappers, no bypass of issuer compliance.",
    },
    {
      className: "constraint-violet",
      text: "Custom Deposit and Redemption mechanics",
      number: "02",
      body:
        "Adapts to each asset's native flows instead of forcing standards — simple wallet UX with embedded credit.",
    },
    {
      className: "constraint-green",
      text: "Off-chain financial logic from issuers",
      number: "03",
      body:
        "Supports complex asset rules (permissions, lifecycle, restrictions) — enabling tailored credit and risk per instrument.",
    },
    {
      className: "constraint-gray",
      text: "Legal enforcement workflows",
      number: "04",
      body:
        "Modular enforcement (freezes, transfers, compliance actions) without changing core contracts.",
    },
  ],
};

const sharedFeatureBase = "/assets/accounts/feature-card-base.svg";

export const accountsSection = {
  title: "Segregated Accounts",
  description: "Mirror TradFi relationships in DeFi to ensure a seamless experience",
  leftFeatures: [
    {
      title: "1 account -> 1 user",
      items: [
        "Per-account allowlists and role policies",
        "Jurisdiction filters",
        "Per-user risk limits",
      ],
      icon: {
        base: sharedFeatureBase,
        layers: [
          {
            className: "feature-line",
            src: "/assets/accounts/feature-account-line.svg",
          },
          {
            className: "feature-left",
            src: "/assets/accounts/feature-account-left-node.svg",
          },
          {
            className: "feature-right",
            src: "/assets/accounts/feature-account-right-node.svg",
          },
        ],
      },
    },
    {
      title: "Issuer-Aware Mechanics",
      items: [
        "Direct access to issuer functions (e.g., Provenance)",
        "Custom deposit and redemption options",
        "Support for legal enforcement cases (inheritance, freezes)",
      ],
      icon: {
        base: sharedFeatureBase,
        layers: [
          {
            className: "feature-shield",
            src: "/assets/accounts/feature-issuer-aware-shield.svg",
          },
        ],
      },
    },
  ],
  rightFeatures: [
    {
      title: "Zero Slippage",
      items: [
        "Capital and time efficiency",
        "Fast and zero risk entry and exit",
        "Fully auditable cashflows",
      ],
      icon: {
        base: sharedFeatureBase,
        layers: [
          {
            className: "feature-union",
            src: "/assets/accounts/feature-zero-slippage-icon.svg",
          },
        ],
      },
    },
    {
      title: "Switch to Automated Leverage",
      items: [
        "Powerful UX with low entry barrier",
        "Prime brokerage-alike product creates additional revenue stream",
        "Liquidation protection for your users",
      ],
      icon: {
        base: "/assets/accounts/feature-automated-leverage-base.svg",
        layers: [
          {
            className: "feature-ring-one",
            src: "/assets/accounts/feature-automated-leverage-ring-one.svg",
          },
          {
            className: "feature-ring-two",
            src: "/assets/accounts/feature-automated-leverage-ring-two.svg",
          },
          {
            className: "feature-ring-three",
            src: "/assets/accounts/feature-automated-leverage-ring-three.svg",
          },
        ],
      },
    },
  ],
};

export const demoSection = {
  title: "Request a Demo",
  description:
    "Ready to explore how our protocol can power your next move in DeFi? Book a personalized demo and discover what's possible - from integration to launch.",
  ctaHref: "#footer-links",
  ctaOpensDemoModal: true,
  ctaLabel: "Request a Demo",
};

export const partnersSection = {
  title: "Trusted Partners",
  showTestimonials: false,
  partners: [
    {
      name: "Pendle",
      type: "single",
      src: "/assets/partners/partner-pendle.svg",
    },
    {
      name: "Lido",
      type: "single",
      src: "/assets/partners/partner-lido.svg",
    },
    {
      name: "Renzo",
      type: "single",
      src: "/assets/partners/partner-renzo.svg",
    },
    {
      name: "Convex",
      type: "single",
      src: "/assets/partners/partner-convex.svg",
    },
    {
      name: "Ethena",
      type: "single",
      src: "/assets/partners/partner-ethena.svg",
    },
    {
      name: "Curve",
      type: "single",
      src: "/assets/partners/partner-curve.svg",
    },
  ],
  testimonials: Array.from({ length: 3 }, () => ({
    quote:
      "In our hypothetical collaboration with Gearbox Protocol, we saw how their leverage primitives can enhance capital efficiency — it's an exciting framework for composable risk.",
    avatar: "/assets/testimonials/testimonial-alexandre-dupont.png",
    name: "Alexandre Dupont",
    role: "Product Lead at Aave Protocol",
  })),
};

export const productsSection = {
  title: "Products",
  description: "Explore the products already up and running on the Gearbox infrastructure",
  cards: [
    {
      className: "product-card-blue",
      title: "Long-term Savings",
      description: "Professionally managed passive yield for institutional allocators",
      rateValue: "Up to 14%",
      rateLabel: "APY",
      metrics: [
        {
          label: "Cumulative Supply",
          value: "$3.7B",
        },
        {
          label: "Av. Utilization Rate",
          value: "80%",
        },
      ],
      assetsLabel: "Supported Assets",
      assets: [
        {
          type: "image",
          src: "/assets/tokens/product-asset-6.svg",
          alt: "ETH",
        },
        {
          type: "image",
          src: "/assets/tokens/product-asset-5.svg",
          alt: "BTC",
        },
        {
          type: "chip",
          label: "and more",
        },
      ],
      ctaLabel: "Start Earning",
      ctaArrow: true,
      ctaLightArrow: true,
    },
    {
      className: "product-card-violet",
      title: "Prime Brokerage",
      description: "Institutional-grade leverage and credit lines for approved participants",
      rateValue: "10×",
      rateLabel: "MAX",
      metrics: [
        {
          label: "Opened Accounts",
          value: "10K+",
        },
        {
          label: "All-time Borrowed",
          value: "$1.5B",
        },
      ],
      assetsLabel: "Collateral Types",
      assets: [
        {
          type: "image",
          src: "/assets/tokens/product-asset-4.svg",
          alt: "Collateral asset 1",
        },
        {
          type: "image",
          src: "/assets/tokens/product-asset-5.svg",
          alt: "Collateral asset 2",
        },
        {
          type: "image",
          src: "/assets/tokens/product-asset-6.svg",
          alt: "Collateral asset 3",
        },
      ],
      ctaLabel: "Apply for Account",
      ctaArrow: true,
      ctaLightArrow: true,
    },
  ],
};

export const securitySection = {
  title: "More than $3M spent on security",
  description:
    "Gearbox has been live since 2021 with 0 breaches and incidents. Safety and security-first are at the core of our vision.",
  cards: [
    {
      icon: "/assets/security/security-icon-1.svg",
      label: "Live Bug Bounty",
    },
    {
      icon: "/assets/security/security-icon-2.svg",
      label: "30+ Audits by leading firms",
    },
    {
      icon: "/assets/security/security-icon-3.svg",
      label: "Curated by top-tier institutions",
    },
  ],
};

export const footerSection = {
  background: "/assets/footer/footer-background.jpg",
  title: "Compliant on-chain credit for tokenised assets",
  actions: [
    {
      label: "Request a Demo",
      href: "#demo",
      variant: "light",
      size: "l",
      arrow: true,
      openDemoModal: true,
    },
  ],
  columns: [
    {
      title: "Products",
      links: [
        { label: "Savings Account", href: "#products" },
        { label: "Credit Accounts", href: "#products" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Documentation", href: "https://docs.gearbox.finance/" },
        { label: "SDK Reference", href: "https://docs.gearbox.finance/dev" },
        { label: "Github", href: "https://github.com/Gearbox-protocol" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "https://docs.gearbox.finance/about-gearbox" },
        { label: "Blog", href: "https://blog.gearbox.finance/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "https://gearbox.finance/terms" },
        { label: "Privacy", href: "https://gearbox.finance/privacy" },
        { label: "Risks", href: "https://gearbox.finance/risks" },
      ],
    },
  ],
  copyright: "© 2026 Gearbox Protocol. All rights reserved.",
  socials: [
    { label: "Twitter", href: "https://x.com/GearboxProtocol" },
    { label: "Discord", href: "https://discord.com/invite/gearbox" },
    { label: "Telegram", href: "https://t.me/GearboxProtocol" },
  ],
};
