import { FichaMedicaCreationAttributes, FichaMedicaUpdateAttributes } from '../types/FichaMedica.js';
import type { Request, Response } from 'express';
import sql from '../config/database.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: FichaMedicaCreationAttributes = request.body;

    const res = await sql`INSERT INTO fichas_medicas ${sql(body)} RETURNING *`;
    response.status(201).json(res[0]);
  } catch (e: any) {
    console.error('Error al crear ficha médica:', e);
    response.status(500).json({
      error: 'Error al crear la ficha médica',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id) {
      const res = await sql`SELECT * FROM fichas_medicas WHERE id = ${id}`;
      response.status(200).json(res);
    } else {
      const res = await sql`SELECT * FROM fichas_medicas`;
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener las fichas médicas', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: FichaMedicaUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`UPDATE fichas_medicas SET ${sql(body)} WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Ficha médica no encontrada' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar ficha médica:', e);
    response.status(500).json({
      error: 'Error al actualizar la ficha médica',
      details: e.message,
    });
  }
}

async function DELETE_FICHA(request: Request, response: Response) {
  try {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`DELETE FROM fichas_medicas WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Ficha médica no encontrada' });
    }

    response.status(200).json({ message: 'Ficha médica eliminada', data: res[0] });
  } catch (e: any) {
    console.error('Error al eliminar ficha médica:', e);
    response.status(500).json({
      error: 'Error al eliminar la ficha médica',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE_FICHA };
