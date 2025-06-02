"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function onSubmit(
    prevState: { message: string | null },
    formData: FormData
) {
    console.log("formData", formData.get("image"));

    if (!formData.get("id") || (formData.get("id") as string).trim() === "") {
        return { message: "no_id" };
    }
    if (
        !formData.get("name") ||
        (formData.get("name") as string).trim() === ""
    ) {
        return { message: "no_name" };
    }
    if (
        !formData.get("password") ||
        (formData.get("password") as string).trim() === ""
    ) {
        return { message: "no_password" };
    }
    if (!formData.get("image") || (formData.get("image") as File).size === 0) {
        return { message: "no_image" };
    }
    formData.set("nickname", formData.get("name") as string);
    let shouldRedirect = false;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
            {
                method: "post",
                body: formData,
                credentials: "include",
            }
        );

        if (response.status === 404) {
            return { message: "no_id" };
        }

        if (response.status === 403) {
            return { message: "user_exists" };
        }

        shouldRedirect = true;
        await signIn("credentials", {
            id: formData.get("id") as string,
            password: formData.get("password") as string,
            redirect: false,
          });
    } catch (err) {
        console.error(err);
        return { message: null };
    }

    if (shouldRedirect) {
        redirect("/home");
    }
    return { message: null };
}
