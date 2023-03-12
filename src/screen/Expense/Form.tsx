import React, { useEffect } from "react";
import { Strings } from "resource/Strings";
import { SectionHeader } from "components/SectionHeader/SectionHeader";
import Button from "components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import Input from "components/Input/Input";
import { useFormik } from "formik";
import { ExpenseFormValues } from "Modal/Modal";
import { SelectInput } from "components/SelectInput/SelectInput";
import { ErrorMessage } from "components/ErrorMessage/ErrorMessage";
import { useCategoryContext } from "context/CategoryContext/CategoryContext";
import { Loader } from "components/Loader/Loader";
import TextArea from "components/TextArea/TextArea";
import { findDuplicateInput, getCurrentMonth } from "helper/helper";
import { Message } from "helper/AlertMessage";
import { AddExpenseSchema } from "helper/Validation";
import { useExpenseContext } from "context/ExpenseContext/ExpenseContext";

const Form = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const { categoryList } = useCategoryContext();
  const { isLoading, onAddExpense, expenseList, onUpdateExpense } = useExpenseContext();

  const formilk = useFormik<ExpenseFormValues>({
    initialValues: {
      name: "",
      categoryName: "",
      expense: "",
      note: ""
    },
    validationSchema: AddExpenseSchema,
    onSubmit: (formValues) => {
      const payload = {
        name: formValues.name,
        category: formValues.categoryName,
        amount: formValues.expense,
        note: formValues.note,
        date: new Date(),
        month: getCurrentMonth(new Date().getMonth())
      };
      if (id) {
        onUpdateExpense(payload, id);
        return
      }
      const isIncomeAlreadyAdd = findDuplicateInput(expenseList, formValues.name);
      if (isIncomeAlreadyAdd) {
        Message('error', "Income  already added")
        return
      };
      onAddExpense(payload);
    },
  });
  const defaultExpense = categoryList?.filter((item) => item.type.toLocaleLowerCase() === "expense")?.[0];
  useEffect(() => {
    if (id) {
      const incomeItem = expenseList.find((item) => id === item.id);
      formilk.resetForm({
        values: {
          ...formilk.values,
          name: incomeItem?.name as string,
          categoryName: incomeItem?.category || defaultExpense?.name,
          expense: incomeItem?.amount || '',
          note: incomeItem?.note || ''
        }
      })
    }
    else {
      formilk.resetForm({
        values: {
          name: "",
          categoryName: defaultExpense?.name,
          expense: "",
          note: ""
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handlerChange = (value: string) => {
    formilk.setFieldValue("categoryName", value);
  };

  const navigationHandler = () => {

    if (id) {
      navigator("/expense/add")
    }
    else {
      navigator("/expenses")
    }
  }

  const showIncomeCategory = () => {
    return categoryList?.length === 0 ? ['Loading...'] : (
      categoryList.filter((item) => item.type.toLocaleLowerCase() === "expense")
    )
  }
  return (
    <div className="container">
      <SectionHeader
        headerTitle={id ? Strings.editExpense : Strings.addExpense}
        isBackIconRequired={id ? true : false}
        path="/expenses"
        isListingPage={false}
        col="6"
      >
        <Button
          type="button"
          onClick={() => navigationHandler()}
          classes="btn btn-primary"
        >
          {id ? Strings.addExpense : Strings.expense}
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
            <label className="form-label">{Strings.expense}</label>
            <Input
              type="number"
              name="expense"
              placeholder="Expense"
              formilk={formilk}
              value={formilk.values.expense}
            />
            {formilk.errors.expense && formilk.touched.expense && <ErrorMessage message={formilk.errors.expense} />}
          </div>
          <div className="mb-3">
            <TextArea
              name="note"
              placeHolder={Strings.description}
              formilk={formilk}
              id="notes"
              value={formilk.values.note}
            />
          </div>
          <div className="mb-3">
            <Button
              type="submit"
              disable={isLoading || !formilk.isValid || !formilk.dirty}
              classes="btn btn-primary"
            >
              {isLoading && <Loader />}
              {id ? Strings.updateExpense : Strings.addExpense}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
