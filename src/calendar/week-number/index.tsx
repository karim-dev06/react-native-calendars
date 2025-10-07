import React from 'react';
import BasicDay, {BasicDayProps} from '../day/basic';

export interface WeekNumberProps extends Omit<BasicDayProps, 'children'> {
  /** Provide custom week number rendering component */
  weekComponent?: React.ComponentType<WeekNumberProps & {weekNumber: number; year: number}>;
  /** Week number to display */
  weekNumber: number;
  /** Year for the week */
  year: number;
}

const WeekNumber = (props: WeekNumberProps) => {
  const {weekComponent, weekNumber, year, ...basicDayProps} = props;

  if (weekComponent) {
    const WeekComponent = weekComponent;
    return <WeekComponent weekNumber={weekNumber} year={year} {...basicDayProps} />;
  }

  // Default rendering using BasicDay
  return (
    <BasicDay {...basicDayProps}>
      {weekNumber}
    </BasicDay>
  );
};

export default WeekNumber;
WeekNumber.displayName = 'WeekNumber';
