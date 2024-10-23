import { SiteConfig } from '@/types';

import { env } from '@/env.mjs';

export const siteConfig: SiteConfig = {
  name: 'BeforeYouClaim.fyi',
  author: 'theden',
  description: 'tl;dr your insurance policy',
  keywords: ['insurance', 'insurance claim', 'insurance australia', 'cool'],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: 'https://theden.sh',
  },
  links: {
    github: 'https://github.com/theden',
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
};
