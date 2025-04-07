// src/services/designSystemService.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { designSystemService } from './designSystemService';
import { Button, Modal, Dropdown, DatePicker, Toast, FormInput } from '../components';

const server = setupServer(
  rest.get('/api/components', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'Button' },
      { id: 2, name: 'Modal' },
      { id: 3, name: 'Dropdown' },
      { id: 4, name: 'DatePicker' },
      { id: 5, name: 'Toast' },
      { id: 6, name: 'FormInput' },
    ]));
  }),
);

describe('designSystemService', () => {
  afterEach(() => server.resetHandlers());

  it('should fetch components', async () => {
    const components = await designSystemService.getComponents();
    expect(components).toHaveLength(6);
  });

  it('should render Button component', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    // check aria attributes
    expect(button).toHaveAttribute('aria-label', 'Click me');
  });

  it('should render Modal component', () => {
    const { getByRole } = render(<Modal isOpen={true}>Modal content</Modal>);
    const modal = getByRole('dialog');
    expect(modal).toBeInTheDocument();
    // check aria attributes
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  it('should render Dropdown component', () => {
    const { getByRole } = render(<Dropdown options={[{ value: 1, label: 'Option 1' }]} />);
    const dropdown = getByRole('listbox');
    expect(dropdown).toBeInTheDocument();
    // check aria attributes
    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
  });

  it('should render DatePicker component', () => {
    const { getByRole } = render(<DatePicker />);
    const datePicker = getByRole('textbox');
    expect(datePicker).toBeInTheDocument();
    // check aria attributes
    expect(datePicker).toHaveAttribute('aria-label', 'Date picker');
  });

  it('should render Toast component', () => {
    const { getByRole } = render(<Toast>Toast message</Toast>);
    const toast = getByRole('alert');
    expect(toast).toBeInTheDocument();
    // check aria attributes
    expect(toast).toHaveAttribute('aria-live', 'assertive');
  });

  it('should render FormInput component', () => {
    const { getByRole } = render(<FormInput />);
    const formInput = getByRole('textbox');
    expect(formInput).toBeInTheDocument();
    // check aria attributes
    expect(formInput).toHaveAttribute('aria-label', 'Form input');
  });
});