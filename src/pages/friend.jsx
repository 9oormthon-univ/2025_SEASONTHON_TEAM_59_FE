import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import ThreeItemNav from "../components/ThreeItemNav.jsx";
import FreindItem from "../components/friendItem.jsx";

import MascotIdle from "../assets/mascot-idle.png";
import MascotSad from "../assets/mascot-embrassed.png";

import { getFriends, searchFriends, getFriendRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest } from "../api/friendApi.js";  // 업적 챌린지 API

// 가짜 친구 데이터 10개
const mockFriends = Array.from({ length: 10 }).map((_, i) => ({
  memberId: i + 1,
  nickname: `친구${i + 1}#12DV`,
  picture: "https://i.namu.wiki/i/VxdEKDNZCp9hAW5TU5-3MZTePLGSdlYKzEZUyVLDB-Cyo950Ee19yaOL8ayxgJzEfMYfzfLcRYuwkmKEs2cg0w.webp", // 기본 이미지 사용
  lastAccessedAt: new Date().toISOString(),
  level: Math.floor(Math.random() * 10) + 1,
  carbonReduction: Math.floor(Math.random() * 1000),
  avatarUrl: "https://storage.googleapis.com/image-gcs/leafup/avatar/%E1%84%85%E1%85%B5%E1%84%91%E1%85%B3_%E1%84%80%E1%85%B5%E1%84%87%E1%85%A9%E1%86%AB.gif",
  achievements: [{ id: 1, name: "새싹", description: "회원가입 후 첫 챌린지 승인 완료" },
        { id: 2, name: "개척자 I", description: "스테이지 참여 누적 5회 달성" },],
}));

// 친구 데이터 없음 예시
const noFriends = [];

