// p0s2f3.js
// Component: Cp0s2f3.1 (NewsletterGenerator)
// Purpose: Generates HTML newsletter content based on search results and preferences
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import { TOPIC_IDS, APP_CONFIG } from "p0s1f1";
import { getTopicData } from "p0s0f5";

// Cp0s2f3.1: NewsletterGenerator - Creates newsletter HTML for search results
export class NewsletterGenerator {
  constructor() {
    this.preferences = APP_CONFIG.newsletter || {
      maxItems: 5, // Max items in newsletter
      includeImages: true,
      includeLinks: true,
    };
    this.topicTemplates = {
      [TOPIC_IDS.MOVIES]: {
        title: "Your Movie Recommendations",
        itemTemplate: (item) => `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #667eea;">${this.sanitize(item.title)}</h3>
            ${this.preferences.includeImages && item.image ? `<img src="${this.sanitize(item.image)}" alt="${this.sanitize(item.title)}" style="max-width: 200px;" />` : ""}
            <p>${this.sanitize(item.description || "No description available")}</p>
            ${this.preferences.includeLinks && item.link ? `<a href="${this.sanitize(item.link)}" style="color: #E6007A;">Watch Trailer</a>` : ""}
          </div>
        `,
      },
      [TOPIC_IDS.RESTAURANTS]: {
        title: "Top Restaurant Picks",
        itemTemplate: (item) => `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #667eea;">${this.sanitize(item.name)}</h3>
            ${this.preferences.includeImages && item.image ? `<img src="${this.sanitize(item.image)}" alt="${this.sanitize(item.name)}" style="max-width: 200px;" />` : ""}
            <p>${this.sanitize(item.cuisine)} - ${this.sanitize(item.location)}</p>
            ${this.preferences.includeLinks && item.reservationLink ? `<a href="${this.sanitize(item.reservationLink)}" style="color: #E6007A;">Book Now</a>` : ""}
          </div>
        `,
      },
      [TOPIC_IDS.TRAVEL]: {
        title: "Travel Destinations for You",
        itemTemplate: (item) => `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #667eea;">${this.sanitize(item.destination)}</h3>
            ${this.preferences.includeImages && item.image ? `<img src="${this.sanitize(item.image)}" alt="${this.sanitize(item.destination)}" style="max-width: 200px;" />` : ""}
            <p>${this.sanitize(item.description || "Explore this destination")}</p>
            ${this.preferences.includeLinks && item.bookingLink ? `<a href="${this.sanitize(item.bookingLink)}" style="color: #E6007A;">Book Trip</a>` : ""}
          </div>
        `,
      },
      [TOPIC_IDS.EVENTS]: {
        title: "Upcoming Events",
        itemTemplate: (item) => `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #667eea;">${this.sanitize(item.name)}</h3>
            ${this.preferences.includeImages && item.image ? `<img src="${this.sanitize(item.image)}" alt="${this.sanitize(item.name)}" style="max-width: 200px;" />` : ""}
            <p>${this.sanitize(item.date)} - ${this.sanitize(item.location)}</p>
            ${this.preferences.includeLinks && item.ticketLink ? `<a href="${this.sanitize(item.ticketLink)}" style="color: #E6007A;">Get Tickets</a>` : ""}
          </div>
        `,
      },
      [TOPIC_IDS.TECH]: {
        title: "Latest Tech Picks",
        itemTemplate: (item) => `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #667eea;">${this.sanitize(item.name)}</h3>
            ${this.preferences.includeImages && item.image ? `<img src="${this.sanitize(item.image)}" alt="${this.sanitize(item.name)}" style="max-width: 200px;" />` : ""}
            <p>${this.sanitize(item.description || "Discover this tech")}</p>
            ${this.preferences.includeLinks && item.purchaseLink ? `<a href="${this.sanitize(item.purchaseLink)}" style="color: #E6007A;">Buy Now</a>` : ""}
          </div>
        `,
      },
      [TOPIC_IDS.DEFAULT]: {
        title: "Explore More",
        itemTemplate: (item) => `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #667eea;">${this.sanitize(item.title || item.name)}</h3>
            ${this.preferences.includeImages && item.image ? `<img src="${this.sanitize(item.image)}" alt="${this.sanitize(item.title || item.name)}" style="max-width: 200px;" />` : ""}
            <p>${this.sanitize(item.description || "No details available")}</p>
          </div>
        `,
      },
    };
  }

  // Sanitize input to prevent XSS
  sanitize(input) {
    if (!input) return "";
    return input.replace(
      /[<>&"']/g,
      (match) =>
        ({
          "<": "&lt;",
          ">": "&gt;",
          "&": "&amp;",
          '"': "&quot;",
          "'": "&#39;",
        })[match],
    );
  }

  // Generate newsletter HTML for topic and items
  generateNewsletter(topicId, query = "") {
    try {
      // Fetch data for topic
      const items = getTopicData(topicId, query, this.preferences.maxItems);
      if (!items || items.length === 0) {
        return this.generateEmptyNewsletter();
      }

      // Select template for topic
      const template =
        this.topicTemplates[topicId] || this.topicTemplates[TOPIC_IDS.DEFAULT];
      const itemHtml = items.map(template.itemTemplate).join("");

      // Build full newsletter HTML
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #552BBF; text-align: center;">${this.sanitize(template.title)}</h1>
          <p style="text-align: center; color: #4B5563;">Generated for query: ${this.sanitize(query || "General")}</p>
          <hr style="border: 1px solid #E5E7EB; margin: 20px 0;" />
          ${itemHtml}
          <footer style="text-align: center; color: #6B7280; margin-top: 20px;">
            Powered by Polkadot Discovery PoC
          </footer>
        </div>
      `;
    } catch (error) {
      console.warn(`Newsletter generation failed: ${error.message}`);
      return this.generateEmptyNewsletter();
    }
  }

  // Generate fallback newsletter for errors or no data
  generateEmptyNewsletter() {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #552BBF; text-align: center;">Explore More</h1>
        <p style="text-align: center; color: #4B5563;">No results found. Try another search!</p>
        <footer style="text-align: center; color: #6B7280; margin-top: 20px;">
          Powered by Polkadot Discovery PoC
        </footer>
      </div>
    `;
  }
}

export default NewsletterGenerator;
