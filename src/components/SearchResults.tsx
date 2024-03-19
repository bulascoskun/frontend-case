import { useSelector } from 'react-redux';
import SearchResultCard from './SearchResultCard';
import { RootState } from '../state/store';

import styles from './SearchResults.module.css';

const SearchResults = ({ isVisible }: { isVisible: boolean }) => {
  const { isLoading, searchResults, errorMessage } = useSelector(
    (state: RootState) => state.multiSelect
  );

  if (isLoading) {
    return (
      <div
        className={`${styles['loading']} ${isVisible ? styles.visible : ''}`}
      >
        Loading...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div
        className={`${styles['loading']} ${isVisible ? styles.visible : ''}`}
      >
        {errorMessage || 'There was an error :('}
      </div>
    );
  }

  return (
    <div
      className={`${styles['search-results']} ${
        isVisible ? styles.visible : ''
      }`}
    >
      <ul tabIndex={0}>
        {searchResults.map((item, index) => {
          return <SearchResultCard {...item} key={item.id} index={index} />;
        })}
      </ul>
    </div>
  );
};

export default SearchResults;
