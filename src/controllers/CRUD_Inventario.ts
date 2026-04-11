import { InventarioCreationAttributes, InventarioUpdateAttributes } from '../types/Inventario.js';
import type { Request, Response } from 'express';
import sql from '../config/database.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: InventarioCreationAttributes = request.body;

    const res = await sql`INSERT INTO inventario ${sql(body)} RETURNING *`;
    response.status(201).json(res[0]);
  } catch (e: any) {
    console.error('Error al crear inventario:', e);
    response.status(500).json({
      error: 'Error al crear el inventario',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id) {
      const res = await sql`SELECT * FROM inventario WHERE id = ${id}`;
      response.status(200).json(res);
    } else {
      const res = await sql`SELECT * FROM inventario`;
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener el inventario', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: InventarioUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`UPDATE inventario SET ${sql(body)} WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Registro de inventario no encontrado' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar inventario:', e);
    response.status(500).json({
      error: 'Error al actualizar el inventario',
      details: e.message,
    });
  }
}

async function DELETE_INVENTARIO(request: Request, response: Response) {
  try {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`DELETE FROM inventario WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Registro de inventario no encontrado' });
    }

    response.status(200).json({ message: 'Registro de inventario eliminado', data: res[0] });
  } catch (e: any) {
    console.error('Error al eliminar inventario:', e);
    response.status(500).json({
      error: 'Error al eliminar el inventario',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE_INVENTARIO };
