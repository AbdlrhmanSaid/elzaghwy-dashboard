import api from "@/lib/axios";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const createProduct = async (productData: FormData) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async (id: string, productData: FormData) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
