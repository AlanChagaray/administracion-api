import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

interface Producto {
  idproducto: string;
  nombre: string;
  cantidad: number;
  totalproducto : string;
  descripcion : string;
  precioventa : number;
}

export async function POST(req: NextRequest) {
  try {
    const { pedido, productos } = await req.json();
    const pdfDoc = await PDFDocument.create();
    console.log(productos);
    const page = pdfDoc.addPage([400, 600]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.setFont(font);
    page.drawText(`TITIA COOKIES`, { x: 30, y: 550, size: 16 });
    page.drawText(`PEDIDO N°${pedido[0].idpedido}`, {x: 300,y: 520,size: 10,});

    page.drawText(`Cliente: ${pedido[0].nombre} ${pedido[0].apellido || ""}`, {x: 30,y: 500,size: 10,});
    page.drawText(`Fecha pedido: ${pedido[0].fechaalta || "-"}`, {x: 30,y: 480,size: 10,});
    page.drawText(`Teléfono: ${pedido[0].telefono || ""}`, {x: 260,y: 500,size: 10,});
    page.drawText(`Fecha de retiro: ${pedido[0].fecharetiro || "-"}`, {x: 260,y: 480,size: 10,});

    // let yPosition = 245;
    let yPosition = 400;

    // page.drawText(`CANTIDAD`, { x: 60, y: 260, size: 10 });
    page.drawText(`CANTIDAD`, { x: 30, y: 415, size: 10 });
    page.drawText(`PRODUCTO`, { x: 110, y: 415, size: 10 });
    page.drawText(`PRECIO UNITARIO`, { x: 190, y: 415, size: 10 });
    page.drawText(`SUBTOTAL`, { x: 300, y: 415, size: 10 });
    page.drawLine({start: { x: 25, y: 410 },end: { x: 375, y: 410 },thickness: 1,});

    productos.forEach((producto: Producto ) => {
      page.drawText(`${producto.cantidad}`, { x: 30, y: yPosition, size: 10 });
      page.drawText(`${producto.nombre}`, { x: 110, y: yPosition, size: 10 });
      page.drawText(`$${producto.precioventa }`, {x: 190,y: yPosition,size: 10,});
      page.drawText(`$${producto.totalproducto ? producto.totalproducto : producto.precioventa}`, {x: 300,y: yPosition,size: 10,});
      page.drawLine({start: { x: 25, y: yPosition - 5 },end: { x: 375, y: yPosition - 5 },thickness: 1,});
      yPosition -= 15;
    });

    yPosition -= 10;
    page.drawText(`Seña`, { x: 190, y: yPosition, size: 10 });
    page.drawText(`$${pedido[0].senia}`, { x: 300, y: yPosition, size: 10 });

    yPosition -= 15;
    page.drawText(`Restante`, { x: 190, y: yPosition, size: 10 });
    page.drawText(
      `$${
        pedido[0].total - pedido[0].senia == 0
          ? " --"
          : pedido[0].total - pedido[0].senia
      }`,
      { x: 300, y: yPosition, size: 10 }
    );

    yPosition -= 15;
    page.drawText(`TOTAL`, { x: 190, y: yPosition, size: 10 });
    page.drawText(`$${pedido[0].total}`, { x: 300, y: yPosition, size: 10 });
    page.drawLine({start: { x: 25, y: yPosition + 10 },end: { x: 375, y: yPosition + 10 },thickness: 1,}); 
    page.drawText(`No se realizan envios`, { x: 30, y: 70, size: 10 });
    page.drawText(`Dirección Artigas 2791, Los Polvorines (Buenos Aires)`, { x: 30, y: 60, size: 10 });
    page.drawText(`Horario de retiro Lunes a Viernes 10hs a 17hs Sabados 10hs a 13hs`, { x: 30, y: 50, size: 10 });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=pedido.pdf",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    return new NextResponse("Error al generar el PDF", { status: 500 });
  }
}
