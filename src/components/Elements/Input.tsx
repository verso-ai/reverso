import React, { FC } from 'react';
// import { ClassNames } from '../../types';

import { twMerge } from 'tailwind-merge';

interface Props {
  name: string;
  icon?: React.ReactNode;
  label?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  pattern?: string;
  className?: string;
  pageName?: string;
  required: boolean;
  onChange: (s: any) => void;
  onInvalid?: (s: any) => void;
  onInput?: (s: any) => void;
}

export const ReversoInput: FC<Props> = ({
  name,
  label,
  icon,
  id,
  placeholder,
  onChange,
  onInvalid,
  onInput,
  required,
  type,
  pattern,
  className,
}) => {
  //   const { setSubmission } = useContext(SubmissionContext);
  //   const pageName = useContext(PageContext);
  return (
    <div className="floating-input w-full relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <div className="w-5 h-5 text-gray-400 ">{icon}</div>
        </div>
      )}

      <input
        id={id}
        className={twMerge(
          className,
          'border pr-3 py-3 focus:border-4 border-gray-100 rounded outline-none  focus:outline-2  hover:border-gray-500 focus:border-blue focus:shadow-sm w-full  h-16',
          icon ? 'pl-10' : 'pl-3'
        )}
        pattern={pattern}
        type={type}
        placeholder={'placeholder' + placeholder}
        autoComplete="off"
        required={required}
        onChange={onChange}
        onInvalid={onInvalid}
        onInput={onInput}
      />

      {label && (
        <label
          htmlFor={name}
          className={twMerge(
            'absolute top-0 left-0 pr-3 py-5 h-full pointer-events-none transform text-md origin-left transition-all duration-300 ease-in-out text-gray-300',
            icon ? 'pl-10' : 'pl-3'
          )}
        >
          <span className=" uppercase ">{label}</span>
        </label>
      )}
    </div>
  );
};
