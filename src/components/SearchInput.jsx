import React from 'react';

export const SearchInput = (props) => {
	const [searchInput, setSearchInput] = React.useState(props.searchInput);
	const [isDisabled, setIsDisabled] = React.useState(true);
	const onSearchInputChange = (e) =>  {
    let input = e.target.value;
	  let isInputValid = false;
    if (props.onInputChanged) {
      input = props.onInputChanged(e);
    }

	  if (props.isInputValid) {
		  isInputValid = props.isInputValid(e.target.value);
	  }
    setSearchInput(input);
	  setIsDisabled(!isInputValid)
	}
  
	function onSearchRequested() {
	  if (props.onSearch) {
		props.onSearch(searchInput);
	  }
	}
  
	return (
	  <div className="searchInput">
		<div className="searchIcon"> {props.icon} </div>
		<input placeholder={props.prompt} value={searchInput} onChange={onSearchInputChange} spellCheck="false"/>
		<div className="searchButton">
		  <button className="submitButton"
			onClick={onSearchRequested}
			disabled={isDisabled}
			>
			Search
		  </button>
		</div>
	  </div>
	)
  }