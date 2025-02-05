// import React from 'react'
import { pool } from '@/config/db';

export default class Cliente {

    static async search(params: { nombre: string | null, apellido: string | null, telefono: string | null }) {
        const { nombre, apellido, telefono } = params;
        const sql = 'SELECT * FROM clientes WHERE ( nombre=$1 or $1 is null) AND (apellido = $2 or $2 is null) AND (telefono = $3 or $3 is null) AND activo= 1';
        const {rows} = await pool.query(sql, [nombre,apellido,telefono]);
        return rows;
      }

      static async get(idcliente: string) {
        const sql =  `SELECT c.idcliente ,c.nombre, c.apellido, c.documento, c.telefono, c.email, to_char(c.fechaalta  , 'dd/mm/yyyy') as fechaalta,to_char(c.fechamodificacion , 'dd/mm/yyyy') as fechamodificacion FROM clientes c WHERE c.idcliente=$1`;
        const {rows} = await pool.query(sql, [idcliente]);
        return rows;
      }

      static async post(cliente: { nombre: string, apellido: string, documento: string, telefono: string, email: string }) {
        const { nombre, apellido, documento, telefono, email } = cliente;
        const sql = 'INSERT INTO clientes (nombre, apellido, documento, telefono, email) VALUES ($1, $2, $3, $4,$5) RETURNING *';
        const {rows} = await pool.query(sql, [nombre, apellido, documento, telefono, email]);
        return rows[0];
      }

      static async put(cliente: { idcliente: string, nombre: string, apellido: string, telefono: string, email: string, documento: string }) {
        const { idcliente, nombre, apellido, telefono, email, documento } = cliente;
        const sql = `UPDATE clientes
         SET
          nombre = COALESCE($2, nombre), 
          apellido = COALESCE($3, apellido), 
          telefono = COALESCE($4, telefono), 
          email = COALESCE($5, email), 
          documento = COALESCE($6, documento)  
          WHERE idcliente = $1 RETURNING *`;
        const {rows} = await pool.query(sql, [idcliente, nombre, apellido, telefono, email, documento]);
        return rows[0];
      }

      static async delete(idcliente: string) {
        const sql = 'UPDATE clientes SET activo = 0 WHERE idcliente = $1';
        await pool.query(sql, [idcliente]);
        return { message: 'Cliente eliminado exitosamente.' };
      }

}
