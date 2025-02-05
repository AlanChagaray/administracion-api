import { NextResponse , NextRequest} from "next/server";
import Pedido from './model';

export async function buscar(req : NextRequest) {
  const { searchParams } = new URL(req.url);
  const idpedido = searchParams.get('id') || null;
  const idcliente = searchParams.get('idcliente') || null;
  const nombre = searchParams.get('nombre') || null;
  const estado = searchParams.get('estado') || null;
  
    if(idpedido) {
        const pedido = await Pedido.get(idpedido);
        return NextResponse.json(pedido);
    }else{
        const pedidos = await Pedido.search({ idcliente, nombre,estado });
        return NextResponse.json(pedidos);
    }

}

export async function ingresar(req : NextRequest) {
    try {
        const pedido = await req.json();
        const result = await Pedido.post(pedido);
        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: 'Error creating pedido' }, { status: 500 });
      }
}

export async function editar(req: NextRequest) {
    try {
      const pedido = await req.json();
      const result = await Pedido.put(pedido);
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: 'Error updating pedido' }, { status: 500 });
    }
  }

export async function eliminar(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const idpedido = searchParams.get('idpedido') || null;
  
      if (idpedido) {
        const result = await Pedido.delete(idpedido);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json({ message: 'ID pedido is required' }, { status: 400 });
      }
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: 'Error deleting pedido' }, { status: 500 });
    }
  }