import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TopNavSection,
  TopNavContainer,
  ButtonContainer,
  ClickedButton,
  NonClickButton,
  ClickedFont,
  NonClickFont,
} from "../../styles/topNavStyles";

function NavSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveButton = () => {
    if (location.pathname === "/regional-ranking") return "regional";
    if (location.pathname === "/cumulative-ranking") return "cumulative";
    if (location.pathname === "/streak-ranking") return "streak";
    return "cumulative"; // 기본값
  };

  const activeButton = getActiveButton();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <TopNavSection>
      <TopNavContainer>
        <ButtonContainer>
          {activeButton === "regional" ? (
            <ClickedButton onClick={() => handleClick("/regional-ranking")}>
              <ClickedFont>월간 지역 랭킹</ClickedFont>
            </ClickedButton>
          ) : (
            <NonClickButton onClick={() => handleClick("/regional-ranking")}>
              <NonClickFont>월간 지역 랭킹</NonClickFont>
            </NonClickButton>
          )}
        </ButtonContainer>
        <ButtonContainer>
          {activeButton === "cumulative" ? (
            <ClickedButton onClick={() => handleClick("/cumulative-ranking")}>
              <ClickedFont>누적 전체 랭킹</ClickedFont>
            </ClickedButton>
          ) : (
            <NonClickButton onClick={() => handleClick("/cumulative-ranking")}>
              <NonClickFont>누적 전체 랭킹</NonClickFont>
            </NonClickButton>
          )}
        </ButtonContainer>
        <ButtonContainer>
          {activeButton === "streak" ? (
            <ClickedButton onClick={() => handleClick("/streak-ranking")}>
              <ClickedFont>스트릭 전체 랭킹</ClickedFont>
            </ClickedButton>
          ) : (
            <NonClickButton onClick={() => handleClick("/streak-ranking")}>
              <NonClickFont>스트릭 전체 랭킹</NonClickFont>
            </NonClickButton>
          )}
        </ButtonContainer>
      </TopNavContainer>
    </TopNavSection>
  );
}

export default NavSection;