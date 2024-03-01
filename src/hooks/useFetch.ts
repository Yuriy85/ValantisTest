import { useState } from 'react';

export default function useFetch<T>(
  callback: (...arg: T[]) => Promise<void>
): [(...arg: T[]) => Promise<void>, boolean, Error | null] {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const checkedFunction = async (...arg: T[]) => {
    setLoading(true);

    try {
      await callback(...arg);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return [checkedFunction, loading, error];
}
