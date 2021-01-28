export interface tableColumn {
  title: string,
  dataIndex: string,
  sorter?: {
    compare: any,
    multiple: number
  },
  responsive: Array<string>
}

