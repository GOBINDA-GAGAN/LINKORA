import React, { useState } from "react";
import LinkoraPreview from "../../pages/users/dashboard/components/LinkoraPreview";
import { Share2, TextAlignJustifyStartIcon } from "lucide-react";
import AccountDropdown from "../../pages/users/dashboard/components/AccountDropdown";
import { Outlet } from "react-router-dom";
import AnimatedFooter from "../../pages/users/dashboard/components/AnimatedFooter";

const MyLinkoraLayout = () => {
  return (
    <section>
      <header className=" sticky top-0 flex h-14 w-full items-center justify-between border-border bg-background px-4">
        {/* Left */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-card">
          <TextAlignJustifyStartIcon size={19} />
        </button>

        {/* Center */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <AccountDropdown />
        </div>

        {/* Right */}
        <button className="flex h-10 items-center gap-2 rounded-full bg-card px-4 text-sm font-semibold">
          <Share2 size={17} />
          Share
        </button>
      </header>

      <div className=" bg-background pr-28 p-4 flex max-w-400 mx-auto ">
        <Outlet />
        <LinkoraPreview />
      </div>

      <footer>
        <AnimatedFooter />
      </footer>
    </section>
  );
};

export default MyLinkoraLayout;
