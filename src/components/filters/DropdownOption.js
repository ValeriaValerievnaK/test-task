import { useCallback } from 'react';
import styled from 'styled-components';

export function DropdownOption({ optValue, selected, onSelect, children }) {
  const handleClick = useCallback(() => onSelect(optValue), [
    onSelect,
    optValue
  ]);

  return (
    <DropdownItem $selected={selected} onClick={handleClick}>
      {children}
    </DropdownItem>
  );
}

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
