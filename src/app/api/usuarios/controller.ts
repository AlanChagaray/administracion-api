import { NextResponse , NextRequest} from "next/server";
import Usuario from './model';

<<<<<<< HEAD
export async function buscar(request : NextRequest) {
=======
export async function buscar(request : any) {
>>>>>>> 86b409e395205518c540018ab8e6a9c5da69a607
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
