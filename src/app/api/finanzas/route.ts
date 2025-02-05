import { buscar} from './controller';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return await buscar(req);
}