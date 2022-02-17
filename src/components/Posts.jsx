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
  const [postMessage, setPostMessage] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");

  React.useEffect(() => {
    if (!props.item.message) {
      setStatusMessage("loading...");

      if (!props.item.request) {
        let isCancelled = false;
        const txid = props.item.txid;

        props.item.request = arweave.api.get(`/${txid}`, { timeout: 10000 })
          .then(response => {
            if (!isCancelled) {
              if (response.status && response.status === 200) {
                props.item.message = response.data;
                setStatusMessage("");
                setPostMessage(response.data);
              } else {
                setStatusMessage("missing data");
              }
            }
          }).catch(err => {
            if (!isCancelled)
              setStatusMessage("timeout loading data");
          })

        return () => isCancelled = true;
      }
    }

  }, [props.item]);

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