// src/pages/myPage.jsx
// TODO: 1) 옷장 API 연동한 데이터로 교체 및 setSelectedAvatar 처리
//       2) 장착하기(저장) API 연동
//       3) 캐릭터의 옷입히기 로직 수정 방안 논의 (현재는 avatarUrl 교체로만 처리되어 장신구나 스킨 등 동시적용 불가)

import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../states/userContext";

import VerifyTopBar from "../components/verifyTopBar";
import ShopTabBar from "../components/shop/ShopTabBar";

import CharacterCard from "../components/shop/CharacterCard";
import CharacterGrid from "../components/shop/CharacterGrid";

import Stage from "../assets/stage-complete.png";

import { getMyCloset } from "../api/closetApi.js";
import { equipAvatar } from "../api/shopApi.js";

const TABS = ["캐릭터", "캐릭터 스킨", "장신구", "펫", "열매", "스테이지 스킨"];

const FAKE_AVATARS = [
          {
            avatarId: 1,
            name: "리프",
            type: "캐릭터",
            avatarUrl: "https://storage.googleapis.com/image-gcs/leafup/avatar/%E1%84%85%E1%85%B5%E1%84%91%E1%85%B3_%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB.gif",
            isEquipped: true,
          },
          {
            avatarId: 2,
            name: "캐럿",
            type: "캐릭터",
            avatarUrl: "https://i.namu.wiki/i/VxdEKDNZCp9hAW5TU5-3MZTePLGSdlYKzEZUyVLDB-Cyo950Ee19yaOL8ayxgJzEfMYfzfLcRYuwkmKEs2cg0w.webp",
            isEquipped: false,
          },
          {
            avatarId: 3,
            name: "코코넛 스킨 A",
            type: "캐릭터 스킨",
            avatarUrl: "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2017%2F07%2Fgame-characters-pikachu.jpg?w=1260&cbr=1&q=90&fit=max",
            isEquipped: false,
          },
          {
            avatarId: 4,
            name: "코코넛 스킨 B",
            type: "캐릭터 스킨",
            avatarUrl: "https://storage.googleapis.com/image-gcs/leafup/avatar/%E1%84%87%E1%85%A1%E1%84%86%E1%85%B5_%E1%84%87%E1%85%A1%E1%84%87%E1%85%B6.gif",
            isEquipped: false,
          },
          {
            avatarId: 5,
            name: "리프 펫 A",
            type: "펫",
            avatarUrl: "https://storage.googleapis.com/image-gcs/leafup/avatar/%E1%84%85%E1%85%B5_petA.gif",
            isEquipped: false,
          },
          {
            avatarId: 6,
            name: "캐럿 장신구",
            type: "장신구",
            avatarUrl: "https://littledeep.com/wp-content/uploads/2019/04/littledeep_illustration_ribbon_style2.png",
            isEquipped: false,
          },
          {
            avatarId: 7,
            name: "리프 열매",
            type: "열매",
            avatarUrl: "https://storage.googleapis.com/image-gcs/leafup/avatar/%E1%84%85%E1%85%B5_fruit.gif",
            isEquipped: false,
          },
          {
            avatarId: 8,
            name: "스테이지 스킨 A",
            type: "스테이지 스킨",
            avatarUrl: "https://storage.googleapis.com/image-gcs/leafup/avatar/%E1%84%85%E1%85%B5_stageA.gif",
            isEquipped: false,
          },
        ];

