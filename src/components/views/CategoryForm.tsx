'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/shared/Input';
import { Select } from '@/components/shared/Select';
import { Category } from '@/types/category';
import { addCategory } from '@/app/actions';

interface CategoryFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess, onCancel }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Category, 'id'>>();

  const addMutation = useMutation({
    mutationFn: async (data: Omit<Category, 'id'>) => {
      await addCategory({
        ...data,
        icon: "https://cdn-icons-png.flaticon.com/512/3524/3524385.png", // Mocking icon for now
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      reset();
      onSuccess();
    },
  });

  const onSubmit = (data: Omit<Category, 'id'>) => {
    addMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        placeholder="E.g. Food"
        error={errors.name?.message}
        {...register('name', { required: 'Name is required' })}
      />
      <Select
        label="Type"
        options={[
          { value: 'Expense', label: 'Expense' },
          { value: 'Income', label: 'Income' }
        ]}
        error={errors.type?.message}
        {...register('type', { required: 'Type is required' })}
      />
      <div className="pt-4 flex justify-end gap-2">
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={addMutation.isPending}>
          {addMutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};
