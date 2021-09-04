import { paginate } from "#src/utils/response-format/index.js";

describe("Response Format", () => {
  it("should return correct pagination format", () => {
    const result = [];
    const page = 1;
    const totalPerPage = 1;
    const totalDocument = 10;
    const response = paginate(result, page, totalPerPage, totalDocument);
    expect(response).toStrictEqual({
      page: page,
      totalPerPage: totalPerPage,
      totalPage: Math.ceil(totalDocument / totalPerPage),
      totalDocument,
      data: result,
    });
  });
});
