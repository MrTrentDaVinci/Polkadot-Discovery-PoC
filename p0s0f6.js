// p0s0f6.js
// Components: Cp0s0f6.1 (WalletConnectionManager), Cp0s0f6.2 (PreferenceStorage)
// Purpose: Connects to Polkadot.js and stores/retrieves preferences on Westend testnet
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { POLKADOT_CONFIG } from "p0s1f1";

// Cp0s0f6.1: WalletConnectionManager - Handles Polkadot.js extension connection
export class WalletConnectionManager {
  constructor(config) {
    this.config = config;
    this.api = null;
    this.extension = null;
  }

  // Initialize Polkadot API with Westend testnet
  async initializeApi() {
    try {
      const provider = new WsProvider(this.config.westendEndpoint);
      this.api = await ApiPromise.create({ provider });
      return true;
    } catch (error) {
      console.warn(`API initialization failed: ${error.message}`);
      return false;
    }
  }

  // Connect to Polkadot.js extension
  async connectWallet() {
    try {
      if (!this.api) {
        const initialized = await this.initializeApi();
        if (!initialized) throw new Error("API initialization failed");
      }

      const extensions = await web3Enable("Polkadot Discovery PoC");
      if (extensions.length === 0) {
        throw new Error("No Polkadot.js extension found");
      }
      this.extension = extensions[0];

      const accounts = await web3Accounts();
      if (accounts.length === 0) {
        throw new Error("No accounts found in extension");
      }

      return { success: true, account: accounts[0] };
    } catch (error) {
      console.warn(`Wallet connection failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // Disconnect wallet and API
  async disconnectWallet() {
    try {
      if (this.api) {
        await this.api.disconnect();
        this.api = null;
      }
      this.extension = null;
      return { success: true };
    } catch (error) {
      console.warn(`Wallet disconnection failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}

// Cp0s0f6.2: PreferenceStorage - Manages preference storage on Westend
export class PreferenceStorage {
  constructor(config, api) {
    this.config = config;
    this.api = api;
  }

  // Store preferences (mock implementation for PoC)
  async storePreferences(account, preferences) {
    try {
      if (!this.api || !account) {
        throw new Error("API or account not initialized");
      }

      // Mock transaction for Westend (PoC purposes)
      const serializedPrefs = JSON.stringify(preferences);
      const txHash = await new Promise((resolve) => {
        // Simulate extrinsic submission
        setTimeout(() => resolve(`mock-tx-${Date.now()}`), 1000);
      });

      return { success: true, txHash };
    } catch (error) {
      console.warn(`Store preferences failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // Retrieve preferences (mock implementation for PoC)
  async getPreferences(account) {
    try {
      if (!this.api || !account) {
        throw new Error("API or account not initialized");
      }

      // Mock fetch from Westend
      const preferences = { theme: "dark", topics: [64] }; // Example
      return preferences;
    } catch (error) {
      console.warn(`Get preferences failed: ${error.message}`);
      return null;
    }
  }
}

// Main PolkadotConnector class
export class PolkadotConnector {
  constructor(config = POLKADOT_CONFIG) {
    this.config = config;
    this.walletManager = new WalletConnectionManager(config);
    this.storage = null;
  }

  async connectWallet() {
    const result = await this.walletManager.connectWallet();
    if (result.success) {
      this.storage = new PreferenceStorage(this.config, this.walletManager.api);
    }
    return result;
  }

  async disconnectWallet() {
    const result = await this.walletManager.disconnectWallet();
    if (result.success) {
      this.storage = null;
    }
    return result;
  }

  async storePreferences(account, preferences) {
    if (!this.storage) {
      throw new Error("Storage not initialized");
    }
    return this.storage.storePreferences(account, preferences);
  }

  async getPreferences(account) {
    if (!this.storage) {
      return null;
    }
    return this.storage.getPreferences(account);
  }
}

export default PolkadotConnector;
