// p1s3f2.js
// Component: Cp1s3f2.1 (PolkadotApiWrapper)
// Purpose: Provides React-friendly Polkadot.js API calls for wallet and preferences
// SCIS Version: 4.1
// Project: polkadot-discovery-poc

import { POLKADOT_CONFIG } from "p0s1f1";
import { PolkadotConnector } from "p0s0f6";

// Cp1s3f2.1: PolkadotApiWrapper - Wraps Polkadot.js for React components
export class PolkadotApiWrapper {
  constructor() {
    this.connector = new PolkadotConnector(POLKADOT_CONFIG);
    this.isConnected = false;
    this.account = null;
  }

  // Connect to wallet (e.g., Polkadot.js extension)
  async connectWallet() {
    try {
      const result = await this.connector.connectWallet();
      if (result.success) {
        this.isConnected = true;
        this.account = result.account;
        return { success: true, account: this.account };
      }
      throw new Error("Wallet connection failed");
    } catch (error) {
      console.warn(`Wallet connection failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // Disconnect wallet
  async disconnectWallet() {
    try {
      await this.connector.disconnectWallet();
      this.isConnected = false;
      this.account = null;
      return { success: true };
    } catch (error) {
      console.warn(`Wallet disconnection failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // Store user preferences on Westend testnet
  async storePreferences(preferences) {
    if (!this.isConnected || !this.account) {
      throw new Error("Wallet not connected");
    }
    try {
      const result = await this.connector.storePreferences(
        this.account,
        preferences,
      );
      return { success: true, txHash: result.txHash };
    } catch (error) {
      console.warn(`Store preferences failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // Retrieve user preferences from Westend testnet
  async getPreferences() {
    if (!this.isConnected || !this.account) {
      return { success: false, error: "Wallet not connected" };
    }
    try {
      const preferences = await this.connector.getPreferences(this.account);
      return { success: true, preferences };
    } catch (error) {
      console.warn(`Get preferences failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      account: this.account,
    };
  }
}

export default PolkadotApiWrapper;
