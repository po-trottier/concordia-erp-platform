// @ts-nocheck

import loadable from "@loadable/component";

interface DynamicIconProps {
  name: string
}

const DynamicIcon = loadable((props : DynamicIconProps) =>
  import(`@ant-design/icons/es/icons/${props.name}.js`)
    .catch(err => import('@ant-design/icons/es/icons/WarningOutlined.js')));

export default DynamicIcon;
