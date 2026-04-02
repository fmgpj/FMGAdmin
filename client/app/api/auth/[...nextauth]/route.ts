import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import GoogleProvider from "next-auth/providers/google";

function readRequiredEnv(name: string): string {
    const value = process.env[name];

    if (!value || !value.trim()) {
        throw new Error(
            `[Auth Config Error] Missing required environment variable: ${name}`
        );
    }

    const trimmedValue = value.trim();

    // Some hosting UIs tempt users to include quotes. Normalize that safely.
    const hasWrappedQuotes =
        (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
        (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"));

    return hasWrappedQuotes ? trimmedValue.slice(1, -1) : trimmedValue;
}

function validateAuthEnvironment(): {
    googleClientId: string;
    googleClientSecret: string;
    azureClientId: string;
    azureClientSecret: string;
    azureTenantId: string;
    nextAuthSecret: string;
} {
    const env = {
        googleClientId: readRequiredEnv("GOOGLE_CLIENT_ID"),
        googleClientSecret: readRequiredEnv("GOOGLE_CLIENT_SECRET"),
        azureClientId: readRequiredEnv("AZURE_AD_CLIENT_ID"),
        azureClientSecret: readRequiredEnv("AZURE_AD_CLIENT_SECRET"),
        azureTenantId: readRequiredEnv("AZURE_AD_TENANT_ID"),
        nextAuthSecret: readRequiredEnv("NEXTAUTH_SECRET"),
    };

    if (process.env.NODE_ENV === "production") {
        const nextAuthUrl = process.env.NEXTAUTH_URL?.trim();
        const isHostedProduction =
            process.env.VERCEL === "1" || Boolean(process.env.VERCEL_URL);

        if (!nextAuthUrl) {
            throw new Error(
                "[Auth Config Error] Missing required environment variable: NEXTAUTH_URL (required in production)"
            );
        }

        if (isHostedProduction && nextAuthUrl.includes("localhost")) {
            throw new Error(
                "[Auth Config Error] NEXTAUTH_URL points to localhost in production"
            );
        }

        if (!isHostedProduction && nextAuthUrl.includes("localhost")) {
            console.warn(
                "[Auth Config Warning] NEXTAUTH_URL uses localhost in local production build. This is expected locally but must be a public domain in deployment."
            );
        }
    }

    return env;
}

const authEnv = validateAuthEnvironment();

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: authEnv.googleClientId,
            clientSecret: authEnv.googleClientSecret,
        }),
        AzureADProvider({
            clientId: authEnv.azureClientId,
            clientSecret: authEnv.azureClientSecret,
            tenantId: authEnv.azureTenantId,
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
    secret: authEnv.nextAuthSecret,
    debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
