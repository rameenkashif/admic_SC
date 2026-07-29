import React from 'react';
import logoBlue from '../assets/images/logo_blue.png';
import logoWhite from '../assets/images/logo_white.png';

interface ScLogoProps {
  className?: string;
  showSubtitle?: boolean;
  theme?: 'dark' | 'light';
}

export const ScLogo: React.FC<ScLogoProps> = ({ showSubtitle = true, theme = 'dark' }) => {
  const logoImg = theme === 'light' ? logoBlue : logoWhite;

  return (
    <div className="flex items-center gap-3">
      {/* SC Logo Image — blue mark in light theme, white mark in dark theme */}
      <img
        src={logoImg}
        alt="SC Sports & Leisure"
        referrerPolicy="no-referrer"
        className="h-10 w-auto object-contain shrink-0"
      />

      {showSubtitle && (
        <div>
          <h1 className="font-extrabold text-sm tracking-tight text-white leading-tight">
            Step Center
          </h1>
          <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">
            Sports & Leisure
          </p>
        </div>
      )}
    </div>
  );
};
