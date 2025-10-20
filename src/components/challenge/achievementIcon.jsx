// Achievement.jsx
import styled from "styled-components";

import Brown from "../../assets/achievement/achieveBrown.png";
import Purple from "../../assets/achievement/achievePurple.png";
import Silver from "../../assets/achievement/achieveSilver.png";

import Gardner from "../../assets/achievement/Icon-gardner.png";
import Pioneer from "../../assets/achievement/Icon-pioneer1.png";
import Beginner from "../../assets/achievement/Icon-beginner.png";
import Collector from "../../assets/achievement/Icon-collector.png";
import TreasureHunter from "../../assets/achievement/Icon-treasureHunter.png";

// 업적 타입별 이미지 매핑
const achievementImages = {
  seed: Brown,
  pioneer: Silver,
  leafCollector: Purple,
};

// 칭호 스타일 매핑
const titleStyles = {
  seed: { color: "#FFECBF" },
  pioneer: { color: "#898989" },
  leafCollector: { color: "#3F416E" },
};

export default function AchievementIcon({ achievement, iconSize, titleSize }) {
  const iSize = iconSize ?? 61;
  const bSize = iconSize ? 70 : 100;
  const tSize = titleSize ?? 8;

  // null 체크
  if (!achievement || !achievement.name) {
    return (
      <AchievementWrapper>
        <EmptyAchievement $size={iSize} />
      </AchievementWrapper>
    );
  }

  // 업적 타입 결정
  let type = "seed";
  if (achievement.name.includes("개척자")) type = "pioneer";
  else if (achievement.name.includes("리프 콜렉터")) type = "leafCollector";

  // 업적 아이콘 결정
  let icon = Beginner;
  if (achievement.name.includes("개척자")) icon = Pioneer;
  else if (achievement.name.includes("정원사")) icon = Gardner;
  else if (achievement.name.includes("리프 콜렉터")) icon = Collector;
  else if (achievement.name.includes("보물 사냥꾼")) icon = TreasureHunter;

  return (
    <AchievementWrapper>
      <Icon src={icon} alt={achievement.name} $size={iSize} />

      <ImageWrapper $size={tSize}>
        <Image src={achievementImages[type]} alt={achievement.name} $size={bSize} />
        <BadgeTitle $type={type} $size={tSize}>
          {achievement.name}
        </BadgeTitle>
      </ImageWrapper>
    </AchievementWrapper>
  );
}

/* ---------------- styled-components ---------------- */

const AchievementWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Icon = styled.img`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 3px solid #382C28;
  object-fit: cover;
`;

const EmptyAchievement = styled.div`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 3px solid #382C28;
  background: #5C4D49;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 65%;
  left: ${({$size}) => $size == 8 ? '6%' : '15%'};
  width: 50px;
  height: 22px;
`;

const Image = styled.img`
  width: ${({ $size }) => $size}%;
  height: ${({ $size }) => $size}%;
  object-fit: contain;
`;

const BadgeTitle = styled.div`
  position: absolute;
  top: ${({$size}) => $size == 8 ? '-6%' : '-16%'};
  left: ${({$size}) => $size == 8 ? '0%' : '-13%'};
  width: 100%;
  text-align: center;

  font-family: "SUITE Variable";
  font-size: ${({ $size }) => $size}px;
  font-style: normal;
  font-weight: 800;
  line-height: 22px; /* 275% */
  letter-spacing: -0.408px;

  color: ${({ $type }) => titleStyles[$type].color};
`;
