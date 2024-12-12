import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faClipboardCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeMute, faVolumeUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic, videoRef, url }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [muted, setMuted] = useState(false);
  const [sharePopupVisible, setSharePopupVisible] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);

  const handleUserAddClick = () => {
    setUserAddIcon(faClipboardCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000);
  };

  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('K')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleMuteClick = () => {
    if (videoRef?.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleSaveClick = () => {
    setSaved(true);
    navigator.clipboard.writeText(url).then(() => {
      console.log('URL copied to clipboard:', url);
    }).catch((err) => {
      console.error('Failed to copy URL:', err);
    });
  };

  const toggleSharePopup = () => {
    setSharePopupVisible(!sharePopupVisible);
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {profilePic ? (
          <img
            src={profilePic}
            className="userprofile"
            alt="Profile"
            style={{ width: '45px', height: '45px', color: '#616161' }}
          />
        ) : null}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: '15px', height: '15px', color: '#FF0000' }}
          onClick={handleUserAddClick}
        />
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color: 'white' }} />
        <p>{comments}</p>
      </div>
      <div className="sidebar-icon">
        {saved ? (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: '#ffc107' }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: 'white' }}
            onClick={handleSaveClick}
          />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: '35px', height: '35px', color: 'white' }}
          onClick={toggleSharePopup}
        />
        <p>{shares}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={muted ? faVolumeMute : faVolumeUp}
          style={{ width: '35px', height: '35px', color: 'white' }}
          onClick={handleMuteClick}
        />
      </div>

      {sharePopupVisible && (
        <div className="share-popup">
          <button className="close-btn" onClick={toggleSharePopup}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="share-options">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Thread</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
