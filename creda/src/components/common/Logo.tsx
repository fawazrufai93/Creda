import React from 'react';

/**
 * Creda brand mark.
 * Five flat facets forming an isometric "C". Colors are the brand palette and
 * are legible on both light and dark surfaces, so a single mark works everywhere.
 * Aspect ratio of the mark is 286:332 (width:height).
 */
const FACETS = [
  { fill: '#047585', points: '0,83 143,164 143,0' },
  { fill: '#2cad84', points: '143,0 143,164 286,82' },
  { fill: '#00a7af', points: '0,83 75,126 75,206 0,248' },
  { fill: '#016797', points: '0,248 75,206 143,245 143,332' },
  { fill: '#0292d2', points: '143,245 213,206 286,248 143,332' },
] as const;

interface LogoMarkProps {
  /** Rendered height in pixels. Width follows the mark's aspect ratio. */
  size?: number;
  className?: string;
  /** Set when the mark is the only brand text in its context (e.g. an icon button). */
  title?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ size = 28, className, title }) => (
  <svg
    viewBox="0 0 286 332"
    height={size}
    width={(size * 286) / 332}
    className={className}
    role={title ? 'img' : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    focusable="false"
  >
    {FACETS.map((f) => (
      <polygon key={f.points} fill={f.fill} points={f.points} />
    ))}
  </svg>
);

interface WordmarkProps {
  /** Height of the mark in pixels; text scales with it. */
  size?: number;
  /** "light" = dark text for light backgrounds, "dark" = white text for dark backgrounds. */
  tone?: 'light' | 'dark';
  className?: string;
  /** Optional replacement for the default "CREDA" text (e.g. "CREDA ONBOARDING"). */
  label?: string;
  /** Use a smaller, letter-spaced label style. */
  compact?: boolean;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  size = 28,
  tone = 'light',
  className = '',
  label = 'CREDA',
  compact = false,
}) => {
  const textColor = tone === 'dark' ? 'text-white' : 'text-neutral-950';
  return (
    <span className={`inline-flex items-center ${className}`} style={{ gap: Math.round(size * 0.36) }}>
      <LogoMark size={size} />
      <span
        className={`font-bold ${textColor} ${compact ? 'tracking-wider' : 'tracking-tight'}`}
        style={{ fontSize: compact ? Math.round(size * 0.5) : Math.round(size * 0.72), lineHeight: 1 }}
      >
        {label}
      </span>
    </span>
  );
};
