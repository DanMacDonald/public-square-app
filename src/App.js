import React from 'react';
import { Routes, Route, Outlet, useParams, useNavigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { WalletSelectButton } from './components/WalletSelectButton';
import { NewPost } from './components/NewPost';
import { Posts } from './components/Posts';
import { ProgressSpinner } from './components/ProgressSpinner';
import { TopicSearch } from './components/TopicSearch';
import { UserSearch } from './components/UserSearch';
import { arweave, buildQuery, createPostInfo, delay, delayResults } from './lib/api';
import './App.css';

async function waitForUpdatedPosts(txid) {
  let count = 0;
  let foundPost = null;
  let posts = [];

  while (!foundPost) {
    count += 1;
    console.log(`attempt ${count}`);
    await delay(2000 * count);
    posts = await getPostInfos();
    foundPost = posts.find(p => p.txid === txid);
  }

  let i = posts.indexOf(foundPost);
  posts.unshift(posts.splice(i,1)[0]);
  return posts;
}

async function getPostInfos() {
  return [];
}

const App = () => {
  return (
    <div id="app">
      <div id="content">
        <aside>
          <Navigation />
        </aside>
        <main>
          <Routes>
            <Route path="/" name="home" element={
            <Home 

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
      {props.isSearching && <ProgressSpinner />}
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
  const [topicPostInfos, setTopicPostInfos] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const { topic } = useParams();
  const navigate = useNavigate();

  const onTopicSearch = (topic) => {
    navigate(`/topics/${topic}`);
  }

  React.useEffect(() => {
    setIsSearching(true);
    setTopicPostInfos([]);
    try {
      getPostInfos(null,topic).then(posts => { 
        setTopicPostInfos(posts);
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
    <Posts postInfos={topicPostInfos} />
    </>
  )
}

function UserResults() {
  const [userPostInfos, setUserPostInfos] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const { addr } = useParams();
  const navigate = useNavigate();

  const onUserSearch = (address) => {
    navigate(`/users/${address}`);
  }

  React.useEffect(() => {
    setIsSearching(true);
    try {
      getPostInfos(addr).then(posts => { 
        setUserPostInfos(posts); 
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
    <Posts postInfos={userPostInfos} />
    </>
  );
};

export default App;