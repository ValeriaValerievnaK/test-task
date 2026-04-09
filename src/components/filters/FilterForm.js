import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';

const API_BASE = 'https://rickandmortyapi.com/api/character/';

const STATUS_OPTIONS = ['alive', 'dead', 'unknown'];
const GENDER_OPTIONS = ['female', 'male', 'genderless', 'unknown'];

function CustomSelect({ value, onChange, options, placeholder }) {
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
      <SelectTrigger onClick={() => setIsOpen((o) => !o)}>
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
          <DropdownItem $selected={!value} onClick={() => handleSelect('')}>
            {placeholder}
          </DropdownItem>
          {options.map((opt) => (
            <DropdownItem
              key={opt}
              $selected={value === opt}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </SelectContainer>
  );
}

export function FilterForm() {
  const { setApiURL, setActivePage } = useData();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');

  const handleSearch = useCallback(() => {
    const url = new URL(API_BASE);
    if (name.trim()) url.searchParams.set('name', name.trim());
    if (species.trim()) url.searchParams.set('species', species.trim());
    if (type.trim()) url.searchParams.set('type', type.trim());
    if (status) url.searchParams.set('status', status);
    if (gender) url.searchParams.set('gender', gender);
    setActivePage(0);
    setApiURL(url.toString());
  }, [name, species, type, status, gender, setApiURL, setActivePage]);

  const handleReset = useCallback(() => {
    setName('');
    setSpecies('');
    setType('');
    setStatus('');
    setGender('');
    setActivePage(0);
    setApiURL(API_BASE);
  }, [setApiURL, setActivePage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') handleSearch();
    },
    [handleSearch]
  );

  return (
    <FilterContainer>
      <Row>
        <Field>
          <CustomSelect
            value={status}
            onChange={setStatus}
            options={STATUS_OPTIONS}
            placeholder="Status"
          />
        </Field>
        <Field>
          <CustomSelect
            value={gender}
            onChange={setGender}
            options={GENDER_OPTIONS}
            placeholder="Gender"
          />
        </Field>
        <Field>
          <StyledInput
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Species"
          />
        </Field>
      </Row>

      <Row>
        <Field>
          <StyledInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Name"
          />
        </Field>
        <Field>
          <StyledInput
            value={type}
            onChange={(e) => setType(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type"
          />
        </Field>
        <ButtonGroup>
          <SearchButton onClick={handleSearch}>Apply</SearchButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </ButtonGroup>
      </Row>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  background: #001832;
  border-radius: 10px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;

  @media (max-width: 950px) {
    align-items: center;
    width: 100%;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;

  @media (max-width: 530px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 0 0 180px;
  min-width: 0;

  @media (max-width: 950px) {
    flex: 0 0 150px;
  }

  @media (max-width: 530px) {
    flex: none;
    width: 240px;
  }
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

const StyledInput = styled.input`
  ${inputBase}
  text-overflow: ellipsis;

  &:hover {
    background: #334466;
  }

  &:focus {
    border-color: #83bf46;
    background: #334466;
  }

  &::placeholder {
    color: #b3b3b3;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
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

const DropdownItem = styled.li`
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
  text-transform: capitalize;
  color: #000;
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  background: transparent;
  transition: background 0.1s;

  &:hover {
    background: #83bf4633;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex: 0 0 180px;
  min-width: 0;

  & > * {
    flex: 1;
    min-width: 0;
    padding-left: 0;
    padding-right: 0;
    box-sizing: border-box;
  }

  @media (max-width: 950px) {
    flex: 0 0 152px;
  }

  @media (max-width: 530px) {
    flex: none;
    width: 240px;
    flex-direction: column;
    align-items: stretch;

    & > * {
      flex: none;
      width: 100%;
    }
`;

const BaseButton = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  background: transparent;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchButton = styled(BaseButton)`
  border: 1px solid #83bf46;
  color: #83bf46;

  &:hover {
    background: #83bf46;
    color: #fff;
  }
`;

const ResetButton = styled(BaseButton)`
  border: 1px solid #ff5152;
  color: #ff5152;

  &:hover {
    background: #ff5152;
    color: #fff;
  }
`;
