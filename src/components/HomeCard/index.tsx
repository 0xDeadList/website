import { Link } from 'umi'
import styles from './index.less'

interface IHomeCardInfo {
  path: string;
  title: string;
  description: string;
}


export default function HomeCard({
  path, title, description
}: IHomeCardInfo) {
  return (
    <Link to={path} className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>
        {description}
      </p>
    </Link>
  )
}
