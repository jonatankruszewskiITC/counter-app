import Counters from '../counters';

import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

jest.mock('../../counter/counter', () => () => <div>Mocked Counter</div>);

describe('It Renderrs without Crashing', () => {
	test(`Testing Component doesn't Crash`, () => {
		const props = {
			counters: [
				{ value: 0, id: 1 },
				{ value: 1, id: 2 },
				{ value: 3, id: 3 },
			],
			onReset: jest.fn(),
			onIncrement: jest.fn(),
			onDelete: jest.fn(),
			onDecrement: jest.fn(),
			onRestart: jest.fn(),
		};
		const container = document.createElement('div');
		ReactDOM.render(<Counters {...props}></Counters>, container);
		const unmounted = ReactDOM.unmountComponentAtNode(container);
		expect(unmounted).toBe(true);
	});

	test(`Renders The right amount of counters`, () => {
		const props = {
			counters: [
				{ value: 10, id: 1 },
				{ value: 20, id: 2 },
				{ value: 30, id: 3 },
			],
			onReset: jest.fn(),
			onIncrement: jest.fn(),
			onDelete: jest.fn(),
			onDecrement: jest.fn(),
			onRestart: jest.fn(),
		};
		render(<Counters {...props}></Counters>);
		const counters = screen.getAllByText('Mocked Counter');
		expect(counters).toHaveLength(3);
	});

	test(`Renders The right amount of counters`, () => {
		const props = {
			counters: [],
			onReset: jest.fn(),
			onIncrement: jest.fn(),
			onDelete: jest.fn(),
			onDecrement: jest.fn(),
			onRestart: jest.fn(),
		};
		render(<Counters {...props}></Counters>);
		const counters = screen.queryAllByText('Mocked Counter');
		expect(counters).toHaveLength(0);
	});

	test(`Triggers onReset`, () => {
		const props = {
			counters: [
				{ value: 10, id: 1 },
				{ value: 20, id: 2 },
				{ value: 30, id: 3 },
			],
			onReset: jest.fn(),
			onRestart: jest.fn(),
		};
		render(<Counters {...props}></Counters>);
		const button = screen.getByRole('button', { name: 'refresh' });
		userEvent.click(button);
		expect(props.onReset).toHaveBeenCalledTimes(1);
	});

	test(`Triggers onRestart when Restart button is clicked`, () => {
		const props = {
			counters: [],
			onReset: jest.fn(),
			onIncrement: jest.fn(),
			onDelete: jest.fn(),
			onDecrement: jest.fn(),
			onRestart: jest.fn(),
		};

		render(<Counters {...props}></Counters>);
		const button = screen.getByRole('button', { name: 'restart' });
		expect(button).toBeEnabled();
		userEvent.click(button);
		expect(props.onRestart).toHaveBeenCalledTimes(1);
	});
});
