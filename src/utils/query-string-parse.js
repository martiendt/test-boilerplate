/**
 * Query string parse string from request to filter mongodb
 * field selection, paging, sorting, filtering
 * fields   => fields(fields, restrictedFields)
 * filter   => filter(obj)
 * skip     => skip(val)
 * limit    => limit(val)
 * sort     => sort(fields)
 */
function fields(fields = "", restrictedFields = []) {
  const obj = {};
  if (fields) {
    /**
     * Convert string to array
     * ex: 'username, firstName, lastName => ['username', 'firstName', 'lastName']
     */
    let arrayOfFields = fields.split(",");
    arrayOfFields = filterRestrictedFields(arrayOfFields, restrictedFields);

    /**
     * Convert array to object
     * ex:['username', 'firstName', 'lastName'] to { username: 1, firstName: 1, lastName: 1 }
     */

    for (let i = 0; i < arrayOfFields.length; i++) {
      obj[`${arrayOfFields[i].trim()}`] = 1;
    }
  }
  /**
   * Remove restricted fields
   * ex: { password: 0 }
   */
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    for (let i = 0; i < restrictedFields.length; i++) {
      obj[`${restrictedFields[i].trim()}`] = 0;
    }
  }

  return obj;
}
function filter(obj) {
  if (obj === undefined) return {};
  if (obj && typeof obj === "string") {
    obj = JSON.parse(obj);
  }
  /**
   * Query Selectors | Comparison
   *
   * | Name                                                                               | Description                                                         |
   * | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
   * | [`$eq`](https://docs.mongodb.com/manual/reference/operator/query/eq/#op._S_eq)     | Matches values that are equal to a specified value.                 |
   * | [`$gt`](https://docs.mongodb.com/manual/reference/operator/query/gt/#op._S_gt)     | Matches values that are greater than a specified value.             |
   * | [`$gte`](https://docs.mongodb.com/manual/reference/operator/query/gte/#op._S_gte)  | Matches values that are greater than or equal to a specified value. |
   * | [`$in`](https://docs.mongodb.com/manual/reference/operator/query/in/#op._S_in)     | Matches any of the values specified in an array.                    |
   * | [`$lt`](https://docs.mongodb.com/manual/reference/operator/query/lt/#op._S_lt)     | Matches values that are less than a specified value.                |
   * | [`$lte`](https://docs.mongodb.com/manual/reference/operator/query/lte/#op._S_lte)  | Matches values that are less than or equal to a specified value.    |
   * | [`$ne`](https://docs.mongodb.com/manual/reference/operator/query/ne/#op._S_ne)     | Matches all values that are not equal to a specified value.         |
   * | [`$nin`](https://docs.mongodb.com/manual/reference/operator/query/nin/#op._S_nin)  | Matches none of the values specified in an array.                   |
   *
   * Query Selectors | Logical
   *
   * | Name                                                                              | Description                                                                                                 |
   * | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
   * | [`$and`](https://docs.mongodb.com/manual/reference/operator/query/and/#op._S_and) | Joins query clauses with a logical `AND` returns all documents that match the conditions of both clauses.   |
   * | [`$not`](https://docs.mongodb.com/manual/reference/operator/query/not/#op._S_not) | Inverts the effect of a query expression and returns documents that do *not* match the query expression.    |
   * | [`$nor`](https://docs.mongodb.com/manual/reference/operator/query/nor/#op._S_nor) | Joins query clauses with a logical `NOR` returns all documents that fail to match both clauses.             |
   * | [`$or`](https://docs.mongodb.com/manual/reference/operator/query/or/#op._S_or)    | Joins query clauses with a logical `OR` returns all documents that match the conditions of either clause.   |
   *
   * Query Selectors | Element
   *
   * | Name                                                                                       | Description                                            |
   * | :----------------------------------------------------------------------------------------- | :----------------------------------------------------- |
   * | [`$exists`](https://docs.mongodb.com/manual/reference/operator/query/exists/#op._S_exists) | Matches documents that have the specified field.       |
   * | [`$type`](https://docs.mongodb.com/manual/reference/operator/query/type/#op._S_type)       | Selects documents if a field is of the specified type. |
   */
  const keysToUpdate = {
    ":like": "$regex",
    ":lt": "$lt",
    ":lte": "$lte",
    ":gt": "$gt",
    ":gte": "$gte",
    ":eq": "$eq",
    ":ne": "$ne",
    ":in": "$in",
    ":nin": "$nin",
    ":and": "$and",
    ":not": "$not",
    ":nor": "$nor",
    ":or": "$or",
    ":exists": "$exists",
    ":type": "$type",
  };

  const mutableObject = renameAggregator(obj, keysToUpdate);

  return Object.keys(mutableObject)
    .filter((k) => mutableObject[k] != null)
    .reduce((a, k) => ({ ...a, [k]: mutableObject[k] }), {});
}
function skip(val = 0) {
  return parseInt(val);
}
function limit(val = 10) {
  if (val > 1000) {
    val = 1000;
  }
  return parseInt(val);
}
function sort(fields) {
  if (!fields) return null;
  const hash = {};
  let c;
  fields.split(",").forEach(function (field) {
    c = field.charAt(0);
    if (c === "-") field = field.substr(1);
    hash[field.trim()] = c === "-" ? -1 : 1;
  });
  return hash;
}

// Convert String to Number, Date, or Boolean if possible.
function valueType(value) {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  } else if (!isNaN(Number(value))) {
    return Number(value);
  } else if (Date.parse(value)) {
    return new Date(value);
  }

  return value;
}

// remove restricted fields from array
function filterRestrictedFields(arrayOfFields, restrictedFields) {
  return arrayOfFields.filter((val) => !restrictedFields.includes(val.trim()));
}

// rename key to mongodb aggregator
const renameAggregator = (val, keysMap) => {
  if (val == null) return null;
  if (Array.isArray(val)) {
    return val.map((item) => renameAggregator(item, keysMap));
  } else if (typeof val === "object") {
    return Object.keys(val).reduce((obj, key) => {
      const propKey = renameAggregator(key, keysMap);
      const propVal = renameAggregator(val[key], keysMap);
      obj[propKey] = propVal;
      return obj;
    }, {});
  } else if (typeof val === "string") {
    return valueType(keysMap[val]) || valueType(val);
  }
  return val;
};

export default {
  fields,
  filter,
  skip,
  limit,
  sort,
};
