import React from "react";
import ContentTitle from "components/ContentTitle/ContentTitle";
import { Strings } from "resource/Strings";
import Card from "components/UI/Card";
import { SectionHeader } from "components/SectionHeader/SectionHeader";
import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";
import Input from "components/Input/Input";
import { useFormik } from "formik";
import { CategoryFormValues } from "Modal/Modal";
import { SelectInput } from "components/SelectInput/SelectInput";
import { AddCategorySchema } from "helper/Validation";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";
import { useCategoryContext } from "context/CategoryContext/CategoryContext";
const Form = () => {
  const navigator = useNavigate();
  const {onSubmit} = useCategoryContext()
  const formilk = useFormik<CategoryFormValues>({
    initialValues: {
      name: "",
      type: "",
    },
    validationSchema:AddCategorySchema,
    onSubmit: (formValues) => {
      onSubmit(formValues.name, formValues.type as "income"|"expense");
    },
  });
  const handlerChange = (value: string) => {
    formilk.setFieldValue("type", value);
  };
  return (
    <div className="container">
      <SectionHeader
        headerTitle={Strings.addCategory}
        isListingPage={false}
        col="6"
      >
        <Button
          type="button"
          onClick={() => navigator("/category")}
          classes="btn btn-primary"
        >
          {Strings.category}
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
              options={["select category type","expense", "income"]}
              value={formilk.values.type}
              onChange={handlerChange}
              name="type"
            />
              {formilk.errors.type && formilk.touched.type && <ErrorMessage message={formilk.errors.type} />}
          </div>
          <div className="mb-3">
            <Button
              type="submit"
              classes="btn btn-primary"
            >
              {Strings.addCategory}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
