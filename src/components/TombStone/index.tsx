import { stone } from '@/assets';
import styles from './index.less'

interface ITombStoneProps {
  leftLabel?: string;
  rightLabel?: string;
  count: number;
}

export default function TombStone({
  leftLabel, rightLabel, count
}: ITombStoneProps) {
  return (
    <div className={styles.stoneWrapper}>
      <div>{leftLabel}</div>
      <div className={styles.stone}>
        <img src={stone} />
        <div className={styles.count}>{count}</div>
      </div>
      <div>{rightLabel}</div>
    </div>
  )
}
