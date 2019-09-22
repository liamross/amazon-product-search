import {Button, InputGroup} from '@blueprintjs/core';
import React, {ChangeEvent, FC, KeyboardEvent, useCallback} from 'react';

interface SearchProps {
  onChange: (newValue: string) => void;
  value: string;
  onSearch?: () => void;
}

const Search: FC<SearchProps> = ({onChange, onSearch, value}) => {
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && onSearch) onSearch();
    },
    [onSearch],
  );

  return (
    <InputGroup
      className="Search"
      type="search"
      leftIcon="search"
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
      value={value}
      rightElement={
        <Button type="submit" className="Search__search_button" minimal icon="arrow-right" onClick={onSearch} />
      }
    />
  );
};

export default Search;
