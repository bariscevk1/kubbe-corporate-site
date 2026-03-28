import type { ReactNode } from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3';

type Props = {
  as?: HeadingTag;
  id?: string;
  children: ReactNode;
  className?: string;
  size?: 'hero' | 'section';
  spacing?: 'default' | 'compact' | 'none';
};

export function SubpageHeading({
  as: Tag = 'h2',
  id,
  children,
  className = '',
  size = 'section',
  spacing = 'default',
}: Props) {
  const sizeClass =
    size === 'hero'
      ? 'text-[clamp(2rem,7vw,3.5rem)] md:text-[clamp(2.4rem,4.5vw,4.25rem)]'
      : 'text-[clamp(1.3rem,4.4vw,2rem)] md:text-[clamp(1.55rem,2.6vw,2.35rem)]';

  const spacingClass =
    spacing === 'compact' ? 'pb-4 md:pb-6' : spacing === 'none' ? '' : 'pb-6 md:pb-10';

  return (
    <div className={`subpage-heading-block text-center md:text-left ${spacingClass}`.trim()}>
      <Tag
        id={id}
        className={`font-display uppercase tracking-[0.18em] text-[var(--text-heading)] ${sizeClass} ${className}`.trim()}
      >
        {children}
      </Tag>
      <span className="subpage-heading-divider mx-auto md:mx-0" aria-hidden />
    </div>
  );
}
