import styles from './MultiSelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { useEffect, useRef, useState } from 'react';
import { fetchData, search } from '../state/multiSelect/multiSelectSlice';
import SearchResults from './SearchResults';
import SelectedItemName from './SelectedItemName';
import MagnifyingGlass from './MagnifyingGlass';

const MultiSelect = () => {
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { selected, searchInput } = useSelector(
    (state: RootState) => state.multiSelect
  );

  let timeout: number;
  const debouncedDispatch = (input: string) => {
    clearTimeout(timeout);
    const fetchDataWithDelay = () => {
      dispatch(fetchData(input));
    };
    timeout = setTimeout(fetchDataWithDelay, 600);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  // fetching data
  useEffect(() => {
    debouncedDispatch(searchInput);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  // handling visibility
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      onFocus={() => {
        setIsVisible(true);
      }}
      className={styles.main}
      ref={containerRef}
    >
      <div className={styles['search-container']}>
        <ul className={styles['selected-list']}>
          {selected.map((item) => {
            return <SelectedItemName key={item.id} {...item} />;
          })}
        </ul>
        <div className={styles['search-input']}>
          <input
            type="text"
            value={searchInput}
            placeholder="Start searching"
            onChange={(e) => {
              dispatch(search(e.target.value));
            }}
            tabIndex={0}
          />
          <MagnifyingGlass />
        </div>
      </div>
      <SearchResults isVisible={isVisible} />
    </div>
  );
};
export default MultiSelect;
