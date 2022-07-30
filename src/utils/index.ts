import { ethers } from 'ethers';

const ethereum = window?.ethereum;
const PolygonChainId = 137; // Polygon Mainnet
const hexPolygonChainId = ethers.utils.hexValue(PolygonChainId);

export const getAddressByMetaMask = async () => {
  try {
    if (!ethereum) {
      throw new Error('Your client does not support Ethereum');
    }

    const handleConnect = async () => {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const newAddr = Array.isArray(newAccounts) ? newAccounts[0] : newAccounts;

      if (!newAddr) return;

      return newAddr;
    };

    if (window.ethereum.networkVersion !== PolygonChainId) {
      window.ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: hexPolygonChainId }],
        })
        .then(handleConnect)
        .catch((err: any) => {
          if (err.code === 4902) {
            window.ethereum
              .request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainName: 'Polygon Mainnet',
                    chainId: hexPolygonChainId,
                    nativeCurrency: {
                      name: 'MATIC',
                      decimals: 18,
                      symbol: 'MATIC',
                    },
                    rpcUrls: ['https://polygon-rpc.com/'],
                  },
                ],
              })
              .then(handleConnect);
          }
        });
    } else {
      handleConnect();
    }
  } catch (error: any) {
    throw error;
  }
};

export const checkConnection = async () => {
  try {
    if (!ethereum) {
      throw new Error('Your client does not support Ethereum');
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts?.length > 0) {
      return accounts[0];
    }
  } catch (error: any) {
    throw error;
  }
};

export const openNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
