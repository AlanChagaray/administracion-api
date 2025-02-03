import { pool } from '@/config/db';

export default class VtaProductos {

      static async get(idpedido: number) {
        const sql = 'SELECT * FROM vtaproductos vta INNER JOIN productos p on p.idproducto = vta.idproducto WHERE vta.idpedido=$1';
        const {rows} = await pool.query(sql, [idpedido]);
        return rows;
      }

      static async post(VtaProducto: { idpedido: number, idproducto: number,cantidad: number, totalproducto: string }) {
        const { idpedido, idproducto, cantidad ,totalproducto} = VtaProducto;
        const sql = 'INSERT INTO vtaproductos (idpedido, idproducto, cantidad ,totalproducto) VALUES ($1, $2, $3, $4) RETURNING *';
        const {rows} = await pool.query(sql, [idpedido, idproducto, cantidad ,totalproducto]);
        return rows[0];  
      }
}
