import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as api from './features/content/content.api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ContentResponse } from '@content-dashboard/shared';

function createTestClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
}

function renderWithClient(ui: React.ReactElement) {
  const client = createTestClient();
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
}

describe('Content Dashboard UI', () => {
  it('renders fetched content', async () => {
    const mockResponse: ContentResponse = {
      data: [
        {
          id: '1',
          title: 'Article 1',
          body: 'Body',
          author: 'Author',
          createdAt: new Date().toISOString(),
        },
      ],
      total: 1,
      page: 1,
      totalPages: 1,
    };

    vi.spyOn(api, 'fetchContent').mockResolvedValue(mockResponse);

    renderWithClient(<App />);

    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
    });
  });

  it('filters results when searching', async () => {
    const mockResponse: ContentResponse = {
      data: [
        {
          id: '2',
          title: 'Filtered Article',
          body: 'Body',
          author: 'Author',
          createdAt: new Date().toISOString(),
        },
      ],
      total: 1,
      page: 1,
      totalPages: 1,
    };

    vi.spyOn(api, 'fetchContent').mockResolvedValue(mockResponse);

    renderWithClient(<App />);

    const input = screen.getByPlaceholderText('Search articles...');

    await userEvent.type(input, 'Filtered');

    await waitFor(() => {
      expect(screen.getByText('Filtered Article')).toBeInTheDocument();
    });
  });

  it('handles pagination click', async () => {
    const mockResponse: ContentResponse = {
      data: [
        {
          id: '3',
          title: 'Page 2 Article',
          body: 'Body',
          author: 'Author',
          createdAt: new Date().toISOString(),
        },
      ],
      total: 1,
      page: 2,
      totalPages: 2,
    };

    vi.spyOn(api, 'fetchContent').mockResolvedValue(mockResponse);

    renderWithClient(<App />);

    const nextButton = await screen.findByText('Next');

    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Page 2 Article')).toBeInTheDocument();
    });
  });
});
