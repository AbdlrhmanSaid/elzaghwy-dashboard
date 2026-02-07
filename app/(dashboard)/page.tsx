"use client";

import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { useAreas } from "@/hooks/useAreas";
import {
  DollarSign,
  ShoppingBag,
  MapPinned,
  Clock,
  PackageCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { orders } = useOrders();
  const { products } = useProducts();
  const { areas } = useAreas();

  // حسابات سريعة
  const totalSales =
    orders?.reduce((acc: number, order: any) => acc + order.totalAmount, 0) ||
    0;
  const pendingOrders =
    orders?.filter((order: any) => order.status === "معلق").length || 0;
  const completedOrders =
    orders?.filter((order: any) => order.status === "وصل").length || 0;

  const stats = [
    {
      title: "إجمالي المبيعات",
      value: `${totalSales.toLocaleString()} ج.م`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "طلبات معلقة",
      value: pendingOrders,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      title: "طلبات مكتملة",
      value: completedOrders,
      icon: PackageCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "عدد المنتجات",
      value: products?.length || 0,
      icon: ShoppingBag,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="p-6 space-y-8" dir="rtl">
      {/* الرأس */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">لوحة التحكم</h1>
        <p className="text-slate-600 mt-2">
          مرحباً بك في نظام إدارة محل الزغوي
        </p>
      </div>

      {/* كروت الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ملخص المناطق */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <MapPinned className="text-orange-600 h-5 w-5" />
            تغطية المناطق
          </h3>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 space-y-4">
              {areas?.slice(0, 5).map((area: any) => (
                <div
                  key={area._id}
                  className="flex justify-between items-center border-b pb-2 last:border-0"
                >
                  <span className="font-medium">{area.name}</span>
                  <span className="text-sm text-slate-500">
                    {area.deliveryPrice} ج.م توصيل
                  </span>
                </div>
              ))}
              {areas?.length > 5 && (
                <p className="text-center text-xs text-blue-600 font-bold cursor-pointer hover:underline">
                  عرض جميع المناطق ({areas.length})
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