export default function Closet() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user, fetchUser } = useUser();

  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [myItems, setMyItems] = useState([]); 
  const [equippedItemId, setEquippedItemId] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatarUrl); // 캐릭터 상태
  const [loading, setLoading] = useState(false); // 옷장 조회 로딩 상태
  const [purchaseLoading, setPurchaseLoading] = useState(false); // 구매 로딩 상태

  {/* 사용자 아바타 url 초기에 불러오기 */}
  useEffect(() => {
    if (user) {
      setSelectedAvatar(user.avatarUrl);
    }
  }, [user]);

  {/* 옷장 로드 */}
  useEffect(() => {
    async function fetchAvatars() {
      try {
        setLoading(true);

        const items = await getMyCloset();
        //const items = FAKE_AVATARS; ⭐️ 테스트용
        const equipped = items.find(it => it.isEquipped);

        if (equipped) {
          setEquippedItemId(equipped.avatarId);
          setSelectedAvatar(equipped.avatarUrl);
        }

        setMyItems(items);
      } catch (e) {
        console.error("옷장 불러오기 실패", e);
        setMyItems(FAKE_AVATARS);
      } finally {
        setLoading(false);
      }
    }

    fetchAvatars();
  }, []);


  {/* 아이템 클릭 시 */}
  const handleItemClick = (clickedItem) => {
    // 1) myItems 배열 갱신 (UI 반영)
    setMyItems(prev =>
      prev.map(item => ({
        ...item,
        isEquipped: item.avatarId === clickedItem.avatarId,
      }))
    );

    // 2) equippedItemId 갱신
    setEquippedItemId(clickedItem.avatarId);
    console.log("장착된 아이템:", clickedItem.avatarId);

    // 3) selectedAvatar 갱신 (캐릭터 화면)
    setSelectedAvatar(clickedItem.avatarUrl);
  };

  {/* 장착 저장 클릭 시 */}
  const handleSave = async (equippedItemId) => {
    setPurchaseLoading(true);
    try {
      const result = await equipAvatar(equippedItemId);
      console.log("장착 저장 ID:", equippedItemId);
      await fetchUser(); // 사용자 정보 갱신
      alert("장착이 저장되었습니다!");
    } catch (e) {
      console.error("장착 저장 실패:", e);
      alert(`장착 저장에 실패했습니다: ${e.message}`);
    } finally {
      setPurchaseLoading(false);
    }
  };
  

  return (
      <Container>
        <VerifyTopBar title={"옷장"} onBack={() => navigate("/my-page")} />
        <Content>
          {/* 리프업 캐릭터 */}
          <LeafCharacterContainer>
            <LeafCharacterImg src={selectedAvatar} alt="리프업 파트너" />
            <StageImg src={Stage} alt="스테이지 배경" />
          </LeafCharacterContainer>
          <CustomShopTabBarRoot>
            <ShopTabBar
              tabs={TABS}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </CustomShopTabBarRoot>
          {loading ? (
            <Placeholder>로딩 중...</Placeholder>
          ) : (
            renderTabContent(activeTab, myItems, (item) => {
              handleItemClick(item);
            })
          )}

          <SaveButton
            disabled={purchaseLoading}
            onClick={() => !purchaseLoading && handleSave(equippedItemId)}
          >
            {purchaseLoading ? "저장 중..." : "저장"}
          </SaveButton>
        </Content>
      </Container>
    );

};

/* ===== 탭 컨텐츠 렌더러 ===== */
function renderTabContent(activeTab, avatars, onClickItem) {
  const filtered = avatars.filter((it) => it.type === activeTab);
  if (filtered.length === 0) return <Placeholder>상품 준비 중</Placeholder>;

  return (
    <CharacterGrid>
      {filtered.map((it) => (
        <CharacterCard
          key={it.avatarId}
          name={it.name}
          image={it.avatarUrl}
          isEquipped={it.isEquipped}
          onClick={it.isOwned ? undefined : () => onClickItem(it)}
        />
      ))}
    </CharacterGrid>
  );
}

// Styled Components (변경 없음)
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #382C28;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  background: #5C4D49;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeafCharacterContainer = styled.div`
  background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
  width: 100%;
  height: 310px;
  position: relative;
`
const LeafCharacterImg = styled.img`
  width: 210px;
  height: 250px;
  z-index: 5;
  position: absolute;
  left: 21%;
`;

const StageImg = styled.img`
  width: 220px;
  height: 182px;
  position: absolute;
  top: 39%;
  left: 22%;
`;

const CustomShopTabBarRoot = styled.div`
  width: 100%;
  height: 75px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
  background: #261B18;
  padding: 0px 3px 0px 3px;
`;

const Placeholder = styled.div`
  display: grid;
  place-items: center;
  color: #281900;
  font-family: "Maplestory OTF";
  font-weight: 700;
  height: 200px;
`;

const SaveButton = styled.div`
  -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: #281900;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 22px; /* 110% */
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 30px;
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    -webkit-text-fill-color: #aaa;
    background: none;
  }
`;