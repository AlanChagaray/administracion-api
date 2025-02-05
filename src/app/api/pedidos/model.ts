import { pool } from '@/config/db';

export default class Pedido {

    static async search(params: { idcliente: string | null, nombre: string | null, estado: string | null}) {
        const { idcliente, nombre, estado} = params;
        const sql = `SELECT p.idpedido, c.nombre, c.apellido, p.descripcion, to_char( p.fecharetiro , 'dd/mm/yyyy') as fecharetiro, p.senia, p.total, p.estado FROM pedidos p INNER JOIN clientes c on c.idcliente = p.idcliente WHERE(p.idcliente = $1 or $1 is null) AND (c.nombre = $2 or $2 is null) AND (p.estado = $3 or $3 is null) AND p.activo = 1 ORDER BY p.idpedido DESC`;
        const {rows} = await pool.query(sql, [idcliente, nombre, estado]);
        return rows;
      }

      static async get(idpedido: string) {
       const sql = `
          SELECT 
            p.idpedido, 
            c.nombre, 
            c.apellido, 
            c.telefono, 
            c.email, 
            p.descripcion,  
            to_char( p.fecharetiro , 'dd/mm/yyyy') as fecharetiro, 
            to_char( p.fechamodificacion , 'dd/mm/yyyy') as fechamodificacion,
            to_char( p.fechaalta , 'dd/mm/yyyy') as fechaalta, p.senia, p.total, p.estado 
          FROM pedidos p INNER JOIN clientes c on c.idcliente = p.idcliente WHERE p.idpedido=$1`;
        const {rows} = await pool.query(sql, [idpedido]);
        return rows;
      }

      static async post(pedido: { fecharetiro: Date, senia: number,total: number, descripcion: string, idcliente: number }) {
        const {  fecharetiro, senia, total, descripcion, idcliente } = pedido;
        const sql = 'INSERT INTO pedidos (fecharetiro,senia,total,descripcion,idcliente) VALUES ($1, $2, $3, $4,$5) RETURNING *';
        const {rows} = await pool.query(sql, [fecharetiro, senia, total, descripcion, idcliente]);
        return rows[0];
      }

      static async put(pedido: { idpedido: string, estado?: string, fecharetiro?: Date, senia?: number, total?: number, descripcion?: string }) {
        const { idpedido, estado, fecharetiro, senia, total, descripcion } = pedido;
        const sql = `
          UPDATE pedidos 
          SET 
            estado = COALESCE($2, estado), 
            fecharetiro = COALESCE($3, fecharetiro), 
            senia = COALESCE($4, senia), 
            total = COALESCE($5, total), 
            descripcion = COALESCE($6, descripcion) 
          WHERE idpedido = $1 
          RETURNING *;
        `;
        const { rows } = await pool.query(sql, [idpedido, estado, fecharetiro, senia, total, descripcion]);
        return rows[0];
      }
      

      static async delete(idpedido: string) {
        const sql = 'UPDATE pedidos SET activo = 0 WHERE idpedido=$1';
        await pool.query(sql, [idpedido]);
        return { message: 'Pedido eliminado exitosamente.' };
      }

}
