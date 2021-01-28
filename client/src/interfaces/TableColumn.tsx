import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

export interface tableColumn {
  title: string,
  dataIndex: string,
  sorter?: {
    compare: any,
    multiple: number
  },
  responsive: Breakpoint[]
}

