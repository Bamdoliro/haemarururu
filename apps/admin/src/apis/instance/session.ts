const SESSION_CLEAR_URL = '/session/clear';

/**
 * 재발급에 실패한 토큰 쿠키가 남아 있으면 layout과 middleware가
 * 로그인 상태로 오판하므로, HttpOnly 쿠키를 서버에서 만료시킨다.
 */
export const clearStaleSession = async () => {
  try {
    await fetch(SESSION_CLEAR_URL, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
    });
  } catch {
    // 쿠키 정리는 부가 작업이므로 실패해도 이후 흐름을 막지 않는다.
  }
};
