export const brandAssets = {
  wordmark: "/assets/brand/gearbox-wordmark.svg",
  icon: "/assets/brand/gearbox-icon.svg",
};

export const navigation = [
  { href: "#products", label: "Products" },
  { href: "#security", label: "Security" },
  { href: "#footer-links", label: "Docs" },
];

export const mobileNavigation = [
  { href: "#app", label: "Go to App" },
  ...navigation,
];

export const hero = {
  image: "/assets/hero/hero-cityscape@2x.png",
  title: "Tokenisation Lending Stack",
  description:
    "Real-World Assets need Real-World Lending. Gearbox provides institutional credit infrastructure: margin, prime brokerage, portfolio loans.",
};

export const stats = [
  { value: "$12B+", label: "Transaction Volume" },
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
    },
    {
      className: "constraint-violet",
      text: "Custom Deposit and Redemption mechanics",
      number: "02",
    },
    {
      className: "constraint-green",
      text: "Off-chain financial logic from issuers",
      number: "03",
    },
    {
      className: "constraint-gray",
      text: "Legal enforcement workflows",
      number: "04",
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
  ctaLabel: "Request a Demo",
};

export const partnersSection = {
  title: "Trusted Partners",
  partners: [
    {
      name: "Balancer",
      type: "single",
      src: "/assets/partners/partner-balancer.svg",
    },
    {
      name: "Lido",
      type: "single",
      src: "/assets/partners/partner-lido.svg",
    },
    {
      name: "Fuel",
      type: "fuel",
      mark: "/assets/partners/partner-fuel-mark.svg",
      word: "/assets/partners/partner-fuel-wordmark.svg",
    },
    {
      name: "Marginly",
      type: "single",
      src: "/assets/partners/partner-marginly.svg",
    },
    {
      name: "Swell",
      type: "single",
      src: "/assets/partners/partner-swell.svg",
    },
    {
      name: "Zircuit",
      type: "single",
      src: "/assets/partners/partner-zircuit.svg",
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
      rateValue: "8.5%",
      rateLabel: "APY",
      metrics: [
        { label: "Total Value Locked", value: "$125M" },
        { label: "Utilization Rate", value: "78.3%" },
      ],
      assetsLabel: "Supported Assets",
      assets: [
        {
          type: "image",
          src: "/assets/tokens/token-usdc.svg",
          alt: "USDC",
        },
        {
          type: "image",
          src: "/assets/tokens/token-savings-asset.svg",
          alt: "Asset",
        },
        { type: "chip", label: "ETH" },
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
        { label: "Opened Accounts", value: "5,891" },
        { label: "Total Borrowed", value: "$89M" },
      ],
      assetsLabel: "Collateral Types",
      assets: [
        { type: "chip", label: "ETH" },
        {
          type: "image",
          src: "/assets/tokens/token-btcb.svg",
          alt: "BTCB",
        },
        {
          type: "image",
          src: "/assets/tokens/token-collateral-asset.svg",
          alt: "Asset",
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
      icon: "/assets/security/security-live-bug-bounty.svg",
      label: "Live Bug Bounty",
    },
    {
      icon: "/assets/security/security-audits.svg",
      label: "30+ Audits by leading firms",
    },
    {
      icon: "/assets/security/security-institutions.svg",
      label: "Curated by top-tier institutions",
    },
  ],
};

export const footerSection = {
  background: "/assets/footer/footer-background.png",
  title: "Compliant on-chain credit for tokenised assets",
  actions: [
    { label: "Request a Demo", href: "#demo", variant: "light", size: "l", arrow: true },
  ],
  columns: [
    {
      title: "Products",
      links: [
        { label: "Savings Account", href: "#products" },
        { label: "Credit Accounts", href: "#products" },
        { label: "Credit Wallet", href: "#products" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Documentation", href: "#footer-links" },
        { label: "API Reference", href: "#footer-links" },
        { label: "GitHub", href: "#footer-links" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#footer-links" },
        { label: "Blog", href: "#footer-links" },
        { label: "Careers", href: "#footer-links" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "#footer-links" },
        { label: "Privacy Policy", href: "#footer-links" },
        { label: "Security", href: "#security" },
      ],
    },
  ],
  copyright: "© 2026 Gearbox Protocol. All rights reserved.",
  socials: [
    { label: "Twitter", href: "#footer-links" },
    { label: "Discord", href: "#footer-links" },
    { label: "Telegram", href: "#footer-links" },
  ],
};
