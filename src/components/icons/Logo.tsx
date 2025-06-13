import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement> & { textColor?: string; iconColor?: string }) {
  const { textColor = "currentColor", iconColor = "currentColor", ...rest } = props;
  return (
    <div className="flex items-center gap-2" aria-label="IAmOTELs Logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...rest}
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      <span className="font-headline text-2xl font-semibold" style={{ color: textColor }}>
        IAmOTELs
      </span>
    </div>
  );
}
