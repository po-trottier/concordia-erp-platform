import * as React from "react";

export interface UserEntry {
  name: string,
  age: number,
  location: string,
  actions: React.ComponentType<any>
}
