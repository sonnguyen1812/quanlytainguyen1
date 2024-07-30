
import useFetch from "./useFetch";

const useCreateItem = () => {
  const { createData } = useFetch();

  const createItem = async (type, newItem) => {
    return await createData(`https://jsonplaceholder.typicode.com/${type}`, newItem);
  };

  return { createItem };
};

export default useCreateItem;
