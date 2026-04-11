import { RecetaCreationAttributes, RecetaUpdateAttributes } from '../types/Receta.js';
import type { Request, Response } from 'express';
import sql from '../config/database.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: RecetaCreationAttributes = request.body;

    const res = await sql`INSERT INTO recetas ${sql(body)} RETURNING *`;
    response.status(201).json(res[0]);
  } catch (e: any) {
    console.error('Error al crear receta:', e);
    response.status(500).json({
      error: 'Error al crear la receta',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id) {
      const res = await sql`SELECT * FROM recetas WHERE id = ${id}`;
      response.status(200).json(res);
    } else {
      const res = await sql`SELECT * FROM recetas`;
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener las recetas', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: RecetaUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`UPDATE recetas SET ${sql(body)} WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Receta no encontrada' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar receta:', e);
    response.status(500).json({
      error: 'Error al actualizar la receta',
      details: e.message,
    });
  }
}

async function DELETE_RECETA(request: Request, response: Response) {
  try {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`DELETE FROM recetas WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Receta no encontrada' });
    }

    response.status(200).json({ message: 'Receta eliminada', data: res[0] });
  } catch (e: any) {
    console.error('Error al eliminar receta:', e);
    response.status(500).json({
      error: 'Error al eliminar la receta',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE_RECETA };
