import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DropdownOption } from './DropdownOption';

export function CustomSelect({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = useCallback(() => setIsOpen((o) => !o), []);

  const handleSelect = useCallback(
    (val) => {
      onChange(val);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      onChange('');
    },
    [onChange]
  );

  return (
    <SelectContainer ref={ref}>
      <SelectTrigger onClick={handleToggle}>
        <SelectValue $hasValue={!!value}>{value || placeholder}</SelectValue>
        {value ? (
          <ClearIcon
            onClick={handleClear}
            aria-label={`Clear ${placeholder}`}
            title={`Clear ${placeholder}`}
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9 3L3 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </ClearIcon>
        ) : (
          <Chevron $isOpen={isOpen}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Chevron>
        )}
      </SelectTrigger>

      {isOpen && (
        <DropdownList>
          <DropdownOption optValue="" selected={!value} onSelect={handleSelect}>
            {placeholder}
          </DropdownOption>
          {options.map((opt) => (
            <DropdownOption
              key={opt}
              optValue={opt}
              selected={value === opt}
              onSelect={handleSelect}
            >
              {opt}
            </DropdownOption>
          ))}
        </DropdownList>
      )}
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const inputBase = `
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 10px;
  padding: 0 14px;
  color: #fff;
  font-size: 14px;
  height: 40px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s, background 0.15s;
`;

const SelectTrigger = styled.div`
  ${inputBase}
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #334466;
  }
`;

const SelectValue = styled.span`
  color: ${({ $hasValue }) => ($hasValue ? '#fff' : '#b3b3b3')};
  font-size: 14px;
  text-transform: capitalize;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Chevron = styled.span`
  display: flex;
  align-items: center;
  color: #b3b3b3;
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform 0.15s;
`;

const ClearIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b3b3b3;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: color 0.15s;
  flex: 0 0 auto;

  &:hover {
    color: #83bf46;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #ffffff;
  border-radius: 10px;
  overflow-y: auto;
  max-height: 208px;
  z-index: 100;
  list-style: none;
  margin: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
`;
