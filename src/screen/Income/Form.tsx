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
import { findDuplicateInput, getCurrentMonth } from "helper/helper";
import { Message } from "helper/AlertMessage";
import { AddIncomeSchema } from "helper/Validation";

const Form = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const { categoryList } = useCategoryContext();
  const { isLoading, onAddIncome, incomeList, onUpdateIncome } = useIncomeContext();
  const formilk = useFormik<IncomeFormValues>({
    initialValues: {
      name: "",
      categoryName: "",
      income: "",
      note: ""
    },
    validationSchema: AddIncomeSchema,
    onSubmit: (formValues) => {
      const payload = {
        name: formValues.name,
        category: formValues.categoryName,
        amount: formValues.income,
        note: formValues.note,
        date: new Date(),
        month: getCurrentMonth(new Date().getMonth())
      };
      if (id) {
        onUpdateIncome(payload, id);
        return
      }
      const isIncomeAlreadyAdd = findDuplicateInput(incomeList, formValues.name);
      if (isIncomeAlreadyAdd) {
        Message('error', "Income  already added")
        return
      };
      onAddIncome(payload);
    },
  });

  useEffect(() => {
    if (id) {
      const incomeItem = incomeList.find((item) => id === item.id);
      formilk.resetForm({
        values: {
          ...formilk.values,
          name: incomeItem?.name as string,
          categoryName: incomeItem?.category || "",
          income: incomeItem?.amount || '',
          note: incomeItem?.note || ''
        }
      })
    }
    else {
      formilk.resetForm({
        values: {
          name: "",
          categoryName: "",
          income: "",
          note: ""
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
      navigator("/incomes")
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
        path="/incomes"
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
