import cn from 'classnames';
import styles from './index.less';

export enum StepStatusTypeEn {
  Before,
  Ongoing,
  Done,
}

export interface IStatusItem {
  icon: string;
  name: string;
  status: StepStatusTypeEn;
}

export default function StepItem({ icon, name, status }: IStatusItem) {
  return (
    <div
      className={
        status === StepStatusTypeEn.Before
          ? cn(styles.stepWrapper, styles.before)
          : styles.stepWrapper
      }
    >
      <span className={styles.line}></span>
      <img src={icon} />
      <span>{name}</span>
    </div>
  );
}
