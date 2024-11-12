import type { MetaFunction } from '@remix-run/cloudflare';
import { db } from '@db/index';
import { userTable } from '@db/schemas/authentication';
import { json, useLoaderData } from '@remix-run/react';

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

export async function loader() {
  const [data] = await db.select().from(userTable);

  if (!data) {
    return json({ error: 'No data found' }, { status: 404 });
  }

  return data;
}

export default function Index() {
  const data = useLoaderData();

  console.log(data);

  return <>Hello World</>;
}
