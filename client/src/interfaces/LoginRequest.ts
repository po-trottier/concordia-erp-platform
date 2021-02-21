import { Role } from '../router/Roles';

export interface LoginRequest {
  username : string,
  name: string,
  token: string,
  email: string,
  role: Role,
  isRemembered : boolean
}