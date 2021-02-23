import React, { useEffect } from "react";
import useCollection from "./hooks/useCollection";

const Members = ({ channelId, user }) => {
  const members = useCollection("users", "displayName", [
    `channels.${channelId}`,
    "==",
    "true",
  ]);

  console.log(members);

  return (
    <div className="channel-aside">
      <div className="channel-members">
        <div className="aside-user-item online">User 1</div>
        <div className="aside-user-item offline">User 2</div>
        <div className="aside-user-item offline">User 3</div>
        <div className="aside-user-item offline">User 4</div>
      </div>
    </div>
  );
};

export default Members;
