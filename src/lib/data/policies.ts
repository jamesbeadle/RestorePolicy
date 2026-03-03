export type Policy = {
  id: string;
  category: string;
  title: string;
  announced: string;
  sourceLabel: string;
  sourceUrl: string;
  detail: string;
};

export const categories = ['Economy', 'Healthcare', 'Education', 'Housing', 'Environment'];

export const policies: Policy[] = [
  {
    id: 'p1',
    category: 'Economy',
    title: 'Small Business Tax Relief',
    announced: '2026-02-20',
    sourceLabel: 'View source',
    sourceUrl: 'https://x.com/',
    detail:
      'Reduce tax burden for small businesses with fewer than 25 employees and simplify annual filing to a single digital return.'
  },
  {
    id: 'p2',
    category: 'Healthcare',
    title: 'Local Clinic Expansion Fund',
    announced: '2026-02-14',
    sourceLabel: 'Watch announcement',
    sourceUrl: 'https://youtube.com/',
    detail:
      'Create a ring-fenced fund to increase GP and nurse coverage in underserved areas and extend evening appointment access.'
  },
  {
    id: 'p3',
    category: 'Education',
    title: 'School Tech Upgrade Program',
    announced: '2026-01-30',
    sourceLabel: 'Read release',
    sourceUrl: 'https://example.com/',
    detail:
      'Provide classroom device grants and digital skills support for teachers, prioritizing schools with the lowest existing access.'
  },
  {
    id: 'p4',
    category: 'Housing',
    title: 'First-Home Deposit Support',
    announced: '2026-01-24',
    sourceLabel: 'View source',
    sourceUrl: 'https://example.com/',
    detail:
      'Support first-time buyers through a shared-equity deposit plan capped by regional property values and household income.'
  },
  {
    id: 'p5',
    category: 'Environment',
    title: 'National Home Insulation Drive',
    announced: '2026-01-12',
    sourceLabel: 'Read details',
    sourceUrl: 'https://example.com/',
    detail:
      'Offer targeted grants for insulation upgrades in older homes to cut energy costs and household emissions.'
  }
];
