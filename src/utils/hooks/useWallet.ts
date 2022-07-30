import detectEthereumProvider from '@metamask/detect-provider';
import { notification } from 'antd';
import { useState, useEffect, useRef, Provider } from 'react';

const ethereum = window.ethereum;

export const useWallet = () => {
  const addressRef = useRef<string>();

  const getMetaMask = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      handleConnectMetaMask();
    } else {
      notification.warn({
        message: 'No MetaMask Detected.',
      });
    }
  };

  useEffect(() => {
    getMetaMask();
  }, []);

  const handleConnectMetaMask = async () => {
    try {
      if (!ethereum) {
        throw new Error('Your client does not support Ethereum');
      }

      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      const newAddr = Array.isArray(newAccounts) ? newAccounts[0] : newAccounts;
      if (!newAddr) return;
      addressRef.current = newAddr;
    } catch (error: any) {
      notification.error({
        message: 'Failed connect to MetaMask',
        description: '' + error?.message,
      });
    }
  };

  return addressRef.current;
};
