import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import HomeMenuButton from "../components/homeMenuBtn.jsx";
import { GuideModal, TileInfoModal, CompletionModal } from "../components";

import api from "../api.js";

// Assets
import moveToStage from "../assets/move-to-stage.svg";
import mascotIdle from "../assets/mascot-idle.svg";
import mascotHappy from "../assets/mascot-happy.svg";
import mascotEmbarrassed from "../assets/mascot-embrassed.svg";
import farmEmpty from "../assets/farm-empty.svg";
import farmPlanted from "../assets/farm-beginning.svg";
import farmGrowing from "../assets/farm-grow.svg";
import farmDone from "../assets/farm-muture.svg";
import farmComplete from "../assets/farm-get.svg";
import farmLocked from "../assets/farm-fail.svg";
import iconInfo from "../assets/icon-info.svg";

/* ===== 상수/맵 ===== */
const TILE_BY_STATUS = {
  empty: farmEmpty,
  plant: farmPlanted,
  growing: farmGrowing,
  done: farmDone,
  get: farmComplete,
  locked: farmLocked,
};

const MASCOT_BY_STATUS = {
  idle: mascotIdle,
  happy: mascotHappy,
  embarrassed: mascotEmbarrassed,
};

// API challengeId ↔ 내부 id 매핑 (필요 시 서버 값에 맞게 보정)
const CHALLENGE_ID_MAP = {
  1: "tumbler",
  2: "recycling",
  3: "plogging",
  4: "public_transport",
  5: "energy_saving",
  6: "eco_shopping",
  7: "paper_saving",
  8: "water_saving",
  9: "bike_walking",
};

const CHALLENGE_TYPES = [
  { id: "tumbler", name: "텀블러 사용", icon: "🥤" },
  { id: "recycling", name: "분리수거", icon: "♻️" },
  { id: "plogging", name: "플로깅", icon: "🏃‍♀️" },
  { id: "public_transport", name: "대중교통 이용", icon: "🚌" },
  { id: "energy_saving", name: "에너지 절약", icon: "💡" },
  { id: "eco_shopping", name: "친환경 제품 구매", icon: "🛒" },
  { id: "paper_saving", name: "종이 절약", icon: "📄" },
  { id: "water_saving", name: "물 절약", icon: "💧" },
  { id: "bike_walking", name: "자전거/도보", icon: "🚲" },
];

/* ===== 유틸 ===== */
const getWeekProgress = (completedChallenges) => {
  const uniqueTypes = new Set(completedChallenges.map((c) => c.type));
  return {
    completed: uniqueTypes.size,
    total: 9,
    isComplete: uniqueTypes.size === 9,
    completedTypes: Array.from(uniqueTypes),
  };
};

// API 응답 → 내부 completedChallenges로 매핑 (타일 인덱스는 서버가 안 주므로 0~8 순서 부여)
function mapApiToCompleted(apiCompleted) {
  const now = new Date().toISOString();
  return (apiCompleted || [])
    .slice(0, 9)
    .map((row, idx) => ({
      type: CHALLENGE_ID_MAP[row.challengeId] ?? null,
      completedAt: now,
      tileIndex: idx,
    }))
    .filter((c) => !!c.type);
}

