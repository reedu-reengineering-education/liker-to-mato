import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = "w-10 h-10" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Likert-O-Mat Logo"
    >
      {/* Definitionen für Gradienten */}
      <defs>
        <linearGradient id="gradientPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="text-blue-400" stopColor="currentColor" />
          <stop offset="100%" className="text-blue-600" stopColor="currentColor" />
        </linearGradient>
        <linearGradient id="gradientSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className="text-purple-400" stopColor="currentColor" />
          <stop offset="100%" className="text-purple-600" stopColor="currentColor" />
        </linearGradient>
      </defs>

      {/* Äußerer Ring mit Rotation */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        className="stroke-primary" 
        strokeWidth="2"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Innerer Hintergrund mit Pulse */}
      <circle 
        cx="50" 
        cy="50" 
        r="40" 
        className="fill-primary/5"
      >
        <animate
          attributeName="r"
          values="38;40;38"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Likert-Skala Balken mit Gradient und Animation */}
      <g className="stroke-primary" strokeWidth="3" strokeLinecap="round">
        <line x1="25" y1="35" x2="75" y2="35" className="opacity-40">
          <animate
            attributeName="x2"
            values="25;75;75"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
        </line>
        <line x1="25" y1="50" x2="75" y2="50" className="opacity-60">
          <animate
            attributeName="x2"
            values="25;75;75"
            dur="1s"
            begin="0.2s"
            fill="freeze"
          />
        </line>
        <line x1="25" y1="65" x2="75" y2="65" className="opacity-80">
          <animate
            attributeName="x2"
            values="25;75;75"
            dur="1s"
            begin="0.4s"
            fill="freeze"
          />
        </line>
      </g>
      
      {/* Interaktive Punkte mit Farbverlauf und Pulse */}
      <g>
        <circle cx="35" cy="35" r="4.5" fill="url(#gradientPrimary)">
          <animate
            attributeName="r"
            values="4;5;4"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;1"
            dur="1s"
            begin="0.6s"
            fill="freeze"
          />
        </circle>
        <circle cx="55" cy="50" r="4.5" fill="url(#gradientSecondary)">
          <animate
            attributeName="r"
            values="4.5;5.5;4.5"
            dur="2s"
            repeatCount="indefinite"
            begin="0.5s"
          />
          <animate
            attributeName="opacity"
            values="0;1;1"
            dur="1s"
            begin="0.8s"
            fill="freeze"
          />
        </circle>
        <circle cx="70" cy="65" r="4.5" fill="url(#gradientPrimary)">
          <animate
            attributeName="r"
            values="4;5;4"
            dur="2s"
            repeatCount="indefinite"
            begin="1s"
          />
          <animate
            attributeName="opacity"
            values="0;1;1"
            dur="1s"
            begin="1s"
            fill="freeze"
          />
        </circle>
      </g>
      
      {/* Verbindungslinien mit Gradient und Animation */}
      <path
        d="M35 35 L55 50 L70 65"
        stroke="url(#gradientSecondary)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,1000;200,0"
          dur="1.5s"
          begin="1.2s"
          fill="freeze"
        />
      </path>
    </svg>
  );
}

export function LogoFull({ className = "w-48" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className} group`}>
      <Logo className="w-10 h-10 transition-transform group-hover:scale-110 duration-300" />
      <div className="flex flex-col">
        <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          Likert-O-Mat
        </span>
        <span className="text-xs text-muted-foreground -mt-1 transition-opacity group-hover:opacity-100 opacity-80">
          Umfragen leicht gemacht
        </span>
      </div>
    </div>
  );
}
