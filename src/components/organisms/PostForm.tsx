import React, { SFC, FC, useState } from 'react';
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
import DateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';

import { ItemModel } from '../../services/item/models';

const validate = (values: ItemModel) => {
  const error = {} as FormErrors<ItemModel>;

  const reg = /^\d+$/;
  if (values.jan_code === undefined) {
    error.jan_code = "jan code isn't allowed blank";
  } else {
    if (!reg.test(values.jan_code) && error.jan_code === '') {
      error.jan_code = 'jan code should be numeric';
    }
  }

  if (values.item_name === undefined) {
    error.item_name = "item name isn't allowed blank";
  }

  if (values.price === undefined) {
    error.price = "price isn't allowed blank";
  } else {
    if (!reg.test(String(values.price)) && error.price === '') {
      error.price = 'price should be numeric';
    }
  }

  if (values.stock === undefined) {
    error.stock = "item name isn't allowed blank";
  } else {
    if (!reg.test(String(values.stock)) && error.stock === '') {
      error.stock = 'stock should be numeric';
    }
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

interface dateInputProps {
  input: IOSNativeProps | AndroidNativeProps;
  label: string;
  type: KeyboardType;
  meta: FieldArrayMetaProps;
  setShow: (isShowPicker: boolean) => void;
  change: (field: string, data: Date) => void;
}

const renderDateField: SFC<dateInputProps> = ({
  input,
  label,
  setShow,
  change,
}) => {
  const customOnChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || input.value;

    change('release_date', currentDate);
    setShow(true);
  };

  return (
    <>
      <Item>
        <Label>{label}</Label>
      </Item>
      <View>
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={input.value}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={customOnChange}
          locale={'ja'}
        />
      </View>
    </>
  );
};

interface ReduxFormExtendProps {
  submitFunction: (params: ItemModel) => void;
  change: (field: string, data: Date) => void;
}

const PostForm: FC<
  InjectedFormProps<ItemModel, ReduxFormExtendProps> & ReduxFormExtendProps
> = ({ submitFunction, change, handleSubmit, reset, invalid, dirty }) => {
  const [show, setShow] = useState(false);

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
          {!show ? (
            <Button block onPress={() => setShow(true)}>
              <Text>Show Date Picker</Text>
            </Button>
          ) : (
            <Button block onPress={() => setShow(false)}>
              <Text>Close Date Picker</Text>
            </Button>
          )}
          {show && (
            <>
              <View style={{ height: 20, width: 350, flex: 1 }}></View>
              <Field
                name="release_date"
                label="Release Date"
                type="date"
                setShow={setShow}
                change={change}
                component={renderDateField}
              ></Field>
            </>
          )}
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
