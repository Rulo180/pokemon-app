import Image from 'next/image';
import React, { ReactElement } from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, title }): ReactElement => {
  return (
    <div className="flex flex-col items-center pb-4 py-6">
      <div className="pb-4">
        <Image src="/images/snorlax.png" alt="Snorlax durmiendo" width={150} height={100} />
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

export default EmptyState;
