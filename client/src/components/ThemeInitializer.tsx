"use client";

import { useTheme } from "@src/store/hooks";
import { hydrateTheme } from "@src/store/slices/themeSlice";
import { useEffect } from "react";

export default function ThemeInitializer() {
    const { hydrated, dispatch } = useTheme();

    useEffect(() => {
        // Only hydrate once on client side (similar to auth pattern)
        if (!hydrated) {
            dispatch(hydrateTheme());
        }
    }, [hydrated, dispatch]);

    return null; // This component doesn't render anything
}
