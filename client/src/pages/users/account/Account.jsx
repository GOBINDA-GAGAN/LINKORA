
import React from "react";
import { motion } from "framer-motion";

import AccountCredentials from "./AccountCredentials";
import AccountManagement from "./AccountManagement";
import SessionsDevices from "./SessionsDevices";
import SubscriptionBilling from "./SubscriptionBilling";
import DangerZone from "./DangerZone";
import ProfileBio from "./ProfileBio";

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sections = [
  { id: "profile", Component: ProfileBio },
  { id: "management", Component: AccountManagement },
  { id: "security", Component: AccountCredentials },
  { id: "sessions", Component: SessionsDevices },
  { id: "billing", Component: SubscriptionBilling },
  { id: "danger-zone", Component: DangerZone },
];

const Account = () => {
  return (
    <div className="w-full min-w-0 space-y-8">
      {sections.map(({ id, Component }, index) => (
        <motion.section
          key={id}
          id={id}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
            margin: "0px 0px -40px 0px",
          }}
          transition={{
            delay: index * 0.04,
          }}
        >
          <Component />
        </motion.section>
      ))}
    </div>
  );
};

export default Account;
