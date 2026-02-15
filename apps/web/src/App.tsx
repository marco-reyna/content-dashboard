import { useState, useEffect } from 'react';
import { useContent } from './features/content/hooks/useContent';
import { ContentList } from './features/content/components/ContentList';
import { SearchInput } from './features/content/components/SearchInput';
import { useDebounce } from './hooks/useDebounce';

const LIMIT = 10;

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useContent({
    page,
    limit: LIMIT,
    search: debouncedSearch,
  });

  return (
    <div style={{ padding: 24 }}>
      <h1>Content Dashboard</h1>

      <SearchInput value={search} onChange={setSearch} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}

      {data && (
        <>
          <ContentList items={data.data} />

          <div style={{ marginTop: 16 }}>
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Previous
            </button>

            <span style={{ margin: '0 8px' }}>
              Page {data.page} of {data.totalPages}
            </span>

            <button
              disabled={page === data.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
