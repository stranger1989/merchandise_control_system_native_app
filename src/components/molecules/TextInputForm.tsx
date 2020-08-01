import React, { SFC } from 'react';
import { FieldArrayMetaProps } from 'redux-form';
import { TextInputProps, KeyboardType } from 'react-native';
import {
  Input,
  Text,
  EvaProp,
  withStyles,
  ThemeType,
  LayoutProps,
} from '@ui-kitten/components';

interface TextInputFormProps extends LayoutProps {
  input: TextInputProps;
  label: string;
  type: KeyboardType;
  meta: FieldArrayMetaProps;
}

const TextInputForm: SFC<TextInputFormProps> = ({
  input,
  label,
  type,
  meta: { error },
  eva,
  style,
}) => {
  let hasError = false;
  if (error !== undefined) {
    hasError = true;
  }

  return (
    <Input
      {...input}
      value={type === 'number-pad' ? String(input.value) : input.value}
      label={label}
      placeholder="Place your Text"
      caption={
        hasError
          ? (evaProps: EvaProp) => (
              <Text {...evaProps} style={[eva?.style?.errorMessage, style]}>
                {error}
              </Text>
            )
          : ''
      }
      keyboardType={type}
    />
  );
};

export default withStyles(TextInputForm, (theme: ThemeType) => ({
  errorMessage: {
    color: theme['color-warning-400'],
    fontSize: 14,
  },
}));
