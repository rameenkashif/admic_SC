import React from 'react';
import logoImg from '../assets/images/step_center_logo_1784786974967.jpg';

interface ScLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export const ScLogo: React.FC<ScLogoProps> = ({ className = "h-10", showSubtitle = true }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Generated Logo Image with sharp contrast styling */}
      <div className="relative rounded-2xl bg-black border border-white/10 shadow-lg p-1 shrink-0 overflow-hidden group">
        <img
          src={logoImg}
          alt="SC Sports & Leisure"
          referrerPolicy="no-referrer"
          className="h-9 w-auto object-contain rounded-xl"
        />
      </div>

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
