import { PROFILE } from '../config/Constants';
import '../styles/Profile.css';

function Profile({ blogs }) {
  const ownBlogs = blogs.filter((b) => b.author === PROFILE.name);
  const ownLikes = ownBlogs.reduce((sum, b) => sum + b.likes, 0);
  const initials = PROFILE.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="profile">
      <h2>Profile</h2>

      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-info">
          <h3>{PROFILE.name}</h3>
          <p>{PROFILE.bio}</p>
          <dl>
            <dt>Email</dt>
            <dd>{PROFILE.email}</dd>
            <dt>Contact Number</dt>
            <dd>{PROFILE.contact}</dd>
            <dt>Program</dt>
            <dd>{PROFILE.program}</dd>
            <dt>Year Level</dt>
            <dd>{PROFILE.yearLevel}</dd>
          </dl>
        </div>
      </div>

      <div className="profile-stats">
        <div>
          <strong>{ownBlogs.length}</strong>
          <span>Blogs Posted</span>
        </div>
        <div>
          <strong>{ownLikes}</strong>
          <span>Total Likes Received</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;