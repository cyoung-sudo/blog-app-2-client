// Return page content given all items
export const handlePagination = (items, page, max) => {
  let startIdx = (page - 1) * max;
  let endIdx = startIdx + max;
  return items.slice(startIdx, endIdx);
};