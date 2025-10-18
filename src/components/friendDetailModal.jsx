// src/components/FriendDetailModal.jsx
import React from "react";
import styled from "styled-components";

import AchievementIcon from "./challenge/achievementIcon";

import Stage from "../assets/stage-complete.png";
import CarbonBox from "../assets/nav-button.png"; 

export default function FriendDetailModal({ friend, onClose }) {
  // 최근 업적 3개 선택 (없으면 null로 채우기)
  const recentAchievements = (friend.achievements || [])
    .slice(0, 3);
  while (recentAchievements.length < 3) {
    recentAchievements.push(null);
  }


  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <LeftSection>
          {/* 왼쪽: 친구 아바타나 프로필 사진 들어갈 자리 */}
          <StageImg src={Stage} alt="스테이지" />
          <LeafCharacterImg src={friend.avatarUrl} alt="친구 아바타" />
        </LeftSection>

        <RightSection>
          {/* 오른쪽: 친구 정보 (닉네임, 레벨, 상태 등) 들어갈 자리 */}
          <NameArea>
            <LevelText>Lv.{friend.level}</LevelText>
            <NickName>{friend.nickname}</NickName>
          </NameArea>
          <ProfileArea>
            <ProfileBg />
            <ProfileImg src={friend.picture} alt="프로필" />
          </ProfileArea>

          {/* ✅ 최근 업적 3개 영역 */}
          <AchievementsWrapper>
            {recentAchievements.map((a, i) => (
              <AchievementIcon key={i} achievement={a} iconSize={51} titleSize={6} />
            ))}
          </AchievementsWrapper>

          {/* ✅ 탄소 저감량 박스 */}
          <CarbonBoxWrapper>
            <CarbonBoxImg src={CarbonBox} alt="탄소 저감량" />
            <CarbonTextTop>총 탄소감축량</CarbonTextTop>
            <CarbonTextBottom>{friend.carbonReduction}kgCO₂eq</CarbonTextBottom>
          </CarbonBoxWrapper>

          {/* ✅ 확인 버튼 */}
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </RightSection>
      </ModalBox>
    </Overlay>
  );
}

/* ---------------- styled-components ---------------- */

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 334.414px;
  height: 208px;
  border-radius: 2.69px;
  border: 4.483px solid #382c28;
  background: #382c28;
  box-shadow: 0 3.586px 0 0 #382c28;
  overflow: hidden;
`;

const LeftSection = styled.div`
  flex: 1;
  background: linear-gradient(180deg, #43714f 0%, #92c39d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.5px;
  position:relative;
`;

const LeafCharacterImg = styled.img`
  width: 128px;
  height: 151px;
  z-index: 5;
  position: absolute;
  top: 12px;
`;

const StageImg = styled.img`
  width: 137px;
  height: 112px;
  position: absolute;
  top: 40%;
  left: 10%;
`;

const RightSection = styled.div`
  flex: 1;
  background: #382c28;
  display: flex;
  flex-direction: column;
  border-radius: 2.5px;
  position: relative;
`;

const NameArea = styled.div`
  width: 169.448px;
  height: 51px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-radius: 0 2.69px 2.69px 2.69px;
  background: linear-gradient(180deg, #5C4D49 0%, #463733 100%);
  
  margin-bottom: 5px;
`;

const LevelText = styled.span`
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #281900;
  font-family: "Titan One";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 110% */
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left:30px;
`;

const NickName = styled.span`
  color: #FFECBF;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.408px;
  margin-left:40px;
`;

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileBg = styled.div`
  position: absolute;
  top: 0px;
  left: -30px;
  width: 53px;
  height: 53px;
  flex-shrink: 0;
  border-radius: 53.115px;
  border: 3px solid #382C28;
  background: #5C4D49;
`;

const ProfileImg = styled.img`
  position: absolute;
  top: 6px;
  left: -24px;
  width: 41.637px;
  height: 41.637px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
`;

const AchievementsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CarbonBoxWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const CarbonBoxImg = styled.img`
  width: 143px;
  height: 35.245px;
`;

const CarbonTextTop = styled.span`
  position: absolute;
  top: 5px;
  font-family: "SUITE Variable";
  font-size: 8px;
  font-weight: 700;
  color: #fff8e8;
  opacity: 0.8;
`;

const CarbonTextBottom = styled.span`
  position: absolute;
  top: 16px;
  font-family: "SUITE Variable";
  font-size: 10px;
  font-weight: 800;
  color: #fff8e8;
`;

const ConfirmButton = styled.button`
  position: relative;
  width: 170px;
  height: 42px;
  margin-top: 12px;
  border: none;
  cursor: pointer;
  border-radius: 3px;

  /* 버튼 배경 */
  background: linear-gradient(180deg, #5c4d49 0%, #463733 100%);

  /* 텍스트 스타일 */
  font-family: "Maplestory OTF";
  font-size: 16px;
  font-weight: 700;
  line-height: 42px;
  text-align: center;
  color: transparent;
  -webkit-text-stroke: 1px #281900;

  /* 텍스트 그라데이션 전용 */
  &::before {
    content: "확인";
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #ffe8b3 0%, #ffc870 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    pointer-events: none;
  }
`;