import { NextResponse , NextRequest} from "next/server";
import Usuario from './model';

export async function buscar(request : NextRequest) {
  const { searchParams } = new URL(request.url);
  const usuario = searchParams.get('usuario') || null;
  const password = searchParams.get('password') || null;
  const nombre = searchParams.get('nombre') || null;
  const activo = searchParams.get('activo') || null;
  const estado = searchParams.get('estado') || null;

    if(usuario && password) {
        const _usuario = await Usuario.get(usuario, password);
        return NextResponse.json(_usuario);
    }else{
        const usuarios = await Usuario.search({ nombre, activo, estado });
        return NextResponse.json(usuarios);
    }

}
