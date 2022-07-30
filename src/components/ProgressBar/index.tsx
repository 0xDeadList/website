import styles from './index.less';
import StepItem, { IStatusItem, StepStatusTypeEn } from './StepItem';
import { validate, bury, lock, done } from '@/assets';
// import { useState } from 'react';
import { StatusTypeEn } from '@/utils/constants';

interface StepItem extends Omit<IStatusItem, 'status'> {
  edgeStatus: StatusTypeEn;
}

const STEP_LIST: StepItem[] = [
  {
    icon: validate,
    name: 'Validate',
    edgeStatus: StatusTypeEn.Before,
  },
  {
    icon: lock,
    name: 'Lock',
    edgeStatus: StatusTypeEn.Normal,
  },
  {
    icon: bury,
    name: 'Bury',
    edgeStatus: StatusTypeEn.LockedByOthers, // or LockedBySelf
  },
  {
    icon: done,
    name: 'Done',
    edgeStatus: StatusTypeEn.Buried,
  },
];

export default function ProgressBar({ curStep }: { curStep: StatusTypeEn }) {
  const getStepStatus = (edge: StatusTypeEn) => {
    if (curStep === edge) {
      return StepStatusTypeEn.Ongoing;
    } else if (curStep > edge) {
      return StepStatusTypeEn.Done;
    }
    return StepStatusTypeEn.Before;
  };

  return (
    <div className={styles.wrapper}>
      {STEP_LIST.map(step => (
        <StepItem
          key={step.name}
          {...step}
          status={getStepStatus(step.edgeStatus)}
        />
      ))}
    </div>
  );
}
