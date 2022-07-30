import styles from './index.less';

export interface IQAProps {
  question: string;
  answer: string | React.ReactNode;
}

export default function QA({ question, answer }: IQAProps) {
  return (
    <div className={styles.qaWrapper}>
      <div className={styles.question}>Q:{question}</div>
      <div className={styles.answer}>A:{answer}</div>
    </div>
  );
}
