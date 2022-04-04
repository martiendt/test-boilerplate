import Factory from "./index.js";
import { modelCreate } from "#src/modules/user/model.js";
export default class ItemFactory extends Factory {
  constructor() {
    super();
    this.modelCreate = modelCreate;
  }
  definition() {
    return {
      name: "Item A",
      quantity: 5,
    };
  }
}
