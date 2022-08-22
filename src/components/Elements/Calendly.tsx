import React, { FC, useContext, useEffect, useState } from 'react';
import { useCalendlyEventListener, InlineWidget } from 'react-calendly';
import { ClassNames } from '../../types';
import { SubmissionContext } from '../ReversoForm/ReversoForm';
import { PageContext } from '../ReversoPage/ReversoPage';
import { setSubmissionValue } from '../../lib/elements';

interface Props {
  name: string;
  label?: string;
  Icon?: React.ReactNode;
  placeholder?: string;
  classNames: ClassNames;
  required: boolean;
}

export const Calendly: FC<Props> = ({
  name,
  label,
  //   Icon,
  classNames,
  //   placeholder,
  //   required,
}) => {
  const [checked, setChecked] = useState<string[]>([]);
  const { setSubmission }: any = useContext(SubmissionContext);
  const pageName = useContext(PageContext);

  useEffect(() => {
    setSubmissionValue(checked, pageName, name, setSubmission);
  }, [checked]);

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log('onProfilePageViewed'),
    onDateAndTimeSelected: () => console.log('onDateAndTimeSelected'),
    onEventTypeViewed: () => console.log('onEventTypeViewed'),
    onEventScheduled: e => {
      console.log(e.data.payload), setChecked(['aaaa']);
    },
  });

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
      <InlineWidget url={label || ''} />
    </div>
  );
};
