import api from "@/lib/axios";

export const getOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const updateOrderStatus = async (
  orderNumber: string,
  status: string,
) => {
  const { data } = await api.put(`/orders/${orderNumber}`, { status });
  return data;
};
