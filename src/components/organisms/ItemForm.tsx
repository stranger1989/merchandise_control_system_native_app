import React, { FC, useState } from 'react';
import { Field, reduxForm, InjectedFormProps, FormErrors } from 'redux-form';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Layout, Button, SelectItem, Text } from '@ui-kitten/components';
import { CATEGORY_NAME, SERIES_NAME } from '../../constants/itemConstants';

import { ItemFormModel } from '../../services/item/models';

import TextInputForm from '../molecules/TextInputForm';
import SelectForm from '../molecules/SelectForm';
import CheckBoxForm from '../molecules/CheckBoxForm';
import DateForm from '../molecules/DateForm';

const validate = (values: ItemFormModel) => {
  const error = {} as FormErrors<ItemFormModel>;

  const reg = /^\d+$/;
  if (values.jan_code === undefined) {
    error.jan_code = "jan code isn't allowed blank";
  } else {
    if (!reg.test(values.jan_code) && error.jan_code === undefined) {
      error.jan_code = 'jan code should be numeric';
    }
  }

  if (values.item_name === undefined) {
    error.item_name = "item name isn't allowed blank";
  }

  if (values.price === undefined) {
    error.price = "price isn't allowed blank";
  } else {
    if (!reg.test(String(values.price)) && error.price === undefined) {
      error.price = 'price should be numeric';
    }
  }

  if (values.stock === undefined) {
    error.stock = "stock isn't allowed blank";
  } else {
    if (!reg.test(String(values.stock)) && error.stock === undefined) {
      error.stock = 'stock should be numeric';
    }
  }

  return error;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

interface ReduxFormExtendProps {
  submitFunction: (params: ItemFormModel) => void;
  change: (field: string, data: unknown) => void;
}

const ItemForm: FC<
  InjectedFormProps<ItemFormModel, ReduxFormExtendProps> & ReduxFormExtendProps
> = ({ submitFunction, change, handleSubmit, reset, invalid, dirty }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Layout style={styles.mainContainer}>
            <View style={styles.formContainer}>
              <Field
                name="jan_code"
                type="number-pad"
                label="Jan Code"
                component={TextInputForm}
              />
              <View style={{ height: 11 }}></View>
              <Field
                name="item_name"
                type="default"
                label="Item Name"
                component={TextInputForm}
              />
              <View style={{ height: 11 }}></View>
              <Field
                name="price"
                type="number-pad"
                label="Price"
                component={TextInputForm}
              />
              <View style={{ height: 11 }}></View>
              <Field
                name="category_id"
                label="Category"
                component={SelectForm}
                change={change}
                fromValueList={CATEGORY_NAME}
              >
                {Object.keys(CATEGORY_NAME).map((categoryId: string) => {
                  return (
                    <SelectItem
                      key={categoryId}
                      title={CATEGORY_NAME[Number(categoryId)]}
                    />
                  );
                })}
              </Field>
              <View style={{ height: 11 }}></View>
              <Field
                name="series_id"
                label="Series"
                component={SelectForm}
                change={change}
                fromValueList={SERIES_NAME}
              >
                {Object.keys(SERIES_NAME).map((seriesId: string) => {
                  return (
                    <SelectItem
                      key={seriesId}
                      title={SERIES_NAME[Number(seriesId)]}
                    />
                  );
                })}
              </Field>
              <View style={{ height: 11 }}></View>
              <Field
                name="stock"
                type="number-pad"
                label="Stock"
                component={TextInputForm}
              />
              <View style={{ height: 11 }}></View>
              <Field
                name="discontinued"
                label="Discontinued"
                component={CheckBoxForm}
              />
              <View style={{ height: 13 }}></View>
              <Text category="label">Release Date</Text>
              <View style={{ height: 5 }}></View>
              {!show ? (
                <Button onPress={() => setShow(true)} status="info">
                  Show Date Picker
                </Button>
              ) : (
                <Button onPress={() => setShow(false)} status="info">
                  Close Date Picker
                </Button>
              )}
              {show && (
                <>
                  <Field
                    name="release_date"
                    label="Release Date"
                    type="date"
                    component={DateForm}
                  />
                </>
              )}
              <View style={{ height: 17 }}></View>
              <Button onPress={handleSubmit(submitFunction)} disabled={invalid}>
                Submit
              </Button>
              <View style={{ height: 11 }}></View>
              <Button onPress={reset} disabled={!dirty} appearance="outline">
                Reset
              </Button>
              <View style={{ height: 11 }}></View>
            </View>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default reduxForm<ItemFormModel, ReduxFormExtendProps>({
  form: 'itemForm',
  validate,
})(ItemForm);
