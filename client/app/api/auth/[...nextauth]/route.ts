import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        }),
        AzureADProvider({
            clientId: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_SECRET!,
            tenantId: process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID!,
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
    },
    pages: {
        signIn: "/", // Redirect to your login page
        error: "/", // Redirect errors to login page
    },
    callbacks: {
        async jwt({ token, account, user }) {
            try {
                // Helper function to split full name into first and last name
                const splitName = (fullName: string) => {
                    const nameParts = fullName.trim().split(" ");
                    const firstName = nameParts[0] || "";
                    const lastName = nameParts.slice(1).join(" ") || "";
                    return { firstName, lastName };
                };

                // Persist the OAuth access_token to the token right after signin
                if (account) {
                    token.accessToken = account.access_token;
                    token.provider = account.provider;
                }
                if (user) {
                    const nameData = splitName(user.name || "");
                    token.user = {
                        id: user.id || token.sub || "",
                        firstName: nameData.firstName,
                        lastName: nameData.lastName,
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
                    firstName: token.user?.firstName || "",
                    lastName: token.user?.lastName || "",
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
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
