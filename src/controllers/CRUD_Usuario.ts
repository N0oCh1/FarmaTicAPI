import { UsuarioCreationAttributes, UsuarioUpdateAttributes } from '../types/Usuario.js';
import type { Request, Response } from 'express';
import sql from '../config/database.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: UsuarioCreationAttributes = request.body;

    const res = await sql`INSERT INTO usuarios ${sql(body)} RETURNING *`;
    response.status(201).json(res[0]);
  } catch (e: any) {
    console.error('Error al crear usuario:', e);
    response.status(500).json({
      error: 'Error al crear el usuario',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id) {
      const res = await sql`SELECT * FROM usuarios WHERE id = ${id}`;
      response.status(200).json(res);
    } else {
      const res = await sql`SELECT * FROM usuarios`;
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener los usuarios', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const body: UsuarioUpdateAttributes = request.body;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`UPDATE usuarios SET ${sql(body)} WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Usuario no encontrado' });
    }

    response.status(200).json(res[0]);
  } catch (e: any) {
    console.error('Error al actualizar usuario:', e);
    response.status(500).json({
      error: 'Error al actualizar el usuario',
      details: e.message,
    });
  }
}

async function DELETE_USUARIO(request: Request, response: Response) {
  try {
    const id = request.params.id;

    if (!id) {
      return response.status(400).json({ error: 'ID es requerido' });
    }

    const res = await sql`DELETE FROM usuarios WHERE id = ${id} RETURNING *`;
    if (res.length === 0) {
      return response.status(404).json({ error: 'Usuario no encontrado' });
    }

    response.status(200).json({ message: 'Usuario eliminado', data: res[0] });
  } catch (e: any) {
    console.error('Error al eliminar usuario:', e);
    response.status(500).json({
      error: 'Error al eliminar el usuario',
      details: e.message,
    });
  }
}

export { CREATE, READ, UPDATE, DELETE_USUARIO };
