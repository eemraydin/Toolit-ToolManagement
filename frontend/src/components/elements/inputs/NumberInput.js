import * as React from 'react';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from "@mui/material/styles";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
          type: 'button',
          disabled: props.disabled
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
          type: 'button',
          disabled: props.disabled
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function QuantityInput(props) {
  return <NumberInput id={props.id} aria-label="Quantity Input" min={1} required={props.required} value={props.value} defaultValue={props.defaultValue} disabled={props.disabled}/>;
}

const purple = {
  100: '#54509B',
  200: '#342C62',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 400;
  color: ${grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${grey[900]};
  background: white;
  border: 1px solid ${grey[200]};
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${purple[100]};
  }

  &:focus {
    border-color: ${purple[100]};
  }

  &:focus-visible {
    outline: 0;
  }

  &:disabled {
    background-color: ${grey[200]};
  }
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  line-height: 1.5;
  border-radius: 8px;
  background: ${purple[200]};
  color:white;
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;


  &:hover {
    cursor: pointer;
    background: ${purple[100]};
  }

  &.increment {
    order: 1;
  }

  &:disabled {
    background-color: ${grey[200]};
    border: 0;
  }
`,
);
