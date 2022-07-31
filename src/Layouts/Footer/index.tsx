import LinkItem from '@/components/LinkItem';
import styles from './index.less';

export default function Footer() {
  return (
    <footer>
      <div className={styles.links}>
        <LinkItem
          name="Twitter"
          link="https://twitter.com/0xdeadlist"
        />
        <LinkItem
          name="Discord"
          link="https://discord.gg/vTbSCKau"
        />
        <LinkItem
          name="Github"
          link="https://github.com/0xDeadList"
        />
      </div>
      Power by MetaMail {'&'} EthSign
    </footer>
  );
}
