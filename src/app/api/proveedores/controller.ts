import { NextResponse , NextRequest} from "next/server";
import Proveedor from './model';

export async function buscar(req : NextRequest) {

    const { searchParams } = new URL(req.url);
    const idproveedor = searchParams.get('idproveedor') || null;
    const contacto = searchParams.get('contacto') || null;
    if(idproveedor) {
        const proveedor = await Proveedor.get(idproveedor);
        return NextResponse.json(proveedor);
    }else{
        const proveedor = await Proveedor.search(contacto);
        return NextResponse.json(proveedor);
    }

}

export async function ingresar(req : NextRequest) {
    try {
        const proveedor = await req.json();
        const result = await Proveedor.post(proveedor);
        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: 'Error creating proveedor' }, { status: 500 });
      }
}

export async function editar(req: NextRequest) {
    try {
      const proveedor = await req.json();
      const result = await Proveedor.put(proveedor);
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: 'Error updating proveedor' }, { status: 500 });
    }
  }

export async function eliminar(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const idproveedor= searchParams.get('idproveedor') || null;
  
      if (idproveedor) {
        const result = await Proveedor.delete(idproveedor);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json({ message: 'ID proveedor is required' }, { status: 400 });
      }
    } catch (error) {
      console.error(error); 
      return NextResponse.json({ message: 'Error deleting proveedor' }, { status: 500 });
    }
  }