export const dynamic = 'force-dynamic';

import React from 'react';
import { fetchExpenses } from '@/app/actions';
import { ExpenseView } from '@/components/views/ExpenseView';

export default async function ExpensesPage() {
  const initialExpenses = await fetchExpenses();
  
  return (
    <ExpenseView initialExpenses={initialExpenses} />
  );
}
