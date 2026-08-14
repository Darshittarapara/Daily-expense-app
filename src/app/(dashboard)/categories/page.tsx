export const dynamic = 'force-dynamic';

import React from 'react';
import { fetchCategories } from '@/app/actions';
import { CategoryView } from '@/components/views/CategoryView';

export default async function CategoriesPage() {
  const initialCategories = await fetchCategories();
  
  return (
    <CategoryView initialCategories={initialCategories} />
  );
}
