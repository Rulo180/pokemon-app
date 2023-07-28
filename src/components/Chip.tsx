import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  size?: 'sm' | 'lg';
};

export const Chip = ({ children, size = 'lg' }: Props) => {
  return (
    <div className="flex flex-wrap justify-center space-x-2">
      <span
        className={`${
          size === 'lg' ? 'text-sm px-4 py-2' : 'text-xs px-2 py-1'
        } rounded-full text-gray-500 bg-gray-200 font-semibold flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease`}
      >
        {children}
      </span>
    </div>
  );
};
