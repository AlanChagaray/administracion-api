import { NextResponse , NextRequest} from "next/server";
import Cliente from './model';

export async function buscar(req : NextRequest) {
    const { searchParams } = new URL(req.url);

    const idcliente  = searchParams.get('idcliente') || null ;
    const nombre = searchParams.get('nombre') || null;
    const apellido = searchParams.get('apellido') || null;
    const telefono = searchParams.get('telefono') || null;

    if(idcliente) {
        const cliente = await Cliente.get(idcliente);
        return NextResponse.json(cliente);
    }else{
        const clientes = await Cliente.search({ nombre, apellido, telefono });
        return NextResponse.json(clientes);
    }

}

export async function ingresar(req : NextRequest) {
    try {
        const cliente = await req.json();
        const result = await Cliente.post(cliente);
        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: 'Error creating cliente' }, { status: 500 });
      }
}

export async function editar(req: NextRequest) {
    try {
      const cliente = await req.json();
      const result = await Cliente.put(cliente);
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: 'Error updating cliente' }, { status: 500 });
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
      return NextResponse.json({ message: 'Error deleting cliente' }, { status: 500 });
    }
  }