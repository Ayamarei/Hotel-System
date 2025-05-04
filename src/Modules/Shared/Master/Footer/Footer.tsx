import { Box, Container, Typography } from "@mui/material";
import   Grid  from "@mui/material/Grid";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid #ccc",
        py: 4,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1 */}
          <Grid sx={{xs:12,sm:4,md:4,lg:4}} >
            <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: { xs: "center", sm: "flex-start" },
      textAlign: { xs: "center", sm: "left" },
    }}>
              <Typography
                variant="h6"
                noWrap
                component="h6"
                sx={{ fontWeight: 700, color: "inherit" }}
              >
                Staycation.
              </Typography>
              <Typography component="p" sx={{ color: "GrayText" }}>
                We kaboom your beauty holiday instantly and memorable.
              </Typography>
            </Box>
          </Grid>

          {/* Column 2 */}
          <Grid sx={{xs:12,sm:8,md:8,lg:8}} >
            <Grid container spacing={2}>
              {/* For Beginners */}
              <Grid sx={{xs:12,sm:4,md:4,lg:4}} >
                <Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component="h6"
                    sx={{ fontWeight: 700, color: "inherit" }}
                  >
                    For Beginners
                  </Typography>
                  <Typography component="p" sx={{ color: "GrayText" }}>
                    New Account
                  </Typography>
                  <Typography component="p" sx={{ color: "GrayText" }}>
                    Start Booking a Room
                  </Typography>
                  <Typography component="p" sx={{ color: "GrayText" }}>
                    Use Payments
                  </Typography>
                </Box>
              </Grid>

              {/* Explore Us */}
              <Grid sx={{xs:12,sm:4,md:4,lg:4}} >
                <Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component="h6"
                    sx={{ fontWeight: 700, color: "inherit" }}
                  >
                    Explore Us
                  </Typography>
                  <Typography component="p" sx={{ color: "GrayText" }}>
                    Our Careers
                  </Typography>
                  <Typography component="p" sx={{ color: "GrayText" }}>
                    Privacy
                  </Typography>
                  <Typography component="p" sx={{ color: "GrayText" }}>
                    Terms & Conditions
                  </Typography>
                </Box>
              </Grid>

              {/* Connect Us */}
              <Grid sx={{xs:12,sm:4,md:4,lg:4}} >
                <Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component="h6"
                    sx={{ fontWeight: 700, color: "inherit" }}
                  >
                    Connect Us
                  </Typography>
                  <Typography component="p" sx={{ color: "GrayText" }}>
                    support@staycation.id
                  </Typography>
                  <Typography component="p" sx={{ color: "GrayText" }}>
                    021 - 2208 - 1996
                  </Typography>
                  <Typography component="p" sx={{ color: "GrayText" }}>
                    Staycation, Kemang, Jakarta
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Typography sx={{ color: "GrayText", mt: 4 }}>
              Copyright 2019 • All rights reserved • Staycation
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
