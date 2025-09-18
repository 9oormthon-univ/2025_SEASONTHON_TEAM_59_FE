import React, { useEffect, useState } from "react";
import ProfileImg from "../../assets/defaultProfile.png";
import GraphImg from "../../assets/dashboard.png";
import rank1 from "../../assets/rank1.png";
import rank2 from "../../assets/rank2.png";
import rank3 from "../../assets/rank3.png";
import rank1Star from "../../assets/rank1-star.png";
import rank2Star from "../../assets/rank2-star.png";
import rank3Star from "../../assets/rank3-star.png";
import imgBox from "../../assets/IcnBox.png";
import { useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  HeaderBetween,
  MyRankingBoard,
  LeftContainer,
  ImgContainer,
  ProfileCon,
  ImgStyle,
  StarStyle,
  CenterContainer,
  NickNameStyle,
  DayStyle,
  GraphContainer,
  ImgBtn,
  GraphImgStyle,
  GradientNumber,
  RankStyleGold,
  RankStyleSilver,
  RankStyleBronze,
} from "../../styles/headerStyles";

function Header({ rank, nickName, score, profileImgUrl }) {
  const navigate = useNavigate();
  const rankComponent = rank === 1 ? RankStyleGold : rank === 2 ? RankStyleSilver : rank === 3 ? RankStyleBronze : GradientNumber;
  const iconBox = rank === 1 ? rank1 : rank === 2 ? rank2 : rank === 3 ? rank3 : imgBox;
  const rankStar = rank === 1 ? rank1Star : rank === 2 ? rank2Star : rank === 3 ? rank3Star : null;

  return (
    <HeaderContainer>
      <HeaderBetween>
        <MyRankingBoard>
          <LeftContainer>
            <rankComponent>{rank}</rankComponent>
          </LeftContainer>
          <ImgContainer>
            <ProfileCon src={iconBox} alt="프로필 테두리" />
            <ImgStyle src={profileImgUrl || ProfileImg} alt="프로필 이미지" />
            {rankStar && <StarStyle as="img" src={rankStar} alt="스타 이미지" />}
          </ImgContainer>
          <CenterContainer>
              <NickNameStyle>{nickName || "익명 사용자"}</NickNameStyle>
            <DayStyle>{score}</DayStyle>
          </CenterContainer>
        </MyRankingBoard>
        <GraphContainer>
          <ImgBtn onClick={() => navigate("/carbon-dashboard")}>
            <GraphImgStyle src={GraphImg} alt="그래프이미지" />
          </ImgBtn>
        </GraphContainer>
      </HeaderBetween>
    </HeaderContainer>
  );
}

export default Header;