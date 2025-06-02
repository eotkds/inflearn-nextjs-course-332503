import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Main from "@/app/(beforeLogin)/_component/Main";
import RedirectPage from "./_component/RedirectPage";


export default async function LoginPage() {
    const session = await auth()
    
    if(session?.user) {
        redirect("/home");
    }

    return (
        <>
            <RedirectPage />
            <Main />
        </>
    )
}