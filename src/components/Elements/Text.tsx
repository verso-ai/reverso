import React, { FC, useContext } from 'react';
import { setSubmissionValue } from '../../lib/elements';
import { classNamesConcat } from '../../lib/utils';
import { ClassNames } from '../../types';
import { SubmissionContext } from '../ReversoForm/ReversoForm';
import { PageContext } from '../ReversoPage/ReversoPage';
import { ReversoInput } from './Input';

interface Props {
  name: string;
  label?: string;
  Icon?: React.ReactNode;
  placeholder?: string;
  classNames: ClassNames;
  required: boolean;
}

export const Text: FC<Props> = ({
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
    <ReversoInput
      type="text"
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
      icon={Icon}
      label={label}
    />
  );
};
