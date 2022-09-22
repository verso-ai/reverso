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

export const Payment: FC<Props> = ({}) => {
  return (
    <div className="flex flex-col bg-red-100 p-10">
      <div className="w-full h-10 mt-10" />
    </div>
  );
};
