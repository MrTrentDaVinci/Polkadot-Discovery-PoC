/**
 * File: p1s0f4.jsx
 * Components: Cp1s0f4.1 (NewsletterPreview)
 * Purpose: Newsletter preview and generation interface
 * Dependencies: React, lucide-react
 */

import React, { useState } from "react";
import { Mail, Download, Copy, Check, Eye, EyeOff } from "lucide-react";

// Cp1s0f4.1 - NewsletterPreview Component
export function NewsletterPreview({
  content,
  results,
  activeFilters,
  topic,
  onSave,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [frequency, setFrequency] = useState("weekly");

  // Generate newsletter content if not provided
  const newsletterContent =
    content || generateNewsletterContent(results, activeFilters, topic);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(newsletterContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([newsletterContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-${topic || "content"}-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSavePreferences = () => {
    if (onSave) {
      onSave({
        topic,
        activeFilters,
        frequency,
        content: newsletterContent,
      });
    }
  };

  if (!results || results.length === 0) {
    return (
      <div className="newsletter-preview bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">
          Search for content to see newsletter preview
        </p>
      </div>
    );
  }

  return (
    <div className="newsletter-preview bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6" />
            <h3 className="text-lg font-bold">Newsletter Preview</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/20 rounded transition-colors"
            aria-label={isExpanded ? "Collapse preview" : "Expand preview"}
          >
            {isExpanded ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="opacity-90">Topic:</span>
            <span className="ml-1 font-semibold capitalize">
              {topic || "Mixed"}
            </span>
          </div>
          <div>
            <span className="opacity-90">Items:</span>
            <span className="ml-1 font-semibold">{results.length}</span>
          </div>
          <div>
            <span className="opacity-90">Filters:</span>
            <span className="ml-1 font-semibold">
              {Object.keys(activeFilters).length}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Frequency:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy HTML</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>

          <button
            onClick={handleSavePreferences}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            <span>Save to Polkadot</span>
          </button>
        </div>
      </div>

      {/* Preview Content */}
      {isExpanded && (
        <div className="p-6 max-h-96 overflow-y-auto">
          <div
            className="newsletter-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: newsletterContent }}
          />
        </div>
      )}

      {!isExpanded && (
        <div className="p-6 text-center">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Click to expand preview
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-gray-600">Content Items</p>
            <p className="text-xl font-bold text-gray-900">{results.length}</p>
          </div>
          <div>
            <p className="text-gray-600">Active Filters</p>
            <p className="text-xl font-bold text-gray-900">
              {Object.keys(activeFilters).length}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Frequency</p>
            <p className="text-xl font-bold text-gray-900 capitalize">
              {frequency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate Newsletter HTML Content
function generateNewsletterContent(results, activeFilters, topic) {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Personalized ${topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : "Content"} Newsletter</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .header p {
      margin: 10px 0 0 0;
      opacity: 0.9;
    }
    .content {
      padding: 30px 20px;
    }
    .item {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    .item:last-child {
      border-bottom: none;
    }
    .item h2 {
      margin: 0 0 10px 0;
      color: #667eea;
      font-size: 20px;
    }
    .item p {
      margin: 5px 0;
      color: #666;
    }
    .meta {
      display: flex;
      gap: 15px;
      margin-top: 10px;
      font-size: 14px;
    }
    .meta span {
      color: #999;
    }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      background-color: #f0f0f0;
      border-radius: 4px;
      font-size: 12px;
      margin-right: 5px;
      color: #666;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    .cta-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 Your Personalized Newsletter</h1>
      <p>${date}</p>
      ${topic ? `<p>Topic: ${topic.charAt(0).toUpperCase() + topic.slice(1)}</p>` : ""}
    </div>
    
    <div class="content">
      <p style="color: #666; margin-bottom: 20px;">
        Based on your preferences, here are ${results.length} items we think you'll love:
      </p>
  `;

  // Add each result as a newsletter item
  results.slice(0, 10).forEach((item, index) => {
    html += generateNewsletterItem(item, topic, activeFilters, index);
  });

  html += `
      <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
        <p style="margin: 0 0 10px 0; color: #666;">Want more personalized content?</p>
        <a href="#" class="cta-button">Update Your Preferences</a>
      </div>
    </div>
    
    <div class="footer">
      <p>This newsletter was generated based on your saved preferences.</p>
      <p>
        <a href="#">View Online</a> • 
        <a href="#">Update Preferences</a> • 
        <a href="#">Unsubscribe</a>
      </p>
      <p style="margin-top: 15px; font-size: 12px; color: #999;">
        Powered by Polkadot Discovery Platform<br>
        Your data is stored securely on the Polkadot blockchain
      </p>
    </div>
  </div>
</body>
</html>
  `;

  return html;
}

// Generate individual newsletter item HTML
function generateNewsletterItem(item, topic, activeFilters, index) {
  let html = '<div class="item">';

  switch (topic) {
    case "movies":
      html += `
        <h2>${index + 1}. ${item.title}</h2>
        <div>
          ${item.genre.map((g) => `<span class="badge">${g}</span>`).join("")}
          ${item.rating ? `<span class="badge">⭐ ${item.rating}</span>` : ""}
        </div>
        <p>${item.description}</p>
        <div class="meta">
          <span>Director: ${item.director}</span>
          ${item.runtime_minutes ? `<span>${item.runtime_minutes} min</span>` : ""}
        </div>
      `;

      // Include trailer if filter is active
      if (activeFilters["mov_filter_3"] && item.trailer_url) {
        html += `<p><a href="${item.trailer_url}" class="cta-button" style="display: inline-block; padding: 8px 16px; font-size: 14px;">Watch Trailer</a></p>`;
      }

      // Include showtimes if filter is active
      if (
        activeFilters["mov_filter_4"] &&
        item.showtimes &&
        item.showtimes.length > 0
      ) {
        html += "<p><strong>Showtimes:</strong> ";
        html += item.showtimes
          .slice(0, 3)
          .map((s) => `${s.time} (${s.format})`)
          .join(", ");
        html += "</p>";
      }
      break;

    case "restaurants":
      html += `
        <h2>${index + 1}. ${item.name}</h2>
        <div>
          ${item.cuisine.map((c) => `<span class="badge">${c}</span>`).join("")}
          <span class="badge">${item.price_range}</span>
          ${item.rating ? `<span class="badge">⭐ ${item.rating}</span>` : ""}
        </div>
        <p>${item.description}</p>
        <div class="meta">
          <span>${item.location.neighborhood}</span>
        </div>
      `;

      // Include menu if filter is active
      if (activeFilters["rest_filter_2"] && item.menu_url) {
        html += `<p><a href="${item.menu_url}" class="cta-button" style="display: inline-block; padding: 8px 16px; font-size: 14px;">View Menu</a></p>`;
      }

      // Include reservations if available
      if (item.reservations_available && item.reservation_url) {
        html += `<p><a href="${item.reservation_url}" class="cta-button" style="display: inline-block; padding: 8px 16px; font-size: 14px;">Make Reservation</a></p>`;
      }
      break;

    case "travel":
      html += `
        <h2>${index + 1}. ${item.destination}</h2>
        <div>
          ${item.type.map((t) => `<span class="badge">${t}</span>`).join("")}
        </div>
        <p>${item.description}</p>
        <div class="meta">
          <span>${item.country}</span>
          ${item.best_time_to_visit ? `<span>Best time: ${item.best_time_to_visit.seasons[0]}</span>` : ""}
        </div>
      `;

      // Include weather if filter is active
      if (activeFilters["travel_filter_3"] && item.weather_forecast) {
        html += `<p><strong>Weather:</strong> ${item.weather_forecast.current_week}</p>`;
      }
      break;

    case "events":
      html += `
        <h2>${index + 1}. ${item.name}</h2>
        <div>
          ${item.category.map((c) => `<span class="badge">${c}</span>`).join("")}
        </div>
        <p>${item.description}</p>
        <div class="meta">
          <span>${item.location.venue}</span>
          ${item.date ? `<span>${item.date.start}</span>` : ""}
        </div>
      `;

      // Include tickets if available
      if (item.tickets && item.tickets.available && item.tickets.booking_url) {
        html += `<p><a href="${item.tickets.booking_url}" class="cta-button" style="display: inline-block; padding: 8px 16px; font-size: 14px;">Get Tickets (${item.tickets.price_range})</a></p>`;
      }
      break;

    case "tech":
      html += `
        <h2>${index + 1}. ${item.name}</h2>
        <div>
          ${item.category.map((c) => `<span class="badge">${c}</span>`).join("")}
          ${item.reviews ? `<span class="badge">⭐ ${item.reviews.average_rating}</span>` : ""}
        </div>
        <p>${item.description}</p>
        <div class="meta">
          <span>${item.brand}</span>
          <span><strong>$${item.price.current}</strong></span>
        </div>
      `;

      // Include specs if filter is active
      if (activeFilters["tech_filter_3"] && item.specifications) {
        html += "<p><strong>Key Specs:</strong> ";
        html += Object.entries(item.specifications)
          .slice(0, 3)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ");
        html += "</p>";
      }
      break;

    default:
      html += `
        <h2>${index + 1}. ${item.name || item.title || "Item"}</h2>
        <p>${item.description || "No description available"}</p>
      `;
  }

  html += "</div>";
  return html;
}

export default NewsletterPreview;
