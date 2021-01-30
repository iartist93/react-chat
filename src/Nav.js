import userAvatar from "./images/woody_small.jpg";

import { Link } from "@reach/router";
import useCollection from "./hooks/useCollection";

import { firebase } from "./firebase/firebase";

const Nav = ({ user }) => {
  const channels = useCollection("channels");

  const handleLogout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  return (
    <div className="nav-wrapper">
      <div className="nav-user-info">
        <img className="nav-user-avatar" src={user.photoURL} alt="" />
        <div className="nav-user-col">
          <div className="nav-user-name">{user.displayName}</div>
          <a className="nav-user-logout" href="/" onClick={handleLogout}>
            logout
          </a>
        </div>
      </div>
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
    </div>
  );
};

export default Nav;
