import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SearchResult from './SearchResult';
import SkeletonSearchResult from './SkeletonSearchResult';

const SearchPeopleInHamburgerMenu = () => {
  const { state } = useLocation();
  const [searchResult, setSearchResult] = useState('');
  const [dataForUserInSearchPeople, setDataForUserInSearchPeople] = useState([]);
  const [showSkeletonSearchResult, setShowSkeletonSearchResult] = useState(true);

  useEffect(() => {
    setDataForUserInSearchPeople(state);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeletonSearchResult(false);
    }, 2000);
  }, []);

  return (
    <div className='container-in-SearchPeopleInHamburgerMenu'>
      <div className='container-header-in-container-in-SearchPeopleInHamburgerMenu'>
        <Link to='/media'><FontAwesomeIcon icon={faChevronLeft} className='icon-arrow-left-in-container-header-in-container-in-SearchPeopleInHamburgerMenu' /></Link>
        <div className='container-search-container-in-SearchPeopleInHamburgerMenu'>
          <FontAwesomeIcon className='icon-search-in-container-search-container-in-SearchPeopleInHamburgerMenu' icon={faMagnifyingGlass} />
          <input autoFocus onChange={(e) => setSearchResult(e.target.value)} type='text' placeholder='Search people' />
        </div>
      </div>
      <div style={{ width: '100%', height: '1px', backgroundColor: '#cacaca', margin: '0', opacity: '.5' }} />
      <div className='container-search-result-in-container-in-SearchPeopleInHamburgerMenu'>
        {
          dataForUserInSearchPeople.dataForUser !== undefined
            ?
            showSkeletonSearchResult
              ?
              dataForUserInSearchPeople.dataForUser.filter((e) => {
                return searchResult !== '' && e.fullname.toLowerCase().includes(searchResult.toLowerCase());
              }).map((e, index) => (
                <SkeletonSearchResult key={index} />
              ))
              :
              dataForUserInSearchPeople.dataForUser.filter((e) => {
                return searchResult !== '' && e.fullname.toLowerCase().includes(searchResult.toLowerCase());
              }).map((e, index) => (
                <SearchResult key={index} image={e.image} fullname={e.fullname} />
              ))
            :
            <></>
        }
        {searchResult === '' && <div className='no-search-result-container'><p style={{ fontSize: '.8rem' }} className='no-search-result'>Users not found.</p></div>}
      </div>
    </div>
  );
}

export default SearchPeopleInHamburgerMenu;