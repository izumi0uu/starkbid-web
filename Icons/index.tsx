interface IProps {
    color?: string;
    className?: string;
    height?: string | number;
    width?: string | number;
    fill?: string;
    isLoved?: boolean;
    stroke?: string;
  }
  
  const DEFAULT_SIZE = "100%";
  
export const RightTailArrow = ({ height, width, className }: IProps) => (
  <svg 
  className={className}
  width={width || DEFAULT_SIZE}
  height={height || DEFAULT_SIZE}
  viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.16675 7.00033H12.8334M12.8334 7.00033L7.00008 1.16699M12.8334 7.00033L7.00008 12.8337" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
  