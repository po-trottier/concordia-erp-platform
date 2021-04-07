import {Role} from "../api/roles/roles.enum";

export interface UserToken {
  username: string;
  id: string;
  role: Role;
}