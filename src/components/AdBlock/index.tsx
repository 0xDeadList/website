import styles from './index.less';

interface IAdBlockProps {
  img: string;
  title: string;
  description: string;
}

export default function AdBlock({ img, title, description }: IAdBlockProps) {
  return (
    <div className={styles.blockWrapper}>
      <img
        src={img}
        className={styles.img}
      />
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
