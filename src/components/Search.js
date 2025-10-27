import React from 'react';
import { Input } from 'antd';


const { Search: AntSearch } = Input; // rename to avoid conflict

const Search = ({ value, onChange }) => (
  <AntSearch
    placeholder="Search by name..."
    allowClear
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default Search;
