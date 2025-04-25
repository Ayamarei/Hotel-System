import { Box, Pagination } from "@mui/material";

export default function PaginationList({getAllList,page,totalCount,setpage}:
  {getAllList: (size: number, page: number) => Promise<void>,
    page:number,
    totalCount:number,
    setpage:(page:number)=>void
    
  }) {


   const handlePagination=(_event: React.ChangeEvent<unknown>, value: number)=>{
    setpage(value); 
  getAllList(5,value)
   }

  return <>
  <Box sx={{display:"flex",justifyContent:"flex-end", mt: "20px" }}>
    <Pagination 
      shape="rounded" variant="outlined" count={totalCount ?? 1} color="primary" onChange={handlePagination} page={page} />
      </Box>
  </>;
}
