import React from "react";
import { useNavigate } from "react-router-dom";
import BackToPage from "../../assets/Arrow-left-y.png";
import StaticFont from "../../assets/staticFont.png";
import { DashHeader, BackButton, BackImg, Statistics } from "../../styles/dashStyles";

function CarbonDashHeader() {
  const navigate = useNavigate();

  return (
    <DashHeader>
      <BackButton onClick={() => navigate("/cumulative-ranking")}>
        <BackImg src={BackToPage} alt="뒤로가기버튼" />
      </BackButton>
      <Statistics as="img" src={StaticFont} alt="통계 이미지" />
    </DashHeader>
  );
}

export default CarbonDashHeader;