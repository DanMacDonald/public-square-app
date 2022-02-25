import React from 'react';
import { Link } from 'react-router-dom';
import { abbreviateAddress, getPostTime } from '../lib/api';

export const Posts = (props) => {
  return (
    <div>
      {props.postInfos.map(postInfo =>
        <PostItem key={postInfo.txid} postInfo={postInfo} />
      )}
    </div>
  )
};

const PostItem = (props) => {
  const [postMessage, setPostMessage] = React.useState('s'.repeat(Math.max(props.postInfo.length - 75, 0)));
  const [statusMessage, setStatusMessage] = React.useState("");

  return (
    <div className="postItem">
      <div className="postLayout">
        <img className="profileImage" src="img_avatar.png" alt="ProfileImage" />
        <div>
          <div className="postOwnerRow">
            <Link to={`/users/${props.postInfo.owner}`}>{abbreviateAddress(props.postInfo.owner)}</Link>
            <span className="gray"> • </span>
            <time>{getPostTime(props.postInfo.timestamp)}</time>
          </div>
          <div className="postRow">
            {props.postInfo.message || postMessage}
            {statusMessage && <div className="status"> {statusMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}