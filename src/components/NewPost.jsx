import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import Arweave from 'arweave';

export const NewPost = (props) => {
  const [topicValue, setTopicValue] = React.useState("");
  const [postValue, setPostValue] = React.useState("");
  const [isPosting, setIsPosting] = React.useState(false);
  function onTopicChanged(e) {
    let topic = e.target.value;
    let dashedTopic = (topic || '')
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    setTopicValue(dashedTopic);
  }

  async function onPostButtonClicked() {
    setIsPosting(true);
    let arweave = Arweave.init({});
    let tx = await arweave.createTransaction({ data:postValue })

    tx.addTag('App-Name', 'PublicSquare')
    tx.addTag('Content-Type', 'text/plain')
    tx.addTag('Version', '1')
    tx.addTag('Type', 'post')

    if(topicValue) {
      tx.addTag('Topic', topicValue);
    }
    
    try {
      let err = await arweave.transactions.sign(tx);
      if (err) {
        console.log(err.message);
        setIsPosting(false);
        return;
      } 
    } catch (err) {
      console.log(err);
      setIsPosting(false);
      return;
    }
    
    const response = await arweave.transactions.post(tx);
    console.log(response);
    setIsPosting(false);
    setPostValue("");
    setTopicValue("");
    if (props.onPostMessage) {
      props.onPostMessage(tx.id);
    }
  }

  let isDisabled = postValue === "";

  if (props.isLoggedIn) {
    if (isPosting) {
      return (
        <div className="newPost">
          <div className="newPostScrim" />
          <TextareaAutosize
            value={postValue}
            readOnly={true}
          />
          <div className="newPost-postRow">
          <div className="topic">
              # 
              <input
                type="text" 
                placeholder="topic"
                className="topicInput"
                value={topicValue}
                disabled={true}
              />
            </div>
            <div >
              <button 
                className="submitButton"
                disabled={true}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="newPost">
          <TextareaAutosize
            value={postValue}
            onChange={e => setPostValue(e.target.value)}
            rows="1" 
            placeholder="What do you have to say?" 
          />
          <div className="newPost-postRow">
            <div className="topic"
              style={{color: topicValue  && "rgb( 80, 162, 255)" }}
            >
              # 
              <input
                type="text" 
                placeholder="topic"
                className="topicInput"
                value={topicValue}
                onChange={e => onTopicChanged(e)}
              />
            </div>
            <div >
              <button 
                className="submitButton"
                disabled={isDisabled} 
                onClick={onPostButtonClicked}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )
    }
  } else {
    return (<div className="darkRow">Connect your wallet to start posting...</div>)
  }
};
