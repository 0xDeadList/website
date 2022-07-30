import { Button } from 'antd'
import React, { ReactNode } from 'react'
import cn from 'classnames'
import styles from './index.less'

interface IShadowButton {
  children: ReactNode;
  classname?: string;
  onClick: () => void;
}

export default function ShadowButton({
  children, classname, onClick
}: IShadowButton) {
  return (
    <button className={classname ? cn(styles.shadowBtn, classname) : styles.shadowBtn} onClick={onClick}>{children}</button>
  )
}
