// p0s2f2.js
// Component: Cp0s2f2.1 (FilterSelector)
// Purpose: Selects topic-specific filters based on query and topic
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import { TOPIC_IDS, FILTER_CATEGORIES } from "p0s1f1";
import { FilterTemplateManager, QueryContextAnalyzer } from "p0s0f4";
import { QueryParser, KeywordExtractor } from "p0s2f1";

// Cp0s2f2.1: FilterSelector - Selects and prioritizes filters for a given query
export class FilterSelector {
  constructor() {
    this.templateManager = new FilterTemplateManager();
    this.queryAnalyzer = new QueryContextAnalyzer();
    this.queryParser = new QueryParser();
    this.keywordExtractor = new KeywordExtractor();
  }

  // Select filters based on query string
  selectFilters(query) {
    try {
      // Parse and validate query
      const normalizedQuery = this.queryParser.parse(query);
      const keywords = this.keywordExtractor.extract(normalizedQuery);

      // Detect topic from query
      const topicId = this.queryAnalyzer.detectTopic(normalizedQuery);
      if (topicId === TOPIC_IDS.DEFAULT) {
        return this.getDefaultFilters();
      }

      // Get topic-specific filters
      const filters = this.templateManager.getFiltersForTopic(topicId);
      if (!filters || filters.length === 0) {
        return this.getDefaultFilters();
      }

      // Prioritize filters based on keywords
      return this.prioritizeFilters(filters, keywords);
    } catch (error) {
      console.warn(`Filter selection failed: ${error.message}`);
      return this.getDefaultFilters();
    }
  }

  // Get default filters for fallback
  getDefaultFilters() {
    return FILTER_CATEGORIES[TOPIC_IDS.DEFAULT] || [];
  }

  // Prioritize filters based on keyword relevance
  prioritizeFilters(filters, keywords) {
    if (!keywords || keywords.length === 0) return filters;

    // Map filter keywords for prioritization
    const filterKeywordMap = {
      showtimes: ["showtime", "screening", "times"],
      genres: ["genre", "thriller", "comedy", "drama"],
      reservations: ["reservation", "booking", "table"],
      dietary: ["vegan", "vegetarian", "gluten-free"],
      price: ["price", "cost", "budget"],
      location: ["location", "near", "city"],
      dates: ["date", "when", "schedule"],
      type: ["type", "category", "kind"],
    };

    // Score filters based on keyword matches
    const scoredFilters = filters.map((filter) => {
      const filterKeywords = filterKeywordMap[filter.id] || [];
      const score = keywords.reduce((acc, keyword) => {
        return acc + (filterKeywords.includes(keyword) ? 1 : 0);
      }, 0);
      return { ...filter, score };
    });

    // Sort by score (descending) and limit to top filters
    return scoredFilters
      .sort((a, b) => b.score - a.score)
      .slice(0, 5) // Limit to 5 filters for UI
      .map(({ score, ...filter }) => filter); // Remove score from output
  }
}

export default FilterSelector;
