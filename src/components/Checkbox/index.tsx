import classNames from 'classnames';
import { useState } from 'react'
import styles from './index.less'

interface ICheckboxProps {
  onClick: (selected: boolean) => void;
}

export default function Checkbox({ onClick }: ICheckboxProps) {
  const [isSelected, setIsSelected] = useState(false)
  return (
    <span className={isSelected ? classNames(styles.checkbox, styles.selected) : styles.checkbox}
      onClick={() => {
        setIsSelected(prev => {
          onClick(!prev);
          return !prev;
        });
      }}
    ></span>
  )
}
