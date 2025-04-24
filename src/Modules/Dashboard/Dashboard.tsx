import { useEffect, useState } from "react";
import { Box,Grid, Stack, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { WorkOutline } from "@mui/icons-material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import { DASHBOARD_URLS } from "../../Services/Urls";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { THEMECOLOR } from "../../Services/ThemeColors";

export interface IBookings {
  completed: number;
  pending: number;
}

export interface IUsers {
  admin: number;
  user: number;
}

export interface IDashboardData {
  ads: number;
  bookings: IBookings;
  facilities: number;
  rooms: number;
  users: IUsers;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<IDashboardData | null>(null);
  const { i18n } = useTranslation();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
  }));

  // Register Chart.js components
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data1 = {
    labels: ["completed", "pending"],
    datasets: [
      {
        label: "Booking",
        data: [
          dashboardData?.bookings?.completed ?? 0,
          dashboardData?.bookings?.pending ?? 0,
        ],
        backgroundColor: ["rgba(157, 87, 213, 0.5)", "rgba(83, 104, 240, 0.5)"],
        borderColor: ["rgba(157, 87, 213, 1)", "rgba(83, 104, 240, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ["User", "Admin"],
    datasets: [
      {
        label: "Users",
        data: [dashboardData?.users?.user ?? 0, dashboardData?.users?.admin ?? 0],
        backgroundColor: ["rgba(84, 209, 77, 0.5)", "rgba(53, 194, 253, 0.5)"],
        borderColor: ["rgba(84, 209, 77, 1)", "rgba(53, 194, 253, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: "98%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    try {
      const response = await privateUserAxiosInstance.get(DASHBOARD_URLS.CHART);
      setDashboardData(response.data.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <Box sx={{ flexGrow: 1, marginBottom: "80px" }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid  item xs={4} sm={4} md={4} size={4}>
            <Item sx={{ height: "180px", backgroundColor: "#1A2027" }}>
              <Stack
                direction={i18n.language === "ar" ? "row-reverse" : "row"}
                spacing={5}
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: "150px", color: "#FFF" }}
              >
                <div>
                  <Typography>{dashboardData?.rooms || 0}</Typography>
                  <Typography>Rooms</Typography>
                </div>
                <WorkOutline
                  sx={{
                    color: THEMECOLOR.Dark_Baby_Blue,
                    borderRadius: "50px",
                    p: 1.5,
                    fontSize: "50px",
                    backgroundColor: THEMECOLOR.lightBlue,
                  }}
                />
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={4} sm={4} md={4} size={4} >
            <Item sx={{ height: "180px", backgroundColor: "#1A2027" }}>
              <Stack
                direction={i18n.language === "ar" ? "row-reverse" : "row"}
                spacing={5}
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: "150px", color: "#FFF" }}
              >
                <div>
                  <Typography>{dashboardData?.facilities || 0}</Typography>
                  <Typography>Facilities</Typography>
                </div>
                <WorkOutline
                 sx={{
                  color: THEMECOLOR.Dark_Baby_Blue,
                  borderRadius: "50px",
                  p: 1.5,
                  fontSize: "50px",
                  backgroundColor: THEMECOLOR.lightBlue,
                }}
                />
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={4} sm={4} md={6} size={4}>
            <Item sx={{ height: "180px", backgroundColor: "#1A2027" }}>
              <Stack
                direction={i18n.language === "ar" ? "row-reverse" : "row"}
                spacing={5}
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: "150px", color: "#FFF" }}
              >
                <div>
                  <Typography>{dashboardData?.ads || 0}</Typography>
                  <Typography>Ads</Typography>
                </div>
                <WorkOutline
                  sx={{
                    color: THEMECOLOR.Dark_Baby_Blue,
                    borderRadius: "50px",
                    p: 1.5,
                    fontSize: "50px",
                    backgroundColor: THEMECOLOR.lightBlue,
                  }}
                />
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Box>
      


    <Grid container spacing={10} justifyContent="center">
      {/* chart 1 */}
      <Grid item xs={12} sm={6} md={6} >
        <Box sx={{ width: "100%", height: "100%" }}>
          <Doughnut data={data1} />
        </Box>
      </Grid>

      {/* chart 2 */}
      <Grid item xs={12} sm={6} md={6} size={5}>
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1E1E1E" : "#fff",
            borderRadius: "16px",
            padding: "20px",
            // width: "100%",
            height: "100%",
            width: { xs: '100%', sm: '100%', md: '90%' }, 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ width: 100, height: 100 }}>
            <Doughnut data={data2} options={options} />
          </Box>

          {/* Custom legend */}
          <Box sx={{ mt: 2, width: "100%" }}>
            {data2.labels.map((label, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 0.5,
                  
                
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center"}}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: data2.datasets[0].backgroundColor[index],
                      borderRadius: "50%",
                      ...(i18n.language === "en" ? { mr: 1.5 } : { ml: 1.5 }),
                    }}
                  />
                  <Typography variant="body2">{label}</Typography>
                </Box>
                <Typography variant="body2" >
                  {data2.datasets[0].data[index]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      
</Grid>

    </div>
  );
};

export default Dashboard;