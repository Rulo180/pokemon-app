import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Chip = ({ children }: Props) => {
  return (
    <div className="flex flex-wrap justify-center space-x-2">
      <span className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
        {children}
      </span>
    </div>
  );
};