/* ===== 컴포넌트 ===== */
export default function HomeFarm() {
  const navigate = useNavigate();

  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [weeklyMeta, setWeeklyMeta] = useState({ year: null, weekOfYear: null });

  const [selectedTile, setSelectedTile] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isWeekEnd, setIsWeekEnd] = useState(false);
  const [isGuideOpen, setGuideOpen] = useState(false);
  const [growingTiles, setGrowingTiles] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(true); // 비로그인 시에도 기본 마스코트 노출

  // 주간 현황 조회
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/v1/garden/weekly"); // 인터셉터로 토큰 자동
        const data = res.data?.data || {};
        setCompletedChallenges(mapApiToCompleted(data.completedChallenges));
        setWeeklyMeta({
          year: data.year ?? null,
          weekOfYear: data.weekOfYear ?? null,
        });
        setIsAuthed(true);
      } catch (err) {
        if (err?.response?.status === 401) {
          // 비로그인: 기본 마스코트/빈 텃밭 유지
          setIsAuthed(false);
        }
        console.error("주간 텃밭 현황 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const weekProgress = getWeekProgress(completedChallenges);

  // 마스코트 상태 (비로그인이어도 기본 idle 노출)
  const getMascotStatus = () =>
    isWeekEnd ? (weekProgress.isComplete ? "happy" : "embarrassed") : "idle";

  // 각 타일 상태
  const getTileStatus = (index) =>
    completedChallenges.find((c) => c.tileIndex === index)
      ? isWeekEnd && !weekProgress.isComplete
        ? "locked"
        : "growing"
      : "empty";

  // 타일 클릭 → 카드 모달
  const handleTileClick = (index) => {
    const challenge = completedChallenges.find((c) => c.tileIndex === index);
    setSelectedTile(
      challenge
        ? {
            index,
            challenge: CHALLENGE_TYPES.find((t) => t.id === challenge.type),
            completedAt: challenge.completedAt,
            isEmpty: false,
          }
        : { index, challenge: null, completedAt: null, isEmpty: true }
    );
  };

  const goStage = () => navigate("/home-stage");
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goStage();
    }
  };

  /* ===== 렌더 ===== */
  return (
    <Container>
      <Header points={100} maxPoints={200} />

      <Content>
        {/* 오른쪽 고정 메뉴 (home-stage와 동일) */}
        <MenuContainer>
          <HomeMenuButton type="location" onClick={() => console.log("위치")} />
          <HomeMenuButton type="community" onClick={() => console.log("커뮤니티")} />
          <HomeMenuButton type="setting" onClick={() => console.log("셋팅")} />
        </MenuContainer>

        {/* 필요하면 보상바도 동일 구조로 배치 가능
        <RewardBarContainer>
          <RewardBar completedCount={weekProgress.completed} />
        </RewardBarContainer> */}

        {/* 본문 컨텐츠 */}
        <Canvas>
          <Mascot
            src={MASCOT_BY_STATUS[getMascotStatus()]}
            alt="마스코트"
            draggable={false}
          />

          <FarmArea>
            <FarmStack aria-label="나의 텃밭 겹침 그리드">
              {Array(9)
                .fill(null)
                .map((_, i) => {
                  const r = Math.floor(i / 3);
                  const c = i % 3;
                  const status = getTileStatus(i);
                  const src = TILE_BY_STATUS[status] ?? farmEmpty;
                  const challenge = completedChallenges.find(
                    (ch) => ch.tileIndex === i
                  );
                  return (
                    <ClickableTile
                      key={i}
                      src={src}
                      alt={
                        challenge
                          ? `${
                              CHALLENGE_TYPES.find(
                                (t) => t.id === challenge.type
                              )?.name
                            } 완료`
                          : "빈 텃밭"
                      }
                      style={{ "--row": r, "--col": c }}
                      draggable={false}
                      onClick={() => handleTileClick(i)}
                      $hasChallenge={!!challenge}
                      $isGrowing={growingTiles.has(i)}
                    />
                  );
                })}
            </FarmStack>

            {/* 텃밭 라벨 */}
            <FarmLabel>
              <InfoIcon
                src={iconInfo}
                alt="텃밭 가이드 열기"
                role="button"
                tabIndex={0}
                onClick={() => setGuideOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setGuideOpen(true);
                  }
                }}
              />
              <LabelWrapper>
                <Stroke>
                  {weeklyMeta.weekOfYear
                    ? `${weeklyMeta.year} ${weeklyMeta.weekOfYear}주차 텃밭`
                    : "9월 1주차 텃밭"}
                </Stroke>
                <Fill>
                  {weeklyMeta.weekOfYear
                    ? `${weeklyMeta.year} ${weeklyMeta.weekOfYear}주차 텃밭`
                    : "9월 1주차 텃밭"}
                </Fill>
                <Fill2>
                  {weeklyMeta.weekOfYear
                    ? `${weeklyMeta.year} ${weeklyMeta.weekOfYear}주차 텃밭`
                    : "9월 1주차 텃밭"}
                </Fill2>
              </LabelWrapper>
            </FarmLabel>
          </FarmArea>

          {/* 스테이지로 이동 버튼 */}
          <StageButton
            src={moveToStage}
            alt="스테이지로 가기"
            role="link"
            tabIndex={0}
            onClick={goStage}
            onKeyDown={onKey}
            draggable={false}
          />
        </Canvas>

        {/* 모달들 */}
        {selectedTile && (
          <TileInfoModal tile={selectedTile} onClose={() => setSelectedTile(null)} />
        )}
        {showCompletionModal && (
          <CompletionModal
            isSuccess={getWeekProgress(completedChallenges).isComplete}
            onClose={() => setShowCompletionModal(false)}
          />
        )}
        {isGuideOpen && <GuideModal onClose={() => setGuideOpen(false)} />}
      </Content>

      <Footer />
    </Container>
  );
}

