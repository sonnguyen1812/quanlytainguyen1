import { createData } from "./useFetch";

const useCreateItem = () => {
  const createItem = async (type, newItem) => {
    return await createData(`https://jsonplaceholder.typicode.com/${type}`, newItem);
  };

  return { createItem };
};

export default useCreateItem;