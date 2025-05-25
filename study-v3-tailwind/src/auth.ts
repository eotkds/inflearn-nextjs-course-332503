import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
    handlers: { GET, POST },
    signIn,
    auth,
} = NextAuth({
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
                    // return user object with their profile data
                    return user;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/i/flow/login",
        newUser: "/i/flow/signup",
    },
});
