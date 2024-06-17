"use client"
import React, { useState } from 'react';
import { kendra } from '../aws-config';

interface ResultItem {
  DocumentTitle: {
    Text: string;
  };
  DocumentExcerpt: {
    Text: string;
  };
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<ResultItem[]>([]);

  const handleSearch = async () => {
    const params = {
      IndexId: process.env.KENDRA_INDEX_ID!,
      QueryText: query,
    };

    try {
      const data = await kendra.query(params).promise();
      setResults(data.ResultItems as ResultItem[]);
    } catch (error) {
      console.error('Error querying Kendra:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.DocumentTitle.Text}</h3>
            <p>{result.DocumentExcerpt.Text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;