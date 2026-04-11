import { DosisCreationAttributes, DosisUpdateAttributes } from '../types/Dosis.js';
import type { Request, Response } from 'express';
import sql from '../config/database.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: DosisCreationAttributes = request.body;

    const res = await sql`INSERT INTO dosis ${sql(body)} RETURNING *`;
    response.status(201).json(res[0]);
  } catch (e: any) {
    console.error('Error al crear dosis:', e);
    response.status(500).json({
      error: 'Error al crear la dosis',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id) {
      const res = await sql`SELECT * FROM dosis WHERE id = ${id}`;
      response.status(200).json(res);
    } else {
      const res = await sql`SELECT * FROM dosis`;
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener las dosis', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: DosisUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`UPDATE dosis SET ${sql(body)} WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Dosis no encontrada' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar dosis:', e);
    response.status(500).json({
      error: 'Error al actualizar la dosis',
      details: e.message,
    });
  }
}

async function DELETE_DOSIS(request: Request, response: Response) {
  try {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`DELETE FROM dosis WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Dosis no encontrada' });
    }

    response.status(200).json({ message: 'Dosis eliminada', data: res[0] });
  } catch (e: any) {
    console.error('Error al eliminar dosis:', e);
    response.status(500).json({
      error: 'Error al eliminar la dosis',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE_DOSIS };
