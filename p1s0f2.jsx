/**
 * File: p1s0f2.jsx
 * Components: Cp1s0f2.1 (SearchInput), Cp1s0f2.2 (SearchResults)
 * Purpose: Search interface with input field and results display
 * Dependencies: React, lucide-react
 */

import React, { useState, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";

// Cp1s0f2.1 - SearchInput Component
export function SearchInput({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  // Rotating placeholder examples
  const placeholders = [
    "thriller movies 2024",
    "romantic restaurants NYC",
    "beach vacation destinations",
    "tech conferences this month",
    "gaming laptops under $2000",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 3000);

    setPlaceholder(placeholders[0]);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-input-container">
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400 w-5 h-5" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            aria-label="Search for content"
          />

          {query && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {isLoading && (
            <div className="absolute right-4">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="hidden"
        >
          Search
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Try:{" "}
        <button
          type="button"
          onClick={() => {
            setQuery(placeholders[0]);
            onSearch(placeholders[0]);
          }}
          className="text-blue-600 hover:underline mx-1"
        >
          {placeholders[0]}
        </button>
        or
        <button
          type="button"
          onClick={() => {
            setQuery(placeholders[1]);
            onSearch(placeholders[1]);
          }}
          className="text-blue-600 hover:underline mx-1"
        >
          {placeholders[1]}
        </button>
      </div>
    </form>
  );
}

// Cp1s0f2.2 - SearchResults Component
export function SearchResults({ results, topic, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Searching...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium">Error loading results</p>
        <p className="text-red-500 text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <Search className="w-16 h-16 mx-auto" />
        </div>
        <p className="text-gray-600 text-lg">No results yet</p>
        <p className="text-gray-500 text-sm mt-2">
          Try searching for movies, restaurants, travel, events, or tech
        </p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {results.length} {topic ? `${topic} ` : ""}result
          {results.length !== 1 ? "s" : ""}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {results.map((item, index) => (
          <ResultCard key={item.id || index} item={item} topic={topic} />
        ))}
      </div>
    </div>
  );
}

// Result Card Component (Helper)
function ResultCard({ item, topic }) {
  // Different rendering based on topic
  switch (topic) {
    case "movies":
      return <MovieCard item={item} />;
    case "restaurants":
      return <RestaurantCard item={item} />;
    case "travel":
      return <TravelCard item={item} />;
    case "events":
      return <EventCard item={item} />;
    case "tech":
      return <TechCard item={item} />;
    default:
      return <GenericCard item={item} />;
  }
}

// Movie Card
function MovieCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          ⭐ {item.rating}
        </span>
      </div>

      <div className="flex gap-2 mb-3">
        {item.genre.map((g) => (
          <span
            key={g}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
          >
            {g}
          </span>
        ))}
      </div>

      <p className="text-gray-600 mb-4">{item.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Director:</span>
          <span className="ml-2 text-gray-900 font-medium">
            {item.director}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Runtime:</span>
          <span className="ml-2 text-gray-900 font-medium">
            {item.runtime_minutes} min
          </span>
        </div>
      </div>

      {item.currently_in_theaters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-green-600 font-medium text-sm mb-2">
            🎬 Now in theaters
          </p>
          {item.showtimes && item.showtimes.length > 0 && (
            <div className="flex gap-2">
              {item.showtimes.slice(0, 3).map((showtime, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                >
                  {showtime.time} ({showtime.format})
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Restaurant Card
function RestaurantCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <p className="text-gray-600 text-sm">{item.location.neighborhood}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-yellow-500">⭐</span>
            <span className="font-medium">{item.rating}</span>
          </div>
          <span className="text-gray-600 text-sm">{item.price_range}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        {item.cuisine.map((c) => (
          <span
            key={c}
            className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
          >
            {c}
          </span>
        ))}
      </div>

      <p className="text-gray-600 mb-4">{item.description}</p>

      {item.reservations_available && (
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            ✓ Reservations available {item.open_tonight ? "tonight" : ""}
          </span>
        </div>
      )}

      {item.dietary_options && item.dietary_options.length > 0 && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Dietary:</span>{" "}
          {item.dietary_options.join(", ")}
        </div>
      )}
    </div>
  );
}

// Travel Card
function TravelCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {item.destination}
          </h3>
          <p className="text-gray-600 text-sm">{item.country}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {item.region}
        </span>
      </div>

      <div className="flex gap-2 mb-3">
        {item.type.map((t) => (
          <span
            key={t}
            className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs"
          >
            {t}
          </span>
        ))}
      </div>

      <p className="text-gray-600 mb-4">{item.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {item.hotels && item.hotels.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Hotels from</p>
            <p className="text-lg font-bold text-gray-900">
              ${Math.min(...item.hotels.map((h) => h.price_per_night))}/night
            </p>
          </div>
        )}
        {item.flights && item.flights.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Flights from</p>
            <p className="text-lg font-bold text-gray-900">
              ${Math.min(...item.flights.map((f) => f.price))}
            </p>
          </div>
        )}
      </div>

      {item.weather_forecast && (
        <div className="pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Weather:</span>{" "}
            {item.weather_forecast.current_week}
          </p>
        </div>
      )}
    </div>
  );
}

// Event Card
function EventCard({ item }) {
  const daysUntil = item.date?.days_until || 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <p className="text-gray-600 text-sm">{item.location.venue}</p>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
            {daysUntil === 0 ? "Today" : `${daysUntil} days`}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        {item.category.map((c) => (
          <span
            key={c}
            className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
          >
            {c}
          </span>
        ))}
      </div>

      <p className="text-gray-600 mb-4">{item.description}</p>

      {item.tickets && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Tickets:</span>{" "}
            {item.tickets.price_range}
          </p>
          {item.tickets.available && (
            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              ✓ Tickets available
            </span>
          )}
        </div>
      )}

      <div className="text-sm text-gray-600">
        <span className="font-medium">Date:</span> {item.date?.start}
        {item.date?.end &&
          item.date.end !== item.date.start &&
          ` - ${item.date.end}`}
      </div>
    </div>
  );
}

// Tech Product Card
function TechCard({ item }) {
  const onSale = item.price.current < item.price.msrp;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <p className="text-gray-600 text-sm">{item.brand}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-yellow-500">⭐</span>
            <span className="font-medium">{item.reviews?.average_rating}</span>
          </div>
          {onSale && (
            <span className="text-xs text-red-600 font-medium">
              {item.price.discount_percentage}% OFF
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        {item.category.map((c) => (
          <span
            key={c}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
          >
            {c}
          </span>
        ))}
      </div>

      <p className="text-gray-600 mb-4">{item.description}</p>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          {onSale && (
            <span className="text-gray-400 line-through text-sm">
              ${item.price.msrp}
            </span>
          )}
          <span className="text-2xl font-bold text-gray-900">
            ${item.price.current}
          </span>
        </div>
      </div>

      {item.availability?.in_stock && (
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            ✓ In stock
          </span>
          <span className="ml-2 text-sm text-gray-600">
            Ships in {item.availability.shipping}
          </span>
        </div>
      )}

      {item.specifications && (
        <div className="pt-3 border-t border-gray-200 text-sm text-gray-600">
          <p>
            <span className="font-medium">Key specs:</span>{" "}
            {Object.entries(item.specifications)
              .slice(0, 2)
              .map(([k, v]) => `${k}: ${v}`)
              .join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

// Generic Card (fallback)
function GenericCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {item.name || item.title || "Item"}
      </h3>
      <p className="text-gray-600">
        {item.description || "No description available"}
      </p>
    </div>
  );
}

export default { SearchInput, SearchResults };
