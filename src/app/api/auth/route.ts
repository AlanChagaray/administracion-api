
import {pool}from '@/config/db';
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';


export async function GET(req : NextRequest) {

    const { searchParams } = new URL(req.url);
    const usuario = searchParams.get('usuario') || null;
    const password = searchParams.get('password') || null;
    const sql = 'SELECT * FROM usuarios where usuario =$1 and password = $2 and activo = 1';
    const {rows} = await pool.query(sql, [usuario, password]);
    
    if (rows.length > 0) {
        console.log(rows[0]);
        const token = jwt.sign({ id: rows[0].idusuario, usuario: rows[0].usuario }, SECRET_KEY, { expiresIn: '30' });
        return NextResponse.json({ success: true, data: rows[0], token, status :200 });
    } else {
        return  NextResponse.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
}
