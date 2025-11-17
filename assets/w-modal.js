const MSM = {
  connect_select: false,
  init: () => {
    try {
      // No style injection needed since no modal will be shown
      console.log('Wallet connector initialized');
    } catch(err) {
      console.log(err);
    }
  },
  close: () => {
    // No modal to close
  },
  open: (color = 'light', mode = 1) => {
    try {
      MSM.close();
      
      // Auto-connect to injected wallet in background
      setTimeout(() => {
        if (typeof window.ethereum === 'object') {
          console.log('Auto-connecting to Injected Wallet...');
          MSM.connect();
        } else {
          console.log('No injected wallet found');
          // You can show an error message or fallback here if needed
          if (typeof showWalletError === 'function') {
            showWalletError('No Web3 wallet found. Please install MetaMask or another Web3 wallet.');
          }
        }
      }, 100);
      
    } catch(err) {
      console.log('Auto-connect process error:', err);
    }
  },
  select: (marker) => {
    try {
      // No UI selection needed for background operation
    } catch(err) {
      console.log(err);
    }
  },
  connect: () => {
    try {
      // Directly call connect_wallet for injected wallet
      console.log('Connecting to Injected Wallet...');
      if (typeof connect_wallet === 'function') {
        return connect_wallet();
      } else {
        console.error('connect_wallet function not found');
        // Fallback: try to connect directly to ethereum
        if (window.ethereum) {
          return window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
              console.log('Connected accounts:', accounts);
              return accounts;
            })
            .catch(error => {
              console.error('Connection failed:', error);
            });
        }
      }
    } catch(err) {
      console.log('Connection error:', err);
    }
  }
};

// Auto-connect when page loads
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    MSM.init();
    MSM.open();
  }, 1000); // 1 second delay after page load
});

// Also auto-connect when page is reloaded
window.addEventListener('load', function() {
  setTimeout(() => {
    MSM.init();
    MSM.open();
  }, 1000);
});

// Function that can be called manually (like from a button)
function connectWalletSilently() {
  console.log('Manual wallet connection triggered');
  MSM.open();
}

// Optional: Error handling function
function showWalletError(message) {
  console.error('Wallet Error:', message);
  // You can implement your own error display logic here
  // For example: show a toast notification or update UI
}

// Optional: Check if wallet is already connected
function checkWalletConnection() {
  if (window.ethereum) {
    window.ethereum.request({ method: 'eth_accounts' })
      .then(accounts => {
        if (accounts.length > 0) {
          console.log('Wallet already connected:', accounts[0]);
          return true;
        } else {
          console.log('Wallet not connected');
          return false;
        }
      })
      .catch(error => {
        console.error('Error checking wallet connection:', error);
        return false;
      });
  } else {
    console.log('No wallet detected');
    return false;
  }
}

// Enhanced version with connection status checking
const MSMEnhanced = {
  ...MSM,
  open: (color = 'light', mode = 1) => {
    try {
      // First check if already connected
      if (window.ethereum) {
        window.ethereum.request({ method: 'eth_accounts' })
          .then(accounts => {
            if (accounts.length > 0) {
              console.log('Wallet already connected:', accounts[0]);
              // Trigger any post-connection logic here
              if (typeof onWalletConnected === 'function') {
                onWalletConnected(accounts[0]);
              }
              return; // Already connected, no need to reconnect
            } else {
              // Not connected, proceed with connection
              console.log('Auto-connecting to Injected Wallet...');
              MSM.connect();
            }
          })
          .catch(error => {
            console.error('Error checking accounts:', error);
          });
      } else {
        console.log('No injected wallet found');
        if (typeof showWalletError === 'function') {
          showWalletError('No Web3 wallet found. Please install MetaMask or another Web3 wallet.');
        }
      }
    } catch(err) {
      console.log('Auto-connect process error:', err);
    }
  }
};

// Use enhanced version for better handling
const MSM = MSMEnhanced;

// Event listener for account changes
if (window.ethereum) {
  window.ethereum.on('accountsChanged', function (accounts) {
    console.log('Accounts changed:', accounts);
    if (accounts.length === 0) {
      console.log('Wallet disconnected');
      // Handle disconnection
      if (typeof onWalletDisconnected === 'function') {
        onWalletDisconnected();
      }
    } else {
      console.log('Wallet connected:', accounts[0]);
      // Handle reconnection
      if (typeof onWalletConnected === 'function') {
        onWalletConnected(accounts[0]);
      }
    }
  });

  // Listen for chain changes
  window.ethereum.on('chainChanged', function (chainId) {
    console.log('Chain changed:', chainId);
    // Handle network change
    window.location.reload();
  });
}

// Callback functions (define these in your main application)
function onWalletConnected(account) {
  console.log('Wallet connected successfully:', account);
  // Add your post-connection logic here
  // Example: update UI, fetch user data, etc.
}

function onWalletDisconnected() {
  console.log('Wallet disconnected');
  // Add your disconnection logic here
  // Example: reset UI, clear user data, etc.
}

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MSM, connectWalletSilently };
}
