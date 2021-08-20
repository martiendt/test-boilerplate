export function paginate(result, page, totalPerPage, totalDocument) {
  return {
    page: page,
    totalPerPage: totalPerPage,
    totalPage: Math.ceil(totalDocument / totalPerPage),
    totalDocument,
    data: result,
  };
}

// Path	/api/v1/plugin/scale-weight/trucks
// Method / Verb : GET / POST
// Status	500
// Duration	242 ms
// IP Address	36.67.224.109
// Memory usage	2 MB
// Payload : {}
// Headers : {}
// Response (Result) : {}
// Duration
