
import {
  GitHubIcon,
  LinkedInIcon,
  LeetCodeIcon,
  EmailIcon,
  HackerRankIcon,
  XIcon,
  ResumeIcon
} from '../components/icons/Icons';

export const HEATMAP_DATA = Array.from({ length: 364 }, (_, i) => {
  const seed = (i * 37 + 13) % 100;
  if (seed > 88) return 4;
  if (seed > 68) return 3;
  if (seed > 48) return 2;
  if (seed > 28) return 1;
  return 0;
});

export const CONTACT_ITEMS = [
  {
    letter: 'C',
    label: 'GitHub',
    href: 'https://github.com/sammiazaz',
    color: 'var(--text-primary)',
    icon: <GitHubIcon width="22" height="22" />
  },
  {
    letter: 'O',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sammiazazse',
    color: '#0077b5',
    icon: <LinkedInIcon width="22" height="22" />
  },
  {
    letter: 'N',
    label: 'LeetCode',
    href: 'https://leetcode.com/u/sammiazaz21/',
    color: '#ffa116',
    icon: <LeetCodeIcon width="22" height="22" />
  },
  {
    letter: 'T',
    label: 'Email',
    href: 'mailto:sammi.dev.contact@gmail.com',
    color: '#ea4335',
    icon: <EmailIcon width="22" height="22" />
  },
  {
    letter: 'A',
    label: 'HackerRank',
    href: 'https://hackerrank.com',
    color: '#00ea64',
    icon: <HackerRankIcon width="22" height="22" />
  },
  {
    letter: 'C',
    label: 'X',
    href: 'https://x.com',
    color: '#e7e9ea',
    icon: <XIcon width="20" height="20" />
  },
  {
    letter: 'T',
    label: 'Resume',
    href: '/resume',
    isRouterLink: true,
    color: '#a855f7',
    icon: <ResumeIcon width="22" height="22" />
  }
];
