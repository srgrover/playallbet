
export const getApiUrl = (path: string) => {
  const url =
    process.env.NEXT_PUBLIC_VERCEL_URL ?
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${path}` :
    `http://localhost:3000${path}`;

  return new URL(url);
};
