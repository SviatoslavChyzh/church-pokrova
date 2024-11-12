import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  return [
    { title: 'Sviatoslav Chyzh | Full Stack Software Engineer' },
    {
      name: 'description',
      content:
        'Portfolio of Sviatoslav Chyzh, a full stack software engineer specializing in TypeScript and React. Explore my projects and experience.',
    },
  ];
};

export default function Index() {
  return <>Hello World</>;
}
