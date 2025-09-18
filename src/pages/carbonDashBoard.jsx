import React from "react";
import Header from "../components/dashboard/dashBoardHeader";
import Body from "../components/dashboard/dashBoardBody";
import Footer from "../components/footer";
import { DashContainer } from "../styles/dashStyles";

export default function CarbonDashBoard() {
  return (
    <DashContainer>
      <Header />
      <Body />
      <Footer />
    </DashContainer>
  );
}