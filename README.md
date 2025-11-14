# Polkadot Discovery PoC

This proof-of-concept demonstrates a decentralized content discovery platform designed to empower users and content creators, offering an alternative to traditional search engines that may prioritize paid content or suppress certain results. It achieves this through two core innovations: **dynamic, context-aware filtering** and **user-owned, on-chain preferences** powered by Polkadot.

## How it Works

### 1. Dynamic Content and Filter Discovery

*   **Search and Topic Detection:** When a user enters a query (e.g., "thriller movies 2024"), the system analyzes the query to determine the topic.
*   **Dynamic Filter Loading:** Once the topic is identified, the system retrieves a set of relevant filters for that topic and displays them to the user.
*   **Content Retrieval:** The application then retrieves mock data for the detected topic.

### 2. Personalized Newsletter for Proactive Discovery

*   Based on the user's selected filters and topics, the newsletter feature can alert them to significant changes, such as a restaurant's menu update or a new movie release within their interests.

### 3. Polkadot Integration for User Data Sovereignty

*   **Wallet Connection:** The user can connect their Polkadot wallet (e.g., Polkadot.js extension) to the application.
*   **On-Chain Preference Storage:** Once connected, the user can save their currently selected filters and other preferences to the Polkadot blockchain (Westend testnet).
*   **User-Owned Data:** By storing preferences on-chain, the user retains full control over their data.

### 4. End-to-End Flow

1.  **User searches:** A user enters a query.
2.  **Backend processes:** The backend detects the topic, selects filters, and retrieves mock data.
3.  **UI updates:** The UI displays the relevant content and filters.
4.  **User customizes:** The user selects filters to refine their search.
5.  **Newsletter is generated:** A preview of a personalized newsletter is shown.
6.  **User connects wallet:** The user connects their Polkadot wallet.
7.  **Preferences are saved:** The user saves their filter preferences to the Westend testnet.

## Technology Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js
- **Blockchain:** Polkadot, Polkadot.js
- **Linting/Formatting:** ESLint, Prettier

## Future Plans

This proof-of-concept is just the beginning. The long-term vision is to create a fully decentralized discovery layer for the internet. Here are some of the key features planned for the future:

### MVP Enhancement 

*   **Real Content Integration:** Connect to real-world APIs (e.g., TMDb, Yelp) to provide live data.
*   **Basic ML Models:** Implement user behavior tracking and a simple recommendation engine.
*   **Enhanced Polkadot Features:** Encrypted preference storage and transaction batching.

### Platform Expansion 

*   **Additional Topics:** Expand to include books, podcasts, courses, and more.
*   **Creator Onboarding:** Create a dashboard for content creators to submit and manage their content.
*   **Advanced Personalization:** Implement collaborative filtering and content-based recommendation models.

### Decentralization 
*   **#Tagging System** Added to “Future Plans” under “Platform Expansion” (line 132): “Enable content creators to add hashtags (e.g., #VeganEats, #IndieFilm) to enhance visibility, stored on-chain for decentralized discoverability.”
*   **Custom Parachain:** Deploy a dedicated Polkadot parachain for the discovery protocol.
*   **Token Economics:** Introduce a platform token for governance, staking, and user incentives.
*   **Decentralized Content Storage:** Integrate with IPFS for media storage.

### Ecosystem Growth 

*   **Developer Platform:** Create a public API and SDK for third-party developers.
*   **AI/ML Pipeline:** Build a training and inference pipeline on Polkadot, using off-chain workers and privacy-preserving techniques like federated learning.
*   **Governance:** Establish a DAO for community-based platform decisions.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
2.  **Open the application in your browser:**
    [http://localhost:5173/p1s0f1.html]

## Project Structure: Sequential Component Identification System (SCIS)

This project utilizes a unique organizational methodology called the **Sequential Component Identification System (SCIS)**. Designed for clarity, traceability, and AI-assisted development, SCIS replaces traditional folder-based structures with a flat-file system and precise naming conventions.

### Key Principles for Judges:

1.  **Flat-File Structure:** You will notice all project files reside in a single root directory. There are **no sub-folders**. File organization is achieved purely through their names.

2.  **File Naming Convention (`p{phase}s{section}f{file}.{extension}`):**
    *   `p#`: Denotes the **Phase** of the project (e.g., `p0` for backend/core, `p1` for frontend).
    *   `s#`: Denotes a logical **Section** within a phase (e.g., `s0` for core logic, `s1` for configuration, `s4` for testing).
    *   `f#`: Denotes a unique **File** index within that section.
    *   `.{extension}`: Standard file extension (e.g., `.js`, `.jsx`, `.md`, `.json`).

    **Example:** `p0s0f1.js` is the first file (`f1`) in the core logic section (`s0`) of Phase 0 (`p0`).

3.  **Component Naming Convention (`Cp{phase}s{section}f{file}.{component_index}`):**
    *   Every significant logical unit (function, class) within a file is assigned a unique ID that mirrors its file's SCIS coordinate.
    *   `Cp#s#f#`: Matches the containing file's name.
    *   `.{component_index}`: A 1-based sequential number for components within that specific file.

    **Example:** A function `Cp0s2f1.1` would be the first component in file `p0s2f1.js`.

4.  **Mandatory Project Files:**
    *   `p0s0f1`: The **Project Entry Point** (e.g., `p0s0f1.js` for this project).
    *   `p0s0f2.md`: The **File Map**, which lists all files and their components with their SCIS coordinates.
    *   `p0s0f3.md`: The **Dependency Map**, detailing internal and external dependencies.

5.  **Why SCIS?**
    *   **Traceability:** Every file and component has a unique, easily identifiable address.
    - **Clarity:** The name immediately tells you the file's purpose and location within the project's logical structure.
    - **AI-Friendly:** This structured naming helps automated tools (like this AI assistant) understand and navigate the codebase efficiently.

For a more detailed breakdown, please refer to `GEMINI.md` and the `p0s0f2.md` (File Map) and `p0s0f3.md` (Dependency Map) files.
