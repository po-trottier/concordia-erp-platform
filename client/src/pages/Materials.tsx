import React from "react";

import {MaterialsTimeline} from '../components/Materials/MaterialsTimeline';
import {MaterialsList} from '../components/Materials/MaterialsList'


export const Materials = () => {
  return(
    <div>
      <MaterialsList />
      <MaterialsTimeline />
    </div>
  )
}
