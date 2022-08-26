import React from 'react';
import { Link } from 'react-router-dom';
import { maxMessageLength, abbreviateAddress, getPostTime } from '../lib/api';

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
  const [postMessage, setPostMessage] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  const [ownerName, setOwnerName] = React.useState("");
  const [ownerHandle, setOwnerHandle] = React.useState("");
  const [imgSrc, setImgSrc] = React.useState(props.postInfo.imgSrc || 'img_avatar.png');

  React.useEffect(() => {
    let newPostMessage = "";
    let newStatus = "";
    
    if (!props.postInfo.message) {
      setStatusMessage("loading...");
      let isCancelled = false;

      const getPostMessage = async () => {
        setPostMessage('s'.repeat(Math.min(Math.max(props.postInfo.length - 75, 0), maxMessageLength)));
        const response = await props.postInfo.request;
        switch (response?.status) {
          case 200:
          case 202:
            props.postInfo.message = response.data.toString();
            newStatus = "";
            newPostMessage = props.postInfo.message;
            break;
          case 404:
            newStatus = "Not Found";
            break;
          default:
            newStatus = props.postInfo?.error;
            if(!newStatus) {
              newStatus = "missing data";
            }
        }

        if (isCancelled)
          return;

        setPostMessage(newPostMessage);
        setStatusMessage(newStatus);
      }

      if (props.postInfo.error) {
        setPostMessage("");
        setStatusMessage(props.postInfo.error);
      } else {
        getPostMessage();
      }
      return () => isCancelled = true;
    }
    
  }, [props.postInfo]);

  return (
    <div className="postItem">
      <div className="postLayout">
      <img className="profileImage" src={imgSrc} alt="ProfileImage" />
        <div>
          <div className="postOwnerRow">
            <Link to={`/users/${props.postInfo.owner}`}>{ownerName}</Link>
            <span className="gray"> <span className="handle">{ownerHandle}</span> • </span>
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