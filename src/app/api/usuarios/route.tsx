
import {pool} from '@/config/db'
import { NextResponse } from "next/server";

export async function GET(request : any) {
    const { searchParams } = new URL(request.url);
    const usuario = searchParams.get('usuario') || null;
    const password = searchParams.get('password') || null;
    // const nombre = searchParams.get('nombre') || null;
    // const activo = searchParams.get('activo') || null;
  
    // if (idpedido) {
      return getUsuario(usuario, password);
    // } else {
    //   return getAllPedidos(estado, nombre, activo);
    // }
}

// async function getAllPedidos(estado: any, nombre : any, activo :any) {
//     const sql = 'CALL AdmPedidosBuscar(?,?,?);';
//     const [query] = await pool.query(sql, [estado, nombre, activo]);
//     const result = Array.isArray(query) && Array.isArray(query[0]) ? query[0] : [];
//     return NextResponse.json(result);
//   }
  
  async function getUsuario(usuario : any, password : any) {
    const sql = 'CALL AdmUsuariosObtener(?,?);';
    const [query] = await pool.query(sql, [usuario, password]);
    const result = Array.isArray(query) && query.length > 0 && Array.isArray(query[0]) ? query[0] : null;
    return NextResponse.json(result);
  }

export async function POST(request : any) {
    try {
        const { 
            nombre,
            apellido,
            fecharetiro,
            telefono,
            email,
            senia,
            total,
            descripcion
            } = await request.json();
            
    
        console.log(request.json());
        if (!nombre || !apellido || !telefono) {
            return NextResponse.json({ message: 'Todos los campos son obligatorios' }, { status: 400 });
        }
        
        await pool.query("INSERT INTO titiacookies.pedidos (nombre, apellido, estado, fecharetiro, fechaalta, telefono, email, senia, total, descripcion,fechamodificacion, activo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [
            nombre,
            apellido,
            'pendiente',
            fecharetiro,
            new Date(),
            telefono,
            email,
            senia,
            total,
            descripcion, 
            null,
            1
        ]);
        return NextResponse.json({ message : 'Pedido creado exitosamente.'}, {status : 200});
    } catch (error : any) {
        return NextResponse.json({ message : error.message},{status : 500});
    }
}

export async function PUT(request : any) {
    try {
        // const { searchParams } = new URL(request.id);
        // const id = searchParams.get('id') || null;
        const {idpedido, nombre, apellido, fecharetiro, telefono, email, senia, total, descripcion, estado } = await request.json();
        console.log(idpedido);
      if (!idpedido) {
        return NextResponse.json({ message: 'ID no proporcionado.' }, { status: 400 });
      }
      const sql = `
        UPDATE titiacookies.pedidos
        SET nombre = ?, apellido = ?, estado = ?, fecharetiro = ?, telefono = ?, email = ?, senia = ?, total = ?, descripcion = ?, fechamodificacion = ?
        WHERE idpedido = ?
      `;
  
      await pool.query(sql, [
        nombre,
        apellido,
        estado,
        fecharetiro,
        telefono,
        email,
        senia,
        total,
        descripcion,
        new Date(),
        idpedido
      ]);
  
      return NextResponse.json({ message: 'Pedido actualizado exitosamente.' }, { status: 200 });
    } catch (error : any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  
  export async function DELETE(request : any) {
    try {
      const { id } = request.query;
      const sql = 'DELETE FROM titiacookies.pedidos WHERE id = ?';
      await pool.query(sql, [id]);
      return NextResponse.json({ message: 'Pedido eliminado exitosamente.' }, { status: 200 });
    } catch (error : any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }