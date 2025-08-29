import { NextResponse , NextRequest} from "next/server";
import Cliente from './model';

export async function buscar(req : NextRequest) {
    const { searchParams } = new URL(req.url);

    const idcliente  = searchParams.get('idcliente') || null ;
    const nombre = searchParams.get('nombre') || null;
    const apellido = searchParams.get('apellido') || null;
    const telefono = searchParams.get('telefono') || null;

    try {
      if(idcliente) {
          const cliente = await Cliente.get(idcliente);
          return NextResponse.json(cliente);
      }else{
          const clientes = await Cliente.search({ nombre, apellido, telefono });
          return NextResponse.json(clientes);
      }
    } catch (error) {
        return NextResponse.json({ message: 'Error al buscar cliente' }, {status : 400})      
    }

}

export async function ingresar(req : NextRequest) {
    try {
        const cliente = await req.json();
        const result = await Cliente.post(cliente);
        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: 'Error al ingresar cliente' }, { status: 400 });
      }
}

export async function editar(req: NextRequest) {
    try {
      const cliente = await req.json();
      const result = await Cliente.put(cliente);
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: 'Error al actualizar cliente' }, { status: 400 });
    }
  }

export async function eliminar(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const idcliente = searchParams.get('idcliente') || null;
  
      if (idcliente) {
        const result = await Cliente.delete(idcliente);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json({ message: 'ID cliente is required' }, { status: 400 });
      }
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: 'Error al eliminar cliente' }, { status: 400 });
    }
  }