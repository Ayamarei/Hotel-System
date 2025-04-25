// export interface IColumLable {
//     label: string;
//     align: "left" | "right" | "center"; 
//   }
//   export type CoulmnsLables=IColumLable[]

// Define in a shared types file (e.g., Types.ts or Columns.ts)
export interface IColumnLabel<T = unknown> {
  label: string;
  align: "left" | "right" | "center";
  accessor?: (row: T) => React.ReactNode; // Function to access/render data
  sortable?: boolean; // Optional flag for sorting
}

export type ColumnsLabels<T = unknown> = IColumnLabel<T>[];



  