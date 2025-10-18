// src/api/friendApi.js
import api from "./api.js";

/**
 * 내 친구 목록 조회
 * @returns {Promise<Array>} 친구 배열
 */
export async function getFriends() {
  try {
    const response = await api.get("/v1/friends");
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "친구 목록 조회 실패");
    }
    return response.data.data.friendResDtos || [];
  } catch (err) {
    console.error("친구 목록 조회 실패:", err);

    // axios 에러 처리
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail); // 서버 메시지를 그대로 throw
    }

    throw new Error("친구 조회 중 오류 발생"); // 그 외 일반 에러
  }
}

/**
 * 친구 검색
 * @param {string} nicknameWithCode - 검색할 닉네임 또는 코드
 * @returns {Promise<Object|null>} 검색된 친구 정보 (없을 경우 null)
 */
export async function searchFriends(nicknameWithCode) {
  try {
    const response = await api.get("/v1/friends/search", {
      params: { nicknameWithCode },
    });

    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "친구 검색 실패");
    }

    // 서버 응답이 단일 객체이므로 그대로 반환
    return response.data.data || null;
  } catch (err) {
    console.error("친구 검색 실패:", err);

    // axios 에러 처리
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail); // 서버 메시지를 그대로 throw
    }

    throw new Error("검색 중 오류 발생"); // 그 외 일반 에러
  }
}

/**
 * 받은 친구 요청 목록 조회
 * @returns {Promise<Array>} 친구 요청 배열
 */
export async function getFriendRequests() {
  try {
    const response = await api.get("/v1/friends/requests");
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "친구 요청 조회 실패");
    }
    return response.data.data.friendshipResDtos || [];
  } catch (err) {
    console.error("친구 요청 조회 실패:", err);

    // axios 에러 처리
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail); // 서버 메시지를 그대로 throw
    }

    throw new Error("친구 요청 조회 중 오류 발생"); // 그 외 일반 에러
  }
}

/**
 * 친구 요청 보내기
 * @param {string} nicknameWithCode - 친구 닉네임+코드
 * @returns {Promise<void>}
 */
export async function sendFriendRequest(nicknameWithCode) {
  try {
    const response = await api.post("/v1/friends/request", { nicknameWithCode });
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "친구 요청 실패");
    }
  } catch (err) {
    console.error("친구 요청 실패:", err);

    // axios 에러 처리
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail); // 서버 메시지를 그대로 throw
    }

    throw new Error("요청 전송 중 오류 발생"); // 그 외 일반 에러
  }
}

/**
 * 친구 요청 수락
 * @param {number} memberId - 요청한 친구의 memberId
 * @returns {Promise<void>}
 */
export async function acceptFriendRequest(memberId) {
  try {
    const response = await api.post(`/v1/friends/requests/${memberId}/accept`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "친구 요청 수락 실패");
    }
  } catch (err) {
    console.error("친구요청 수락 실패:", err);

    // axios 에러 처리
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail); // 서버 메시지를 그대로 throw
    }

    throw new Error("요청 수락 중 오류 발생"); // 그 외 일반 에러
  }
}

/**
 * 친구 요청 거절
 * @param {number} memberId - 요청한 친구의 memberId
 * @returns {Promise<void>}
 */
export async function rejectFriendRequest(memberId) {
  try {
    const response = await api.post(`/v1/friends/requests/${memberId}/reject`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "친구 요청 거절 실패");
    }
  } catch (err) {
    console.error("친구요청 거절 실패:", err);

    // axios 에러 처리
    if (err.response && err.response.data && err.response.data.detail) {
      throw new Error(err.response.data.detail); // 서버 메시지를 그대로 throw
    }

    throw new Error("요청 거절 중 오류 발생"); // 그 외 일반 에러
  }
}

/**
 * 친구 상세 조회
 * @param {number} friendId - 조회할 친구의 memberId
 * @returns {Promise<Object>} 친구 상세 정보 객체
 */
export async function getFriendDetail(friendId) {
  try {
    const response = await api.get(`/v1/friends/${friendId}`);

    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "친구 상세 조회 실패");
    }

    return response.data.data; // 단일 친구 객체 반환
  } catch (err) {
    console.error("친구 상세 조회 실패:", err);
    throw err;
  }
}