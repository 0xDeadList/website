import styles from './index.less';
import QA, { IQAProps } from './QA';

const QAs: IQAProps[] = [
  {
    question: 'What is 0xDeadList?',
    answer: (
      <span>
        0xDeadList collects the "dead" address with leaked private key. Users
        are able to lock/bury wallet and get a{' '}
        <a href="https://opensea.io/collection/addressburier-v3">Burier NFT</a>{' '}
        for reporting the leaked private key. Dapps are able to block those
        public accessible wallets with on/off-chain APIs.
      </span>
    ),
  },
  {
    question: 'Why should I bury an address?',
    answer:
      'You will get a NFT after successfully burying an address. If your private key is leaked, you should also lock and bury it to avoid malicious exploitation.',
  },
  {
    question: 'Why should lock address before bury?',
    answer:
      'To enable users lock address before revealing private key. This also prevents the front-run.',
  },
  {
    question: ' Is the code open-source?',
    answer: <a href="https://github.com/0xDeadList/0xDeadList"> GitHub</a>,
  },
  {
    question: 'What is the NFT/SBT collections?',
    answer: (
      <span>
        <a href="https://opensea.io/collection/addressburier-v3"> Burier NFT</a>
        {' & '}
        <a href="https://opensea.io/collection/tombstone-zktgb9g35d">
          Tombstone SBT
        </a>
      </span>
    ),
  },
  {
    question: 'What is the contract address?',
    answer: (
      <a href="https://polygonscan.com/address/0x59451a98d772f2a53ca2241a884b1703f8c55218">
        {' '}
        Polygon contract
      </a>
    ),
  },
];

export default function FAQ() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>FAQs</div>
      <div className={styles.qaWrapper}>
        {QAs.map((qa, idx) => (
          <QA
            {...qa}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}
