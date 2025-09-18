import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "SUITE Variable";
    src: url("../fonts/SUITE-Variable-ttf/SUITE-Variable.ttf") format("truetype");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Maplestory OTF";
    src: url("../fonts/MaplestoryOTFBold/Maplestory OTF Bold.otf") format("opentype");
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  /* 스크롤바 스타일 */
  .rankingList::-webkit-scrollbar-track {
    background: #382c28;
  }

  .rankingList::-webkit-scrollbar-thumb {
    background: #5c4d49;
    border-radius: 4px;
  }

  .rankingList::-webkit-scrollbar {
    width: 8px;
  }
`;