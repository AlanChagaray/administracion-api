import { pool } from '@/config/db';

export default class Producto {

    static async search(params: { nombre: string | null, descripcion: string | null, estado: string | null }) {
        const { nombre, descripcion, estado } = params;
        const sql = `select 
p.idproducto,
p.nombre,
p.descripcion,
p.preciocompra,
p.precioventa,
p.descuento,
p.idproveedor,
pr.proveedor,
to_char(p.fechaalta, 'dd/mm/yyyy') as fechaalta,
to_char(p.fechamodificacion, 'dd/mm/yyyy') as fechamodificacion,
p.estado,
p.activo
from productos p
inner join proveedores pr on pr.idproveedor = p.idproveedor
where p.activo = 1
and ( p.nombre=$1 or $1 is null) 
and ( p.descripcion = $2 or $2 is null) AND (p.estado = $3 or $3 is null) 
order by p.idproducto desc`;
        const {rows} = await pool.query(sql, [nombre, descripcion, estado]);
        return rows;
      }

      static async get(idproducto: string) {
        const sql = `select 
p.idproducto,
p.nombre,
p.descripcion,
p.preciocompra,
p.precioventa,
p.descuento,
p.idproveedor,
pr.proveedor,
to_char(p.fechaalta, 'dd/mm/yyyy') as fechaalta,
to_char(p.fechamodificacion, 'dd/mm/yyyy') as fechamodificacion,
p.estado,
p.activo
from productos p
inner join proveedores pr on pr.idproveedor = p.idproveedor
where p.idproducto = $1`;
        const {rows} = await pool.query(sql, [idproducto]);
        return rows;
      }

      static async post(producto: { nombre: string,descripcion: string, preciocompra: number, precioventa: number, descuento: number | null, idproveedor: number | null,estado: string}) {
        const {  nombre, descripcion,preciocompra,precioventa,descuento,idproveedor,estado} = producto;
        const sql = 'INSERT INTO productos (nombre, descripcion,preciocompra,precioventa,descuento,idproveedor,estado) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *';
        console.error(producto, nombre, descripcion,preciocompra,precioventa,descuento,idproveedor,estado);
        const {rows} = await pool.query(sql, [nombre, descripcion,preciocompra,precioventa,descuento,idproveedor,estado]);
        return rows[0];  
      }

      static async put(producto: { idproducto: string,nombre: string,descripcion: string, preciocompra: number, precioventa: number, descuento: number | null, idproveedor: number,estado: string}) {
        const { idproducto, nombre, descripcion,preciocompra,precioventa,descuento, idproveedor, estado} = producto;
        const sql = 'UPDATE productos SET nombre = $2, descripcion = $3, preciocompra = $4, precioventa = $5, descuento = $6, idproveedor = $7, estado = $8 WHERE idproducto = $1 RETURNING *';
        const {rows} = await pool.query(sql, [idproducto, nombre, descripcion,preciocompra,precioventa,descuento, idproveedor, estado]);
        return rows[0];
      }

      static async delete(idproducto: string) {
        const sql = 'UPDATE productos SET activo = 0 WHERE idproducto = $1';
        await pool.query(sql, [idproducto]);
        return { message: 'Producto eliminado exitosamente.' };
      }

}
