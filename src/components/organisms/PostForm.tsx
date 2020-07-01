import React, { FC } from 'react';
import {
  Field,
  reduxForm,
  FieldArrayMetaProps,
  InjectedFormProps,
} from 'redux-form';
import { View, TextInputProps } from 'react-native';
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
  DatePicker,
} from 'native-base';
import { ItemModel } from '../../services/item/models';

const renderInput: FC<{
  input: TextInputProps;
  label: string;
  meta: FieldArrayMetaProps;
}> = ({ input, label, meta: { error } }) => {
  let hasError = false;
  if (error !== undefined) {
    hasError = true;
  }

  return (
    <Item error={hasError} fixedLabel>
      <Label>{label}</Label>
      <Input {...input} />
      {hasError ? <Text>{error}</Text> : <Text />}
    </Item>
  );
};

const renderSelectField: React.FC<{ input: TextInputProps; label: string }> = ({
  input,
  label,
  children,
}) => (
  <>
    <Item>
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

const renderDateField: FC<{ input: TextInputProps; label: string }> = ({
  input,
  label,
  children,
}) => (
  <>
    <Item>
      <DatePicker
        defaultDate={new Date(2020, 1, 1)}
        minimumDate={new Date(2000, 1, 1)}
        locale={'ja'}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType={'fade'}
        androidMode={'default'}
        placeHolderText={label}
        textStyle={{ color: 'blue' }}
        placeHolderTextStyle={{ color: '#d3d3d3' }}
        onDateChange={input.onChange}
        disabled={false}
      />
      {children}
    </Item>
  </>
);

interface ReduxFormExtendProps {
  submitFunction: (params: ItemModel) => void;
}

const PostForm: FC<
  InjectedFormProps<ItemModel, ReduxFormExtendProps> & ReduxFormExtendProps
> = ({ submitFunction, handleSubmit }) => {
  return (
    <Container>
      <Content padder style={{ width: '100%' }}>
        <Form>
          <Field name="jan_code" label="Jan Code" component={renderInput} />
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field name="item_name" label="Item Name" component={renderInput} />
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            parse={(value: string) => Number(value)}
            name="price"
            label="Price"
            component={renderInput}
          />
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            parse={(value: string) => Number(value)}
            name="category_id"
            label="Category"
            component={renderSelectField}
          >
            <Picker.Item label="public" value={0} />
            <Picker.Item label="private" value={1} />
          </Field>
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            parse={(value: string) => Number(value)}
            name="series_id"
            label="Series"
            component={renderSelectField}
          >
            <Picker.Item label="public" value={0} />
            <Picker.Item label="private" value={1} />
          </Field>
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            parse={(value: string) => Number(value)}
            name="stock"
            label="Stock"
            component={renderInput}
          />
          <View style={{ height: 20, width: 350, flex: 1 }}></View>
          <Field
            parse={(value: string) => Boolean(value)}
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
          <Button block onPress={handleSubmit(submitFunction)}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default reduxForm<ItemModel, ReduxFormExtendProps>({
  form: 'itemForm',
})(PostForm);
