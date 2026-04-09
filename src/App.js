import styled from 'styled-components';
import {
  Pagination,
  ItemsGrid,
  useData,
  Header,
  AppState,
  FilterForm
} from './components';

export function App() {
  const { isFetching, isError } = useData();

  return (
    <Main>
      <TopSection>
        <Header />

        <FilterForm />
      </TopSection>

      <AppState />

      {!isFetching && !isError && (
        <>
          <ItemsGrid />

          <Pagination />
        </>
      )}
    </Main>
  );
}

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 100px;

  @media (max-width: 1200px) {
    padding: 20px 0;
    max-width: 95%;
    margin: 0 auto;
  }

  @media (max-width: 930px) {
    max-width: 85%;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;
