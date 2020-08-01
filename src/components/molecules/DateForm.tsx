import React, { SFC } from 'react';
import { Calendar } from '@ui-kitten/components';

interface DateFormProps {
  input: { value: Date; onChange: () => void };
}

const DateForm: SFC<DateFormProps> = ({ input }) => {
  return (
    <>
      <Calendar date={input.value} onSelect={input.onChange} />
    </>
  );
};

export default DateForm;
