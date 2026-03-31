import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        AzureADProvider({
            clientId: process.env.MICROSOFT_CLIENT_ID!,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
            tenantId: process.env.MICROSOFT_TENANT_ID!,
            authorization: {
                params: {
                    scope: "openid profile email User.Read",
                },
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours
        updateAge: 60 * 60, // Update session every hour for security
    },
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true, // Prevent XSS access to session token
                sameSite: "lax", // CSRF protection
                path: "/",
                secure: process.env.NODE_ENV === "production", // HTTPS only in production
            },
        },
    },
    useSecureCookies: process.env.NODE_ENV === "production",
    pages: {
        signIn: "/", // Redirect to your login page
        error: "/", // Redirect errors to login page
    },
    callbacks: {
        async jwt({ token, account, user }) {
            try {
                // Persist the OAuth access_token to the token right after signin
                if (account) {
                    token.accessToken = account.access_token;
                    token.provider = account.provider;
                }
                if (user) {
                    token.user = {
                        id: user.id || token.sub || "",
                        name: user.name || "",
                        email: user.email || "",
                        image: user.image || "", // Include profile picture
                    };
                }
                return token;
            } catch (error) {
                console.error("JWT Callback Error:", error);
                return token;
            }
        },
        async session({ session, token }) {
            try {
                // Send properties to the client
                session.accessToken = token.accessToken as string;
                session.provider = token.provider as string;
                session.user = {
                    id: token.user?.id || token.sub || "",
                    name: token.user?.name || "",
                    email: token.user?.email || "",
                    image: token.user?.image || "", // Include profile picture
                };
                return session;
            } catch (error) {
                console.error("Session Callback Error:", error);
                return session;
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
