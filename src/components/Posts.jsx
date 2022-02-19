import React from 'react';
import { Link } from 'react-router-dom';
import { abbreviateAddress, getPostTime } from '../lib/api';
import Arweave from 'arweave';
const arweave = Arweave.init({});

export const Posts = (props) => {
  return (
    <div>
      {props.postItems.map(item =>
        <PostItem key={item.txid} item={item} />
      )}
    </div>
  )
};

const PostItem = (props) => {
  const [postMessage, setPostMessage] = React.useState('s'.repeat(Math.max(props.item.length - 75,0)));
  const [statusMessage, setStatusMessage] = React.useState("");

  React.useEffect(() => {
    let newPostMessage = "";
    let newStatus = "";

    const getMessage = async () => {
      const txid = props.item.txid;
      const response = await props.item.request;
      if (response && response.status && response.status === 200) {
        props.item.message = response.data;
        newStatus = "";
        newPostMessage = response.data;
      } else if (!newStatus) {
        newStatus = "missing data";
      }
    }

    if (!props.item.message) {
      setStatusMessage("loading...");
      let isCancelled = false;
        getMessage()
          .then(() => {
            if (isCancelled)
              return;
            setStatusMessage(newStatus);
            setPostMessage(newPostMessage);
          });
      return () => isCancelled = true;
    }
    
  }, []);

  const renderTopic = (topic) => {
    if (topic)
      return (<Link to={`/topics/${topic}`} className="postTopic">#{topic}</Link>)
  }

  return (
    <div className="postItem">
      <div className="postLayout">
        <img className="profileImage" src="img_avatar.png" alt="ProfileImage" />
        <div>
          <div className="postOwnerRow">
            <Link to={`/users/${props.item.owner}`}>{abbreviateAddress(props.item.owner)}</Link>
            <span className="gray"> • </span>
            <time>{getPostTime(props.item.timestamp)}</time>
          </div>
          <div className="postRow">
            {props.item.message || postMessage}
            {statusMessage && <div className="status"> {statusMessage}</div>}
          </div>
          {renderTopic(props.item.topic)}
        </div>
      </div>
    </div>
  )
}