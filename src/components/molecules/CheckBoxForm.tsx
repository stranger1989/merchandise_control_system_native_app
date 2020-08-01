import React, { SFC } from 'react';
import { CheckBox } from '@ui-kitten/components';

interface CheckBoxFormProps {
  input: { value: boolean; onChange: () => void };
  label: string;
}

const CheckBoxForm: SFC<CheckBoxFormProps> = ({ input, label }) => (
  <>
    <CheckBox checked={input.value} onChange={input.onChange}>
      {`${label}`}
    </CheckBox>
  </>
);

export default CheckBoxForm;
