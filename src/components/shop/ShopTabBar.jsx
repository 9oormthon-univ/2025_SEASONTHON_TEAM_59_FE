import React from "react";
import styled from "styled-components";
import clickedBg from "../../assets/clicked.png";
import unclickedBg from "../../assets/unclicked.png";

export default function ShopTabBar({ tabs = [], activeTab, onChange}) {
  return (
    <>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <TabButton
            key={tab}
            role="tab"
            aria-selected={isActive}
            $active={isActive}
            onClick={() => onChange?.(tab)}
          >
            <Label>
              {tab.includes(" ") ? (  // 스테이지 스킨을 위한 줄바꿈 처리
                <>
                  {tab.split(" ")[0]}<br />
                  {tab.split(" ")[1]}
                </>
              ) : (
                tab
              )}
            </Label>
          </TabButton>
        );
      })}
    </>
  );
}

const TabButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  width: 100%;
  height: 84px; /* 이미지 비율에 맞춰 조정 */
  background-image: url(${(p) => (p.$active ? clickedBg : unclickedBg)});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  font-family: "Maplestory OTF";
  font-weight: 700;
  color: #FEF4E9;
  font-size: 12px;
  line-height: 1.1;
  text-align: center;
`;


