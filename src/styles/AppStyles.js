import styled from 'styled-components';
import { theme } from './variables';

export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 393px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.secondaryBg};
`;

export const LoadApp = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  text-align: center;
`;

export const RankingList = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 101px;

  &::-webkit-scrollbar-track {
    background: ${theme.colors.secondaryBg};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primaryBg};
    border-radius: 4px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
`;

export const ScrollGap = styled.div`
  padding-right: 5px;
`;