import Image from 'next/image';
import React, { ReactElement } from 'react';

interface ErrorStateProps {
  title: string;
  message: string | undefined;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, title }): ReactElement => {
  return (
    <div className="flex flex-col items-center pb-4 py-6">
      <div>
        <Image src="/images/pikachu-sad.png" alt="Sad pikachu" width={200} height={260} />
      </div>
      <div className="pb-6">
        <h2 className="font-bold">{title}</h2>
      </div>
      <div>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default ErrorState;
