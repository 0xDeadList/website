import styles from './index.less';
import { logo, bury, lock } from '@/assets';
import { ShadowButton, Sky } from '@/components';
import { createRef, Fragment, useEffect, useRef, useState } from 'react';
import { openNewTab } from '@/utils';
import StatusDescription from '@/components/StatusDescription';
import { history } from 'umi';
import ConnectButton, {
  IConnectButtonHandle,
} from '@/components/ConnectButton';
import AdBlock from '@/components/AdBlock';
import { AdBlocksConfig } from './constants';

export default function Home() {
  const [deadCount, setDeadCount] = useState<string>();
  const [lockCount, setLockCount] = useState<string>();
  const connectRef = createRef<IConnectButtonHandle>();

  const getMetadata = async () => {
    try {
      fetch(
        'https://raw.githubusercontent.com/0xDeadList/0xDeadList/main/meta.txt',
      )
        .then(res => res.text())
        .then(data => {
          // 三行分别是：更新到的blocknumber，total dead, total locked
          const counts = data.split('\n');

          setDeadCount(counts?.[1]);
          setLockCount(counts?.[2]);
        });
    } catch (err) {
      console.error('Can NOT fetch data from 0xDeadList.', err);
    }
  };

  useEffect(() => {
    getMetadata();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* background */}
      <Sky />

      {/* header - connect button */}
      <header>
        <ConnectButton ref={connectRef} />
      </header>

      {/* logo */}
      <Fragment>
        <img
          src={logo}
          className={styles.logo}
        />
      </Fragment>

      <div className={styles.content}>
        <div className={styles.description}>
          <StatusDescription
            count={deadCount}
            description="Buried"
            icon={bury}
          />
          <StatusDescription
            count={lockCount}
            description="Locked"
            icon={lock}
          />
        </div>
        <div className={styles.console}>
          <ShadowButton
            children="Show List"
            onClick={() => {
              openNewTab(
                'https://github.com/0xDeadList/0xDeadList/blob/main/deadlist.txt',
              );
            }}
          />
          <ShadowButton
            children="Bury Now"
            onClick={() => {
              history.push('/bury');
            }}
          />
        </div>
      </div>

      <div className={styles.blocksContainer}>
        {AdBlocksConfig?.map(block => {
          return (
            <AdBlock
              {...block}
              key={block.title}
            />
          );
        })}
      </div>
    </div>
  );
}
