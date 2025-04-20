import { Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { WorkOutline } from "@mui/icons-material";
import { THEMECOLOR } from "../../Services/ThemeColors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import { DASHBOARD_URLS } from "../../Services/Urls";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

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
  const [dashboardData,setDashboardData]=useState<IDashboardData|null>(null);
  console.log("dashboardData",dashboardData);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));


  // charts
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data1 = {
    labels: ["completed", "pending"],
    datasets: [
      {
        label:"Booking",
        data: [dashboardData?.bookings.completed??0,dashboardData?.bookings.pending??0],
        backgroundColor: ["rgba(157, 87, 213, .5)", "rgba(83, 104, 240, .5)"],
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
        data: [dashboardData?.users.user??0,dashboardData?.users.admin??0],
        backgroundColor: ["rgba(84, 209, 77, .5)", "rgba(53, 194, 253, .5)"],
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
//fetch data
const DashboardData=async()=>{
    try{
      const response=await privateUserAxiosInstance.get(DASHBOARD_URLS.CHART);
      setDashboardData(response.data.data);
    }catch(error){
    if(error instanceof AxiosError){
      toast.error(error.response?.data.message||"Something went wrong")
    }
    }
}
useEffect(()=>{
  DashboardData()
},[])

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginBottom: "80px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <Item
              sx={{ height: "180px", backgroundColor: THEMECOLOR.darkBlack }}
            >
              <Stack
                direction="row"
                spacing={20}
                justifyContent="center"
                alignItems="center"
                sx={{ height: "150px", color: THEMECOLOR.White }}
              >
                <div>
                  <Typography >{dashboardData?.rooms}</Typography>
                  <Typography>Rooms</Typography>
                </div>
                <div>
                  <WorkOutline
                    sx={{
                      color: THEMECOLOR.mainBlue,
                      borderRadius: "50px",
                      p: 1.5,
                      fontSize: "50px",
                      backgroundColor: THEMECOLOR.lightBlue,
                    }}
                  />{" "}
                </div>
              </Stack>
            </Item>
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <Item
              sx={{ height: "180px", backgroundColor: THEMECOLOR.darkBlack }}
            >
              <Stack
                direction="row"
                spacing={20}
                justifyContent="center"
                alignItems="center"
                sx={{ height: "150px", color: THEMECOLOR.White }}
              >
                <div>
                  <Typography>{dashboardData?.facilities}</Typography>
                  <Typography>Facilities</Typography>
                </div>
                <div>
                  <WorkOutline
                    sx={{
                      color: THEMECOLOR.mainBlue,
                      borderRadius: "50px",
                      p: 1.5,
                      fontSize: "50px",
                      backgroundColor: THEMECOLOR.lightBlue,
                    }}
                  />{" "}
                </div>
              </Stack>
            </Item>
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <Item
              sx={{ height: "180px", backgroundColor: THEMECOLOR.darkBlack }}
            >
              <Stack
                direction="row"
                spacing={20}
                justifyContent="center"
                alignItems="center"
                sx={{ height: "150px", color: THEMECOLOR.White }}
              >
                <div>
                  <Typography>{dashboardData?.ads}</Typography>
                  <Typography>Ads</Typography>
                </div>
                <div>
                  <WorkOutline
                    sx={{
                      color: THEMECOLOR.mainBlue,
                      borderRadius: "50px",
                      p: 1.5,
                      fontSize: "50px",
                      backgroundColor: THEMECOLOR.lightBlue,
                    }}
                  />{" "}
                </div>
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Grid size={{ xs: 4, sm: 4, md: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          // spacing="350px"
          spacing={{ xs: 5, md: "350px" }}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            padding: 2,
          }}
        >
          {/* first chart */}
          <Box sx={{ width: 330, height: 330 }}>
            <Doughnut data={data1} />
          </Box>

          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1E1E1E" : "#fff",
              borderRadius: "16px",
              padding: "20px",
              width: 430,
              height: 250,
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor:
                          data2.datasets[0].backgroundColor[index],
                        borderRadius: "50%",
                        mr: 1.5,
                      }}
                    />
                    <Typography variant="body2">{label}</Typography>
                  </Box>
                  <Typography variant="body2">
                    {data2.datasets[0].data[index]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </Grid>
    </div>
  );
};

export default Dashboard;
