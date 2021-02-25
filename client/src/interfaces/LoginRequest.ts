import { Role } from '../router/Roles';

export interface LoginRequest {
  username : string,
  firstName : string,
  lastName : string,
  token : string,
  email : string,
  role : Role,
  isRemembered : boolean
}