import { useEffect, useRef, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const Dropdown = ({
  list,
  placeholder,
  value,
  setSelectedItem,
  className,
  inputClassname,
  borderColor,
  borderSelectColor,
}) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  // Step 1: populate filtered list with provided list
  useEffect(() => {
    if (list) {
      setFilteredList(list);
    }
  }, [list]);

  // Step 2: Close dropdown on click outside using useRef
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onClickOutside = () => {
      setOpen(false);
    };

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // Step 3: Filter list based on search text
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    let newList = [];
    if (searchText.length > 0) {
      newList = list.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
    } else {
      newList = list;
    }
    setFilteredList(newList);
  };

  // Step 4: Set selected item on click
  const handleListItemClick = (item) => {
    setSelectedItem(item);
    setSearchText(item.name);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`${className} relative`}>
      {/* input search box */}
      <div
        className={`border rounded px-2 py-1 flex ${
          open
            ? borderSelectColor
              ? borderSelectColor
              : 'border-violet-500'
            : borderColor
            ? borderColor
            : 'border-violet-300'
        }`}
      >
        <input
          onFocus={() => setOpen(true)}
          type='text'
          placeholder={placeholder}
          value={searchText ? searchText : value ? value : ''}
          onChange={handleSearchTextChange}
          className={`block outline-none w-full text-sm py-1 ${inputClassname}`}
        />
        <button onClick={() => setOpen(!open)} type='button'>
          {open ? (
            <AiFillCaretUp className='text-gray-600' />
          ) : (
            <AiFillCaretDown className='text-gray-600' />
          )}
        </button>
      </div>
      <ul
        className={`absolute bg-white w-full border border-violet-500 shadow-lg rounded overflow-auto divide-y z-20 transition-all ease-in-out duration-200
                  ${open ? 'block text-sm max-h-32' : 'hidden'}`}
      >
        {filteredList &&
          filteredList.map((item, index) => (
            <li key={index}>
              <button
                type='button'
                onClick={() => handleListItemClick(item)}
                className='w-full hover:bg-gray-50 text-left px-2 py-1'
              >
                <span className='text-sm'>{item.name}</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
