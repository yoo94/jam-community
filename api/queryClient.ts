import { QueryClient } from "@tanstack/react-query";

/**
 * QueryClient 인스턴스를 생성합니다.
 *
 * 기본 옵션:
 * - Queries:
 *   - `staleTime`: 20초 (데이터가 신선하다고 간주되는 시간)
 *   - `retry`: false (쿼리 실패 시 재시도하지 않음)
 * - Mutations:
 *   - `retry`: false (변경 작업 실패 시 재시도하지 않음)
 *
 * React Query의 전역 설정을 관리하기 위해 사용됩니다.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 1000,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
export default queryClient;
