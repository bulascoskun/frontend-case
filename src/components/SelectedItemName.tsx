import { useDispatch, useSelector } from 'react-redux';
import styles from './SelectedItemName.module.css';
import { AppDispatch, RootState } from '../state/store';
import { removeSelectedItem } from '../state/multiSelect/multiSelectSlice';

const SelectedItemName = (item: Character) => {
  const { selected } = useSelector((state: RootState) => state.multiSelect);
  const dispatch = useDispatch<AppDispatch>();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      dispatch(removeSelectedItem(item));
    }
  };

  const selectedItemIndex = selected.findIndex(
    (selectedItem) => selectedItem.id === item.id
  );

  return (
    <div
      tabIndex={selectedItemIndex === 0 ? 0 : -1}
      className={styles['selected']}
      key={item.name}
      onClick={() => {
        dispatch(removeSelectedItem(item));
      }}
      onKeyDown={handleKeyPress}
    >
      <span>{item.name}</span>
      <span className={styles.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </div>
  );
};
export default SelectedItemName;
