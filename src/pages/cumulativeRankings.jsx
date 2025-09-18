import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/rank/rankHeader.jsx";
import Nav from "../components/rank/rankNav";
import RankingItem from "../components/rank/rankItem";
import { getTotalRanking, getMyTotalRanking } from "../api/rankingApi";
import ProfileImg from "../assets/defaultProfile.png";
import { AppContainer, RankingList, ScrollGap } from "../styles/AppStyles.js";
import Footer from "../components/footer";
import { theme } from "../styles/variables";

// Styled component for LoadingText
const LoadingText = styled.div`
  white-space: nowrap;
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

function Ranking() {
  const [totalRankings, setTotalRankings] = useState([]);
  const [myRanking, setMyRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 전체 랭킹 데이터 가져오기
  const loadTotalRanking = async () => {
    try {
      setLoading(true);
      const data = await getTotalRanking();
      console.log("전체 누적 포인트 랭킹 데이터:", data);
      if (data.statusCode === 200) {
        setTotalRankings(data.data.rankings || []);
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

  // 내 랭킹 데이터 가져오기 (Header용)
  const loadMyTotalRanking = async () => {
    try {
      const data = await getMyTotalRanking();
      console.log("나의 전체 누적 포인트 랭킹 데이터:", data);
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
    Promise.all([loadTotalRanking(), loadMyTotalRanking()]).finally(() => {
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
        point={myRanking?.score ? `${myRanking.score}P` : "0P"}
        profileImageUrl={myRanking?.profileImageUrl ?? ProfileImg}
      />
      <Nav />
      <RankingList as={ScrollGap}>
        {totalRankings.length > 0 ? (
          totalRankings.map((user) => (
            <RankingItem
              key={user.rank}
              rank={user.rank}
              nickName={user.nickname}
              point={`${user.score}P`}
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

export default Ranking;