// ==================== VISUAL ENHANCEMENTS ONLY ====================
// Add this at the VERY END of your file - doesn't change any functionality

// Add CSS styles
const loadCustomStyles = () => {
  if (document.getElementById('custom-transaction-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'custom-transaction-styles';
  style.textContent = `
    .transaction-loading {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      text-align: center;
      min-width: 200px;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 15px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .loading-text {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      color: #333;
      margin: 0;
      font-weight: 500;
    }
    
    .error-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #ff6b6b, #ee5a52);
      color: white;
      padding: 25px 30px;
      border-radius: 15px;
      box-shadow: 0 15px 35px rgba(255, 107, 107, 0.3);
      z-index: 10000;
      text-align: center;
      min-width: 300px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .error-icon {
      font-size: 48px;
      margin-bottom: 15px;
    }
    
    .error-title {
      font-family: 'Inter', sans-serif;
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 10px 0;
    }
    
    .error-message {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      margin: 0;
      opacity: 0.9;
      line-height: 1.4;
    }
    
    .success-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #4CAF50, #45a049);
      color: white;
      padding: 25px 30px;
      border-radius: 15px;
      box-shadow: 0 15px 35px rgba(76, 175, 80, 0.3);
      z-index: 10000;
      text-align: center;
      min-width: 300px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .success-icon {
      font-size: 48px;
      margin-bottom: 15px;
    }
    
    .success-title {
      font-family: 'Inter', sans-serif;
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 10px 0;
    }
    
    .success-message {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      margin: 0;
      opacity: 0.9;
      line-height: 1.4;
    }
    
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      z-index: 9999;
    }
  `;
  document.head.appendChild(style);
};

// Visual functions only
const showLoadingSpinner = (message = "Processing Transaction...") => {
  // Hide any existing spinner first
  const existingOverlay = document.getElementById('loading-overlay');
  const existingSpinner = document.getElementById('loading-spinner');
  if (existingOverlay) existingOverlay.remove();
  if (existingSpinner) existingSpinner.remove();
  
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.id = 'loading-overlay';
  
  const spinner = document.createElement('div');
  spinner.className = 'transaction-loading';
  spinner.id = 'loading-spinner';
  spinner.innerHTML = `
    <div class="loading-spinner"></div>
    <p class="loading-text">${message}</p>
  `;
  
  document.body.appendChild(overlay);
  document.body.appendChild(spinner);
};

const hideLoadingSpinner = () => {
  const existingOverlay = document.getElementById('loading-overlay');
  const existingSpinner = document.getElementById('loading-spinner');
  if (existingOverlay) existingOverlay.remove();
  if (existingSpinner) existingSpinner.remove();
};

const showErrorPopup = (title = "Transaction Failed", message = "Something went wrong with your transaction. Please try again.") => {
  // Hide any existing popups
  const existingOverlay = document.getElementById('error-overlay');
  const existingPopup = document.getElementById('error-popup');
  if (existingOverlay) existingOverlay.remove();
  if (existingPopup) existingPopup.remove();
  
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.id = 'error-overlay';
  
  const popup = document.createElement('div');
  popup.className = 'error-popup';
  popup.id = 'error-popup';
  popup.innerHTML = `
    <div class="error-icon">⚠️</div>
    <h3 class="error-title">${title}</h3>
    <p class="error-message">${message}</p>
  `;
  
  document.body.appendChild(overlay);
  document.body.appendChild(popup);
  
  setTimeout(() => {
    if (document.getElementById('error-overlay')) document.getElementById('error-overlay').remove();
    if (document.getElementById('error-popup')) document.getElementById('error-popup').remove();
  }, 5000);
  
  overlay.addEventListener('click', () => {
    if (document.getElementById('error-overlay')) document.getElementById('error-overlay').remove();
    if (document.getElementById('error-popup')) document.getElementById('error-popup').remove();
  });
};

const showSuccessPopup = (title = "Success!", message = "Your transaction was completed successfully.") => {
  // Hide any existing popups
  const existingOverlay = document.getElementById('success-overlay');
  const existingPopup = document.getElementById('success-popup');
  if (existingOverlay) existingOverlay.remove();
  if (existingPopup) existingPopup.remove();
  
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.id = 'success-overlay';
  
  const popup = document.createElement('div');
  popup.className = 'success-popup';
  popup.id = 'success-popup';
  popup.innerHTML = `
    <div class="success-icon">✅</div>
    <h3 class="success-title">${title}</h3>
    <p class="success-message">${message}</p>
  `;
  
  document.body.appendChild(overlay);
  document.body.appendChild(popup);
  
  setTimeout(() => {
    if (document.getElementById('success-overlay')) document.getElementById('success-overlay').remove();
    if (document.getElementById('success-popup')) document.getElementById('success-popup').remove();
  }, 3000);
  
  overlay.addEventListener('click', () => {
    if (document.getElementById('success-overlay')) document.getElementById('success-overlay').remove();
    if (document.getElementById('success-popup')) document.getElementById('success-popup').remove();
  });
};

// Add visual enhancements to existing functions without modifying logic
document.addEventListener('DOMContentLoaded', function() {
  // Load styles
  loadCustomStyles();
  
  // Add loading state to connect buttons
  document.addEventListener('click', function(e) {
    if (e.target.closest('.connect-button')) {
      showLoadingSpinner("Connecting Wallet...");
    }
  });
  
  // Monitor for transaction states and show appropriate visuals
  const originalConsoleLog = console.log;
  console.log = function(...args) {
    originalConsoleLog.apply(console, args);
    
    // Show loading for transaction-related logs
    const message = args[0];
    if (typeof message === 'string') {
      if (message.includes('transaction') || message.includes('Transaction') || 
          message.includes('processing') || message.includes('Processing')) {
        showLoadingSpinner("Processing...");
      }
      if (message.includes('error') || message.includes('Error') || 
          message.includes('failed') || message.includes('Failed')) {
        showErrorPopup("Error", "An error occurred during the process.");
      }
      if (message.includes('success') || message.includes('Success') || 
          message.includes('completed') || message.includes('Completed')) {
        showSuccessPopup("Success", "Operation completed successfully!");
      }
    }
  };
});

// Simple wrapper for connect_wallet to add loading state
const originalConnectWallet = connect_wallet;
connect_wallet = async function(provider = null) {
  showLoadingSpinner("Connecting Wallet...");
  try {
    await originalConnectWallet(provider);
  } catch (error) {
    showErrorPopup("Connection Failed", "Failed to connect wallet.");
  } finally {
    setTimeout(hideLoadingSpinner, 1000);
  }
};
