import React, { useEffect } from "react";
import { Strings } from "resource/Strings";
import { SectionHeader } from "components/SectionHeader/SectionHeader";
import Button from "components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import Input from "components/Input/Input";
import { useFormik } from "formik";
import { CategoryFormValues } from "Modal/Modal";
import { SelectInput } from "components/SelectInput/SelectInput";
import { AddCategorySchema } from "helper/Validation";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";
import { useCategoryContext } from "context/CategoryContext/CategoryContext";
import { Loader } from "components/Loader/Loader";
const Form = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const { onAddCategory, isLoading, categoryList, onUpdateCategory } = useCategoryContext()
  const formilk = useFormik<CategoryFormValues>({
    initialValues: {
      name: "",
      type: "",
    },
    validationSchema: AddCategorySchema,
    onSubmit: (formValues) => {
      if (id) {
        onUpdateCategory(formValues.name, formValues.type as "income" | "expense", id);
        return
      }
      onAddCategory(formValues.name, formValues.type as "income" | "expense");
    },
  });

  useEffect(() => {
    if (id) {
      const categoryItem = categoryList.find((item) => id === item.id);
      formilk.resetForm({
        values: {
          name: categoryItem?.name as string,
          type: categoryItem?.type as string
        }
      })
    }
    else {
      formilk.resetForm({
        values: {
          name: "",
          type: ""
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const handlerChange = (value: string) => {
    formilk.setFieldValue("type", value);
  };

  const navigationHandler = () => {
    console.log(id)
    if (id) {
      navigator("/category/add")
    }
    else {
      navigator("/category")
    }
  }

  return (
    <div className="container">
      <SectionHeader
        headerTitle={id ? Strings.editCategory : Strings.addCategory}
        isBackIconRequired={id ? true : false}
        path="/category"
        isListingPage={false}
        col="6"
      >
        <Button
          type="button"
          onClick={() => navigationHandler()}
          classes="btn btn-primary"
        >
          {id ? Strings.addCategory : Strings.category}
        </Button>
      </SectionHeader>
      <div className="form">
        <form onSubmit={formilk.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{Strings.categoryName}</label>
            <Input
              type="text"
              name="name"
              placeholder="Category Name"
              formilk={formilk}
              value={formilk.values.name}
            />
            {formilk.errors.name && formilk.touched.name && <ErrorMessage message={formilk.errors.name} />}
          </div>
          <div className="mb-3">
            <label className="form-label">{Strings.categoryType}</label>
            <SelectInput
              options={["select category type", "expense", "income"]}
              value={formilk.values.type}
              onChange={handlerChange}
              name="type"
            />
            {formilk.errors.type && formilk.touched.type && <ErrorMessage message={formilk.errors.type} />}
          </div>
          <div className="mb-3">
            <Button
              type="submit"
              disable={isLoading}
              classes="btn btn-primary"
            >
              {id ? Strings.updateCategory : Strings.addCategory}
            </Button>
            {isLoading && <Loader />}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
