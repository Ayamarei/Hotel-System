import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = () => {
  return (
    <Grid container wrap="nowrap">
      {/* عرض Skeleton بشكل مستمر */}
      {Array.from(new Array(3)).map((_, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Box sx={{ pr: 2, pt: 1 }}>
            <Skeleton width="100%" />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default SkeletonLoader;