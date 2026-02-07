"use client";
import { useOrders } from "@/hooks/useOrders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import OrderDetailsPopUp from "./OrderDetailsPopUp";

const statusConfig: any = {
  معلق: { color: "bg-yellow-100 text-yellow-700", label: "معلق" },
  "جاري التجهيز": { color: "bg-blue-100 text-blue-700", label: "جاري التجهيز" },
  "تم التوصيل": { color: "bg-green-100 text-green-700", label: "تم التوصيل" },
  ملغي: { color: "bg-red-100 text-red-700", label: "ملغي" },
};

export default function OrdersTable() {
  const { orders, isLoading } = useOrders();

  if (isLoading)
    return <div className="p-10 text-center">جاري تحميل الطلبات...</div>;

  return (
    <div className="rounded-md border bg-white overflow-hidden" dir="rtl">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="text-right">رقم الطلب</TableHead>
            <TableHead className="text-right">العميل</TableHead>
            <TableHead className="text-right">التاريخ</TableHead>
            <TableHead className="text-right">المنطقة</TableHead>
            <TableHead className="text-right">الإجمالي</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-center">التفاصيل</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order: any) => (
            <TableRow key={order._id}>
              <TableCell className="font-mono text-xs">
                {order.orderNumber}
              </TableCell>
              <TableCell>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-xs text-slate-500">{order.phone}</div>
              </TableCell>
              <TableCell className="text-xs">
                {format(new Date(order.createdAt), "dd MMMM yyyy", {
                  locale: ar,
                })}
              </TableCell>
              <TableCell>{order.area}</TableCell>
              <TableCell className="font-bold text-blue-600">
                {order.totalAmount} ج.م
              </TableCell>
              <TableCell>
                <Badge
                  className={`${statusConfig[order.status]?.color} border-none`}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <OrderDetailsPopUp order={order} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
