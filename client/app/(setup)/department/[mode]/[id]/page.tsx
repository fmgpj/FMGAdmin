"use client";

import { useBreadcrumb } from "@/src/hooks/useBreadcrumbs";

const Page = () => {
    useBreadcrumb();
    return <div className="">VIEW & UPDATE PAGE</div>;
};

export default Page;
