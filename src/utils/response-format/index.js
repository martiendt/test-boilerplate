export function paginate(result, page, totalPerPage, totalDocument) {
  return {
    page: page,
    totalPerPage: totalPerPage,
    totalPage: Math.ceil(totalDocument / totalPerPage),
    totalDocument,
    data: result,
  };
}
