import { ApiContext } from 'providers/ApiProvider';
import { useContext } from 'react';

export const useApi = () => useContext(ApiContext);

export default useApi;