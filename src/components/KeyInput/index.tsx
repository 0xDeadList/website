import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styles from './index.less';

interface IInputProps {
  label: string;
  // onSubmit: (val?: string) => void;
}

const inputId = 'private-key-input';

export interface IKeyInputRef {
  value?: string;
}

function KeyInput({ label }: IInputProps, ref: React.Ref<IKeyInputRef>) {
  const isFocused = useRef(false);
  // const valueRef = useRef<string>();
  const [value, setValue] = useState<string>();

  useImperativeHandle(ref, () => ({ value }), [value]);

  // useEffect(() => {
  //   document.addEventListener("keyup", function (event) {
  //     if (event.key === 'Enter' && isFocused.current) {
  //       document.getElementById(inputId)?.blur();
  //       handleSubmit();
  //     }
  //   });
  // }, [])

  // const handleSubmit = () => {
  //   if (!valueRef.current || valueRef.current.length <= 0) return;
  //   onSubmit(valueRef.current);
  // }

  return (
    <div className={styles.inputWrapper}>
      <label>{label}</label>
      <input
        id={inputId}
        onFocus={() => {
          isFocused.current = true;
        }}
        onBlur={() => {
          isFocused.current = false;
          // handleSubmit();
        }}
        onChange={e => {
          e.preventDefault();
          // valueRef.current = e?.target?.value;
          setValue(e?.target?.value);
        }}
      ></input>
    </div>
  );
}

export default forwardRef(KeyInput);
