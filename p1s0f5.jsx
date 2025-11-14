/**
 * File: p1s0f5.jsx
 * Components: Cp1s0f5.1 (WalletConnect), Cp1s0f5.2 (PreferenceSync)
 * Purpose: Polkadot wallet connection and preference synchronization
 * Dependencies: React, lucide-react, @polkadot/extension-dapp (via p1s3f2.js)
 */

import React, { useState, useEffect } from "react";
import {
  Wallet,
  Check,
  X,
  AlertCircle,
  Loader2,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

// Cp1s0f5.1 - WalletConnect Component
export function WalletConnect({
  onConnect,
  onDisconnect,
  isConnected,
  account,
}) {
  const [status, setStatus] = useState("disconnected"); // disconnected | connecting | connected | error
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [error, setError] = useState(null);
  const [showAccountSelector, setShowAccountSelector] = useState(false);

  useEffect(() => {
    if (isConnected && account) {
      setStatus("connected");
      setSelectedAccount(account);
    }
  }, [isConnected, account]);

  const handleConnect = async () => {
    setStatus("connecting");
    setError(null);

    try {
      // This would call p1s3f2.js (PolkadotAPI wrapper)
      // For PoC, we'll simulate the connection

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock accounts (in real implementation, this comes from Polkadot.js extension)
      const mockAccounts = [
        {
          address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
          meta: { name: "Main Account", source: "polkadot-js" },
        },
        {
          address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
          meta: { name: "Test Account", source: "polkadot-js" },
        },
      ];

      setAccounts(mockAccounts);

      if (mockAccounts.length > 0) {
        const firstAccount = mockAccounts[0];
        setSelectedAccount(firstAccount);
        setStatus("connected");

        if (onConnect) {
          onConnect(firstAccount);
        }
      }
    } catch (err) {
      console.error("Connection error:", err);
      setError(err.message || "Failed to connect wallet");
      setStatus("error");
    }
  };

  const handleDisconnect = () => {
    setStatus("disconnected");
    setAccounts([]);
    setSelectedAccount(null);
    setError(null);

    if (onDisconnect) {
      onDisconnect();
    }
  };

  const handleAccountChange = (account) => {
    setSelectedAccount(account);
    if (onConnect) {
      onConnect(account);
    }
    setShowAccountSelector(false);
  };

  return (
    <div className="wallet-connect bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Wallet className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Polkadot Wallet</h3>
          <p className="text-sm text-gray-600">
            Connect to save your preferences on-chain
          </p>
        </div>
      </div>

      {/* Disconnected State */}
      {status === "disconnected" && (
        <div className="space-y-4">
          <button
            onClick={handleConnect}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Wallet className="w-5 h-5" />
            <span>Connect Wallet</span>
          </button>

          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>
                Your preferences will be stored on Polkadot blockchain
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Sync across devices with your wallet</span>
            </p>
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>You own and control your data</span>
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Don't have a wallet?</p>
            <a
              href="https://polkadot.js.org/extension/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800"
            >
              <span>Install Polkadot.js Extension</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Connecting State */}
      {status === "connecting" && (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Connecting to wallet...</p>
          <p className="text-sm text-gray-500 mt-2">
            Please approve in your wallet extension
          </p>
        </div>
      )}

      {/* Connected State */}
      {status === "connected" && selectedAccount && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Connected
              </span>
            </div>
            <button
              onClick={handleDisconnect}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Disconnect
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Account
              </label>
              {accounts.length > 1 && (
                <button
                  onClick={() => setShowAccountSelector(!showAccountSelector)}
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Change
                </button>
              )}
            </div>

            {!showAccountSelector ? (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-mono text-sm text-gray-900 break-all">
                  {selectedAccount.address}
                </p>
                {selectedAccount.meta.name && (
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedAccount.meta.name}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {accounts.map((account) => (
                  <button
                    key={account.address}
                    onClick={() => handleAccountChange(account)}
                    className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                      selectedAccount.address === account.address
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <p className="font-mono text-sm text-gray-900 break-all">
                      {account.address}
                    </p>
                    {account.meta.name && (
                      <p className="text-xs text-gray-600 mt-1">
                        {account.meta.name}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Network:</strong> Westend Testnet
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Your preferences will be stored on the Polkadot blockchain
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">
                Connection Failed
              </p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>

          <button
            onClick={handleConnect}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>

          {error === "NO_EXTENSION_FOUND" && (
            <div className="text-center">
              <a
                href="https://polkadot.js.org/extension/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800"
              >
                <span>Install Polkadot.js Extension</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Cp1s0f5.2 - PreferenceSync Component
export function PreferenceSync({
  preferences,
  account,
  onSync,
  onSuccess,
  onError,
}) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null); // null | 'success' | 'error'

  const handleSync = async () => {
    if (!account) {
      setSyncStatus("error");
      if (onError) {
        onError("No account connected");
      }
      return;
    }

    setIsSyncing(true);
    setSyncStatus(null);

    try {
      // This would call p1s3f2.js (PolkadotAPI) to save preferences
      // For PoC, we'll simulate the transaction

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock transaction result
      const result = {
        blockHash:
          "0x" +
          Array(64)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join(""),
        success: true,
        timestamp: new Date().toISOString(),
      };

      setLastSync(result.timestamp);
      setSyncStatus("success");

      if (onSuccess) {
        onSuccess(result);
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSyncStatus(null);
      }, 5000);
    } catch (err) {
      console.error("Sync error:", err);
      setSyncStatus("error");

      if (onError) {
        onError(err.message);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const hasPreferences = preferences && Object.keys(preferences).length > 0;

  return (
    <div className="preference-sync">
      <button
        onClick={handleSync}
        disabled={!account || !hasPreferences || isSyncing}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
          !account || !hasPreferences
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : isSyncing
              ? "bg-purple-400 text-white cursor-wait"
              : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        {isSyncing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Saving to Polkadot...</span>
          </>
        ) : (
          <>
            <RefreshCw className="w-5 h-5" />
            <span>Save Preferences On-Chain</span>
          </>
        )}
      </button>

      {!account && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Connect wallet to save preferences
        </p>
      )}

      {account && !hasPreferences && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Select some filters to save preferences
        </p>
      )}

      {syncStatus === "success" && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">
              Preferences saved on-chain!
            </span>
          </div>
          {lastSync && (
            <p className="text-xs text-green-600 mt-1">
              Last synced: {new Date(lastSync).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {syncStatus === "error" && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <X className="w-5 h-5" />
            <span className="text-sm font-medium">
              Failed to save preferences
            </span>
          </div>
          <p className="text-xs text-red-600 mt-1">
            Please try again or check your wallet connection
          </p>
        </div>
      )}

      {lastSync && !isSyncing && syncStatus !== "success" && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Last synced: {new Date(lastSync).toLocaleString()}
        </p>
      )}
    </div>
  );
}

export default { WalletConnect, PreferenceSync };
