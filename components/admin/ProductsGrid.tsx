"use client";
import { useProducts } from "@/hooks/useProducts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditProductPopUp from "./EditProductPopUp";
import { Switch } from "@/components/ui/switch";

const ProductsGrid = () => {
  const { products, deleteProduct } = useProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product: any) => (
        <ProductCard
          key={product._id}
          product={product}
          onDelete={deleteProduct}
        />
      ))}
    </div>
  );
};

const ProductCard = ({
  product,
  onDelete,
}: {
  product: any;
  onDelete: any;
}) => {
  // استدعاء دالة التحديث هنا لتكون متاحة للكارت
  const { updateProduct } = useProducts();

  const toggleStock = (checked: boolean) => {
    const formData = new FormData();
    formData.append("inStock", String(checked));
    // نرسل الـ id والحالة الجديدة للباك إند
    updateProduct({ id: product._id, data: formData });
  };

  return (
    <Card
      className={`overflow-hidden shadow-sm transition-all p-0 ${
        !product.inStock ? "opacity-60 grayscale-[0.5]" : ""
      }`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              غير متوفر
            </span>
          </div>
        )}
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <Switch
          className="flex-row-reverse"
          checked={product.inStock}
          onCheckedChange={toggleStock}
        />
      </CardHeader>
      <CardContent>
        <p className="text-blue-600 font-bold">
          {product.price} ج.م / {product.unit}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
        <EditProductPopUp product={product} />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="ml-2 h-4 w-4" /> حذف
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="text-right" dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد تماماً؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف المنتج "{product.name}" نهائياً من القائمة ولا يمكن
                التراجع عن هذا الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-2">
              <AlertDialogCancel>إلغاء</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(product._id)}
                className="bg-red-600 hover:bg-red-700"
              >
                تأكيد الحذف
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ProductsGrid;
