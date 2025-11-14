/**
 * File: p1s0f6.jsx
 * Components: Cp1s0f6.1 (App)
 * Purpose: Root application component that orchestrates all UI components
 * Dependencies: React, all other UI components, p1s0f7.css
 */

import React, { useState, useEffect } from "react";
import { SearchInput, SearchResults } from "./p1s0f2.jsx";
import { FilterPanel } from "./p1s0f3.jsx";
import { NewsletterPreview } from "./p1s0f4.jsx";
import { WalletConnect, PreferenceSync } from "./p1s0f5.jsx";
import "./p1s0f7.css";

// Import mock data
import moviesData from "./p1s1f1.json";
import restaurantsData from "./p1s1f2.json";
import travelData from "./p1s1f3.json";
import eventsData from "./p1s1f4.json";
import techData from "./p1s1f5.json";
import filterTemplates from "./p1s1f6.json";

// Cp1s0f6.1 - App Component
export function App() {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [detectedTopic, setDetectedTopic] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Filter state
  const [availableFilters, setAvailableFilters] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});

  // Wallet state
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);

  // Newsletter state
  const [newsletterContent, setNewsletterContent] = useState(null);

  // Mock data map
  const dataMap = {
    movies: moviesData,
    restaurants: restaurantsData,
    travel: travelData,
    events: eventsData,
    tech: techData,
  };

  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setDetectedTopic(null);
      setAvailableFilters([]);
      setActiveFilters({});
      return;
    }

    setSearchQuery(query);
    setIsSearching(true);
    setSearchError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Detect topic (simple keyword matching from p1s1f6.json)
      const topic = detectTopic(query, filterTemplates.topic_keywords);
      setDetectedTopic(topic);

      // Get results for detected topic
      const results = getSearchResults(topic, query);
      setSearchResults(results);

      // Load filters for detected topic
      const filters = getFiltersForTopic(topic);
      setAvailableFilters(filters);

      // Reset active filters when topic changes
      setActiveFilters({});
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  // Apply filters to results
  useEffect(() => {
    if (searchResults.length > 0 && Object.keys(activeFilters).length > 0) {
      const filtered = applyFilters(
        searchResults,
        activeFilters,
        detectedTopic,
      );
      // In a real app, this would re-query with filters
      // For PoC, we just keep the same results
    }
  }, [activeFilters]);

  // Detect topic from query
  const detectTopic = (query, topicKeywords) => {
    const normalizedQuery = query.toLowerCase();

    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      for (const keyword of keywords) {
        if (normalizedQuery.includes(keyword.toLowerCase())) {
          return topic;
        }
      }
    }

    return null;
  };

  // Get search results
  const getSearchResults = (topic, query) => {
    if (!topic || !dataMap[topic]) {
      return [];
    }

    const data = dataMap[topic];
    return data.search_results || [];
  };

  // Get filters for topic
  const getFiltersForTopic = (topic) => {
    if (!topic || !filterTemplates.filter_templates[topic]) {
      return [];
    }

    return filterTemplates.filter_templates[topic].filters || [];
  };

  // Apply filters (simplified for PoC)
  const applyFilters = (results, filters, topic) => {
    // In a real implementation, this would filter results based on active filters
    // For PoC, we just return all results
    return results;
  };

  // Handle wallet connection
  const handleWalletConnect = (account) => {
    setIsWalletConnected(true);
    setConnectedAccount(account);
    console.log("Wallet connected:", account.address);
  };

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false);
    setConnectedAccount(null);
    console.log("Wallet disconnected");
  };

  // Handle preference save
  const handleSavePreferences = (newsletterData) => {
    console.log("Saving preferences:", {
      topic: detectedTopic,
      activeFilters,
      account: connectedAccount?.address,
    });

    // This would trigger PreferenceSync component
    // The actual save happens in Cp1s0f5.2
  };

  // Handle sync success
  const handleSyncSuccess = (result) => {
    console.log("Preferences saved to Polkadot:", result);
    // Show success notification
  };

  const handleSyncError = (error) => {
    console.error("Failed to save preferences:", error);
    // Show error notification
  };

  return (
    <div className="app min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Polkadot Discovery
              </h1>
              <p className="text-gray-600 mt-1">
                Decentralized content discovery with dynamic filters
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <p className="text-gray-600">Network</p>
                <p className="font-medium text-purple-600">Westend Testnet</p>
              </div>
              {isWalletConnected && (
                <div className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                  ✓ Connected
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="mb-8">
          <SearchInput onSearch={handleSearch} isLoading={isSearching} />
        </section>

        {/* Results and Filters Grid */}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main Results Column */}
            <div className="lg:col-span-2 space-y-8">
              <SearchResults
                results={searchResults}
                topic={detectedTopic}
                isLoading={isSearching}
                error={searchError}
              />

              {/* Newsletter Preview */}
              {searchResults.length > 0 && (
                <NewsletterPreview
                  content={newsletterContent}
                  results={searchResults}
                  activeFilters={activeFilters}
                  topic={detectedTopic}
                  onSave={handleSavePreferences}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Filter Panel */}
              {availableFilters.length > 0 && (
                <FilterPanel
                  filters={availableFilters}
                  activeFilters={activeFilters}
                  onFilterChange={setActiveFilters}
                  topic={detectedTopic}
                />
              )}

              {/* Wallet Connect */}
              <WalletConnect
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
                isConnected={isWalletConnected}
                account={connectedAccount}
              />

              {/* Preference Sync */}
              {isWalletConnected && Object.keys(activeFilters).length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Save Your Preferences
                  </h3>
                  <PreferenceSync
                    preferences={{
                      topic: detectedTopic,
                      filters: activeFilters,
                      timestamp: new Date().toISOString(),
                    }}
                    account={connectedAccount}
                    onSuccess={handleSyncSuccess}
                    onError={handleSyncError}
                  />
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3">
                  💡 How it works
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0">1.</span>
                    <span>
                      Search for movies, restaurants, travel, events, or tech
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0">2.</span>
                    <span>See filters that adapt to your search topic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0">3.</span>
                    <span>Select filters to customize your newsletter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0">4.</span>
                    <span>Connect wallet and save preferences on Polkadot</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && searchResults.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Discover Content That Matters
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Search for movies, restaurants, travel destinations, events, or
                tech products. Our dynamic filters adapt to what you're looking
                for.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <button
                  onClick={() => handleSearch("thriller movies 2024")}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className="text-4xl mb-2">🎬</div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-600">
                    Movies
                  </p>
                </button>

                <button
                  onClick={() => handleSearch("romantic restaurants NYC")}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className="text-4xl mb-2">🍽️</div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-600">
                    Restaurants
                  </p>
                </button>

                <button
                  onClick={() => handleSearch("beach vacation")}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className="text-4xl mb-2">✈️</div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-600">
                    Travel
                  </p>
                </button>

                <button
                  onClick={() => handleSearch("tech conferences")}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-600">
                    Events
                  </p>
                </button>

                <button
                  onClick={() => handleSearch("gaming laptop")}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className="text-4xl mb-2">💻</div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-600">
                    Tech
                  </p>
                </button>

                <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-300 rounded-lg">
                  <div className="text-4xl mb-2">🔗</div>
                  <p className="font-medium text-purple-900">Web3 Powered</p>
                </div>
              </div>

              <p className="text-sm text-gray-500">
                Built on Polkadot • Your data, your control
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">
                Polkadot Discovery
              </h4>
              <p className="text-sm text-gray-600">
                A proof of concept for decentralized content discovery with
                dynamic, context-aware filters powered by Polkadot blockchain.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Dynamic filter adaptation</li>
                <li>• Blockchain-based preferences</li>
                <li>• Personalized newsletters</li>
                <li>• User data sovereignty</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3">Technology</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• React 18</li>
                <li>• Polkadot.js API</li>
                <li>• Westend Testnet</li>
                <li>• SCIS 4.1 Architecture</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>
              Hackathon Submission • Build Resilient Apps with Polkadot Cloud
            </p>
            <p className="mt-2">
              SCIS Version 4.1 • File: p1s0f6.jsx • Component: Cp1s0f6.1
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
