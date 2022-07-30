import styles from './index.less';
import { loadingGif } from '@/assets';
import { ShadowButton, KeyInput } from '@/components';
import { createRef, useEffect, useRef, useState } from 'react';
import { notification } from 'antd';
import {
  checkDead,
  checkLock,
  dlContract,
  handleBuryAddress,
  handleLockAddress,
} from '@/contracts/contractor/tombstone';
import {
  BtnMap,
  ButtonTypeEn,
  ClickButtonType,
  InvalidAddress,
  StatusTypeEn,
  TipMap,
} from '@/utils/constants';
import { BigNumber, ethers, Wallet } from 'ethers';
import { logo } from '@/assets';
import ConnectButton, {
  IConnectButtonHandle,
} from '@/components/ConnectButton';
import ProgressBar from '@/components/ProgressBar';
import { history } from 'umi';
import { IKeyInputRef } from '@/components/KeyInput';
import Footer from '@/Layouts/Footer';

export default function Bury() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(StatusTypeEn.Before);

  const [UIContent, setUIContent] = useState<{
    tip: string;
    btn: ClickButtonType;
  }>();

  const buryWallet = useRef<Wallet>();
  const intervalRef = useRef<() => void>();
  const connectRef = createRef<IConnectButtonHandle>();
  const inputRef = createRef<IKeyInputRef>();

  useEffect(() => {
    let tip = TipMap[status],
      btn = BtnMap[status];

    if (status !== StatusTypeEn.Before && buryWallet.current) {
      tip = tip.replace('*address*', buryWallet.current.address);

      if (status === StatusTypeEn.Buried) {
        tip = tip.replace(
          '*buriedAddr*',
          BigNumber.from(buryWallet.current.address).toString(),
        );
      }
    }

    setUIContent({
      tip,
      btn,
    });

    intervalRef.current = undefined;
    setLoading(false);
  }, [status]);

  const getWalletAddressByPrivateKey = (key?: string) => {
    try {
      if (!key || key?.length === 0) {
        throw Error;
      }

      buryWallet.current = new ethers.Wallet(key);
    } catch {
      notification.error({
        message: 'Invalid private key',
        description: 'Please input a valid private key',
      });
      buryWallet.current = undefined;
      setLoading(false);
    }
  };

  const handleSubmitPrivateKey = async () => {
    const key = inputRef.current?.value;

    if (!key || key.length === 0) {
      notification.warn({
        message: 'No private key',
        description: 'Please input valid private key of any address first.',
      });
      setLoading(false);
      return;
    }

    const address = connectRef?.current?.address;
    if (!address) {
      notification.warn({
        message: 'No wallet connected',
        description: 'Please connect your wallet first.',
      });
      setLoading(false);
      return;
    }

    setLoading(true);
    getWalletAddressByPrivateKey(key);

    const addr = buryWallet.current?.address;
    if (!addr || addr.length === 0 || addr === InvalidAddress) return;

    dlContract.isAddressDead(addr).then((isDead: boolean) => {
      if (isDead) {
        setStatus(StatusTypeEn.Buried);
      } else {
        dlContract
          .getAddressLocker(addr)
          .then((res: any) => {
            const [locker, expire_time] = res; // TODO： expire_time提示
            if (locker === InvalidAddress) {
              setStatus(StatusTypeEn.Normal);
            } else if (locker) {
              if ((locker as string)?.toLowerCase() === address) {
                setStatus(StatusTypeEn.LockedBySelf);
              } else {
                setStatus(StatusTypeEn.LockedByOthers);
              }
            } else {
              setStatus(StatusTypeEn.Buried);
            }
          })
          .catch((error: { reason: any }) => {
            notification.error({
              message: error?.reason ?? 'Failed to submit the private key.',
            });

            setLoading(false);
          });
      }
    });
  };

  const handleLock = () => {
    if (!buryWallet.current) return;

    handleLockAddress(buryWallet.current!, connectRef?.current?.address)
      .then(res => {
        setLoading(true);
        intervalRef.current = () => {
          checkLock(buryWallet.current).then((res: boolean) => {
            if (res) {
              intervalRef.current = undefined;
              setStatus(StatusTypeEn.LockedBySelf);
            } else {
              intervalRef.current?.();
            }
          });
        };

        intervalRef.current();
      })
      .catch(error => {
        notification.error({
          message: 'Failed to lock current address',
          description: error?.reason ?? 'Please try it later.',
        });

        setStatus(StatusTypeEn.Normal);
        setLoading(false);
      });
  };

  const handleBury = () => {
    if (!buryWallet.current) return;

    handleBuryAddress(buryWallet.current!)
      .then((res: any) => {
        intervalRef.current = () => {
          checkDead(buryWallet.current).then((res: boolean) => {
            if (res) {
              intervalRef.current = undefined;
              setStatus(StatusTypeEn.Buried);
            } else {
              intervalRef.current?.();
            }
          });
        };

        intervalRef.current();
      })
      .catch((error: any) => {
        notification.error({
          message: 'Failed to bury current address',
          description: error?.reason ?? 'Please try it later.',
        });
        setStatus(StatusTypeEn.Normal);
      });
  };

  const handleClickBtn = () => {
    const type = UIContent?.btn;

    setLoading(true);

    switch (type) {
      case ButtonTypeEn.Start:
        handleSubmitPrivateKey();
        break;
      case ButtonTypeEn.Lock:
        handleLock();
        break;
      case ButtonTypeEn.Bury:
        handleBury();
        break;
      default:
        break;
    }
  };

  const goHome = () => {
    history.push('/');
  };
  return (
    <div className={styles.content}>
      <header>
        <img
          src={logo}
          onClick={goHome}
        />
        <ConnectButton
          classname={styles.connectBtn}
          ref={connectRef}
        />
      </header>
      <ProgressBar curStep={status} />
      <div className={styles.formWrapper}>
        <KeyInput
          ref={inputRef}
          label="private key"
          // onSubmit={handleSubmitPrivateKey}
        />
        <div className={styles.tipWrapper}>Tips: {UIContent?.tip}</div>
        {loading ? (
          <img
            src={loadingGif}
            className={styles.loading}
          />
        ) : (
          <div className={styles.btnWrapper}>
            {UIContent?.btn && (
              <ShadowButton
                children={UIContent.btn}
                onClick={handleClickBtn}
                classname={styles.mintBtn}
              />
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
