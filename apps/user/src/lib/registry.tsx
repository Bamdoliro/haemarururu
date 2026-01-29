'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface RegistryProps {
  children: ReactNode;
}

const StyledComponentRegistry = ({ children }: RegistryProps) => {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css' });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const entries = Object.entries(cache.inserted);
    if (entries.length === 0) {
      return null;
    }

    const names = entries
      .filter(([, serialized]) => typeof serialized === 'string')
      .map(([name]) => name)
      .join(' ');

    const styles = entries
      .filter(([, serialized]) => typeof serialized === 'string')
      .map(([, serialized]) => serialized)
      .join('');

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export default StyledComponentRegistry;
