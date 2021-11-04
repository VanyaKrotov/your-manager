export enum SearchGroup {
  Todo,
  Notes,
  Passwords,
}

export interface SearchFilter {
  query: string;
  groups: SearchGroup[];
}

export type UseSearchChange = (value: Partial<SearchFilter>) => void;

export type UseSearchResult = [SearchFilter, UseSearchChange];
