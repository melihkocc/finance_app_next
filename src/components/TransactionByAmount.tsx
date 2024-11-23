"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransaction";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TransactionCard from "./TransactionCard";
import DashboardTab from "./DashboardTab";
import { Divide } from "lucide-react";

// Zod validation schema
const formSchema = z.object({
  minAmount: z.string().min(0, "Minimum 0 girmelisiniz"),
  maxAmount: z.string().min(0, "Minimum 0 girmelisiniz"),
});

const TransactionByAmount = () => {
  const { getTransactionsByAmountRange, dtoTransactions, loading, error } = useTransactions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minAmount: "", // Default empty string value
      maxAmount: "", // Default empty string value
    },
  });

  const handleFilter = (data: z.infer<typeof formSchema>) => {
    try {
      // Dönüşüm yaparak sayıya çeviriyoruz
      const minAmount = isNaN(parseFloat(data.minAmount)) ? undefined : parseFloat(data.minAmount);
      const maxAmount = isNaN(parseFloat(data.maxAmount)) ? undefined : parseFloat(data.maxAmount);

      if (minAmount === undefined && maxAmount === undefined) {
        return; // Bu durumda herhangi bir işlem yapmıyoruz
      }
      // Filter işlemi
      getTransactionsByAmountRange(minAmount, maxAmount);
    } catch (err) {
      console.error("Error filtering transactions:", err);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="lg:w-full w-10/12 mx-auto mt-5" onSubmit={form.handleSubmit(handleFilter)}>
          <div className="flex items-center justify-center">
            <FormField
              control={form.control}
              name="minAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Tutar</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Minimum Tutar"
                      {...field}
                      min={0}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxAmount"
              render={({ field }) => (
                <FormItem className="ms-3">
                  <FormLabel>Maxiumum Tutar</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Maxiumum Tutar"
                      {...field}
                      min={0}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button size={"sm"} type="submit" className="bg-orange-500 mt-3 hover:bg-orange-600 transition-all ease-in-out duration-500" disabled={loading}>
              {loading ? "Yükleniyor..." : "Uygula"}
            </Button>
          </div>
        </form>
      </Form>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <div className="text-center">Yükleniyor...</div>}
      {dtoTransactions.length > 0 && (
        <DashboardTab dtoTransactions={dtoTransactions} />
      )}
      {
        dtoTransactions.length==0 && <div className="text-center mt-5">Henüz Gelir - Gider Eklemediniz</div>
      }
    </div>
  );
};

export default TransactionByAmount;
