import styled from 'styled-components';
import navButtonImage from '../assets/nav-button.png'; // 이미지 임포트

export const TopNavSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NonClickButton = styled.button`
  width: 115px;
  height: 29px;
  flex-shrink: 0;
  background: #261b18;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  margin: 2px;
  width: 119px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ClickedButton = styled.button`
  width: 115px;
  height: 26px;
  flex-shrink: 0;
  border: none;
  background-color : #261b18;
  background-image: url(${navButtonImage}); // 임포트한 이미지 사용
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NonClickFont = styled.span`
  color: #b29e99;
  font-family: "SUITE Variable", system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  cursor: pointer;
`;

export const ClickedFont = styled.span`
  font-family: "SUITE Variable", system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: #fff8e8;
`;

export const TopNavContainer = styled.div`
  width: 365px;
  height: 31px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #261B18;
  margin: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;