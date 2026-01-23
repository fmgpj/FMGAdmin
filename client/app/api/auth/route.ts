import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Demo authentication - replace with your actual authentication logic
        if (email === "admin@fmg.com" && password === "password123") {
            const user = {
                id: "1",
                name: "Admin User",
                email: "admin@fmg.com",
            };

            return NextResponse.json({
                success: true,
                user,
                message: "Login successful",
            });
        }

        return NextResponse.json(
            { success: false, message: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
