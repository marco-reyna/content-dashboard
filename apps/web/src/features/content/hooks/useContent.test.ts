import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useContent } from './useContent';
import * as api from '../content.api';
import { createWrapper } from '../../../test-utils';
import type { ContentResponse } from '@content-dashboard/shared';

describe('useContent', () => {
  it('returns data successfully', async () => {
    const mockResponse: ContentResponse = {
      data: [
        {
          id: '1',
          title: 'Test',
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

    const { result } = renderHook(
      () =>
        useContent({
          page: 1,
          limit: 10,
          search: '',
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockResponse);
  });

  it('handles error state', async () => {
    vi.spyOn(api, 'fetchContent').mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(
      () =>
        useContent({
          page: 1,
          limit: 10,
          search: '',
        }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
