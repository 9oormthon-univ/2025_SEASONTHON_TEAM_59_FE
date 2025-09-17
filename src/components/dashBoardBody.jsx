import { useState, useEffect } from "react";
import "../styles/dashStyle.css";
import DashButtonImg from "../assets/ChoiceBtn.png";
import StaticImg from "../assets/statistics.png";
import { getGlobalCarbonStatics } from "../api/rankingApi"; // API 함수 임포트

export default function DashBoardBody() {
    const [stats, setStats] = useState({
        totalCarbonReduction: 0,
        totalMemberCount: 0,
        dailyAverageReduction: 0,
        treesPlantedEffect: 0,
        carEmissionReductionEffect: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchCarbonStats = async () => {
            try {
                const response = await getGlobalCarbonStatics();
                console.log("API Response:", response); // 디버깅용 로깅
                if (!isMounted) return;

                // response.data가 객체인지 확인
                const data = response.data && typeof response.data === "object" ? response.data : {};
                setStats({
                    totalCarbonReduction: Number(data.totalCarbonReduction) || 0,
                    totalMemberCount: Number(data.totalMemberCount) || 0,
                    dailyAverageReduction: Number(data.dailyAverageReduction) || 0,
                    treesPlantedEffect: Number(data.treesPlantedEffect) || 0,
                    carEmissionReductionEffect: Number(data.carEmissionReductionEffect) || 0,
                });
                setLoading(false);
            } catch (err) {
                if (!isMounted) return;
                console.error("API Error:", err);
                setError(err.message || "탄소 통계 데이터를 가져오지 못했습니다.");
                setLoading(false);
            }
        };

        fetchCarbonStats();

        return () => {
            isMounted = false; 
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dashSection">
            <div>
                <div className="fontBox">
                    <span className="fontStyle">전체 사용자 탄소 감축량 대시보드</span>
                </div>
                <div className="flexBox">
                    <div className="stat-container">
                        <div className="dashInfo">
                            <img src={DashButtonImg} alt="대시버튼 컨테이너" className="imgCon" />
                            <span className="inner-text">총 탄소감축량 </span>
                            <span className="inner-value">
                                {Number.isFinite(stats.totalCarbonReduction)
                                    ? `${stats.totalCarbonReduction.toLocaleString()}gCO₂eq`
                                    : "0 gCO₂eq"}
                            </span>
                        </div>
                        <div className="dashInfo">
                            <img src={DashButtonImg} alt="대시버튼 컨테이너" className="imgCon" />
                            <span className="inner-text">전체 사용자 수</span>
                            <span className="inner-value">
                                {Number.isFinite(stats.totalMemberCount) ? `${stats.totalMemberCount.toLocaleString()}명` : "0명"}
                            </span>
                        </div>
                        <div className="dashInfo">
                            <img src={DashButtonImg} alt="대시버튼 컨테이너" className="imgCon" />
                            <span className="inner-text">일평균 감축량</span>
                            <span className="inner-value">
                                {Number.isFinite(stats.dailyAverageReduction)
                                    ? `${stats.dailyAverageReduction.toLocaleString()}gCO₂eq`
                                    : "0 gCO₂eq"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="marginBox">
                <span className="fontStyle">환경 보호 효과</span>
                <div className="envCon">
                    <div className="dashProtected topMargin">
                        <img src={DashButtonImg} alt="대시버튼 컨테이너" className="dashProtected" />
                        <span className="inner-text">
                            {Number.isFinite(stats.treesPlantedEffect) ? `${stats.treesPlantedEffect.toLocaleString()}그루` : "0 그루"}
                        </span>
                        <span className="inner-value">나무 심기와 동일한 효과</span>
                    </div>
                    <div className="dashProtected topMargin">
                        <img src={DashButtonImg} alt="대시버튼 컨테이너" className="dashProtected" />
                        <span className="inner-text">
                            {Number.isFinite(stats.carEmissionReductionEffect)
                                ? `${stats.carEmissionReductionEffect.toLocaleString()}대`
                                : "0 대"}
                        </span>
                        <span className="inner-value">내연기관 자동차 1년간 운행 저감 효과</span>
                    </div>
                </div>
            </div>
            <div className="staticImg">
                <img src={StaticImg} alt="스태틱 이미지" className="staticImage" /> 
            </div>
        </div>
    );
}
