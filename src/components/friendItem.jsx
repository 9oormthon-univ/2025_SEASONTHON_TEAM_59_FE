// src/components/FriendItem.jsx
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FriendDetailModal from "./friendDetailModal";

export default function FriendItem({ friend, onPoke, buttonText = "찌르기", buttons, disabled }) {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleClick = () => {
    setSelectedFriend(friend);
  };

  const handleCloseModal = () => {
    setSelectedFriend(null);
  };

  // 온라인 상태 계산
  const now = new Date();
  const last = new Date(friend.lastAccessedAt);
  const diffMs = now - last;
  const diffMin = Math.floor(diffMs / 1000 / 60);

  let isOnline = false;
  let statusText = "";

  if (diffMin < 5) {
    isOnline = true;
    statusText = "접속중";
  } else if (diffMin < 60) {
    statusText = `${diffMin}분 전`;
  } else if (diffMin < 60 * 24) {
    statusText = `${Math.floor(diffMin / 60)}시간 전`;
  } else {
    statusText = `${Math.floor(diffMin / (60 * 24))}일 전`;
  }


  return (
    <>
      <ItemWrapper onClick={handleClick}>
        {/* 왼쪽 갈색 박스 */}
        <LeftBox />

        {/* 프로필 이미지 배경 + 이미지 */}
        <ProfileArea>
          <ProfileBg />
          <ProfileImg src={friend.picture} alt="프로필" />
        </ProfileArea>

        {/* 레벨과 닉네임 */}
        <TextInfo>
          <LevelText>Lv.{friend.level}</LevelText>
          <NickName>{friend.nickname}</NickName>
        </TextInfo>

        {/* 오른쪽 온라인 상태 + 찌르기 버튼 */}
        <FriendExtra>
          <OnlineStatus $online={isOnline}>{statusText}</OnlineStatus>
          {/* 버튼 배열을 순회하며 렌더링 */}
          {buttons
            ? buttons.map((btn, idx) => (
                <PokeButton
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); btn.onClick(friend); }}
                  disabled={disabled}
                >
                  {btn.label}
                </PokeButton>
              ))
            : (
                <PokeButton onClick={(e) => { e.stopPropagation(); onPoke(friend); }} disabled={disabled}>
                  {buttonText}
                </PokeButton>
              )
          }
        </FriendExtra>
      </ItemWrapper>

      {selectedFriend && (
          <FriendDetailModal friend={selectedFriend} onClose={handleCloseModal} />
      )}
    </>
  );
}

/* ---------------- styled-components ---------------- */
const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 373.996px;
  height: 57px;
  border-radius: 3px;
  padding: 0px 15px 0px 0px;
  overflow: visible;
  border-radius: 3px;
  border-top: 2px solid #B29E99;
  border-right: 1px solid #B29E99;
  border-bottom: 1px solid #B29E99;
  border-left: 1px solid #B29E99;
  background: linear-gradient(180deg, #FFF8E8 0%, #FFF8E8 100%);
  margin: 2px auto;
  cursor: pointer;
`;

const LeftBox = styled.div`
  width: 60px;
  height: 57px;
  flex-shrink: 0;
  border-top: 2px solid #382c28;
  border-bottom: 1px solid #382c28;
  border-left: 1px solid #382c28;
  border-radius: 3px 0 0 3px;
  background: linear-gradient(180deg, #5c4d49 0%, #463733 100%);
`;

const ProfileArea = styled.div`
  margin-left: 35px;
`;

const ProfileBg = styled.div`
  position: absolute;
  left: 30px;
  top: -2px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #5c4d49;
  border: 3px solid #382c28;
`;

const ProfileImg = styled.img`
  position: absolute;
  top: 27px;
  left: 59px;
  transform: translate(-50%, -50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
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
`;

const NickName = styled.span`
  font-family: "SUITE Variable";
  font-size: 16px;
  font-weight: 800;
  color: #5c4d49;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.408px;
`;

const FriendExtra = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

const OnlineStatus = styled.span`
  font-family: "SUITE Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 22px; /* 183.333% */
  letter-spacing: -0.408px;
  color: ${({ $online }) => ($online ? "#7CB5A9" : "#b29e99")};
`;

const PokeButton = styled.button`
  width: 42px;
  height: 24px;
  flex-shrink: 0;
  font-family: "SUITE Variable";
  font-weight: 700;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #382C28;
  background: linear-gradient(180deg, #5C4D49 0%, #463733 100%);
  color: #FFF8E8; /* 글자색은 기존 대비 잘 보이는 색으로 설정 */
  cursor: pointer;
  filter: drop-shadow(0 2px 0 #382C28);

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: linear-gradient(180deg, #463733 0%, #5C4D49 100%);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;