import React, { FC, useContext } from 'react';
import { setSubmissionValue } from '../../lib/elements';
import { SubmissionContext } from '../ReversoForm/ReversoForm';
import { PageContext } from '../ReversoPage/ReversoPage';
import { ClassNames } from '../../types';
import { classNamesConcat } from '../../lib/utils';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  classNames: ClassNames;
  required: boolean;
}

export const Textarea: FC<Props> = ({
  name,
  label,
  classNames,
  placeholder,
  rows,
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
      <div className="mt-1">
        <textarea
          rows={rows}
          name={name}
          id={`input-${name}`}
          className={classNamesConcat(
            'block w-full border border-gray-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 sm:text-sm',
            classNames.element
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
