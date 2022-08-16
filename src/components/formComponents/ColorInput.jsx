import React, { useState, useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';

const ColorInput = ({ id, label, value, onColorChange, onInputChange }) => {
  // Close dropdown on click outside using useRef
  const wrapperRef = useRef(null);
  const [swatchVisible, setSwatchVisible] = useState(false);

  useEffect(() => {
    const onClickOutside = () => {
      setSwatchVisible(false);
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

  return (
    <div
      className='w-full border border-inputBorder rounded relative flex items-center px-3 py-1'
      ref={wrapperRef}
    >
      <SketchPicker
        color={value}
        onChange={(color) => onColorChange(color)}
        className={`${
          swatchVisible ? 'visible' : 'hidden'
        } absolute top-10 left-0 z-30`}
      />
      <span
        className='w-5 h-5 rounded cursor-pointer border border-inputBorder'
        style={{ backgroundColor: value }}
        onClick={() => setSwatchVisible(!swatchVisible)}
      ></span>
      <input
        type='text'
        id={id}
        value={value ? value : ''}
        onChange={onInputChange}
        onFocus={() => setSwatchVisible(true)}
        className='w-full focus:outline-none px-3 py-1 text-sm tracking-wider text-gray-700 uppercase'
      />
      <span className='text-xs font-medium absolute -top-2.5 left-2 bg-white px-1 text-gray-400'>
        {label}
      </span>
    </div>
  );
};

export default ColorInput;
