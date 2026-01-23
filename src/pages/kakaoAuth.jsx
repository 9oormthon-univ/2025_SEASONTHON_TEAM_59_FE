import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api.js";
import { useUser } from "../states/userContext";
import styled from "styled-components";

export default function KakaoAuth() {
  const provider = "kakao";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const processedRef = useRef(false);

  useEffect(() => {
    // 1. 이미 처리 중이면 절대 다시 실행하지 않음
    if (processedRef.current) return;

    const code = searchParams.get("code");
    if (!code) return;

    processedRef.current = true;

    // 2. ✨ URL에서 즉시 코드 제거 (fetch 시작 전이나 직후에 실행)
    window.history.replaceState({}, null, window.location.pathname);

    const fetchToken = async () => {
      try {
        const res = await api.get(
          `/v1/oauth2/callback/${provider}?code=${code}`
        );

        const { accessToken, refreshToken } = res.data.data.tokenDto;
        const memberInfo = res.data.data.memberInfoResDto;

        // 전역 상태 및 로컬 스토리지 저장
        updateUser({
          nickname: memberInfo.nickname,
          picture: memberInfo.picture,
          avatarUrl: memberInfo.avatarUrl,
          level: memberInfo.level,
          exp: memberInfo.exp,
          point: memberInfo.point,
        });

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // 성공 시 페이지 이동
        navigate("/login/nick", { replace: true });
      } catch (err) {
        console.error("로그인 에러 상세:", err.response?.data || err.message);
        alert("로그인 처리 중 오류가 발생했습니다.");
        navigate("/login", { replace: true });
      }
      // finally 블록에서 processedRef.current = false를 제거하는 것이 더 안전합니다.
      // (페이지 이동 전까지 중복 요청을 완전히 막기 위함)
    };

    fetchToken();
    
    // ✨ [중요] 의존성 배열에서 searchParams를 반드시 제거하세요!
  }, [navigate, updateUser]); 

  return <LoginMessage>카카오 로그인 중...</LoginMessage>;
}

const LoginMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Maplestory OTF";
  font-size: 30px;
  font-weight: 700;
  color: #382C28;
`;