import axios from "axios";

// axios 인스턴스 생성
const publicAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  timeout: 1000,
  // headers: { "Content-Type": "application/json" },
});

const privateAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

function refreshToken() {
  return publicAPI
    .post("accounts/token/refresh/", {
      refresh: localStorage.getItem("refreshToken"),
    })
    .then((response) => {
      // console.log(response);
      const newAccessToken = response.data.access;
      const newRefreshToken = response.data.refesh;
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken)
      // console.log("토큰 갱신");
      // console.log("새 토큰 성공 : ", newAccessToken);
      return newAccessToken;
    })
    .catch((error) => {
      console.log(error);
      localStorage.clear();
      alert("토큰이 만료되었습니다. 다시 로그인을 시도해주세요");
      window.location.href = "http://localhost:3000/signin";
    });
}

// 요청 인터셉터
privateAPI.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 할 일
    // 예시: 인증 토큰을 헤더에 전송
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터
privateAPI.interceptors.response.use(
  function (response) {
    // 응답 데이터로 할 것
    console.log("Response", response);
    return response;
  },
  async (error) => {
    // 응답 에러 처리
    console.log(error);
    const originalRequest = error.config; // 기존 요청 저장
    console.log(originalRequest.headers.Authorization);
    if (error.response && error.response.status === 401) {
      // 인증 에러 처리
      console.error("Unauthorized, logging out...");
      const newAccessToken = await refreshToken(); // 토큰 재발급
      // console.log(newAccessToken); // 얘가 지금 undefined로 나오고있음
      // 로그아읏이나 redirection 처리
      //   originalRequest.sent = true;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // 기존 요청의 토큰 교체
      // console.log(originalRequest.headers.Authorization);
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { publicAPI, privateAPI };
