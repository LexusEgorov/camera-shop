export function generator () {
  let number = 1;
  return function () {
    return number++;
  };
}

export const deleteParameter = (params: URLSearchParams, queryParameter: string, value: string) : URLSearchParams => {
  if(params.getAll(queryParameter).length === 1){
    params.delete(queryParameter);
    return params;
  }

  let deleteIndex = 0;
  const convertedParams = [...params];
  for(const parameter of convertedParams){
    if(parameter[0] === queryParameter && parameter[1] === value){
      break;
    }

    deleteIndex++;
  }

  return new URLSearchParams(convertedParams.slice(0, deleteIndex).concat(convertedParams.slice(deleteIndex + 1)));
};

export const updateParameter = (currentState: boolean, params: URLSearchParams, queryParameter: string, value: string) : URLSearchParams => {
  if(!currentState){
    if(params.has(queryParameter)){
      params.append(queryParameter, value);
      return params;
    }

    params.set(queryParameter, value);
    return params;
  }

  return deleteParameter(params, queryParameter, value);
};
