import React from "react";

type IProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
};

export const InputDate = (props: IProps): JSX.Element => {
  const {
    placeholder = "",
    className = "",
    name,
    value,
    onChange,
    disabled = false,
    max,
    min,
  } = props;

  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type="date"
      placeholder={placeholder.length > 0 ? placeholder : ""}
      className={
        className +
        " bg-lightGray p-2 rounded-[0.25rem] outline-none decoration-none w-full text-content placeholder:text-placeholder"
      }
      min={min}
      max={max}
    />
  );
};
