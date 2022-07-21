import * as React from 'react';
import * as style from '../scss/numberInput.scss';

export interface NumberInputProps {
  inputId: string;
  min: number;
  max: number;
  value: number;
  size?: number;
  disabled?: boolean;
  setter: React.Dispatch<React.SetStateAction<number>>;
  formatter?: (num: number) => string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  inputId,
  min,
  max,
  value,
  size = 2,
  disabled,
  setter,
  formatter,
}) => {
  const numberInputConstrainer = (number: number) => {
    if (isNaN(number) || number < min) {
      number = min;
    } else if (number > max) {
      number = max;
    }
    setter(number);
    localStorage.setItem(inputId, number.toString());
  };

  const changeEvent = (): React.ChangeEventHandler<HTMLInputElement> => (e) => {
    const number = Number(e.target.value);
    numberInputConstrainer(number);
  };

  const buttonEvent = (delta: 1 | -1) => () => {
    const number = value + delta;
    numberInputConstrainer(number);
  };

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id: inputId,
    min,
    max,
    value: formatter ? formatter(value) : value,
    size,
    type: formatter ? 'text' : 'number',
    onChange: changeEvent(),
    disabled,
  };

  return (
    <span className={style.numberInput}>
      <button onClick={buttonEvent(-1)} disabled={value === min}>
        &ndash;
      </button>
      <span>
        <input {...inputProps}></input>
      </span>
      <button onClick={buttonEvent(1)} disabled={value === max}>
        +
      </button>
    </span>
  );
};