export default function Friend() {
    const items = [
        { label: "친구 목록" },
        { label: "친구 찾기" },
        { label: "요청 확인" },
      ];
    const [selectedTab, setSelectedTab] = useState("친구 목록");

    const [friends, setFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    {/* 로딩처리 상태들 */}
    const [searchLoading, setSearchLoading] = useState(false);
    const [requestLoadingId, setRequestLoadingId] = useState(null); // 친구요청 중인 friendId
    const [actionLoadingId, setActionLoadingId] = useState(null); // 수락/거절 중인 friendId
    const [pokeLoadingId, setPokeLoadingId] = useState(null); // 찌르기 중인 friendId


    // 탭별 데이터 불러오기
    useEffect(() => {
      if (selectedTab === "친구 목록") {
        fetchFriendList();
      } else if (selectedTab === "요청 확인") {
        fetchFriendRequests();
      }
    }, [selectedTab]);

    // 친구 목록 조회
    const fetchFriendList = async () => {
      try {
        const data = await getFriends();
        setFriends(data);
      } catch (err) {
        alert(err.message || "친구 목록 조회 실패");
        setFriends([]);
      }
    };

    // 친구 요청 조회
    const fetchFriendRequests = async () => {
      try {
        const data = await getFriendRequests();
        setFriendRequests(data);
      } catch (err) {
        setFriendRequests([]);
      }
    };

    // 친구 검색
    const handleSearch = async () => {
      if (!searchQuery.trim()) return alert("검색어를 입력하세요!");
      setSearchLoading(true);
      try {
        const result = await searchFriends(searchQuery);
        if (result) {
          setSearchResults([result]); // 단일 객체를 배열로 감싸기
        } else {
          setSearchResults([]);       // 검색 결과 없음 처리
        }
      } catch (err) {
        // searchFriends에서 던진 메시지 사용
        alert(err.message || "검색 중 오류 발생");
      } finally {
        setSearchLoading(false);
      }
    };

    // 친구 요청
    const handleSendRequest = async (f) => {
      setRequestLoadingId(f.memberId);
      try {
        await sendFriendRequest(f.nickname);
        alert(`${f.nickname}님에게 요청 보냄`);
      } catch (err) {
        console.error("요청 실패:", err);
        alert(err.message || "요청 실패");
      } finally {
        setRequestLoadingId(null);
      }
    };

    // 친구 요청 수락 / 거절
    const handleAction = async (f, type) => {
      setActionLoadingId(f.memberId);
      try {
        if (type === "accept") {
          await acceptFriendRequest(f.memberId);
          alert(`${f.nickname}님 요청 수락`);
        } else {
          await rejectFriendRequest(f.memberId);
          alert(`${f.nickname}님 요청 거절`);
        }
        await fetchFriendRequests();
      } catch (err) {
        console.error("처리 실패:", err);
        alert(err.message || "처리 실패");
      } finally {
        setActionLoadingId(null);
      }
    };

    // 찌르기
    const handlePoke = async (f) => {
      setPokeLoadingId(f.memberId);
      try {
        // TODO: pokeFriend API 연동 시 교체
        await new Promise((r) => setTimeout(r, 1000)); // 임시 대기
        alert(`${f.nickname}님을 찔렀어요!`);
      } catch (err) {
        console.error("찌르기 실패:", err);
        alert(err.message || "찌르기 실패");
      } finally {
        setPokeLoadingId(null);
      }
    };





    //TODO: 1. 친구목록만 처음에 불러오고, 다른 것들은 버튼 눌렀을때 불러오기
    //      2. 친구목록 API 연동
    //      3. 친구요청 API 연동
    //      4. 친구검색 API 연동
    //      5. 친구 찌르기 API 연동

    return (
        <Container>
            <Header/>
            <Content>
              <ThreeItemNav items={items} onSelect={setSelectedTab} />

              {/* 공통 스크롤 영역 */}
              <TabContentArea>

                {selectedTab === "친구 목록" && (
                  <div style={{ position: "relative", flex: 1 }}>
                    <MascotBg 
                      src={friends.length === 0 ? MascotSad : MascotIdle} 
                      alt="마스코트" 
                    />
                    {friends.length === 0 ? (
                      <ErrorText>친구 없음</ErrorText>
                    ) : (
                      friends.map((friend) => (
                        <FreindItem
                          key={friend.memberId}
                          friend={friend}
                          onPoke={() => handlePoke(friend)}
                          buttonText={
                            pokeLoadingId === friend.memberId ? "..." : "찌르기"
                          }
                          disabled={pokeLoadingId === friend.memberId}
                        />
                      ))
                    )}
                  </div>
                )}

                {selectedTab === "친구 찾기" && (
                <SearchWrapper>
                  {/* 검색결과 유무에 따라 마스코트 이미지 변경 */}
                  <MascotBg 
                    src={searchResults.length > 0 ? MascotIdle : MascotSad} 
                    alt="마스코트" 
                  />
                  {searchResults.length === 0 && (
                    <ErrorText>검색 결과 없음</ErrorText>
                  )}
                  
                  <SearchAreaWrapper>
                    <SearchInput 
                      placeholder="닉네임+친구코드로 검색..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchButton onClick={handleSearch}>
                      <SearchButtonText>
                        {searchLoading ? "검색 중..." : "검색"}
                      </SearchButtonText>
                    </SearchButton>
                  </SearchAreaWrapper>

                  <SearchResultArea>
                    {searchResults.map((friend) => (
                      <FreindItem
                        key={friend.memberId}
                        friend={friend}
                        onPoke={() => handleSendRequest(friend)}
                        buttonText={
                          requestLoadingId === friend.memberId ? "요청 중" : "요청"
                        }
                        disabled={requestLoadingId === friend.memberId}
                      />
                    ))}
                  </SearchResultArea>
                </SearchWrapper>
                )}

                {selectedTab === "요청 확인" && (
                  <div style={{ position: "relative", flex: 1 }}>
                    <MascotBg 
                      src={friendRequests.length === 0 ? MascotSad : MascotIdle} 
                      alt="마스코트" 
                    />
                    {friendRequests.length === 0 ? (
                      <ErrorText>요청 없음</ErrorText>
                    ) : (
                      friendRequests.map((friend) => (
                        <FreindItem
                          key={friend.memberId}
                          friend={friend}
                          buttons={[
                            {
                              label:
                                actionLoadingId === friend.memberId ? "처리 중..." : "수락",
                              onClick: () => handleAction(friend, "accept"),
                              disabled: actionLoadingId === friend.memberId,
                            },
                            {
                              label:
                                actionLoadingId === friend.memberId ? "처리 중..." : "거절",
                              onClick: () => handleAction(friend, "reject"),
                              disabled: actionLoadingId === friend.memberId,
                            },
                          ]}
                        />
                      ))
                    )}
                  </div>
                )}
              </TabContentArea>
                
            </Content>
            <Footer />
        </Container>
    );
}

// Styled Components 생략 (기존 코드 그대로)
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    background: #382C28;
`;

const Content = styled.div`
  padding-top: 65px;
  padding-bottom: 40px;
  margin-top: 90px;
  margin-bottom: 40px;
  display: flex;
  flex: 1;
  flex-direction: column;

    /* 스크롤바 커스텀: 배경 변하는 효과 제거 */
    &::-webkit-scrollbar {
        width: 8px;
        background: transparent; /* 흰색 배경 대신 투명 */
    }
`;

const TabContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #382C28;
`;

const SearchAreaWrapper = styled.div`
  flex-shrink: 0;       /* 고정 높이 */
  display: flex;
  justify-content: center;
  z-index: 10;
  gap: 4px;
`;

const SearchResultArea = styled.div`
  flex: 1;              /* 남은 공간 전부 차지 */
  overflow-y: auto;     /* 스크롤 가능 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;

const MascotBg = styled.img`
  position: absolute;
  width: 200px;
  height: auto;
  opacity: 0.1;
  pointer-events: none;
  top: 65px;
  left: 94px;
`;

const ErrorText = styled.div`
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  color: #5C4D49;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const SearchInput = styled.input`
  width: 292px;
  height: 51px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 2px solid #B29E99;
  background: linear-gradient(180deg, #FFF8E8 0%, #FFF8E8 100%);
  padding: 0 10px;
  font-size: 16px;
  font-family: "SUITE Variable";

  &::placeholder {
    color: #B29E99;
  }

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 77px;
  height: 51px;
  flex-shrink: 0;
  border: none;
  border-radius: 3px;
  background: linear-gradient(180deg, #5C4D49 0%, #463733 100%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const SearchButtonText = styled.span`
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  pointer-events: none; /* 텍스트 클릭시 이벤트는 버튼이 받도록 */

  text-align: center;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #281900;
`;