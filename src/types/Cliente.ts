export interface ClienteAttributes {
  id: number;
  nombre: string;
  apellido: string | null;
  cedula: string | null;
  password: string | null;
  correo: string | null;
  asegurado: boolean;
  verificado: boolean;
  sexo: string | null;
}

export interface ClienteCreationAttributes {
  id?: number;
  nombre: string;
  apellido?: string | null;
  cedula?: string | null;
  password?: string | null;
  correo?: string | null;
  asegurado?: boolean;
  verificado?: boolean;
  sexo?: string | null;
}

export type ClienteUpdateAttributes = Partial<Omit<ClienteAttributes, "id">>;