const useQueryParams = (query = null) => {      
    const result = {};
    new URLSearchParams(query||window.location.search).forEach((value, key) => {
      result[key] = value;
    });
    return result;
}

export {useQueryParams}