import { ClienteCreationAttributes } from '../types/Cliente.js';
import type { Request, Response } from 'express';
import sql from '../config/database.js';
import encodePassword from '../services/Encode.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: ClienteCreationAttributes = {...request.body, password: encodePassword(request.body.password), createdAt: new Date(), updatedAt: new Date()};
    // Validación adicional: verificar que no exista email duplicado
    if (body.correo) {
      const existingEmail = await sql`SELECT id FROM clientes WHERE correo = ${body.correo}`;
      if (existingEmail.length > 0) {
        return response.status(409).json({
          error: 'El correo ya está registrado',
        });
      }
    }

    const res = await sql`INSERT INTO clientes ${sql(body)} RETURNING *`;
    response.status(201).json({messages: "Cliente creado exitosamente", cliente: res[0]?.id});
  } catch (e: any) {
    console.error('Error al crear cliente:', e);
    response.status(500).json({
      error: 'Error al crear el cliente',
      details: e.message,
    });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id || null;
    if (id && id!=="all") {
      const res = await sql`SELECT * FROM clientes WHERE id = ${id}`;
      response.status(200).json(res);
    } else {
      const res = await sql`SELECT * FROM clientes`;
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener los clientes', details: e.message });
  }
}

async function UPDATE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (!id) {
      return response.status(400).json({ error: 'El id del cliente es requerido' });
    }
    const body: ClienteCreationAttributes = {...request.body, updatedAt: new Date()};
    const res = await sql`UPDATE clientes SET ${sql(body)} WHERE id = ${id} RETURNING *`;
    response.status(200).json({message: "Cliente actualizado exitosamente", cliente: res[0]?.id});
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al actualizar el cliente', details: e.message });
  }
}

async function DELETE(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (!id) {
      return response.status(400).json({ error: 'El id del cliente es requerido' });
    }
    const res = await sql`UPDATE clientes SET activo = false WHERE id = ${id} RETURNING *`;
    response.status(200).json({message: "Cliente eliminado exitosamente", cliente: res[0]?.id});
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al actualizar el cliente', details: e.message });
  }
}

export { CREATE, READ, UPDATE, DELETE };
