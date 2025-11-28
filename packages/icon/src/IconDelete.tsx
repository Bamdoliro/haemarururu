import * as React from 'react';
import type { SVGProps } from 'react';

const IconDelete = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 17.486L12.243 12.243L17.486 17.486M17.486 7L12.242 12.243L7 7"
        stroke="#70737C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default IconDelete;
