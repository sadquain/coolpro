
import Dashboard from "views/Dashboard.js";
import Users from "views/Users.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import MacAddress from "views/MacAddress";
import Gateway from "views/Gateway";
import Signin from "views/Signin";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  //   sidebar: true,
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/macaddress",
    name: "Mac Address",
    icon: "nc-icon nc-circle-09",
    component: MacAddress,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/gateway",
    name: "Gateway",
    icon: "nc-icon nc-circle-09",
    component: Gateway,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/user",
    name: "Users",
    icon: "nc-icon nc-circle-09",
    component: Users,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/signin",
    name: "Sign in",
    icon: "nc-icon nc-circle-09",
    component: Signin,
    layout: "/auth",
    sidebar: false,
  },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin",
  //   sidebar: true,
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  //   sidebar: true,
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  //   sidebar: true,
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  //   sidebar: true,
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  //   sidebar: true,
  // }
];

export default dashboardRoutes;
