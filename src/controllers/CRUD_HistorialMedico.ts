import { HistorialMedicoCreationAttributes, HistorialMedicoUpdateAttributes } from '../types/HistorialMedico.js';
import type { Request, Response } from 'express';
import sql from '../config/database.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: HistorialMedicoCreationAttributes = request.body;

    const res = await sql`INSERT INTO historiales_medicos ${sql(body)} RETURNING *`;
    response.status(201).json(res[0]);
  } catch (e: any) {
    console.error('Error al crear historial médico:', e);
    response.status(500).json({
      error: 'Error al crear el historial médico',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id) {
      const res = await sql`SELECT * FROM historiales_medicos WHERE id = ${id}`;
      response.status(200).json(res);
    } else {
      const res = await sql`SELECT * FROM historiales_medicos`;
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener los historiales médicos', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: HistorialMedicoUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`UPDATE historiales_medicos SET ${sql(body)} WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Historial médico no encontrado' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar historial médico:', e);
    response.status(500).json({
      error: 'Error al actualizar el historial médico',
      details: e.message,
    });
  }
}

async function DELETE_HISTORIAL(request: Request, response: Response) {
  try {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`DELETE FROM historiales_medicos WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Historial médico no encontrado' });
    }

    response.status(200).json({ message: 'Historial médico eliminado', data: res[0] });
  } catch (e: any) {
    console.error('Error al eliminar historial médico:', e);
    response.status(500).json({
      error: 'Error al eliminar el historial médico',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE_HISTORIAL };
