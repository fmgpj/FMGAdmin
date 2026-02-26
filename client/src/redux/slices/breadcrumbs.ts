import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BreadcrumbItem {
    label: string;
    path: string;
}

interface BreadcrumbState {
    items: BreadcrumbItem[];
}

const initialState: BreadcrumbState = {
    items: [],
};

const breadcrumbSlice = createSlice({
    name: "breadcrumb",
    initialState,
    reducers: {
        startFromSidebar: (state, action: PayloadAction<BreadcrumbItem>) => {
            state.items = [action.payload];
        },

        addToTrail: (state, action: PayloadAction<BreadcrumbItem>) => {
            const exist = state.items.find(
                (item) => item.path === action.payload.path
            );
            if (!exist) state.items.push(action.payload);
        },

        navigateToItem: (state, action: PayloadAction<string>) => {
            const index = state.items.findIndex(
                (item) => item.path === action.payload
            );
            if (index !== -1) state.items = state.items.slice(0, index + 1);
        },

        clearBreadcrumb: (state) => {
            state.items = [];
        },
    },
});

export const { startFromSidebar, addToTrail, navigateToItem, clearBreadcrumb } =
    breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
