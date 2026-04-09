import styled from 'styled-components';
import { Logo } from './Logo';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
