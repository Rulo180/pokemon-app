import React, { ReactElement } from 'react';

interface CaretUpIconProps {
  color: string | undefined;
  width: number | undefined;
  height: number | undefined;
}

const CaretUpIcon: React.FC<CaretUpIconProps> = ({
  color = 'currentColor',
  width = 24,
  height = 24,
}): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={color}
    width={width}
    height={height}
  >
    <path d="M7 14l5-5 5 5z" />
  </svg>
);

export default CaretUpIcon;
