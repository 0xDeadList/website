import styles from './index.less';

interface IStatusDescription {
  count?: string;
  description: string;
  icon: string;
}

export default function StatusDescription({
  count,
  description,
  icon,
}: IStatusDescription) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.count}>{count ?? '-'}</span>
      <span className={styles.detail}> address {description}.</span>
      <img
        src={icon}
        className={styles.icon}
      ></img>
    </div>
  );
}
