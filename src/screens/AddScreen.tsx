import React from 'react';
import { Field, reduxForm, FieldArrayMetaProps } from 'redux-form';
import { View, TextInputProps } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from 'native-base';
import { NavigationParams } from 'react-navigation';

import HeaderComponent from '../components/03_organisms/Header';

const renderInput: React.FC<{
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

const renderSelectField: React.FC<{ input: TextInputProps }> = ({
  input,
  children,
}) => (
  <>
    <Item picker>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined }}
        placeholder="visible"
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

const DetailsScreen: React.FC = (props: NavigationParams) => {
  return (
    <Container>
      <HeaderComponent navigation={props.navigation} />
      <Content padder style={{ width: '100%' }}>
        <Field name="title" label="title" component={renderInput} />
        <View style={{ height: 20, width: 350, flex: 1 }}></View>
        <Field name="visible" label="visible" component={renderSelectField}>
          <Picker.Item label="public" value="public" />
          <Picker.Item label="private" value="private" />
        </Field>
        <View style={{ height: 20, width: 350, flex: 1 }}></View>
        <Field name="memo" label="memo" component={renderInput} />
        <View style={{ height: 20, width: 350, flex: 1 }}></View>
        <Button block>
          <Text>Submit</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default reduxForm({
  form: 'form',
})(DetailsScreen);
