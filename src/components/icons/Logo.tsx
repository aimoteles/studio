
import type { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  textColor?: string;
  iconColor?: string;
}

export function Logo({ textColor = 'currentColor', iconColor = 'currentColor', ...props }: LogoProps) {
  return (
    <svg
      width="150"
      height="30"
      viewBox="0 0 150 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="IAmOTELs Logo"
      {...props}
    >
      {/* Simple abstract shapes */}
      <path
        d="M10 5 L0 15 L10 25 L15 25 L5 15 L15 5 Z"
        fill={iconColor}
      />
      <path
        d="M20 5 L35 5 L35 10 L25 10 L25 13 L33 13 L33 17 L25 17 L25 20 L35 20 L35 25 L20 25 Z"
        fill={iconColor}
      />
      {/* Text part of the logo */}
      <text
        x="45"
        y="22" // Adjusted for better vertical alignment with typical SVG text rendering
        fontFamily="Playfair Display, serif" // Using a font from your layout
        fontSize="20"
        fontWeight="bold"
        fill={textColor}
      >
        mOTELs
      </text>
    </svg>
  );
}
