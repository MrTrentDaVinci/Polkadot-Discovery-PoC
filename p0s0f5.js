// p0s0f5.js
// Component: Cp0s0f5.1 (MockDataManager)
// Purpose: Loads and serves mock search data from JSON files for movies, restaurants, travel, events, and tech
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import { TOPIC_IDS } from "p0s1f1";
import moviesData from "p1s1f1";
import restaurantsData from "p1s1f2";
import travelData from "p1s1f3";
import eventsData from "p1s1f4";
import techData from "p1s1f5";

/**
 * MockDataManager class to handle loading and filtering of mock data
 * @class MockDataManager
 */
class MockDataManager {
  /**
   * Initialize mock data mappings
   * @constructor
   */
  constructor() {
    this.dataMap = {
      [TOPIC_IDS.MOVIES]: moviesData,
      [TOPIC_IDS.RESTAURANTS]: restaurantsData,
      [TOPIC_IDS.TRAVEL]: travelData,
      [TOPIC_IDS.EVENTS]: eventsData,
      [TOPIC_IDS.TECH]: techData,
      [TOPIC_IDS.DEFAULT]: [],
    };
  }

  /**
   * Retrieve data for a specific topic
   * @param {number} topicId - TOPIC_IDS value (e.g., 64 for MOVIES)
   * @returns {Array} Array of data items for the topic
   */
  getDataByTopic(topicId) {
    const data = this.dataMap[topicId] || this.dataMap[TOPIC_IDS.DEFAULT];
    if (!data) {
      console.warn(`[Cp0s0f5.1] No data found for topic ID: ${topicId}`);
      return [];
    }
    return data;
  }

  /**
   * Search and filter data based on query and filters
   * @param {number} topicId - TOPIC_IDS value
   * @param {string} query - Search query string
   * @param {Array} filters - Array of filter objects { id, value }
   * @returns {Array} Filtered data items
   */
  searchData(topicId, query = "", filters = []) {
    let results = this.getDataByTopic(topicId);

    // Apply query filter (case-insensitive keyword match)
    if (query) {
      const queryLower = query.toLowerCase();
      results = results.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" && val.toLowerCase().includes(queryLower),
        ),
      );
    }

    // Apply dynamic filters
    results = this.applyFilters(results, filters);

    if (results.length === 0) {
      console.log(
        `[Cp0s0f5.1] No results for topic ${topicId}, query: ${query}`,
      );
    }

    return results;
  }

  /**
   * Apply filters to data
   * @param {Array} data - Data items to filter
   * @param {Array} filters - Array of filter objects { id, value }
   * @returns {Array} Filtered data
   */
  applyFilters(data, filters) {
    if (!filters || filters.length === 0) return data;

    return data.filter((item) => {
      return filters.every((filter) => {
        const { id, value } = filter;

        // Handle checkbox filters (e.g., showtimes, reservations)
        if (typeof value === "boolean") {
          return !value || (item[id] && item[id] === true);
        }

        // Handle multi-select filters (e.g., ambiance, dietary)
        if (Array.isArray(value)) {
          return (
            !value.length ||
            (item[id] && value.some((v) => item[id].includes(v)))
          );
        }

        // Handle slider filters (e.g., price range)
        if (typeof value === "object" && value.min !== undefined) {
          return item[id] >= value.min && item[id] <= value.max;
        }

        return true;
      });
    });
  }
}

export default new MockDataManager();
