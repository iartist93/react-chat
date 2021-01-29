import { Link } from "@reach/router";
import useCollection from "./hooks/useCollection";

const Nav = ({ onChannelUpdate }) => {
  const channels = useCollection("channels");
  return (
    <nav>
      <h2 className="nav-section-title">Channels</h2>
      {channels.map((channel, index) => {
        return (
          <Link
            key={channel.id}
            className={`channel-nav-item ${
              index === 0 ? "active-channel" : ""
            }`}
            to={`/channel/${channel.id}`}
          >
            #{channel.id}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
