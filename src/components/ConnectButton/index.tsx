import { checkConnection, getAddressByMetaMask } from '@/utils';
import { notification } from 'antd';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import ShadowButton from '../ShadowButton';

export interface IConnectButtonHandle {
  address?: string;
}

function ConnectButton(
  { classname }: { classname?: string },
  ref: React.Ref<IConnectButtonHandle>,
) {
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    checkConnection()
      .then(account => setAddress(account))
      .catch(() => setAddress(undefined));
  }, []);

  const handleConnectWallet = () => {
    getAddressByMetaMask()
      .then(addr => setAddress(addr))
      .catch(error => {
        notification.error({
          message: 'Failed connect to MetaMask',
          description: '' + error?.message,
        });
      });
  };

  const handleClick = () => {
    if (!address || address.length === 0) {
      handleConnectWallet();
    }
  };

  useImperativeHandle(ref, () => ({ address }), [address]);

  return (
    <ShadowButton
      children={address ?? 'Connect Wallet'}
      onClick={handleClick}
      classname={classname}
    />
  );
}

export default forwardRef(ConnectButton);
