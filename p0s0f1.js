// p0s0f1.js
// Component: Cp0s0f1.1 (Orchestrator)
// Purpose: Initializes and coordinates services (data, filters, Polkadot, newsletter)
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import { APP_CONFIG, TOPIC_IDS } from "p0s1f1";
import { FilterTemplateManager, QueryContextAnalyzer } from "p0s0f4";
import { MockApiClient } from "p1s3f1";
import { PolkadotConnector } from "p0s0f6";
import { QueryParser, KeywordExtractor } from "p0s2f1";
import FilterSelector from "p0s2f2";
import NewsletterGenerator from "p0s2f3";

// Cp0s0f1.1: Orchestrator - Manages service initialization and query flow
export class Orchestrator {
  constructor(config = APP_CONFIG) {
    this.config = config;
    this.apiClient = new MockApiClient();
    this.filterManager = new FilterTemplateManager();
    this.queryAnalyzer = new QueryContextAnalyzer();
    this.queryParser = new QueryParser();
    this.keywordExtractor = new KeywordExtractor();
    this.filterSelector = new FilterSelector();
    this.newsletterGenerator = new NewsletterGenerator();
    this.polkadotConnector = new PolkadotConnector();
    this.isInitialized = false;
  }

  // Initialize all services
  async initialize() {
    try {
      // No async initialization needed for mock services
      this.isInitialized = true;
      return { success: true };
    } catch (error) {
      console.warn(`Orchestrator initialization failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // Process search query: return data, filters, and newsletter
  async processQuery(query) {
    if (!this.isInitialized) {
      throw new Error("Orchestrator not initialized");
    }

    try {
      const normalizedQuery = this.queryParser.parse(query);
      const keywords = this.keywordExtractor.extract(normalizedQuery);
      const topicId = this.queryAnalyzer.detectTopic(normalizedQuery);
      const filters = this.filterSelector.selectFilters(normalizedQuery);
      const data = await this.apiClient.getTopicData(
        topicId,
        normalizedQuery,
        this.config.maxResults || 10,
      );
      const newsletterHtml = this.newsletterGenerator.generateNewsletter(
        topicId,
        normalizedQuery,
      );

      return {
        success: true,
        topicId,
        filters,
        data,
        newsletter: newsletterHtml,
      };
    } catch (error) {
      console.warn(`Query processing failed: ${error.message}`);
      return {
        success: false,
        error: error.message,
        data: [],
        filters: [],
        newsletter: "",
      };
    }
  }

  // Connect to Polkadot wallet
  async connectWallet() {
    return this.polkadotConnector.connectWallet();
  }

  // Store user preferences
  async storePreferences(account, preferences) {
    return this.polkadotConnector.storePreferences(account, preferences);
  }

  // Retrieve user preferences
  async getPreferences(account) {
    return this.polkadotConnector.getPreferences(account);
  }

  // Get orchestrator status
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      polkadotConnected:
        this.polkadotConnector.getConnectionStatus().isConnected,
    };
  }
}

export default Orchestrator;
