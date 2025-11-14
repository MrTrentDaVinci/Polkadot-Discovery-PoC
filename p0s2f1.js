// p0s2f1.js
// Components: Cp0s2f1.1 (QueryParser), Cp0s2f1.2 (KeywordExtractor)
// Purpose: Parses and normalizes search queries, extracts keywords for topic detection
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import { TOPIC_IDS } from "p0s1f1";

// Cp0s2f1.1: QueryParser - Normalizes and validates search queries
export class QueryParser {
  constructor() {
    this.minQueryLength = 3; // Minimum query length for processing
  }

  // Normalize query: trim, lowercase, remove extra spaces
  normalize(query) {
    if (!query || typeof query !== "string") return "";
    return query.trim().toLowerCase().replace(/\s+/g, " ");
  }

  // Validate query: check length and non-empty
  validate(query) {
    const normalized = this.normalize(query);
    return normalized.length >= this.minQueryLength;
  }

  // Parse query: return normalized query or throw error
  parse(query) {
    const normalized = this.normalize(query);
    if (!this.validate(normalized)) {
      throw new Error("Invalid query: too short or empty");
    }
    return normalized;
  }
}

// Cp0s2f1.2: KeywordExtractor - Extracts relevant keywords from query
export class KeywordExtractor {
  constructor() {
    this.stopWords = ["in", "near", "at", "for", "on", "the", "a", "an", "and"];
    this.topicKeywords = {
      [TOPIC_IDS.MOVIES]: [
        "movie",
        "film",
        "cinema",
        "thriller",
        "comedy",
        "drama",
        "showtime",
        "trailer",
      ],
      [TOPIC_IDS.RESTAURANTS]: [
        "restaurant",
        "food",
        "dinner",
        "lunch",
        "cuisine",
        "reservation",
        "menu",
      ],
      [TOPIC_IDS.TRAVEL]: [
        "travel",
        "destination",
        "hotel",
        "flight",
        "vacation",
        "visa",
        "weather",
      ],
      [TOPIC_IDS.EVENTS]: [
        "event",
        "festival",
        "concert",
        "conference",
        "show",
        "ticket",
        "schedule",
      ],
      [TOPIC_IDS.TECH]: [
        "tech",
        "gadget",
        "device",
        "laptop",
        "phone",
        "vr",
        "drone",
      ],
      [TOPIC_IDS.DEFAULT]: [],
    };
  }

  // Extract keywords: remove stop words, return array of relevant terms
  extract(query) {
    if (!query || typeof query !== "string") return [];
    const normalized = query.toLowerCase().trim();
    const words = normalized
      .split(" ")
      .filter((word) => word.length > 2 && !this.stopWords.includes(word));
    return words;
  }

  // Match keywords to topic: return topic ID with highest relevance
  matchTopic(keywords) {
    if (!Array.isArray(keywords) || keywords.length === 0)
      return TOPIC_IDS.DEFAULT;

    let bestTopic = TOPIC_IDS.DEFAULT;
    let maxMatches = 0;

    for (const [topicId, topicKeywords] of Object.entries(this.topicKeywords)) {
      const matches = keywords.filter((keyword) =>
        topicKeywords.includes(keyword),
      ).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestTopic = parseInt(topicId, 10);
      }
    }

    return bestTopic;
  }
}

export default {
  QueryParser,
  KeywordExtractor,
};
