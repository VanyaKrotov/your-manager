export interface PasswordsFilter {
  active: number;
  query: string;
}

export type UsePasswordsFilterChange = (
  values: Partial<PasswordsFilter>
) => void;
