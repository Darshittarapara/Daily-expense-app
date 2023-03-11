/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useCallback, useEffect, SetStateAction } from "react";
import {
  getCategory,
  deleteCategory,
  searchCategoryIcon,
  addCategory,
  updateCategory,
} from "service/CategoryService";
import { useAuthContext } from "context/AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { getItem } from "helper/Storage";
import { AlertMessage, Message } from "helper/AlertMessage";
import Swal from "sweetalert2";
interface CategoryContextValues {
  onAddCategory: (name: string, type: "income" | "expense") => void;
  isLoading: boolean;
  onDelete: (id: string) => void;
  categoryList: CategoryListState[];
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
  fetchCategory: () => void;
  onUpdateCategory: (
    name: string,
    type: "income" | "expense",
    categoryId: string
  ) => void;
}
interface CategoryContextProps {
  children: JSX.Element;
}
export interface CategoryListState {
  name: string;
  type: string;
  id: string;
  icon: string;
}

export const categoryContext = React.createContext({} as CategoryContextValues);
export const CategoryContextProvider: React.FC<CategoryContextProps> = (
  props
) => {
  const { userId } = useAuthContext();
  const navigator = useNavigate();
  const flatIconToken = getItem("flatIconToken");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<CategoryListState[] | []>(
    []
  );

  const fetchCategory = useCallback(async () => {
    if (userId) {
      setIsLoading(true);
      const data = await getCategory(userId);
      if (data) {
        const category = Object.entries(data).map(([key, value]) => {
          /**
           * @param key = is the firebase alphabetical key (-NKYD.. type)
           * store that object into state
           */
          const values = value as { name: string; type: string; icon: string };
          return {
            id: key,
            ...values,
          };
        });
        setCategoryList(category);
      } else {
        setCategoryList([]);
      }
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    setIsLoading(false);
    return () => {
      setIsLoading(false)
    }
  }, [])
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const deleteCategoryHandler = (id: string) => {
    AlertMessage().then(async (result) => {
      if (result.isConfirmed) {
        await deleteCategory(userId, id).then(async (res) => {
          await fetchCategory();
        });
      }
    });
  };
  
  const addCategoriesHandler = async (
    name: string,
    type: "expense" | "income"
  ) => {
    setIsLoading(true);
    const icon = await searchCategoryIcon(flatIconToken?.token, name);
    const payload = {
      name,
      type,
      icon,
    };
    const data = await addCategory(payload, userId);
    if (data) {
      setIsLoading(false);
      Message('success', 'Category added successfully').then(async (result) => {
        if (result.isConfirmed) {
          await fetchCategory();
          navigator("/category");
        }
      })
    }
    setIsLoading(false);
  };

  const editCategoriesHandler = async (
    name: string,
    type: "expense" | "income",
    categoryId: string
  ) => {
    setIsLoading(true);
    const icon = await searchCategoryIcon(flatIconToken?.token, name);
    const payload = {
      name,
      type,
      icon,
    };
    const data = await updateCategory(userId, categoryId, payload);
    if (data) {
      setIsLoading(false);
      Swal.fire({
        title: "Update category",
        text: "Category updated successfully",
        icon: "success",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetchCategory();
          navigator("/category");
        }
      });
    }
    setIsLoading(false);
  };

  return (
    <categoryContext.Provider
      value={{
        isLoading,
        setIsLoading,
        onAddCategory: addCategoriesHandler,
        fetchCategory,
        onUpdateCategory: editCategoriesHandler,
        onDelete: deleteCategoryHandler,
        categoryList,
      }}
    >
      {props.children}
    </categoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(categoryContext);
};
