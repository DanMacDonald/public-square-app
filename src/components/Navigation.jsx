import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom"


export const Navigation = () => {
  const location = useLocation();

  let elephantIcon = <svg viewBox="0 0 36 36" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
    <path d="M34.453,15.573C33.589,8.273 28.724,5.126 20.523,5.126C20.132,5.126 19.76,5.143 19.384,5.157C19.372,5.148 19.363,5.138 19.352,5.128C19.461,5.26 23.964,10.714 21,16.641C17.395,23.852 10.414,22.641 9,22.641C8,22.641 7,20.641 9,20.641C12.162,20.641 17,20.641 20,15.641C22.97,10.692 19.423,5.237 19.351,5.128L19.349,5.126C14.655,1.605 4.091,2.779 1.745,6.3C-1.51,11.183 0.571,28.6 1.745,30.946C2.918,33.296 6.439,34.467 7.613,33.296C8.787,32.12 7.613,32.12 6.44,29.775C5.59,28.074 5.974,23.916 6.695,21.304C6.723,21.472 6.763,21.626 6.795,21.79C7.185,24.661 8.788,29.202 8.788,31.534C8.788,35.098 10.89,35.641 13.482,35.641C16.075,35.641 18.177,35.098 18.177,31.534C18.177,31.294 18.169,31.071 18.165,30.839C18.922,30.903 19.7,30.946 20.524,30.946C21.021,30.946 21.501,30.93 21.972,30.907C21.968,31.116 21.959,31.317 21.959,31.534C21.959,35.098 24.062,35.641 26.653,35.641C29.246,35.641 31.348,35.098 31.348,31.534C31.348,29.733 32.54,26.909 33.387,24.552C33.546,24.198 33.678,23.82 33.807,23.435C33.925,24.742 34,26.141 34,27.641C34,28.194 34.447,28.641 35,28.641C35.553,28.641 36,28.194 36,27.641C36,22.488 35.229,18.393 34.453,15.573ZM6.5,12.641C7.328,12.641 8,13.313 8,14.141C8,14.969 7.328,15.641 6.5,15.641C5.672,15.641 5,14.969 5,14.141C5,13.313 5.672,12.641 6.5,12.641Z" fill="currentColor" />
  </svg>

  let isHome = false;
  let isTopics = false;
  let isUsers = false;

  let homeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>;

  let topicsIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
  </svg>

  let usersIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>

  switch (location.pathname) {
    case '/':
      isHome = true;
      homeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>;
      break;
    case '/topics':
      isTopics = true;
      topicsIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
      </svg>;
      break;
    case '/users':
      isUsers = true;
      usersIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
      break;
    default:
      break;
  }

  return (
    <nav>
      <div className="navHeader">
        {elephantIcon}
        <div className="navLabel" style={{lineHeight: 2.2}}></div>
      </div>
      <Link to="/">
        {homeIcon}
        <div className="navLabel" style={{ fontWeight: isHome ? 700 : 400 }}>Home</div>
      </Link>
      <Link to="/topics">
        {topicsIcon}
        <div className="navLabel" style={{ fontWeight: isTopics ? 700 : 400 }}>Topics</div>
      </Link>
      <Link to="/users">
        {usersIcon}
        <div className="navLabel" style={{ fontWeight: isUsers ? 700 : 400 }}>Users</div>
      </Link>
    </nav>
  );
};
