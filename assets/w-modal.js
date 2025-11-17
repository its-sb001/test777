<!DOCTYPE html>
<html>
<head>
    <title>Wallet Connection</title>
    <style>
        /* Loading Circle Styles */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            flex-direction: column;
        }

        .loading-circle {
            width: 60px;
            height: 60px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #0075ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }

        .loading-text {
            color: white;
            font-size: 16px;
            font-family: Arial, sans-serif;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Connect Button Styles */
        .connect-button {
            background: #0075ff;
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            font-family: Arial, sans-serif;
        }

        .connect-button:hover {
            background: #0056cc;
        }

        .connect-button:disabled {
            background: #cccccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <button class="connect-button" onclick="connectWallet()">Connect Wallet</button>

    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-circle"></div>
        <div class="loading-text" id="loadingText">Connecting to Wallet...</div>
    </div>

    <script>
        // Wallet Connection Manager
        const WalletManager = {
            isConnecting: false,
            currentStep: 0,

            init: function() {
                console.log('Wallet Manager Initialized');
                this.setupEventListeners();
            },

            setupEventListeners: function() {
                // Listen for account changes
                if (window.ethereum) {
                    window.ethereum.on('accountsChanged', (accounts) => {
                        console.log('Accounts changed:', accounts);
                        this.handleAccountsChanged(accounts);
                    });

                    window.ethereum.on('chainChanged', (chainId) => {
                        console.log('Chain changed:', chainId);
                        window.location.reload();
                    });

                    window.ethereum.on('disconnect', (error) => {
                        console.log('Wallet disconnected:', error);
                        this.handleDisconnect();
                    });
                }
            },

            showLoading: function(message = 'Connecting to Wallet...') {
                const overlay = document.getElementById('loadingOverlay');
                const text = document.getElementById('loadingText');
                text.textContent = message;
                overlay.style.display = 'flex';
                this.isConnecting = true;
            },

            hideLoading: function() {
                const overlay = document.getElementById('loadingOverlay');
                overlay.style.display = 'none';
                this.isConnecting = false;
                this.currentStep = 0;
            },

            updateLoadingText: function(message) {
                const text = document.getElementById('loadingText');
                text.textContent = message;
            },

            connectWallet: async function() {
                if (this.isConnecting) {
                    console.log('Already connecting...');
                    return;
                }

                try {
                    this.showLoading('Checking for wallet...');

                    // Check if any injected wallet is available
                    if (typeof window.ethereum === 'undefined') {
                        this.hideLoading();
                        alert('No Web3 wallet found! Please install Bitget Wallet, MetaMask, or another Web3 wallet.');
                        return;
                    }

                    this.updateLoadingText('Requesting connection...');

                    // Request account access
                    const accounts = await window.ethereum.request({
                        method: 'eth_requestAccounts'
                    });

                    if (accounts.length === 0) {
                        throw new Error('No accounts found');
                    }

                    console.log('Connected account:', accounts[0]);
                    this.updateLoadingText('Wallet connected! Approving smart contract...');

                    // Simulate smart contract interaction
                    await this.approveSmartContract(accounts[0]);

                    this.updateLoadingText('Transaction confirmed!');
                    
                    // Success - wait a moment then hide loading
                    setTimeout(() => {
                        this.hideLoading();
                        this.onConnectionSuccess(accounts[0]);
                    }, 2000);

                } catch (error) {
                    console.error('Connection failed:', error);
                    this.hideLoading();
                    this.onConnectionError(error);
                }
            },

            approveSmartContract: async function(account) {
                // Simulate smart contract approval process
                // Replace this with your actual smart contract interaction
                
                this.updateLoadingText('Approving smart contract...');
                
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Example: If you have an actual contract method, call it here:
                /*
                const contract = new web3.eth.Contract(contractABI, contractAddress);
                const result = await contract.methods.yourMethod().send({
                    from: account,
                    gas: 300000
                });
                */
                
                this.updateLoadingText('Smart contract approved!');
                
                // Simulate confirmation delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                return { success: true, transactionHash: '0x123...' };
            },

            handleAccountsChanged: function(accounts) {
                if (accounts.length === 0) {
                    console.log('Wallet disconnected');
                    this.onDisconnect();
                } else {
                    console.log('Account changed to:', accounts[0]);
                }
            },

            handleDisconnect: function() {
                console.log('Wallet disconnected');
                this.hideLoading();
                this.onDisconnect();
            },

            onConnectionSuccess: function(account) {
                console.log('🎉 Wallet connection successful!', account);
                // Update UI, show success message, redirect, etc.
                alert('Successfully connected: ' + account);
                
                // You can redirect or update your app state here
                // window.location.href = '/dashboard';
            },

            onConnectionError: function(error) {
                console.error('❌ Connection error:', error);
                
                let errorMessage = 'Connection failed: ';
                
                if (error.code === 4001) {
                    errorMessage += 'User rejected the connection request.';
                } else if (error.code === -32002) {
                    errorMessage += 'Connection request already pending. Please check your wallet.';
                } else {
                    errorMessage += error.message;
                }
                
                alert(errorMessage);
            },

            onDisconnect: function() {
                console.log('Wallet disconnected');
                alert('Wallet disconnected');
                // Update UI to show disconnected state
            }
        };

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            WalletManager.init();
        });

        // Global function to connect wallet (called from button)
        function connectWallet() {
            WalletManager.connectWallet();
        }

        // Auto-connect function (optional - uncomment if you want auto-connect)
        /*
        setTimeout(() => {
            console.log('Attempting auto-connect...');
            WalletManager.connectWallet();
        }, 2000);
        */

        // Enhanced wallet detection for Bitget Wallet and others
        function detectWallet() {
            const wallets = {
                bitget: typeof window.bitkeep !== 'undefined' && window.bitkeep.ethereum,
                metamask: typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask,
                trust: typeof window.ethereum !== 'undefined' && window.ethereum.isTrust,
                coinbase: typeof window.ethereum !== 'undefined' && window.ethereum.isCoinbaseWallet,
                injected: typeof window.ethereum !== 'undefined'
            };

            console.log('Detected wallets:', wallets);
            return wallets;
        }

        // Check which wallet is available
        console.log('Wallet detection:', detectWallet());
    </script>
</body>
</html>
