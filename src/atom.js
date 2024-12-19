import { atom } from "recoil"

export const countState = atom({
    key: "count", // atom의 이름, 중복 X, 생략시 자동지정하지만 일반적으로 명시해줌
    default: 10,
  });