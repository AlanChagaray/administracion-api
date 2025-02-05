// import {pool} from '@/config/db'
import { NextResponse , NextRequest} from "next/server";
import Producto from './model';

export async function buscar(req : NextRequest) {

    const { searchParams } = new URL(req.url);
    const idproducto = searchParams.get('idproducto') || null;
    const nombre = searchParams.get('nombre') || null;
    const descripcion = searchParams.get('descripcion') || null;
    const estado = searchParams.get('estado') || null;
  
    if(idproducto) {
        const producto = await Producto.get(idproducto);
        return NextResponse.json(producto);
    }else{
        const producto = await Producto.search({ nombre, descripcion, estado });
        return NextResponse.json(producto);
    }

}

export async function ingresar(req : NextRequest) {
    try {
        const producto = await req.json();
        const result = await Producto.post(producto);
        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: 'Error creating producto' }, { status: 500 });
      }
}

export async function editar(req: NextRequest) {
    try {
      const producto = await req.json();
      const result = await Producto.put(producto);
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: 'Error updating producto' }, { status: 500 });
    }
  }

export async function eliminar(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const idproducto = searchParams.get('idproducto') || null;
  
      if (idproducto) {
        const result = await Producto.delete(idproducto);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json({ message: 'ID producto is required' }, { status: 400 });
      }
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: 'Error deleting producto' }, { status: 500 });
    }
  }