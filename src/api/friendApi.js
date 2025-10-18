// src/api/friendApi.js
import api from "./api.js";

/**
 * 내 친구 목록 조회
 * @returns {Promise<Array>} 친구 배열
 */
export async function getFriends() {
  try {
    const response = await api.get("/v1/friends");
    return response.data.data?.friendResDtos || [];
  } catch (err) {
    if (err.response?.data?.detail) throw new Error(err.response.data.detail);
    throw new Error("친구 목록 조회 중 오류 발생");
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
    return response.data.data || null;
  } catch (err) {
    if (err.response?.data?.detail) throw new Error(err.response.data.detail);
    throw new Error("친구 검색 중 오류 발생");
  }
}

/**
 * 받은 친구 요청 목록 조회
 * @returns {Promise<Array>} 친구 요청 배열
 */
export async function getFriendRequests() {
  try {
    const response = await api.get("/v1/friends/requests");
    return response.data.data?.friendshipResDtos || [];
  } catch (err) {
    if (err.response?.data?.detail) throw new Error(err.response.data.detail);
    throw new Error("친구 요청 조회 중 오류 발생");
  }
}

/**
 * 친구 요청 보내기
 * @param {string} nicknameWithCode - 친구 닉네임+코드
 * @returns {Promise<void>}
 */
export async function sendFriendRequest(nicknameWithCode) {
  try {
    await api.post("/v1/friends/request", { nicknameWithCode });
  } catch (err) {
    if (err.response?.data?.detail) throw new Error(err.response.data.detail);
    throw new Error("친구 요청 전송 중 오류 발생");
  }
}

/**
 * 친구 요청 수락
 * @param {number} memberId - 요청한 친구의 memberId
 * @returns {Promise<void>}
 */
export async function acceptFriendRequest(memberId) {
  try {
    await api.post(`/v1/friends/requests/${memberId}/accept`);
  } catch (err) {
    if (err.response?.data?.detail) throw new Error(err.response.data.detail);
    throw new Error("친구 요청 수락 중 오류 발생");
  }
}

/**
 * 친구 요청 거절
 * @param {number} memberId - 요청한 친구의 memberId
 * @returns {Promise<void>}
 */
export async function rejectFriendRequest(memberId) {
  try {
    await api.post(`/v1/friends/requests/${memberId}/reject`);
  } catch (err) {
    if (err.response?.data?.detail) throw new Error(err.response.data.detail);
    throw new Error("친구 요청 거절 중 오류 발생");
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
    return response.data.data;
  } catch (err) {
    if (err.response?.data?.detail) throw new Error(err.response.data.detail);
    throw new Error("친구 상세 조회 중 오류 발생");
  }
}