'use client';

import { useEffect } from 'react';

const MEDIA_SELECTOR = 'img, video';
const VIDEO_CONTROL_FLAGS = ['nodownload', 'noremoteplayback', 'noplaybackrate'] as const;

function isMediaTarget(target: EventTarget | null): target is Element {
  return target instanceof Element && !!target.closest(MEDIA_SELECTOR);
}

function hardenMediaElement(node: HTMLImageElement | HTMLVideoElement) {
  node.draggable = false;
  node.style.userSelect = 'none';
  node.style.webkitUserSelect = 'none';
  // `webkitUserDrag` is non-standard but effective in Chromium/Safari.
  (node.style as CSSStyleDeclaration & { webkitUserDrag?: string }).webkitUserDrag = 'none';

  if (node instanceof HTMLVideoElement) {
    const current = new Set((node.getAttribute('controlsList') || '').split(/\s+/).filter(Boolean));
    VIDEO_CONTROL_FLAGS.forEach((flag) => current.add(flag));
    node.setAttribute('controlsList', Array.from(current).join(' '));
    node.disablePictureInPicture = true;
    node.setAttribute('disablePictureInPicture', '');
    node.setAttribute('disableRemotePlayback', '');
    node.playsInline = true;
  }
}

export function MediaProtectionLayer() {
  useEffect(() => {
    const syncMedia = () => {
      document.querySelectorAll(MEDIA_SELECTOR).forEach((node) => {
        if (node instanceof HTMLImageElement || node instanceof HTMLVideoElement) {
          hardenMediaElement(node);
        }
      });
    };

    const preventMediaAction = (event: Event) => {
      if (isMediaTarget(event.target)) {
        event.preventDefault();
      }
    };

    syncMedia();

    const observer = new MutationObserver(() => {
      syncMedia();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'poster', 'controls'],
    });

    document.addEventListener('contextmenu', preventMediaAction, true);
    document.addEventListener('dragstart', preventMediaAction, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('contextmenu', preventMediaAction, true);
      document.removeEventListener('dragstart', preventMediaAction, true);
    };
  }, []);

  return null;
}
