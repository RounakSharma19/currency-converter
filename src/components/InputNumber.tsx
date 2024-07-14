import React from "react";
import "./InputNumber.css";

type IProps = {
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  hideArrows?: boolean;
  maxDigits?: number;
  allowDecimal?: boolean;
};

const regexForTwoDecimalNumbers = /[^\d.]+|(?<=\.\d\d)\d+/g;
const regexForOnlyNumberInput = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]*$/;

export const InputNumber = (props: IProps): JSX.Element => {
  const {
    placeholder = "",
    name,
    value,
    onChange,
    disabled = false,
    hideArrows = false,
    maxDigits,
    allowDecimal = false,
  } = props;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(regexForTwoDecimalNumbers, "");
    if (maxDigits) {
      inputValue = inputValue.slice(0, maxDigits);
    }
    onChange({ ...e, target: { ...e.target, value: inputValue } });
  };

  const inputClassName = `input-number ${
    hideArrows ? "input-number-no-arrows" : ""
  }`;

  return (
    <input
      disabled={disabled}
      name={name}
      type="number"
      value={value}
      step={allowDecimal ? "any" : "1"}
      min="0"
      placeholder={placeholder}
      onChange={handleInputChange}
      className={inputClassName}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
          !(
            e.ctrlKey ||
            e.shiftKey ||
            e.key === "Backspace" ||
            e.key === "Enter"
          )
        ) {
          if (
            e.key.match(regexForOnlyNumberInput) ||
            (!allowDecimal && e.key === ".")
          )
            e.preventDefault();
        }
      }}
    />
  );
};
