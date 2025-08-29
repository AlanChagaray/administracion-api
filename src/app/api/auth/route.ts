
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import {pool}from '@/config/db';

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';


export async function POST(req : NextRequest) {
    const url = new URL(req.url);
    const usuario = url.searchParams.get('usuario');
    const password = url.searchParams.get('password');
    
    if(!usuario){
        return  NextResponse.json({ success: false, message: 'Ingresar usuario' });
    }
    if(!password){
        return  NextResponse.json({ success: false, message: 'Ingresar contraseña' });
    }
    const sql = 'SELECT * FROM usuarios as u where u.usuario =$1 and u.password = $2 and u.activo = 1';
    const {rows} = await pool.query(sql, [usuario, password]);
    
    if (rows.length > 0) {
        const token = jwt.sign({ id: rows[0].idusuario, usuario: rows[0].usuario }, SECRET_KEY, { expiresIn: '600s' });
        const response = new NextResponse(
            JSON.stringify({ 
                success: true, 
                idusuario: rows[0].idusuario, 
                usuario: rows[0].usuario, 
                token, 
                status: 200 
            })
            ,{
                headers: { "Content-Type": "application/json" }
            }
        );
        response.cookies.set({
            name: 'access_token',
            value: token,
            httpOnly: true,  // No accesible desde JS del cliente
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 600
        });
        return response;
    } else {
        return  NextResponse.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
}
