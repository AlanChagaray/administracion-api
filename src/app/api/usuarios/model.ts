// import React from 'react'
import { pool } from '@/config/db';

export default class Usuario {

    static async search(params: { estado: string | null, nombre: string | null, activo: string | null }) {
        const { estado, nombre, activo } = params;
        const sql = 'SELECT * FROM usuarios WHERE ( usuario=$1 or $1 is null) AND (password = $2 or $2 is null)';
        const {rows} = await pool.query(sql, [estado, nombre, activo]);
        return rows;
      }

    static async get( usuario: string | null, password: string | null ) {
        const sql = 'SELECT * FROM usuarios WHERE ( usuario=$1 or $1 is null) AND (password = $2 or $2 is null)';
        const {rows} = await pool.query(sql, [usuario, password]);
        return rows;
      }

      // static async post(cliente: { nombre: string, apellido: string, documento: string, telefono: string, email: string }) {
      //   const { nombre, apellido, documento, telefono, email } = cliente;
      //   const sql = 'INSERT INTO clientes (nombre, apellido, documento, telefono, email) VALUES ($1, $2, $3, $4,$5) RETURNING *';
      //   const {rows} = await pool.query(sql, [nombre, apellido, documento, telefono, email]);
      //   return rows[0];
      // }

      // static async put(cliente: { idcliente: string, nombre: string, apellido: string, telefono: string, email: string, documento: string }) {
      //   const { idcliente, nombre, apellido, telefono, email, documento } = cliente;
      //   const sql = `UPDATE clientes
      //    SET
      //     nombre = COALESCE($2, nombre), 
      //     apellido = COALESCE($3, apellido), 
      //     telefono = COALESCE($4, telefono), 
      //     email = COALESCE($5, email), 
      //     documento = COALESCE($6, documento)  
      //     WHERE idcliente = $1 RETURNING *`;
      //   const {rows} = await pool.query(sql, [idcliente, nombre, apellido, telefono, email, documento]);
      //   return rows[0];
      // }

      // static async delete(idcliente: string) {
      //   const sql = 'UPDATE clientes SET activo = 0 WHERE idcliente = $1';
      //   await pool.query(sql, [idcliente]);
      //   return { message: 'Cliente eliminado exitosamente.' };
      // }

}
