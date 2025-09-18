import React from "react";
import {
    RankingItemContainer,
    RankingFrame,
    UserInfo,
    RankContainer,
    Shadow,
    ProfileImgContainer,
    ProfileImgStyle,
    StarStyle,
    RankStyle,
    RankStyleGold,
    RankStyleSilver,
    RankStyleBronze,
    NickNameStyle,
    PointContainer,
    PointStyles,
    LeafIconStyle,
    ProfileCon,
} from "../../styles/rankingItemStyles";

import leafIcon from "../../assets/leaf.png";
import ProfileImg from "../../assets/defaultProfile.png";
import rank1 from "../../assets/rank1.png";
import rank2 from "../../assets/rank2.png";
import rank3 from "../../assets/rank3.png";
import rank1Star from "../../assets/rank1-star.png";
import rank2Star from "../../assets/rank2-star.png";
import rank3Star from "../../assets/rank3-star.png";
import imgBox from "../../assets/IcnBox.png";

function RankingItem({ rank, nickName, point, profileImageUrl }) {
    const RankComponent = rank === 1 ? RankStyleGold : rank === 2 ? RankStyleSilver : rank === 3 ? RankStyleBronze : RankStyle;
    const iconBox = rank === 1 ? rank1 : rank === 2 ? rank2 : rank === 3 ? rank3 : imgBox;
    const rankStar = rank === 1 ? rank1Star : rank === 2 ? rank2Star : rank === 3 ? rank3Star : null;

    return (
        <RankingItemContainer>
            <RankingFrame>
                <UserInfo>
                    <RankContainer>
                        <RankComponent>{rank}</RankComponent>
                    </RankContainer>
                    <ProfileImgContainer>
                        <ProfileCon as="img" src={iconBox} alt="프로필 테두리" />
                        <ProfileImgStyle src={profileImageUrl || ProfileImg} alt="프로필 이미지" />
                        {rankStar && <StarStyle as="img" src={rankStar} alt="스타 이미지" />}
                    </ProfileImgContainer>
                    <NickNameStyle>{nickName}</NickNameStyle>
                    <PointContainer>
                        <PointStyles>{point}</PointStyles>
                        <LeafIconStyle src={leafIcon} alt="풀잎" />
                    </PointContainer>
                </UserInfo>
            </RankingFrame>
        </RankingItemContainer>
    );
}

export default RankingItem;
