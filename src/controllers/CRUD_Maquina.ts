import { MaquinaCreationAttributes, MaquinaUpdateAttributes } from '../types/Maquina.js';
import type { Request, Response } from 'express';
import sql from '../config/database.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: MaquinaCreationAttributes = request.body;

    const res = await sql`INSERT INTO maquinas ${sql(body)} RETURNING *`;
    response.status(201).json(res[0]);
  } catch (e: any) {
    console.error('Error al crear máquina:', e);
    response.status(500).json({
      error: 'Error al crear la máquina',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id) {
      const res = await sql`SELECT * FROM maquinas WHERE id = ${id}`;
      response.status(200).json(res);
    } else {
      const res = await sql`SELECT * FROM maquinas`;
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener las máquinas', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: MaquinaUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`UPDATE maquinas SET ${sql(body)} WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Máquina no encontrada' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar máquina:', e);
    response.status(500).json({
      error: 'Error al actualizar la máquina',
      details: e.message,
    });
  }
}

async function DELETE_MAQUINA(request: Request, response: Response) {
  try {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`DELETE FROM maquinas WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Máquina no encontrada' });
    }

    response.status(200).json({ message: 'Máquina eliminada', data: res[0] });
  } catch (e: any) {
    console.error('Error al eliminar máquina:', e);
    response.status(500).json({
      error: 'Error al eliminar la máquina',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE_MAQUINA };
