// api/index.js or api/index.ts

import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  // Handle your API request here
  res.status(200).json({ message: 'Hello from API!' });
};

export default handler;
