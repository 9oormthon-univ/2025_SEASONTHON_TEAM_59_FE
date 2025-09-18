import styled from "styled-components";
import rankBgImage from "../assets/rank-bg.png"; // 이미지 임포트

export const RankingItemContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

export const ProfileCon = styled.div`
    // 변경: 전체 채우고 뒤로
    position: absolute;
    top: 0; // 추가: 컨테이너 상단부터
    left: 0; // 추가: 컨테이너 왼쪽부터
    width: 100%; // 추가: 컨테이너 풀 크기 (51px)
    height: 100%; // 추가: 컨테이너 풀 크기 (51px)
    z-index: 1; // 낮게: 뒤에 깔림 (테두리만 보이게)
    border-radius: 50%; // 원형 유지
`;

export const DayStyle = styled.span`
    font-family: "Maplestory OTF", system-ui, sans-serif;
    position: absolute;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    color: #ffe8b3;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(to bottom, #ffe8b3, #ffc870);
`;

export const RankingFrame = styled.div`
    min-height: 57px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 4px 26px 4px 8px;
    width: 360px;
    height: 57px;
    border-radius: 3px;
    background: linear-gradient(180deg, #fff8e8 0%, #fff8e8 100%);
    box-sizing: border-box;
`;
export const StarStyle = styled.div`
    position: absolute;
    bottom: -10px; // 추가: 컨테이너 아래 (또는 top: -10px 위로)
    left: 50%;
    transform: translateX(-50%); // 수평 중앙
    width: 36px;
    height: 19px;
    z-index: 999;
`;

export const Shadow = styled.div`
    width: 284px;
    height: 55px;
    align-items: center;
    display: flex;
    gap: 10px;
    box-shadow: -1px 0 0 #b29e99, 1px 0 0 #b29e99, 0 1px 0 #b29e99, 0 -2px 0 #b29e99;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    position: relative;
`;

export const RankContainer = styled.div`
    position: relative;
    width: 76px;
    height: 57px;
    background: url(${rankBgImage});
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ProfileImgContainer = styled.div`
    // 변경: relative로 자식 absolute 기준
    position: relative; // 핵심: absolute 자식들이 이 안에서 위치
    width: 51px;
    height: 51px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center; // flex로 중앙 유지 (absolute 덕에 보조)
    left: 50px; // UserInfo 안 위치
`;

export const ProfileImgStyle = styled.img`
    // 변경: 중앙 오버랩 강조
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // 중앙 정렬
    width: 40.8px; // 테두리 안쪽 크기 (테두리 두께 고려)
    height: 40.8px;
    border-radius: 50%;
    object-fit: cover;
    z-index: 2; // 높게: 앞으로 (프로필 사진 위에)
`;

export const RankStyle = styled.span`
    font-family: "Maplestory OTF", system-ui, sans-serif;
    position: absolute;
    text-align: center;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 25px;
    font-weight: 700;
    font-size: 24px;
    color: #ffe8b3;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: #281900;
    background-image: linear-gradient(to bottom, #ffe8b3, #ffc870);
    z-index: 10; /* 스타일 충돌 방지 */
`;

export const NickNameStyle = styled.span`
    color: #5c4d49;
    font-family: "SUITE Variable", system-ui, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 22px;
    letter-spacing: -0.408px;
    margin-left: 40px; /* ProfileImgContainer 너비(51px) + 여유분 */
    white-space: nowrap; /* 닉네임 한 줄 유지 */
    max-width: 100px;
`;

export const PointContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 57px;
    position: relative;
    width: 100%;
`;

export const PointStyles = styled.span`
    color: #7cb29e;
    text-shadow: 0 2px 0 #382c28;
    -webkit-text-stroke: 1px #000;
    font-family: "Maplestory OTF", system-ui, sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.408px;
    margin-right: 10px;
`;

export const LeafIconStyle = styled.img`
    width: 23px;
    height: 22px;
    object-fit: cover;
    margin-right: 10px;
    flex-shrink: 0;
`;

export const RankStyleGold = styled.span`
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: "Maplestory OTF", system-ui, sans-serif;
    font-size: 40px;
    color: #ffe8b3;
    background-image: linear-gradient(to bottom, #ff9e87, #d92620);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 10; /* 스타일 충돌 방지 */
`;

export const RankStyleSilver = styled.span`
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: "Maplestory OTF", system-ui, sans-serif;
    font-size: 36px;
    color: #ffe8b3;
    background-image: linear-gradient(to bottom, #ffe8b3, #ffc870);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 10; /* 스타일 충돌 방지 */
`;

export const RankStyleBronze = styled.span`
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: "Maplestory OTF", system-ui, sans-serif;
    font-size: 36px;
    color: #ffe8b3;
    background-image: linear-gradient(to bottom, #eaeaea, #a39f97);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    z-index: 10; /* 스타일 충돌 방지 */
`;

export const FontFace = `
  @font-face {
    font-family: "SUITE Variable";
    src: url("../fonts/SUITE-Variable-ttf/SUITE-Variable.ttf") format("truetype");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "Maplestory OTF";
    src: url("../fonts/Maplestory-OTF.ttf") format("truetype");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;
