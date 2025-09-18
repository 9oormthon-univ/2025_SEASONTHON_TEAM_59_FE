import styled from 'styled-components';
import { theme } from './variables';

export const GlobalStyles = styled.div`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

export const DashContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.secondaryBg};
  max-width: 393px;
  min-height: 100vh;
`;

export const FontBox = styled.div`
  width: 100%;
  display: flex;
`;

export const StaticImg = styled.div`
  width: 100%;
  max-width: 350px;
  height: auto;
  text-align: center;
  justify-content: center;
  display: flex;
  margin: auto;
`;

export const StaticImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

export const DashSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  align-items: center;
  position: relative;
  min-height: calc(100vh - 176px);
`;

export const StatContainer = styled.div`
  margin-top: 40px;
  display: flex;
`;

export const FlexBox = styled.div`
  display: flex;
  width: 100%;
  margin: 0 10px;
  margin-top: 30px;
  position: relative;
`;

export const EnvCon = styled.div`
  display: flex;
  width: 100%;
  margin: 0 10px;
  position: relative;
`;

export const MarginBox = styled.div`
  width: 100%;
`;

export const FontStyle = styled.div`
  font-family: ${theme.fonts.primary};
  position: absolute;
  font-weight: 700;
  font-size: 20px;
  color: ${theme.colors.textColor};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: ${theme.colors.textGradient};
  margin-left: 25px;
  margin-top: 35px;
`;

export const ImgCon = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

export const TopMargin = styled.div`
  margin-top: 65px;
`;

export const InnerText = styled.div`
  font-family: ${theme.fonts.secondary};
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  white-space: nowrap;
  color: ${theme.colors.ivory};
`;

export const InnerValue = styled.div`
  font-family: ${theme.fonts.secondary};
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  white-space: nowrap;
  color: ${theme.colors.ivory};
`;

export const DashInfo = styled.div`
  position: relative;
  width: 122px;
  height: 50px;
`;

export const DashProtected = styled.div`
  position: relative;
  width: 183px;
  height: 50px;

  & ${InnerText} {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    color: ${theme.colors.ivory};
    font-size: 12px;
    font-family: ${theme.fonts.secondary};
  }

  & ${InnerValue} {
    font-family: ${theme.fonts.secondary};
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    color: ${theme.colors.ivory};
    font-size: 10px;
  }
`;

export const DashHeader = styled.header`
  width: 100%;
  height: 75px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  position: relative;
  background-color: ${theme.colors.primaryBg};
`;

export const BackButton = styled.button`
  width: 13px;
  height: 29px;
  margin-left: 20px;
  border: none;
  background-color: ${theme.colors.primaryBg};
`;

export const BackImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const Statistics = styled.div`
  width: 40px;
  height: 22px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;