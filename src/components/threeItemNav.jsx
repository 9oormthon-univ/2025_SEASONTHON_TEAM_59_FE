import React, { useState } from "react";
import styled from "styled-components";

import navButtonImg from "../assets/nav-button.png";

/**
 * @param {Array} items - [{ label: string }]
 * @param {Function} onSelect - 클릭 시 선택된 label 반환
 */
export default function ThreeItemNav({ items = [], onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index, label) => {
    setActiveIndex(index);
    if (onSelect) onSelect(label);
  };

  return (
    <TopNavSection>
      <TopNavContainer>
        {items.map(({ label }, index) => (
          <ButtonContainer key={label}>
            <NavButton
              $active={activeIndex === index}
              onClick={() => handleClick(index, label)}
            >
              <NavFont $active={activeIndex === index}>{label}</NavFont>
            </NavButton>
          </ButtonContainer>
        ))}
      </TopNavContainer>
    </TopNavSection>
  );
}

/* ---------------- styled-components ---------------- */

const TopNavSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const TopNavContainer = styled.div`
  width: 365px;
  height: 31px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #261b18;
  margin: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  margin: 2px;
  width: 119px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavButton = styled.button`
  width: 115px;
  height: 29px;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $active }) =>
    $active
      ? `url(${navButtonImg}) center/cover no-repeat`
      : "#261b18"};
`;

const NavFont = styled.span`
  font-family: "SUITE Variable", system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: ${({ $active }) => ($active ? "#fff8e8" : "#b29e99")};
`;