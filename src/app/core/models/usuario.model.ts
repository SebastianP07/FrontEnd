import { Rol } from './rol.model';

export interface DatosUsuario {
  email: string;
  enabled: boolean;
  id: number;
  numeroIdentificacion: string;
  password: string;
  roles: Rol[];
  username: string;
  grant_type?: string;
}
