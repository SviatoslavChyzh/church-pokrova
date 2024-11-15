import type { MetaFunction } from '@remix-run/cloudflare';
import { userTable } from '@db/schemas/authentication';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { db } from '@db/index';

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

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { env } = context.cloudflare;
  // const { kv } = env as Env;
  // await kv.put('remix', 'remix can access cloudflare kv');
  // const value = await kv.get('remix');
  // console.log('at remix loader', value);

  // const turso = createClient({
  //   url: 'libsql://church-pokrova-db-sviatoslavchyzh.turso.io',
  //   authToken:
  //     'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzE0MjkzMTUsImlkIjoiODEyZTFhMTctODM2OS00ZjU1LTlhOWUtODhlMTRjMTM0MDI1In0.Eiy2O-BdUobrZ8-vge8yl6FUSYW2USe9vLXcoiV_7P5cEeYgVJXSs0i2OyeQoZ-ewsKP8RE0vw2kh6EGMahQCQ',
  // });
  //
  // const db = drizzle(turso, {
  //   schema: {
  //     user: userTable,
  //     session: sessionTable,
  //   },
  // });

  // const [data] = await db.select().from(userTable);
  //
  // if (!data) {
  //   throw new Error('No data found');
  // }

  console.log('kv', context);

  return { env };
};

export default function Index() {
  const { env } = useLoaderData<typeof loader>();

  console.log(env);

  return <>Hello World myVar</>;
}
