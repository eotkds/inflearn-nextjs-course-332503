"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

/**
 * import/no-anonymous-default-export
 * EsLint 규칙 위반으로 기명 함수로 변경
 */
export default async function signup(
    prevState: { message: string | null },
    formData: FormData
) {
    if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
        return { message: "no_id" };
    }
    if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
        return { message: "no_name" };
    }
    if (
        !formData.get("password") ||
        !(formData.get("password") as string)?.trim()
    ) {
        return { message: "no_password" };
    }
    if (!formData.get("image")) {
        return { message: "no_image" };
    }
    formData.set("nickname", formData.get("name") as string);
    let shouldRedirect = false;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
            {
                method: "post",
                body: formData,
                credentials: "include", // TODO : 꼭 입력해야하는 이유는 ?
            }
        );
        if (response.status === 403) {
            return { message: "user_exists" };
        } else if (response.status === 400) {
            return {
                message: (await response.json()).data[0],
                id: formData.get("id"),
                nickname: formData.get("nickname"),
                password: formData.get("password"),
            };
        }
        shouldRedirect = true;
        signIn("credentials", {
            username: formData.get("id"),
            password: formData.get("password"),
            redirect: false,
        });
    } catch (err) {
        console.error(err);
        return;
    }

    if (shouldRedirect) {
        redirect("/home"); // try/catch문 안에서 X
    }
}
