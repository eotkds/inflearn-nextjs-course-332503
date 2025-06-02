import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";



export const {
    handlers: { GET, POST },
    signIn,
    auth,
} = NextAuth({
    callbacks:{
        async session ({ session, token } : { session: Session, token: JWT }) : Promise<Session> {
            // console.log("session, token callback",session, token);
            try {
                const authResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            id: token.sub,
                        }),
                    }
                );

                if (!authResponse.ok) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.");
                }

                const user = await authResponse.json();
                session.user = user;
                console.log("session", session);
                return session;
            } catch (error) {
                console.error(error);
                return session;
            }
            
        }
    },
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                id: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const authResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
                        {
                            method: "POST",
                            body: JSON.stringify(credentials),
                        }
                    );

                    if (!authResponse.ok) {
                        // No user found, so this is their first attempt to login
                        // Optionally, this is also the place you could do a user registration
                        throw new Error("Invalid credentials.");
                    }

                    const user = await authResponse.json();
                    console.log(user);
                    // return user object with their profile data
                    return {
                        id: user.id,
                        name: user.nickname,
                        email: user.id,
                        ...user,
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/i/flow/login",
    },
});
