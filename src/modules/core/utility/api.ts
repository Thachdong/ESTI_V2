export const convertParamsToQueryString = (params: any) =>
  Object.keys(params).reduce(
    (queryString: string, key: string) =>
      queryString + `${key}=${params[key]}&`,
    "?"
  );
