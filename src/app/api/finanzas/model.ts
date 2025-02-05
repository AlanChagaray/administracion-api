import { pool } from "@/config/db";

export default class Finanza {
  static async search(params: { mes: number | null; anio: number | null }) {
    const {mes, anio} = params;
    const sql = `SELECT 
    (SELECT COUNT(*) FROM pedidos
    WHERE EXTRACT(YEAR FROM fecharetiro) = COALESCE($2, EXTRACT(YEAR FROM CURRENT_DATE))
    AND EXTRACT(MONTH FROM fecharetiro) = COALESCE($1, EXTRACT(MONTH FROM CURRENT_DATE))
    AND activo = 1) as totalpedidos,
    (SELECT SUM(senia) 
    FROM pedidos 
    WHERE EXTRACT(YEAR FROM fecharetiro) = COALESCE($2, EXTRACT(YEAR FROM CURRENT_DATE))
    AND EXTRACT(MONTH FROM fecharetiro) = COALESCE($1, EXTRACT(MONTH FROM CURRENT_DATE))
    AND senia != total
    AND activo = 1) AS senias,
    (SELECT SUM(total) - SUM(senia)  
    FROM pedidos 
    WHERE EXTRACT(YEAR FROM fecharetiro) = COALESCE($2, EXTRACT(YEAR FROM CURRENT_DATE))
    AND EXTRACT(MONTH FROM fecharetiro) = COALESCE($1, EXTRACT(MONTH FROM CURRENT_DATE))
    AND senia != total
    AND activo = 1) AS restantes,
    SUM(total) AS total,
    (SELECT SUM(total) 
    FROM pedidos 
    WHERE EXTRACT(YEAR FROM fecharetiro) = COALESCE($2, EXTRACT(YEAR FROM CURRENT_DATE))
    AND EXTRACT(MONTH FROM fecharetiro) = COALESCE($1, EXTRACT(MONTH FROM CURRENT_DATE))
    AND activo = 1) AS totalmes,
    (SELECT SUM(total) 
    FROM pedidos 
    WHERE EXTRACT(YEAR FROM fecharetiro) = COALESCE($2, EXTRACT(YEAR FROM CURRENT_DATE))
    AND activo = 1) AS totalanio
    FROM pedidos
    WHERE  activo = 1;`;
    const { rows } = await pool.query(sql, [mes, anio]);
    return rows;
  }

  static async getMonth(params: { mes: number | null; anio: number | null }) {
    const { mes, anio } = params;
    const sql = `SELECT 
    to_char(fecharetiro, 'dd/mm/yyyy') AS fecharetiro,
    senia,
    total - senia AS restante,
    total
    FROM pedidos
    WHERE EXTRACT(MONTH FROM fecharetiro) = COALESCE($1, EXTRACT(MONTH FROM CURRENT_DATE))
    AND EXTRACT(YEAR FROM fecharetiro) = COALESCE($2, EXTRACT(YEAR FROM CURRENT_DATE)) AND activo = 1;`;
    const { rows } = await pool.query(sql, [mes, anio]);
    return rows;
  }

  static async getYear(anio: number | null) {
    const sql = `SELECT 
    generate_series AS mes,
    COALESCE($1, EXTRACT(YEAR FROM CURRENT_DATE)) AS anio,
    COALESCE(SUM(total), 0) AS total
    FROM generate_series(0, 11) 
    LEFT JOIN pedidos 
    ON EXTRACT(MONTH FROM fecharetiro) = generate_series
    AND EXTRACT(YEAR FROM fecharetiro) = COALESCE($1, EXTRACT(YEAR FROM CURRENT_DATE))
    WHERE activo = 1
    GROUP BY generate_series, anio
    ORDER BY anio, mes;`;
    const { rows } = await pool.query(sql, [anio]);
    return rows;
  }

  static async getProducts(params: { mes: number | null; anio: number | null }) {
    const {mes , anio} = params;
    const sql = `SELECT 
    vta.idproducto,
    p.nombre,
    SUM(vta.cantidad) AS total_cantidad
    FROM vtaproductos AS vta
    INNER JOIN productos AS p ON p.idproducto = vta.idproducto
    INNER JOIN pedidos as pd ON pd.idpedido = vta.idpedido
    WHERE EXTRACT(MONTH FROM pd.fecharetiro) = COALESCE($1, EXTRACT(MONTH FROM CURRENT_DATE))
    AND EXTRACT(YEAR FROM pd.fecharetiro) = COALESCE($2, EXTRACT(YEAR FROM CURRENT_DATE))
    AND pd.activo = 1
    GROUP BY vta.idproducto, p.nombre
    ORDER BY total_cantidad DESC;`;
    const { rows } = await pool.query(sql, [mes, anio]);
    return rows;
  }
}
