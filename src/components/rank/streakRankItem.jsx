import React from "react";
import {
    RankingItemContainer,
    RankingFrame,
    UserInfo,
    RankContainer,
    Shadow, // 추가: import (스타일 파일에 있어야 함)
    ProfileImgContainer,
    ProfileCon,
    ProfileImgStyle,
    StarStyle,
    NickNameStyle,
    DayStyle, // score 표시용
    RankStyle,
    RankStyleGold,
    RankStyleSilver,
    RankStyleBronze,
} from "../../styles/rankingItemStyles";
import rank1 from "../../assets/rank1.png";
import rank2 from "../../assets/rank2.png";
import rank3 from "../../assets/rank3.png";
import rank1Star from "../../assets/rank1-star.png";
import rank2Star from "../../assets/rank2-star.png";
import rank3Star from "../../assets/rank3-star.png";
import imgBox from "../../assets/IcnBox.png";
import ProfileImg from "../../assets/defaultProfile.png"; // default 프로필

function StreakRankingItem({ rank, nickName, score, profileImageUrl }) {
    const iconBox = rank === 1 ? rank1 : rank === 2 ? rank2 : rank === 3 ? rank3 : imgBox;
    const rankStar = rank === 1 ? rank1Star : rank === 2 ? rank2Star : rank === 3 ? rank3Star : null;
    const RankComponent = rank === 1 ? RankStyleGold : rank === 2 ? RankStyleSilver : rank === 3 ? RankStyleBronze : RankStyle;

    return (
        <RankingItemContainer>
            <RankingFrame>
                <UserInfo>
                    <RankContainer>
                        <RankComponent>{rank}</RankComponent> {/* 케이싱 문제 없음 */}
                    </RankContainer>
                    <Shadow>
                        {" "}
                        {/* 추가: Shadow로 감싸서 레이아웃 안정화 (width:284px 등 적용) */}
                        <ProfileImgContainer>
                            <ProfileCon as="img" src={iconBox} alt="프로필 테두리" />
                            <ProfileImgStyle src={profileImageUrl || ProfileImg} alt="프로필 이미지" />
                            {rankStar && <StarStyle as="img" src={rankStar} alt="스타 이미지" />}
                        </ProfileImgContainer>
                        <NickNameStyle>{nickName}</NickNameStyle>
                        <DayStyle>{score}</DayStyle> {/* score 오른쪽 배치 (스타일에서 right:0 적용) */}
                    </Shadow>
                </UserInfo>
            </RankingFrame>
        </RankingItemContainer>
    );
}

export default StreakRankingItem;
