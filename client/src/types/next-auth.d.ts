import "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        provider?: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            image?: string;
        };
    }

    interface JWT {
        accessToken?: string;
        provider?: string;
        user?: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            image?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        provider?: string;
        user?: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            image?: string;
        };
    }
}
