import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchResultCard.module.css';
import { AppDispatch, RootState } from '../state/store';
import {
  addSelectedItem,
  removeSelectedItem,
} from '../state/multiSelect/multiSelectSlice';
import { useEffect, useRef } from 'react';
import boldStringMaker from '../utils/boldStringMaker';

const SearchResultCard = (
  item: Character & {
    index: number;
  }
) => {
  const { index } = item;
  const focusRef = useRef<HTMLLIElement | null>(null);

  const { selected, searchInput } = useSelector(
    (state: RootState) => state.multiSelect
  );
  const dispatch = useDispatch<AppDispatch>();

  const isChecked = selected.some(
    (selectedItem) => selectedItem.id === item.id
  );

  const handleSelectedItem = () => {
    if (!isChecked) {
      dispatch(addSelectedItem(item));
    } else {
      dispatch(removeSelectedItem(item));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!isChecked) {
        dispatch(addSelectedItem(item));
      } else {
        dispatch(removeSelectedItem(item));
      }
    }
  };

  useEffect(() => {}, [selected, item]);

  return (
    <li
      className={`${styles['card']}`}
      onClick={handleSelectedItem}
      onKeyDown={handleKeyDown}
      tabIndex={index}
      ref={focusRef}
    >
      <input type="checkbox" checked={isChecked} readOnly tabIndex={-1} />
      <LazyLoadImage
        className={styles['card-image']}
        alt={item.name}
        src={item.image}
        height="40px"
        width="40px"
      />

      <div className={styles.info}>
        <span
          className={styles.name}
          dangerouslySetInnerHTML={{
            __html: boldStringMaker(searchInput, item.name),
          }}
        ></span>

        <span className={styles.episode}>
          {item.episode.length}{' '}
          {item.episode.length > 1 ? 'Episodes' : 'Episode'}
        </span>
      </div>
    </li>
  );
};
export default SearchResultCard;
