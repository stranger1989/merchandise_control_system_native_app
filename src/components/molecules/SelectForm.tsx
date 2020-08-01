import React, { SFC, ReactElement } from 'react';
import { Select, IndexPath } from '@ui-kitten/components';

interface SelectFormProps {
  input: { value: IndexPath; name: string };
  label: string;
  children: ReactElement;
  change: (field: string, data: IndexPath | IndexPath[]) => void;
  fromValueList: { [key: number]: string };
}

const SelectForm: SFC<SelectFormProps> = ({
  input,
  label,
  children,
  change,
  fromValueList,
}) => (
  <>
    <Select
      label={label}
      placeholder="Active"
      selectedIndex={input.value}
      value={fromValueList[input.value.row]}
      onSelect={(index: IndexPath | IndexPath[]) => {
        change(input.name, index);
      }}
    >
      {children}
    </Select>
  </>
);

export default SelectForm;
