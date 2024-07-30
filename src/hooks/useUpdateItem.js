import useFetch from "./useFetch";

const useUpdateItem = () => {
  const { updateData } = useFetch();

  const updateItem = async (type, updatedItem) => {
    return await updateData(`https://jsonplaceholder.typicode.com/${type}/${updatedItem.id}`, updatedItem);
  };

  return { updateItem };
};

export default useUpdateItem;
