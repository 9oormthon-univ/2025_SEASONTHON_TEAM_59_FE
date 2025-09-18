import styled from 'styled-components';

export const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #5c4d49;
  max-width: 393px;
  box-sizing: border-box;
  display: flex;
`;

export const DayStyle = styled.span`
  position: absolute;
  right: 20px;
  font-family: "Maplestory OTF", system-ui, sans-serif;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  color: #ffe8b3;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to bottom, #ffe8b3, #ffc870);
`;

export const HeaderBetween = styled.div`
  width: 100%;
  background-color: #5c4d49;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 5px;
`;

export const NickNameStyle = styled.span`
  font-family: "SUITE Variable", "Maplestory OTF", system-ui, sans-serif;
  color: #5c4d49;
  font-size: 16px;
  margin-left: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  white-space: nowrap;
`;

export const StarStyle = styled.div`
  margin-top: 90%;
  position: absolute;
  width: 36px;
  height: 19px;
  z-index: 999;
`;

export const PointStyle = styled.span`
  margin-left: 65px;
  color: #7cb29e;
  text-shadow: 0 2px 0 #382c28;
  -webkit-text-stroke: 1px #000;
  font-family: "Maplestory OTF", system-ui, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
`;

export const MyRankingBoard = styled.div`
  width: 306px;
  height: 57px;
  display: flex;
  margin-left: 8px;
  align-items: center;
  border-width: 2px 1px 1px 1px;
  border-style: solid;
  background-color: ivory;
  border-radius: 3px;
  box-sizing: border-box;
  position: relative;
`;

export const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 5px;
  height: 90%;
`;

export const ImgBtn = styled.button`
  width: 65px;
  height: 76px;
  border: none;
  background-color: #5c4d49;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GraphImgStyle = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

export const GradientNumber = styled.span`
  font-family: "Maplestory OTF", system-ui, sans-serif;
  position : absolute;
  top: 50%;
  left : 60px;
  font-weight: 700;
  font-size: 24px;
  transform: translateY(-50%);
  color: #ffe8b3;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: #281900;
  background-image: linear-gradient(to bottom, #ffe8b3, #ffc870);
`;

export const LeftContainer = styled.div`
  background: linear-gradient(to bottom, #5b4c48, #463733);
  width: 76px;
  height: 57px;
  position: relative;
`;

export const ProfileCon = styled.img`
  position: absolute;
  left: 0px;
  width: 51px;
  height: 51px;
`;

export const ImgContainer = styled.div`
  display: flex;
  left: 51px;
  width: 51px;
  height: 55px;
  border-radius: 50%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

export const ImgStyle = styled.img`
  border-radius: 50%;
  width: 41px;
  height: 41px;
  object-fit: cover;
  position: absolute;
  z-index: 99;
`;

export const LeafImgStyle = styled.img`
  width: 24px;
  height: 22px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
`;

export const CenterContainer = styled.div`
  width: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  position: relative;
`;

export const RankStyleGold = styled.span`
  font-family: "Maplestory OTF", system-ui, sans-serif;
  font-size: 40px;
  color: #ffe8b3;
  background-image: linear-gradient(to bottom, #ff9e87, #d92620);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  padding-left: var(--rank-offset-x, 5px); /* 사용자 조정 가능 */
  width: 100%;
`;

export const RankStyleSilver = styled.span`
  font-family: "Maplestory OTF", system-ui, sans-serif;
  font-size: 36px;
  color: #ffe8b3;
  background-image: linear-gradient(to bottom, #ffe8b3, #ffc870);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  padding-left: var(--rank-offset-x, 5px); /* 사용자 조정 가능 */
  width: 100%;
`;

export const RankStyleBronze = styled.span`
  font-family: "Maplestory OTF", system-ui, sans-serif;
  font-size: 36px;
  color: #ffe8b3;
  background-image: linear-gradient(to bottom, #eaeaea, #a39f97);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  padding-left: var(--rank-offset-x, 5px); /* 사용자 조정 가능 */
  width: 100%;
`;

export const PointMargin = styled.div`
  padding-left: 10px;
`;

export const LeafMargin = styled.div`
  padding-left: 5px;
`;