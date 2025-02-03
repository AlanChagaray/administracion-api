import { NextResponse , NextRequest} from "next/server";
import VtaProductos from './model';

export async function buscar(req : NextRequest) {

    const { searchParams } = new URL(req.url);
    const idpedido : any = searchParams.get('idpedido') || null;
    
    if(idpedido) {
        const vtaproductos = await VtaProductos.get(idpedido);
        return NextResponse.json(vtaproductos);
    }

}

export async function ingresar(req : NextRequest) {
    try {
        const vtaproductos = await req.json();
        const result = await VtaProductos.post(vtaproductos);
        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        return NextResponse.json({ message: 'Error creating proveedor' }, { status: 500 });
      }
}
