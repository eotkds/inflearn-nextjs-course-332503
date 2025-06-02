import { DefaultSession } from "next-auth"

// 커스텀 세션 타입 정의
export interface CustomSession extends DefaultSession {
  user: {
    id: string
    nickname: string
    // API 응답에서 오는 다른 사용자 필드들도 추가
  } & DefaultSession["user"]
}