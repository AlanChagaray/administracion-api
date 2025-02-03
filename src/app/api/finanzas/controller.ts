import { NextResponse , NextRequest} from "next/server";
import Finanza from './model';

export async function buscar(req : NextRequest) {
    const { searchParams } = new URL(req.url);

    const mesParams  = searchParams.get('mes');
    const anioParams = searchParams.get('anio') || null;

    const mes  = mesParams ? parseInt(mesParams, 10) : null;
    const anio = anioParams ? parseInt(anioParams, 10) : null;

        const finanzas = await Finanza.search({mes, anio});
        const finanza = await Finanza.getMonth({mes,anio});
        const finanzaAnual = await Finanza.getYear(anio);
        const productos = await Finanza.getProducts({mes, anio})
        return NextResponse.json({
            finanzas,
            finanza,
            finanzaAnual,
            productos
        });
        
}