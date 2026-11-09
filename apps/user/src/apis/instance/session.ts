const SESSION_CLEAR_URL = '/session/clear';

// 429·408 같은 일시적 오류로 유효한 세션을 지우지 않도록 인증 실패만 만료로 본다.
export const isSessionExpiredStatus = (status?: number) =>
  status === 401 || status === 403;

/**
 * 서버에서 이미 만료된 토큰 쿠키가 브라우저에 남아 있으면
 * layout이 이를 로그인 상태로 오판하므로, HttpOnly 쿠키를 서버에서 만료시킨다.
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

export const SESSION_EXPIRED_EVENT = 'maru:session-expired';

export const notifySessionExpired = () => {
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
};