/* ===== home-stage와 동일 레이아웃 ===== */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh; /* 스크롤 방지 기반 */
  background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
`;

const Content = styled.div`
  height: calc(100vh - 97px);   /* HeaderBar 높이만큼 뺌 (home-stage와 동일) */
  padding: 140px 7px 20px;      /* 동일한 상단 패딩 */
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  overflow: hidden;             /* 스크롤 방지 */
`;

const MenuContainer = styled.div`
  position: fixed;
  right: 10px;
  top: 20%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const Canvas = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Mascot = styled.img`
  width: 179px;
  height: 212px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const FarmArea = styled.div`
  position: relative;
  --tile-w: 98px;
  --tile-h: 113px;
  --overlap-x: 24px;
  --overlap-y: 39px;

  width: calc(3 * var(--tile-w) - 2 * var(--overlap-x));
  height: calc(3 * var(--tile-h) - 2 * var(--overlap-y));
  margin-top: 0%;
`;

const FarmStack = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: auto;
`;

const ClickableTile = styled.img`
  position: absolute;
  width: var(--tile-w);
  height: var(--tile-h);
  left: calc(var(--col) * (var(--tile-w) - var(--overlap-x)));
  top: calc(var(--row) * (var(--tile-h) - var(--overlap-y)));
  object-fit: contain;
  display: block;
  user-select: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center bottom;
  filter: ${(p) => (p.$hasChallenge ? "none" : "grayscale(0.3)")};
  z-index: ${(p) => (p.$hasChallenge ? "5" : "1")};

  &:hover {
    ${(p) =>
      p.$hasChallenge
        ? `
      transform: scale(1.08) translateY(-2px);
      filter: brightness(1.1) saturate(1.2);
      z-index: 10;
      box-shadow: 0 8px 16px rgba(0,0,0,.2);
    `
        : `
      transform: scale(1.03) translateY(-1px);
      filter: brightness(1.05) grayscale(0.1);
      z-index: 5;
    `}
  }

  &:active {
    transform: scale(0.98) translateY(1px);
    transition: all 0.1s ease;
  }
`;

const FarmLabel = styled.div`
  position: absolute;
  left: 50%;
  top: calc(100% - 12px);
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  pointer-events: auto;
  z-index: 30;
  white-space: nowrap;
`;

const InfoIcon = styled.img`
  width: 24px;
  height: 24px;
  display: block;
  cursor: pointer;
`;

const StageButton = styled.img`
  width: 85px;
  height: 70px;
  cursor: pointer;
  user-select: none;
  margin-left: 70%;
  margin-top: -7%;
  margin-bottom: 20%;
  z-index: 50;
  transition: transform 0.2s ease;
  &:hover { transform: scale(1.05); }
  &:active { transform: scale(0.95); }
`;

/* 라벨 텍스트 그라데이션/외곽선 */
const LabelWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
const Fill = styled.span`
  position: absolute;
  top: -1px;
  left: -1px;
  color: #281900;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-weight: 700;
  -webkit-text-stroke: 2px #281900;
  z-index: 0;
`;
const Stroke = styled.span`
  position: relative;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-weight: 700;
  z-index: 1;
`;
const Fill2 = styled.span`
  position: absolute;
  top: 2px;
  left: 0.5px;
  color: #281900;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-weight: 700;
  -webkit-text-stroke: 2px #281900;
  z-index: 0;
`;
