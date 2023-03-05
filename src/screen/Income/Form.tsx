import React, { useEffect } from "react";
import { Strings } from "resource/Strings";
import { SectionHeader } from "components/SectionHeader/SectionHeader";
import Button from "components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import Input from "components/Input/Input";
import { useFormik } from "formik";
import { IncomeFormValues } from "Modal/Modal";
import { SelectInput } from "components/SelectInput/SelectInput";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";
import { useCategoryContext } from "context/CategoryContext/CategoryContext";
import { Loader } from "components/Loader/Loader";
import TextArea from "components/TextArea/TextArea";
import { useIncomeContext } from "context/IncomeContext/IncomeContext";
import { getCurrentMonth } from "helper/helper";
const Form = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const { categoryList } = useCategoryContext();
  const { isLoading, onAddIncome } = useIncomeContext();
  console.log(categoryList)
  const formilk = useFormik<IncomeFormValues>({
    initialValues: {
      name: "",
      categoryName: "",
      income: "",
      note: ""
    },
    // validationSchema: AddCategorySchema,
    onSubmit: (formValues) => {
      console.log(formValues);
      const payload = {
        name: formValues.name,
        category: formValues.categoryName,
        amount: formValues.income,
        note: formValues.note,
        date: new Date(),
        month: getCurrentMonth(new Date().getMonth())
      };
      // if (id) {
      //   onUpdateCategory(formValues.name, formValues.type as "income" | "expense", id);
      //   return
      // }
      onAddIncome(payload);
    },
  });

  useEffect(() => {
    if (id) {
      const categoryItem = categoryList.find((item) => id === item.id);
      formilk.resetForm({
        values: {
          ...formilk.values,
          name: categoryItem?.name as string,

        }
      })
    }
    else {
      formilk.resetForm({
        values: {
          ...formilk.values,
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const handlerChange = (value: string) => {
    formilk.setFieldValue("categoryName", value);
  };

  const navigationHandler = () => {

    if (id) {
      navigator("/income/add")
    }
    else {
      navigator("/income")
    }
  }

  const showIncomeCategory = () => {
    return categoryList?.length === 0 ? ['Loading...'] : (
      categoryList.filter((item) => item.type.toLocaleLowerCase() === "income")
    )
  }
  return (
    <div className="container">
      <SectionHeader
        headerTitle={id ? Strings.editIncome : Strings.addIncome}
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
          {id ? Strings.addIncome : Strings.income}
        </Button>
      </SectionHeader>
      <div className="form">
        <form onSubmit={formilk.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{Strings.name}</label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              formilk={formilk}
              value={formilk.values.name}
            />
            {formilk.errors.name && formilk.touched.name && <ErrorMessage message={formilk.errors.name} />}
          </div>
          <div className="mb-3">
            <label className="form-label">{Strings.categoryType}</label>
            <SelectInput
              options={showIncomeCategory()}
              value={formilk.values.categoryName}
              onChange={handlerChange}
              name="type"
            />
            {formilk.errors.categoryName && formilk.touched.categoryName && <ErrorMessage message={formilk.errors.categoryName} />}
          </div>
          <div className="mb-3">
            <label className="form-label">{Strings.income}</label>
            <Input
              type="number"
              name="income"
              placeholder="Income"
              formilk={formilk}
              value={formilk.values.income}
            />
            {formilk.errors.income && formilk.touched.income && <ErrorMessage message={formilk.errors.income} />}
          </div>

          <div className="mb-3">
            <label className="form-label">{Strings.description}</label>
            <TextArea
              name="note"
              placeHolder={Strings.description}
              formilk={formilk}
              id="notes"
              value={formilk.values.note}
            />
            {formilk.errors.income && formilk.touched.income && <ErrorMessage message={formilk.errors.income} />}
          </div>
          <div className="mb-3">
            <Button
              type="submit"
              disable={isLoading || !formilk.isValid || !formilk.dirty}
              classes="btn btn-primary"
            >
              {id ? Strings.updateIncome : Strings.addIncome}
            </Button>
            {isLoading && <Loader />}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
