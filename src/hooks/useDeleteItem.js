import { deleteData } from "./useFetch";

const useDeleteItem = () => {
  const deleteItem = async (type, id) => {
    return await deleteData(`https://jsonplaceholder.typicode.com/${type}/${id}`);
  };

  return { deleteItem };
};

export default useDeleteItem;