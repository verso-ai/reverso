import React, { FC, useContext } from 'react';
import { setSubmissionValue } from '../../lib/elements';
import { classNamesConcat } from '../../lib/utils';
import { ClassNames } from '../../types';
import { SubmissionContext } from '../ReversoForm/ReversoForm';
import { PageContext } from '../ReversoPage/ReversoPage';

interface Props {
  name: string;
  label?: string;
  Icon?: React.ReactNode;
  placeholder?: string;
  classNames: ClassNames;
  required: boolean;
}

export const Website: FC<Props> = ({
  name,
  label,
  Icon,
  classNames,
  placeholder,
  required,
}) => {
  const { setSubmission } = useContext(SubmissionContext);
  const pageName = useContext(PageContext);
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={
            classNames.label || 'block text-sm font-medium text-gray-700'
          }
        >
          {label}
        </label>
      )}
      <div className="relative mt-1 rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <div className="w-5 h-5 text-gray-400 ">{Icon}</div>
          </div>
        )}

        <input
          type="url"
          pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
          onInvalid={(e: any) =>
            e.target.setCustomValidity('please provide a valid website address')
          }
          onInput={(e: any) => e.target.setCustomValidity('')}
          name={name}
          id={`input-${name}`}
          className={classNamesConcat(
            Icon ? 'pl-10' : '',
            classNames.element ||
              'block w-full border-gray-300 rounded-md focus:ring-slate-500 focus:border-slate-500 sm:text-sm'
          )}
          placeholder={placeholder}
          onChange={e =>
            setSubmissionValue(e.target.value, pageName, name, setSubmission)
          }
          required={required}
        />
      </div>
    </div>
  );
};
