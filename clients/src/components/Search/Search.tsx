import { Input } from 'semantic-ui-react';
import { SearchInput, StyledSearchWrapper } from './Search.style';

type SearchProps = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Search: React.FC<SearchProps> = ({ onSearch }) => {
  return (
    <StyledSearchWrapper>
      <SearchInput fluid icon="search" placeholder="Search books..." onChange={onSearch} />
    </StyledSearchWrapper>
  );
};

export default Search;
