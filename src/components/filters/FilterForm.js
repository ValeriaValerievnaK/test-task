import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';
import { CustomSelect } from './CustomSelect';

const API_BASE = 'https://rickandmortyapi.com/api/character/';

const STATUS_OPTIONS = ['alive', 'dead', 'unknown'];
const GENDER_OPTIONS = ['female', 'male', 'genderless', 'unknown'];

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

  const handleSpeciesChange = useCallback(
    (e) => setSpecies(e.target.value),
    []
  );
  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleTypeChange = useCallback((e) => setType(e.target.value), []);

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
            onChange={handleSpeciesChange}
            onKeyDown={handleKeyDown}
            placeholder="Species"
          />
        </Field>
      </Row>

      <Row>
        <Field>
          <StyledInput
            value={name}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            placeholder="Name"
          />
        </Field>
        <Field>
          <StyledInput
            value={type}
            onChange={handleTypeChange}
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

const StyledInput = styled.input`
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
