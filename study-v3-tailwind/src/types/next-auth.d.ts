import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nickname: string;
      image: string;
    } & DefaultSession["user"]
  }
}