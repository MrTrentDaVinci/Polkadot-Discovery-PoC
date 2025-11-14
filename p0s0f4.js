// p0s0f4.js
// Components: Cp0s0f4.1 (FilterTemplateManager), Cp0s0f4.2 (QueryContextAnalyzer)
// Purpose: Manages filter templates and analyzes query context for topic detection
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import { TOPIC_IDS, FILTER_CATEGORIES } from "p0s1f1";
import filterTemplates from "p1s1f6";

// Cp0s0f4.1: FilterTemplateManager - Loads and retrieves filter templates
export class FilterTemplateManager {
  constructor() {
    this.templates = filterTemplates; // Load filter templates from p1s1f6.json
  }

  // Get filters for a specific topic
  getFiltersForTopic(topicId) {
    return FILTER_CATEGORIES[topicId] || FILTER_CATEGORIES[TOPIC_IDS.DEFAULT];
  }

  // Validate filter configuration
  validateFilter(filterId, topicId) {
    const filters = this.getFiltersForTopic(topicId);
    return filters.some((filter) => filter.id === filterId);
  }
}

// Cp0s0f4.2: QueryContextAnalyzer - Analyzes query to determine topic
export class QueryContextAnalyzer {
  constructor() {
    this.topicKeywords = this.buildTopicKeywords();
  }

  // Build keyword map from filter templates
  buildTopicKeywords() {
    return {
      [TOPIC_IDS.MOVIES]: [
        "movie",
        "film",
        "cinema",
        "thriller",
        "comedy",
        "drama",
      ],
      [TOPIC_IDS.RESTAURANTS]: [
        "restaurant",
        "food",
        "dinner",
        "lunch",
        "cuisine",
      ],
      [TOPIC_IDS.TRAVEL]: [
        "travel",
        "destination",
        "hotel",
        "flight",
        "vacation",
      ],
      [TOPIC_IDS.EVENTS]: [
        "event",
        "festival",
        "concert",
        "conference",
        "show",
      ],
      [TOPIC_IDS.TECH]: ["tech", "gadget", "device", "laptop", "phone"],
      [TOPIC_IDS.DEFAULT]: [],
    };
  }

  // Detect topic from query string
  detectTopic(query) {
    if (!query || typeof query !== "string") return TOPIC_IDS.DEFAULT;

    const queryLower = query.toLowerCase();
    for (const [topicId, keywords] of Object.entries(this.topicKeywords)) {
      if (keywords.some((keyword) => queryLower.includes(keyword))) {
        return parseInt(topicId, 10);
      }
    }
    return TOPIC_IDS.DEFAULT;
  }
}

export default {
  FilterTemplateManager,
  QueryContextAnalyzer,
};
