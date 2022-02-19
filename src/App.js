import React from 'react';
import { Routes, Route, Outlet, useParams, useNavigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { WalletSelectButton } from './components/WalletSelectButton';
import { NewPost } from './components/NewPost';
import { Posts } from './components/Posts';
import { ProgressSpinner } from './components/ProgressSpinner';
import { TopicSearch } from './components/TopicSearch';
import { UserSearch } from './components/UserSearch';
import { buildQuery, createPost, delay } from './lib/api';
import './App.css';

import Arweave from 'arweave';
const arweave = Arweave.init({});

async function waitForNewPosts(txid) {
  let count = 0;
  let foundPost = null;
  let posts = [];

  while (!foundPost) {
    count += 1;
    console.log(`attempt ${count}`);
    await delay(2000 * count);
    posts = await getPosts();
    foundPost = posts.find(p => p.height === -1 && p.txid === txid);
  }

  let i = posts.indexOf(foundPost);
  posts.unshift(posts.splice(i,1)[0]);
  return posts;
}

async function getPosts(ownerAddress, topic) {
  const query = buildQuery({address: ownerAddress, topic});
  const results = await arweave.api.post('/graphql', query)
    .catch(err => {
      console.log(`GraphQL query failed - ${err}`);
    });
  let edges = results.data.data.transactions.edges;
  return Promise.all(edges.map( edge => createPost(edge.node)));
}

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);
  const [postItems, setPostItems] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  async function waitForPost(txid) {
    setIsSearching(true)
    let items = await waitForNewPosts(txid);
    setPostItems(items)
    setIsSearching(false);
  }

  React.useEffect(() => {
    setIsSearching(true)
    getPosts().then(items => { 
      setPostItems(items);
      setIsSearching(false);
    });
  }, [])

  return (
    <div id="app">
      <div id="content">
        <aside>
          <Navigation />
          <WalletSelectButton onWalletConnect={() => setIsWalletConnected(true)} />
        </aside>
        <main>
          <Routes>
            <Route path="/" name="home" element={
              <Home 
                isWalletConnected={isWalletConnected}
                isSearching={isSearching}
                postItems={postItems}
                onPostMessage={waitForPost}
              />}
            />
            <Route path="/topics" element={<Topics />}>
              <Route path="/topics/" element={<TopicSearch />} />
              <Route path=":topic" element={<TopicResults />} />
            </Route>
            <Route path="/users" element={<Users />}>
              <Route path="/users/" element={<UserSearch />} />
              <Route path=":addr" element={<UserResults />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
};

const Home = (props) => {
  return (
    <>
      <header>Home</header>
      <NewPost isLoggedIn={props.isWalletConnected} onPostMessage={props.onPostMessage} />
      {props.isSearching && <ProgressSpinner />}
      <Posts postItems={props.postItems} />
    </>
  );
};

const Topics = (props) => {
  return (
    <>
      <header>Topics</header>
      <Outlet />
    </>
  );
};

const Users = () => {
  return (
    <>
      <header>Users</header>
      <Outlet />
    </>
  );
};

const TopicResults = () => {
  const [topicPostItems, setTopicPostitems] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const { topic } = useParams();
  const navigate = useNavigate();

  const onTopicSearch = (topic) => {
    navigate(`/topics/${topic}`);
  }

  React.useEffect(() => {
    setIsSearching(true);
    setTopicPostitems([]);
    try {
      getPosts(null,topic).then(items => { 
        setTopicPostitems(items);
        setIsSearching(false);
      });
    } catch (error) {
      console.logErrorg(error);
      setIsSearching(false);
    }
  }, [topic])
  return (
    <>
    <TopicSearch searchInput={topic} onSearch={onTopicSearch}/>
    {isSearching && <ProgressSpinner />}
    <Posts postItems={topicPostItems} />
    </>
  )
}

function UserResults() {
  const [userPostItems, setUserPostItems] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const { addr } = useParams();
  const navigate = useNavigate();

  const onUserSearch = (address) => {
    navigate(`/users/${address}`);
  }

  React.useEffect(() => {
    setIsSearching(true);
    try {
      getPosts(addr).then(items => { 
        setUserPostItems(items); 
        setIsSearching(false);
      });
    } catch (error) {
      console.logErrorg(error);
      setIsSearching(false);
    }
  }, [addr])
  return (
    <>
    <UserSearch searchInput={addr} onSearch={onUserSearch}/>
    {isSearching && <ProgressSpinner />}
    <Posts postItems={userPostItems} />
    </>
  );
};

export default App;