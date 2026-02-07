import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "@/services/orderService";
import toast from "react-hot-toast";

export const useOrders = () => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  const statusMutation = useMutation({
    mutationFn: ({
      orderNumber,
      status,
    }: {
      orderNumber: string;
      status: string;
    }) => updateOrderStatus(orderNumber, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("تم تحديث الحالة بنجاح");
    },
  });

  return {
    orders: ordersQuery.data,
    isLoading: ordersQuery.isLoading,
    updateStatus: statusMutation.mutate,
    isUpdating: statusMutation.isLoading,
  };
};
