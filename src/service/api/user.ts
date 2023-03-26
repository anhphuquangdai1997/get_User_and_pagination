import axios from 'axios';

const API_URL = 'https://reqres.in/api/users';

interface GetUsersResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }[];
  total_pages: number;
}

export const getUsers = async (page: number): Promise<GetUsersResponse> => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data;
};