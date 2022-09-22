import React, { FC } from 'react';
import { ClassNames } from '../../types';

interface Props {
  name: string;
  label?: string;
  Icon?: React.ReactNode;
  placeholder?: string;
  classNames: ClassNames;
  required: boolean;
}

export const LinkButton: FC<Props> = ({
  label,
  // classNames,
  placeholder,
}) => {
  // const { setSubmission } = useContext(SubmissionContext);
  // const pageName = useContext(PageContext);
  return (
    <main className="flex w-full h-full max-w-sm mx-auto justify-center">
      <a
        href={placeholder || ''}
        className="w-full mt-7 uppercase items-center px-4 py-3 text-lg font-regular tracking-wider	 text-white bg-blue shadow-lg shadow-indigo-500/50 border border-transparent rounded-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        {label && (
          <div className={'block text-md font-medium text-center text-white'}>
            {label}
          </div>
        )}
      </a>
    </main>
  );
};
