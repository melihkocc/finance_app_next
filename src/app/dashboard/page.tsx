// app/dashboard/page.tsx (Server Component)
import dynamic from 'next/dynamic';

const Categories = dynamic(() => import('@/components/Categories'), { ssr: false });
const TransactionByAmount = dynamic(() => import('@/components/TransactionByAmount'), { ssr: false });

export default function Dashboard() {
  return (
    <div>
      <Categories />
      <TransactionByAmount />
    </div>
  );
}
