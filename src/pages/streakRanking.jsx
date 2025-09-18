// src/pages/streakRanking.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/rank/rankStreakHeader";
import Nav from "../components/rank/rankNav";
import StreakRankingItem from "../components/rank/streakRankItem";
import { getStreakRanking, getMyStreakRanking } from "../api/rankingApi";
import ProfileImg from "../assets/defaultProfile.png";
import { AppContainer, RankingList, ScrollGap } from "../styles/AppStyles.js";
import Footer from "../components/footer";
import { theme } from "../styles/variables";

// Styled component for LoadingText
const LoadingText = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #281900;
  font-family: "Maplestory OTF";
  font-size: 40px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #ffe8b3 0%, #ffc870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Styled component for EmptyState
const EmptyState = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: ${theme.colors.text};
  font-family: "Maplestory OTF";
`;

function StreakRanking() {
  const [streakRankings, setStreakRankings] = useState([]);
  const [myRanking, setMyRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 스트릭 랭킹 데이터 가져오기
  const loadStreakRanking = async () => {
    try {
      setLoading(true);
      const data = await getStreakRanking();
      console.log("스트릭 랭킹 데이터:", data);
      if (data.statusCode === 200) {
        setStreakRankings(data.data.rankings || []);
      } else {
        setError(data.message || "랭킹 데이터를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 내 스트릭 랭킹 데이터 가져오기 (Header용)
  const loadMyStreakRanking = async () => {
    try {
      const data = await getMyStreakRanking();
      console.log("나의 스트릭 랭킹 데이터:", data);
      if (data.statusCode === 200) {
        setMyRanking(data.data);
      } else {
        console.error("API error:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    Promise.all([loadStreakRanking(), loadMyStreakRanking()]).finally(() => {
      setLoading(false);
    });
  }, []);

  // 로딩 및 에러 UI
  if (loading) {
    return (
      <LoadingText>
        불러오는 중<br />
        ...
      </LoadingText>
    );
  }
  if (error) {
    return <AppContainer>에러: {error}</AppContainer>;
  }

  return (
    <AppContainer>
      <Header
        rank={myRanking?.rank ?? "-"}
        nickName={myRanking?.nickname ?? "게스트"}
        score={myRanking?.streakDay ? `${myRanking.streakDay}일` : "0일"}
        profileImageUrl={myRanking?.profileImageUrl ?? ProfileImg}
      />
      <Nav />
      <RankingList as={ScrollGap}>
        {streakRankings.length > 0 ? (
          streakRankings.map((user) => (
            <StreakRankingItem
              key={user.rank}
              rank={user.rank}
              nickName={user.nickname}
              score={`${user.score}일`}
              profileImageUrl={user.profileImageUrl}
            />
          ))
        ) : (
          <EmptyState>랭킹 데이터가 없습니다.</EmptyState>
        )}
      </RankingList>
      <Footer />
    </AppContainer>
  );
}

export default StreakRanking;