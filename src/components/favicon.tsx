import React from 'react';

import { cn } from '@/lib/utils';

type FaviconProps = {
  url: string;
  alt?: string;
  className?: string;
};

const Favicon = ({ url, alt, className }: FaviconProps) => {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${url}&sz=64`}
      alt={alt}
      className={cn('size-4', className)}
    />
  );
};

export default Favicon;
