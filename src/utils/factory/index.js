export default class Factory {
  constructor() {}

  definition() {
    return {};
  }

  count(modelCount) {
    this.modelCount = modelCount;
    return this;
  }

  sequence(modelSequence) {
    this.modelSequence = modelSequence;
    return this;
  }

  state(modelState) {
    this.modelState = modelState;
    return this;
  }

  make() {
    let data;

    if (this.modelCount) {
      data = [];
      for (let i = 0; i < this.modelCount; i++) {
        let payload = this.definition();

        let sequence = {};
        if (this.modelSequence?.length) {
          // sequence is exists
          sequence = this.modelSequence[i % this.modelSequence.length];
        }

        data.push({
          ...payload,
          ...sequence,
          ...this.modelState,
        });
      }
    } else {
      data = {
        ...this.definition(),
        ...this.modelState,
      };
    }

    return data;
  }
  async create() {
    const data = this.make();

    const result = await this.modelCreate(data);

    console.log(result);

    return result;
  }
}
