export const paginationMeta = (
  totalData: number,
  page: number,
  limit: number
) => {
  const totalPages =
    Math.ceil(
      totalData / limit
    );

  return {
    totalData,

    totalPages,

    currentPage: page,

    limit
  };
};