import React, { useEffect } from "react";
import useCollection from "./hooks/useCollection";

const Members = ({ channelId, user }) => {
  // const members = useCollection("users", "displayName");

  const members = useCollection("users", undefined, [
    `channels.${channelId}`,
    "==",
    true,
  ]);

  return (
    <div className="channel-aside">
      <div className="channel-members">
        {members.sort(sortMembers).map((member) => (
          <div key={member.uid} className="aside-user-item online">
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
};

function sortMembers(a, b) {
  if (a.displayName > b.displayName) return 1;
  else if (a.displayName < b.displayName) return -1;
  else return 0;
}

export default Members;
