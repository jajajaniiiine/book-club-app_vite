import { Box, Typography } from "@mui/material";
import { DatabaseFilled, HomeFilled } from "@ant-design/icons";
import { Divider, Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

const items = [
  {
    key: "1",
    icon: <HomeFilled />,
    label: <Link to={{ pathname: "/dashboard" }}>Dashboard</Link>,
  },
  // {
  //   key: "2",
  //   icon: <LibraryBooks />,
  //   label: <Link to={{ pathname: "/my-library" }}>My Library</Link>,
  // },
  {
    key: "3",
    icon: <DatabaseFilled />,
    label: <Link to={{ pathname: "/my-inventory" }}>My Inventory</Link>,
  },
];

export const Root = () => {
  return (
    <>
      <Layout.Sider
        style={{
          position: "fixed",
          height: "100%",
          zIndex: 0,
          top: 0,
          backgroundColor: "#ffffff",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Vite + NestJS Project</Typography>
        </Box>
        <Divider />
        <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{
            backgroundColor: "#ffffff",
            height: 80,
            borderBottom: "1px solid #dadada",
          }}
        />
        <Layout.Content style={{ marginLeft: 200 }}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer
          style={{
            backgroundColor: "#ffffff",
            height: 80,
            borderTop: "1px solid #dadada",
          }}
        >
          All Rights Reserved 2023
        </Layout.Footer>
      </Layout>
    </>
  );
};
