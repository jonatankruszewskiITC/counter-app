import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import '@testing-library/user-event';

import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Counter from '../counter';
import userEvent from '@testing-library/user-event';

describe('It Renders without Crashing', () => {
	test(`Testing Component doesn't Crash`, () => {
		const props = {
			counter: { value: 0, id: 1 },
			onIncrement: jest.fn(),
			onDecrement: jest.fn(),
			onDelete: jest.fn(),
		};
		const container = document.createElement('div');
		ReactDOM.render(<Counter {...props}></Counter>, container);
		const unmounted = ReactDOM.unmountComponentAtNode(container);
		expect(unmounted).toBe(true);
	});

	test(`Shows a numeric Value`, () => {
		const props = {
			counter: { value: 5, id: 1 },
			onIncrement: jest.fn(),
			onDecrement: jest.fn(),
			onDelete: jest.fn(),
		};
		const { getByTestId } = render(<Counter {...props}></Counter>);
		expect(getByTestId('counterDisplay')).toHaveTextContent('5');
	});

	test(`Shows Zero String`, () => {
		const props = {
			counter: { value: 0, id: 1 },
			onIncrement: jest.fn(),
			onDecrement: jest.fn(),
			onDelete: jest.fn(),
		};
		const { getByTestId } = render(<Counter {...props}></Counter>);
		expect(getByTestId('counterDisplay')).toHaveTextContent('Zero');
	});

	test(`Triggers onIncrement Callback`, () => {
		const props = {
			counter: { value: 0, id: 1 },
			onIncrement: jest.fn(),
			onDecrement: jest.fn(),
			onDelete: jest.fn(),
		};
		const { container } = render(<Counter {...props}></Counter>);
		const plusElements = container.getElementsByClassName('fa-plus-circle');
		expect(plusElements).toHaveLength(1);
		const plusButton = plusElements[0];
		userEvent.click(plusButton);
		expect(props.onIncrement).toHaveBeenCalledTimes(1);
	});

	test(`Triggers onDecrement Callback`, () => {
		const props = {
			counter: { value: 1, id: 1 },
			onIncrement: jest.fn(),
			onDecrement: jest.fn(),
			onDelete: jest.fn(),
		};
		render(<Counter {...props}></Counter>);
		userEvent.click(screen.getByRole('button', { name: 'decrement' }));
		expect(props.onDecrement).toHaveBeenCalledTimes(1);
	});

	test(`Triggers onDelete Callback`, () => {
		const props = {
			counter: { value: 0, id: 1 },
			onIncrement: jest.fn(),
			onDecrement: jest.fn(),
			onDelete: jest.fn(),
		};
		render(<Counter {...props}></Counter>);
		userEvent.click(screen.getByRole('button', { name: 'delete' }));
		expect(props.onDelete).toHaveBeenCalledTimes(1);
	});
});
