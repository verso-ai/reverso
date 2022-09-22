import React from 'react';
import { twMerge } from 'tailwind-merge';

type SkeletonBaseProps = {
  className?: string;
};

interface SkeletonContainer {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
}

const SkeletonAvatar: React.FC<SkeletonBaseProps> = ({ className }) => {
  return <div className={twMerge(`mt-1 rounded-full bg-gray-200 ltr:mr-2 rtl:ml-2`, className)} />;
};

const SkeletonText: React.FC<SkeletonBaseProps & { invisible?: boolean }> = ({
  className = "",
  invisible = false,
}) => {
  return (
    <span
      className={twMerge(
        `font-size-0 dark:white-300 inline-block animate-pulse rounded-md bg-gray-300 empty:before:inline-block empty:before:content-['']`,
        className,
        invisible ? "invisible" : ""
      )}
    />
  );
};

const SkeletonButton: React.FC<SkeletonBaseProps> = ({ className }) => {
  return (
    <SkeletonContainer>
      <div className={twMerge(`rounded-md bg-gray-200`, className)} />
    </SkeletonContainer>
  );
};

const SkeletonContainer: React.FC<SkeletonContainer> = ({ children, as, className }) => {
  const Component = as || "div";
  return <Component className={twMerge("animate-pulse", className)}>{children}</Component>;
};

export { SkeletonAvatar, SkeletonText, SkeletonButton, SkeletonContainer };
