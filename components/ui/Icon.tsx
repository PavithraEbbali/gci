import type { SVGProps } from 'react';

/**
 * Inline icon set.
 *
 * All glyphs share one grammar so they sit together without looking borrowed
 * from different families: 24×24 box, no fill, 1.8 stroke, round caps and
 * joins, drawn on the same optical margin. They inherit `currentColor`, so a
 * parent's text colour drives them.
 *
 * Inline rather than an icon package — this is ~20 glyphs, and a dependency
 * would ship a few hundred and a runtime to pick between them.
 */

export type IconName =
  | 'check'
  | 'download'
  | 'upload'
  | 'fiber'
  | 'bundle'
  | 'mobile'
  | 'handset'
  | 'wifi'
  | 'bolt'
  | 'shield'
  | 'device'
  | 'tablet'
  | 'headphones'
  | 'tag'
  | 'award'
  | 'map'
  | 'route'
  | 'snowflake'
  | 'globe';

const PATHS: Record<IconName, React.ReactNode> = {
  check: <path d="M4.5 12.5 9 17l10.5-10" />,

  download: (
    <>
      <path d="M12 4v12" />
      <path d="m6.5 11.5 5.5 5.5 5.5-5.5" />
      <path d="M5 20h14" />
    </>
  ),

  upload: (
    <>
      <path d="M12 20V8" />
      <path d="m6.5 12.5 5.5-5.5 5.5 5.5" />
      <path d="M5 4h14" />
    </>
  ),

  /* Signal radiating from a node. Arcs survive being drawn at 16px in a way
     that a branching-strand glyph does not — it turned to mush on the cards. */
  fiber: (
    <>
      <circle cx="5" cy="12" r="1.6" />
      <path d="M9.2 7.8a6 6 0 0 1 0 8.4" />
      <path d="M13 4a11.3 11.3 0 0 1 0 16" />
      <path d="M16.8 0.9a16.6 16.6 0 0 1 0 22.2" />
    </>
  ),

  /* Two services stacked into one plan */
  bundle: (
    <>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12.5 8 4.5 8-4.5" />
      <path d="m4 17 8 4.5 8-4.5" />
    </>
  ),

  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
      <path d="M10.5 18.5h3" />
    </>
  ),

  handset: (
    <path d="M6.5 3h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h1Z" />
  ),

  wifi: (
    <>
      <path d="M3.5 9a13 13 0 0 1 17 0" />
      <path d="M6.8 12.6a8.4 8.4 0 0 1 10.4 0" />
      <path d="M10 16.2a3.6 3.6 0 0 1 4 0" />
      <circle cx="12" cy="19.6" r="1" />
    </>
  ),

  bolt: <path d="M13.5 2.5 5 13.5h5.5L10 21.5 19 10h-5.6l.1-7.5Z" />,

  shield: (
    <>
      <path d="M12 2.7 4.8 5.6v6c0 4.3 3 8.2 7.2 9.7 4.2-1.5 7.2-5.4 7.2-9.7v-6L12 2.7Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),

  device: (
    <>
      <rect x="3" y="4.5" width="13" height="12" rx="2" />
      <rect x="17.5" y="9" width="4" height="10.5" rx="1.4" />
      <path d="M7 20h5" />
    </>
  ),

  tablet: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2.4" />
      <path d="M10.5 18.3h3" />
    </>
  ),

  headphones: (
    <>
      <path d="M4 14v-1.5a8 8 0 0 1 16 0V14" />
      <path d="M4 14.5h2.6a1.4 1.4 0 0 1 1.4 1.4v3.2A1.4 1.4 0 0 1 6.6 20H5.4A1.4 1.4 0 0 1 4 18.6v-4.1Z" />
      <path d="M20 14.5h-2.6a1.4 1.4 0 0 0-1.4 1.4v3.2a1.4 1.4 0 0 0 1.4 1.4h1.2a1.4 1.4 0 0 0 1.4-1.4v-4.1Z" />
    </>
  ),

  tag: (
    <>
      <path d="M11.2 3H20a1 1 0 0 1 1 1v8.8a1.5 1.5 0 0 1-.44 1.06l-7.2 7.2a1.5 1.5 0 0 1-2.12 0l-7.3-7.3a1.5 1.5 0 0 1 0-2.12l7.2-7.2A1.5 1.5 0 0 1 11.2 3Z" />
      <circle cx="16.6" cy="7.4" r="1.4" />
    </>
  ),

  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.4 14.3-1.6 7 5.2-2.8 5.2 2.8-1.6-7" />
    </>
  ),

  map: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),

  /* Backbone running between nodes */
  route: (
    <>
      <circle cx="5.5" cy="6" r="2.5" />
      <circle cx="18.5" cy="18" r="2.5" />
      <path d="M8 6h6a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h6" />
    </>
  ),

  snowflake: (
    <>
      <path d="M12 2.5v19" />
      <path d="m3.8 7.2 16.4 9.6" />
      <path d="m20.2 7.2-16.4 9.6" />
      <path d="m9 4.8 3 2.4 3-2.4" />
      <path d="m9 19.2 3-2.4 3 2.4" />
    </>
  ),

  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </>
  ),
};

export default function Icon({
  name,
  className = 'h-5 w-5',
  ...rest
}: { name: IconName; className?: string } & Omit<SVGProps<SVGSVGElement>, 'name'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
