import React from "react";
import { Outlet } from "react-router-dom";

import AccountSidebar from "../../pages/users/account/components/AccountSidebar";
import UnsavedChangesBar from "../../pages/users/account/components/UnsavedChangesBar";

const AccountLayout = () => {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      {/* Unsaved Changes Bar */}
      <div className="z-50 shrink-0">
        {/* <UnsavedChangesBar
          isDirty={true}
          title="Personal Information & Privacy"
          onDiscard={() => console.log("Discard changes")}
          onSave={() => console.log("Save changes")}
        /> */}

        <div className="bg-brand-purple h-10"></div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Sidebar: Hidden on mobile */}
        <aside className="hidden h-full shrink-0 overflow-y-auto md:block">
          <AccountSidebar />
        </aside>

        {/* Main Content */}
        <main
          id="account-scroll"
          className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto scroll-smooth"
        >
          <div className="w-full p-3 sm:p-5 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;
