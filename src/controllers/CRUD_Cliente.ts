import { ClienteCreationAttributes } from '../types/Cliente.js';
import type { Request, Response } from 'express';
import sql from '../config/database.js';

async function CREATE(request: Request, response: Response) {
  try {
    const body: ClienteCreationAttributes = request.body;
    const res = await sql`INSERT INTO Clientes ${sql(body)} RETURNING *`;
    response.status(201).json(res[0]);
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al crear el cliente', details: e.message });
  }
}

async function READ(request: Request, response: Response) {
  try {
    const id = request.params.id;
    if (id) {
      const res = await sql`SELECT * FROM Clientes WHERE id = ${id}`;
      response.status(200).json(res);
    } else {
      const res = await sql`SELECT * FROM Clientes`;
      response.status(200).json(res);
    }
  } catch (e: any) {
    response
      .status(500)
      .json({ error: 'Error al obtener los clientes', details: e.message });
  }
}
export { CREATE, READ };
