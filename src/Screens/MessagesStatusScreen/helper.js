const searchCities = (query, filteredData) => {
  const filtered = filteredData?.filter(listItem =>
    listItem.from.toLowerCase().includes(query.toLowerCase()),
  );

  return filtered;
};

export default searchCities;
