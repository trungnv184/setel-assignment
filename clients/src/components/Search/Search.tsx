import { SearchInput, StyledSearchWrapper } from './Search.style';

type SearchProps = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Search: React.FC<SearchProps> = ({ onSearch }) => {
  return (
    <StyledSearchWrapper>
      <SearchInput fluid={true} icon="search" placeholder="Search books..." onChange={onSearch} />
    </StyledSearchWrapper>
  );
};

export default Search;
