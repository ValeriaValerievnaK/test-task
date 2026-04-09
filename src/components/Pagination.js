import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const handleFirstPage = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(0);
    setApiURL(pages[0]);
  }, [pages, setActivePage, setApiURL]);

  const handlePrevPage = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(activePage - 1);
    setApiURL(pages[activePage - 1]);
  }, [pages, activePage, setActivePage, setApiURL]);

  const handleNextPage = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(activePage + 1);
    setApiURL(pages[activePage + 1]);
  }, [pages, activePage, setActivePage, setApiURL]);

  const handleLastPage = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(pages.length - 1);
    setApiURL(pages[pages.length - 1]);
  }, [pages, setActivePage, setApiURL]);

  useEffect(() => {
    if (!apiURL) return;

    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);

      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [info.pages, apiURL]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {pages[activePage - 1] && (
        <>
          {activePage - 1 !== 0 && (
            <>
              <Page onClick={handleFirstPage}>« First</Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}

          <Page onClick={handlePrevPage}>{activePage}</Page>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {pages[activePage + 1] && (
        <>
          <Page onClick={handleNextPage}>{activePage + 2}</Page>

          {activePage + 1 !== pages.length - 1 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={handleLastPage}>Last »</Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
