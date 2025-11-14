// p0s1f1.js
// Component: Cp0s1f1.1 (AppConfig)
// Purpose: Exports application-wide configuration constants for topics, filters, and Polkadot network settings
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

// Application configuration
export const APP_CONFIG = {
  APP_NAME: "Decentralized Content Discovery Platform",
  VERSION: "0.1.0",
  ENVIRONMENT: process.env.NODE_ENV || "development",
  DEFAULT_TOPIC: "default",
};

// Topic identifiers for search context
export const TOPIC_IDS = {
  MOVIES: 64,
  RESTAURANTS: 128,
  TRAVEL: 256,
  EVENTS: 512,
  TECH: 1024,
  DEFAULT: 0,
};

// Filter categories for dynamic filter selection
export const FILTER_CATEGORIES = {
  [TOPIC_IDS.MOVIES]: [
    {
      id: "showtimes",
      type: "checkbox",
      label: "Showtimes Near Me",
      newsletter: true,
    },
    {
      id: "trailers",
      type: "checkbox",
      label: "Include Trailers",
      newsletter: true,
    },
    {
      id: "in_theaters",
      type: "checkbox",
      label: "Currently in Theaters",
      newsletter: false,
    },
  ],
  [TOPIC_IDS.RESTAURANTS]: [
    {
      id: "reservations",
      type: "checkbox",
      label: "Reservations Tonight",
      newsletter: true,
    },
    {
      id: "ambiance",
      type: "multi-select",
      label: "Ambiance",
      options: ["romantic", "casual", "formal"],
      newsletter: false,
    },
    {
      id: "dietary",
      type: "multi-select",
      label: "Dietary Options",
      options: ["vegan", "gluten-free", "halal"],
      newsletter: true,
    },
  ],
  [TOPIC_IDS.TRAVEL]: [
    { id: "hotels", type: "checkbox", label: "Hotel Deals", newsletter: true },
    {
      id: "flights",
      type: "checkbox",
      label: "Flight Options",
      newsletter: true,
    },
    {
      id: "weather",
      type: "checkbox",
      label: "Local Weather",
      newsletter: false,
    },
  ],
  [TOPIC_IDS.EVENTS]: [
    {
      id: "tickets",
      type: "checkbox",
      label: "Ticket Availability",
      newsletter: true,
    },
    {
      id: "schedules",
      type: "checkbox",
      label: "Event Schedules",
      newsletter: true,
    },
    {
      id: "venues",
      type: "checkbox",
      label: "Venue Details",
      newsletter: false,
    },
  ],
  [TOPIC_IDS.TECH]: [
    { id: "specs", type: "checkbox", label: "Product Specs", newsletter: true },
    {
      id: "reviews",
      type: "checkbox",
      label: "User Reviews",
      newsletter: true,
    },
    {
      id: "prices",
      type: "slider",
      label: "Price Range",
      min: 0,
      max: 1000,
      newsletter: false,
    },
  ],
  [TOPIC_IDS.DEFAULT]: [],
};

// Polkadot network configuration
export const POLKADOT_CONFIG = {
  NETWORK: "westend",
  WS_PROVIDER: "wss://westend-rpc.polkadot.io",
  STORAGE_KEY: "user_preferences",
  CHAIN_NAME: "Westend Testnet",
  SS58_FORMAT: 42, // Westend address format
};

// Filter types supported by the application
export const FILTER_TYPES = {
  CHECKBOX: "checkbox",
  MULTI_SELECT: "multi-select",
  SLIDER: "slider",
};
