import React from "react";
// import "../profile.scss";
// import { Website } from "../website/website";
import { Website } from "../website/website";
// import AddCheck from "../../pages/website/add-check";

// const getRoutes = (routes) => {
//   return routes.map((prop, key) => {
//     if (prop.layout === "/dashboard") {
//       return (
//         <Route
//           path={prop.layoyt + prop.path}
//           component={prop.component}
//           key={key}
//         />
//       );
//     } else {
//       return null;
//     }
//   });
// };

export const Dashboard = () => {
  return <Website />;
};
