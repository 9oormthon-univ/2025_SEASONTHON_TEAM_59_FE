// src/api/closetApi.js
import api from "./api.js";


/**
 * 상점 조회
 * @returns {Promise<Array>} 상점 데이터 배열
 */
export async function getMyCloset() {
  try {
    const response = await api.get("/v1/members/me/avatars");
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "옷장 아이템 조회 실패");
    }

    // 영어 타입을 한국어로 매핑
    const typeMap = {
      CHARACTER: "캐릭터",
      SKIN: "캐릭터 스킨",
      ACCESSORY: "장신구",
      PET: "펫",
      FRUIT: "열매",
      STAGE: "스테이지 스킨",
    };

    const mapped = response.data.data.ownedAvatarResDtos.map((it) => ({
      ...it,
      type: typeMap[it.type] ?? "기타",
    }));

    return mapped; // 옷장 아이템 배열 반환
  } catch (err) {
    console.error("옷장 조회 실패:", err);
    throw err;
  }
};