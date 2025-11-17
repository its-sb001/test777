// Ultra simple wallet auto-connect
function autoConnectWallet() {
  console.log('Attempting to auto-connect wallet...');
  
  if (window.ethereum) {
    console.log('Ethereum wallet detected');
    
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        console.log('✅ Connected successfully! Account:', accounts[0]);
        // Success - do something with the connection
        if (window.onWalletConnected) {
          window.onWalletConnected(accounts[0]);
        }
      })
      .catch(error => {
        console.log('❌ Connection failed:', error);
        if (window.onWalletError) {
          window.onWalletError(error);
        }
      });
  } else {
    console.log('❌ No Ethereum wallet found');
    if (window.onNoWallet) {
      window.onNoWallet();
    }
  }
}

// Auto connect when page loads
setTimeout(autoConnectWallet, 1500);

// Manual connect function
window.connectWallet = autoConnectWallet;

// Callback functions (define these in your main app)
window.onWalletConnected = function(account) {
  console.log('🎉 Wallet connected! Address:', account);
  // Add your success logic here
};

window.onWalletError = function(error) {
  console.log('Connection error:', error);
};

window.onNoWallet = function() {
  console.log('Please install a Web3 wallet like MetaMask');
};
