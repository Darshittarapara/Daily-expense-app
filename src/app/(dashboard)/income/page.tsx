export const dynamic = 'force-dynamic';

import React from 'react';
import { fetchIncomes } from '@/app/actions';
import { IncomeView } from '@/components/views/IncomeView';

export default async function IncomePage() {
  const initialIncomes = await fetchIncomes();
  
  return (
    <IncomeView initialIncomes={initialIncomes} />
  );
}
