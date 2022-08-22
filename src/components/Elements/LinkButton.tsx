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
    <main className="flex w-full bg-red-100 h-full max-w-sm mx-auto justify-center">
      <a
        href={placeholder || ''}
        className="relative w-full items-center px-4 py-2 border
       border-transparent shadow-sm text-sm font-medium rounded-sm text-white
        bg-black hover:bg-pink-dark focus:outline-none focus:ring-2 focus:ring-offset-2
         focus:ring-offset-gray-800 focus:ring-indigo-500"
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
