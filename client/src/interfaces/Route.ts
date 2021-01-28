import * as React from "react";
import {RouteGuard} from "../router/RouteGuards";

export interface Route {
  path: string,
  exact: boolean,
  title: string,
  icon: string,
  page: React.ComponentType<any>,
  auth: RouteGuard[]
}