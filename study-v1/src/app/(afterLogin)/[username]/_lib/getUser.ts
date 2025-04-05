import { User } from "../../../../model/User";
import { QueryFunction } from "@tanstack/react-query";

export const getUser: QueryFunction<User, [_1: string, _2: string]> = async ({
    queryKey,
}) => {
    const [_1, username] = queryKey;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
        {
            next: {
                tags: ["users", username],
            },
            // 서버에서 실행되는 경우 cookie가 전달이 안되는 문제가 있다.
            // nextjs cookie() 함수를 사용하여 쿠키를 전달하면 되는데, 클라이언트 컴포넌트의 경우 에러가 발생함
            credentials: "include",
            cache: "no-store",
            // next15 버전 에서 no-store 가 default 값
            // force-cache 가 하는 경우에는 revalidate 가 있어야 함
            // 반대로 revalidate 만 있는 경우에는 error 가 발생함
        }
    );
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};
