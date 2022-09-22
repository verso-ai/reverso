import React, { FC } from 'react';
import { classNamesConcat } from '../../lib/utils';
import { ClassNames } from '../../types';

interface Props {
  label?: string;
  classNames?: ClassNames;
}

export const Submit: FC<Props> = ({ classNames, label }) => {
  return (
    <div className="sm:mx-auto max-w-sm ">
      <button
        type="submit"
        className={classNamesConcat(
          classNames?.button ||
            'w-full mt-7 uppercase items-center px-4 py-3 text-lg font-regular tracking-wider	 text-white bg-blue shadow-lg shadow-indigo-500/50 border border-transparent rounded-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        )}
      >
        {label || 'Submit'}
      </button>
    </div>
  );
};
