import { buscar, ingresar, editar , eliminar} from './controller';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return await buscar(req);
}

export async function POST(req: NextRequest) {
  return await ingresar(req);
}

export async function PUT(req: NextRequest) {
  return await editar(req);
}

export async function DELETE(req: NextRequest) {
  return await eliminar(req);
}
