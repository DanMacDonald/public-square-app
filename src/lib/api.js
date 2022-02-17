export const isWellFormattedAddress = (input) => {
  const re = /^[a-zA-Z0-9_]{43}$/;
  return re.test(input);
}

export const createPost = (node) => {
  const ownerAddress = node.owner.address;
  const height = node.block ? node.block.height : -1;
  const topicTag = node.tags && node.tags.find((a) => a.name === 'Topic');
  const topic = topicTag ? topicTag.value : null;
  const timestamp = node.block ? parseInt(node.block.timestamp, 10) * 1000 : -1;
  return {
    txid: node.id,
    owner: ownerAddress,
    request: null,
    topic: topic,
    height: height,
    length: node.data.size,
    timestamp: timestamp,
  }
}

export const buildQuery = ({count, address, topic}) => {
  
  count = Math.min(100, count || 100);
  
  let ownersFilter = '';
  if (address) {
    ownersFilter = `owners: ["${address}"],`
  }

  let topicFilter = '';
  if (topic) {
    topicFilter = `{
      name: "Topic",
      values: ["${topic}"]
    },`
  }

  return { query: `{
    transactions(first: ${count}, ${ownersFilter}
      tags: [
        {
          name: "App-Name",
          values: ["PublicSquare"]
        },
        {
          name: "Content-Type",
          values: ["text/plain"]
        },
        ${topicFilter}
      ]
    ) {
      edges {
        node {
          id
          owner {
            address
          }
          data {
            size
          }
          block {
            height
            timestamp
          }
          tags {
            name,
            value
          }
        }
      }
    }
  }`}
}

// in miliseconds
var units = {
  year  : 24 * 60 * 60 * 1000 * 365,
  month : 24 * 60 * 60 * 1000 * 365/12,
  day   : 24 * 60 * 60 * 1000,
  hour  : 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}

var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export const getRelativeTime = (ts1, ts2) => {
  var elapsed = ts1 - ts2
  // "Math.abs" accounts for both "past" & "future" scenarios
  for (var u in units) 
    if (Math.abs(elapsed) > units[u] || u === 'second') 
      return rtf.format(Math.round(elapsed/units[u]), u)
}

export const getPostTime = (timestamp) => {
  if (timestamp < 0) {
    return "pending...";
  }
  return getRelativeTime(timestamp, Date.now());
}

export const abbreviateAddress = (address) => {
  if (!address)
    return address;
  const firstFive = address.substring(0,5);
  const lastFour = address.substring(address.length-4);
  return `${firstFive}..${lastFour }`;
}

export const delay = (t) => {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, t);
  });
}

export const waitToDisplay = (results) => {
  return delay(300).then(function() {
    return results;
  });
}