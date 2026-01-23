import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api.js";
import { useUser } from "../states/userContext";
import styled from "styled-components";

export default function GoogleAuth() {
  const provider = "google";
  const [searchParams] = useSearchParams();
  const loadingMessage = "구글 로그인 중...";
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const processedRef = useRef(false);

  useEffect(() => {
    // 1. 중복 실행 방지 가드
    if (processedRef.current) return;

    const code = searchParams.get("code");
    if (!code) {
      alert("인가 코드가 존재하지 않습니다.");
      navigate("/login");
      return;
    }

    processedRef.current = true;

    // 2. URL 파라미터 즉시 제거
    // +) searchParams를 의존성 배열에서 제거
    window.history.replaceState({}, null, window.location.pathname);

    const fetchToken = async () => {
      try {
        const res = await api.get(
          `/v1/oauth2/callback/${provider}?code=${code}`
        );

        const { accessToken, refreshToken } = res.data.data.tokenDto;
        const memberInfo = res.data.data.memberInfoResDto;

        // 전역 상태 업데이트
        updateUser({
          nickname: memberInfo.nickname,
          picture: memberInfo.picture,
          avatarUrl: memberInfo.avatarUrl,
          level: memberInfo.level,
          exp: memberInfo.exp,
          point: memberInfo.point,
        });

        // 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // 닉네임 페이지로 이동
        navigate("/login/nick", { replace: true });
      } catch (err) {
        console.error("구글 로그인 에러:", err);
        alert("로그인 처리 중 오류가 발생했습니다.");
        navigate("/login", { replace: true });
      }
    };

    fetchToken();
    
    // 3. ✨ 의존성 배열에서 searchParams와 provider 제거
    // navigate와 updateUser만 남겨서 URL 변경에 의한 재실행을 원천 차단
  }, [navigate, updateUser]);

  return <LoginMessage>{loadingMessage}</LoginMessage>;
}

const LoginMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #382C28;
  text-align: center;
  font-family: "Maplestory OTF";
  font-size: 30px;
  font-weight: 700;
`;