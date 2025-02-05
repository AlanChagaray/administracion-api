import { pool } from '@/config/db';

export default class Proveedor {

    static async search(contacto: string | null ) {
        const sql = 'SELECT * FROM proveedores WHERE ( contacto=$1 or $1 is null)AND activo= 1';
        const {rows} = await pool.query(sql, [contacto]);
        return rows;
      }

      static async get(idproveedor: string) {
        const sql = 'SELECT * FROM proveedores WHERE idproveedor=$1';
        const {rows} = await pool.query(sql, [idproveedor]);
        return rows;
      }

      static async post(Proveedor: { proveedor: string, contacto: string,telefono: string | null, email: string | null, direccion: string | null, localidad: string | null}) {
        const { proveedor,contacto, telefono, email, direccion, localidad } = Proveedor;
        const sql = 'INSERT INTO proveedores (proveedor,contacto, telefono, email, direccion, localidad) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *';
        const {rows} = await pool.query(sql, [proveedor,contacto, telefono, email, direccion, localidad]);
        return rows[0];  
      }

      static async put(Proveedor: { idproveedor: string,proveedor: string,contacto: string,telefono: string, email: string, direccion: string, localidad: string}) {
        const { idproveedor,proveedor,contacto,telefono,email, direccion,localidad} = Proveedor;
        const sql = 'UPDATE proveedores SET proveedor = $2,contacto = $3, telefono = $4, email = $5, direccion = $6, localidad = $7 WHERE idproveedor = $1 RETURNING *';
        const {rows} = await pool.query(sql, [idproveedor,proveedor,contacto,telefono,email, direccion,localidad]);
        return rows[0];
      }

      static async delete(idproveedor: string) {
        const sql = 'UPDATE proveedores SET activo = 0 WHERE idproveedor = $1';
        await pool.query(sql, [idproveedor]);
        return { message: 'Producto eliminado exitosamente.' };
      }

}
