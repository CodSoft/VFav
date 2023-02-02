export const login = async (apiCall: any, data: any) => {
  const res = await apiCall({
    customUrl: true,
    type: 'POST',
    url: 'https://dummyjson.com/auth/login',
    data: data,
  });
  return res;
};
