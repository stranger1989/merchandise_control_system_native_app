import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { change } from 'redux-form';
import { Select, IndexPath } from '@ui-kitten/components';

interface SelectFormProps {
  input: { value: IndexPath; name: string };
  label: string;
  children: ReactElement;
  fromValueList: { [key: number]: string };
}

const SelectForm: FC<SelectFormProps> = ({
  input,
  label,
  children,
  fromValueList,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Select
        label={label}
        placeholder="Active"
        selectedIndex={input.value}
        value={fromValueList[input.value.row]}
        onSelect={(index: IndexPath | IndexPath[]) => {
          dispatch(change('itemForm', input.name, index));
        }}
      >
        {children}
      </Select>
    </>
  );
};

export default SelectForm;
