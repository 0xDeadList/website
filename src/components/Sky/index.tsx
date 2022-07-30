import { moon, star } from '@/assets'
import styles from './index.less'

export default function Sky() {
  return (
    <div className={styles.sky}>
      <img src={star} className={styles.star1} /><img src={moon} className={styles.moon} /><img src={star} className={styles.star2} />
    </div>
  )
}
