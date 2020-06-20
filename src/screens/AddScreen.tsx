import React from 'react';
import { Field,reduxForm } from 'redux-form';
import { View } from 'react-native';
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

import HeaderComponent from '../components/03_organisms/Header';

const renderInput: React.FC<any> = ({ input, label, type, meta: { touched, error, warning } }) => {
  let hasError= false;
  if(error !== undefined){
    hasError= true;
  }

  return(
    <Item error= {hasError} fixedLabel>
      <Label>{label}</Label>
      <Input {...input}/>
      {hasError ? <Text>{error}</Text> : <Text />}
    </Item>
  )
}

const renderSelectField: React.FC<any> = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <>
    <Item picker>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined }}
        placeholder="visible"
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        selectedValue={input.value}
        onValueChange={input.onChange}
      >
        {children}
      </Picker>
    </Item>
  </>
);

const DetailsScreen: React.FC<any> = (props) => {
  return (
    <Container>
      <HeaderComponent navigation={props.navigation} />
      <Content padder style={{width: '100%'}}>
        <Field name="title" label="title" component={renderInput} />
        <View style={{height: 20, width: 350, flex: 1}}></View>
        <Field name="visible" label="visible" component={renderSelectField} >
          <Picker.Item label="public" value="public" />
          <Picker.Item label="private"  value="private" />
        </Field>
        <View style={{height: 20, width: 350, flex: 1}}></View>
        <Field name="memo" label="memo" component={renderInput} />
        <View style={{height: 20, width: 350, flex: 1}}></View>
        <Button block onPress={() => {}}>
          <Text>
            Submit
          </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default reduxForm({
  form: 'form',
})(DetailsScreen)