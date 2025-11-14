// p1s3f1.js
// Component: Cp1s3f1.1 (MockApiClient)
// Purpose: Provides mock API utilities for fetching topic data
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import moviesData from "p1s1f1";
import restaurantsData from "p1s1f2";
import travelData from "p1s1f3";
import eventsData from "p1s1f4";
import techData from "p1s1f5";
import { TOPIC_IDS } from "p0s1f1";

// Cp1s3f1.1: MockApiClient - Simulates API calls for mock data
export class MockApiClient {
  constructor() {
    this.dataSources = {
      [TOPIC_IDS.MOVIES]: moviesData,
      [TOPIC_IDS.RESTAURANTS]: restaurantsData,
      [TOPIC_IDS.TRAVEL]: travelData,
      [TOPIC_IDS.EVENTS]: eventsData,
      [TOPIC_IDS.TECH]: techData,
      [TOPIC_IDS.DEFAULT]: [],
    };
  }

  // Fetch data for a topic with optional query filtering
  async fetchData(topicId, query = "", limit = 10) {
    try {
      const data =
        this.dataSources[topicId] || this.dataSources[TOPIC_IDS.DEFAULT];
      if (!data || data.length === 0) {
        return [];
      }

      // Simple keyword-based filtering
      let results = data;
      if (query && typeof query === "string") {
        const keywords = query
          .toLowerCase()
          .split(" ")
          .filter((word) => word.length > 2);
        results = data.filter((item) =>
          keywords.some((keyword) =>
            Object.values(item).some(
              (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(keyword),
            ),
          ),
        );
      }

      // Limit results
      return results.slice(0, limit);
    } catch (error) {
      console.warn(`Mock API fetch failed: ${error.message}`);
      return [];
    }
  }

  // Simulate async delay for realism
  async simulateDelay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Get data with simulated network delay
  async getTopicData(topicId, query = "", limit = 10) {
    await this.simulateDelay();
    return this.fetchData(topicId, query, limit);
  }
}

export default MockApiClient;
