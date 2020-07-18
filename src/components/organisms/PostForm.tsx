import React, { SFC } from 'react';
import {
  Field,
  reduxForm,
  FieldArrayMetaProps,
  InjectedFormProps,
  FormErrors,
} from 'redux-form';
import { View, TextInputProps, KeyboardType } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Item,
  Form,
  Input,
  Label,
  Picker,
  Icon,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ItemModel } from '../../services/item/models';

interface formErrorsProps {
  jan_code: string;
  item_name: string;
  price: string;
  stock: string;
}

const validate = (values: FormErrors<formErrorsProps>) => {
  const error = {} as FormErrors<formErrorsProps>;
  if (values.jan_code === undefined) {
    error.jan_code = "jan code isn't allowed blank";
  }

  if (values.item_name === undefined) {
    error.item_name = "item name isn't allowed blank";
  }

  if (values.price === undefined) {
    error.price = "price isn't allowed blank";
  }

  if (values.stock === undefined) {
    error.stock = "item name isn't allowed blank";
  }

  const reg = /^\d+$/;

  if (!reg.test(values.jan_code) && error.jan_code === '') {
    error.jan_code = 'jan code should be numeric';
  }

  if (!reg.test(values.price) && error.price === '') {
    error.price = 'price should be numeric';
  }

  if (!reg.test(values.stock) && error.stock === '') {
    error.stock = 'stock should be numeric';
  }

  return error;
};

interface renderInputProps {
  input: TextInputProps;
  label: string;
  type: KeyboardType;
  meta: FieldArrayMetaProps;
}

const renderInput: SFC<renderInputProps> = ({
  input,
  label,
  type,
  meta: { error },
}) => {
  let hasError = false;
  if (error !== undefined) {
    hasError = true;
  }

  return (
    <Item error={hasError} success={!hasError} fixedLabel>
      <Label>{label}</Label>
      <Input {...input} keyboardType={type} />
      {hasError ? (
        <Icon name="close-circle" />
      ) : (
        <Icon name="checkmark-circle" />
      )}
    </Item>
  );
};

const renderSelectField: React.SFC<renderInputProps> = ({
  input,
  label,
  children,
}) => (
  <>
    <Item>
      <Label>{label}</Label>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined }}
        placeholder={label}
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        selectedValue={input.value}
        onValueChange={input.onChange}
      >
        {children}
      </Picker>
    </Item>
  </>
);

const renderDateField: SFC<renderInputProps> = ({ input, label, children }) => (
  <>
    <Item>
      <Label>{label}</Label>
    </Item>
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={input.value}
        mode={'date'}
        is24Hour={true}
        display="default"
        onChange={input.onChange}
        // locale={'ja'}
      />
      {children}
    </View>
  </>
);

interface ReduxFormExtendProps {
  submitFunction: (params: ItemModel) => void;
}

const PostForm: SFC<
  InjectedFormProps<ItemModel, ReduxFormExtendProps> & ReduxFormExtendProps
> = ({ submitFunction, handleSubmit, reset, invalid, dirty }) => {
  return (
    <Container>
      <Content padder style={{ width: '100%' }}>
        <Form>
          <Field
            name="jan_code"
            type="number-pad"
            label="Jan Code"
            component={renderInput}
          />
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            name="item_name"
            type="default"
            label="Item Name"
            component={renderInput}
          />
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            name="price"
            type="number-pad"
            label="Price"
            component={renderInput}
          />
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            name="category_id"
            label="Category"
            component={renderSelectField}
          >
            <Picker.Item label="public" value={0} />
            <Picker.Item label="private" value={1} />
          </Field>
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field name="series_id" label="Series" component={renderSelectField}>
            <Picker.Item label="public" value={0} />
            <Picker.Item label="private" value={1} />
          </Field>
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            name="stock"
            type="number-pad"
            label="Stock"
            component={renderInput}
          />
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            name="discontinued"
            label="Discontinued"
            component={renderSelectField}
          >
            <Picker.Item label="Yes" value={true} />
            <Picker.Item label="No" value={false} />
          </Field>
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            name="release_date"
            label="Release Date"
            component={renderDateField}
          ></Field>
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Button
            block
            onPress={handleSubmit(submitFunction)}
            disabled={invalid}
          >
            <Text>Submit</Text>
          </Button>
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Button block onPress={reset} disabled={!dirty}>
            <Text>Reset</Text>
          </Button>
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
        </Form>
      </Content>
    </Container>
  );
};

export default reduxForm<ItemModel, ReduxFormExtendProps>({
  form: 'itemForm',
  validate,
})(PostForm);
