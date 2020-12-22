import Counters from '../counters';

import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
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
	test(`Triggers onRestart when refresh button is clicked `, () => {
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
		render(<Counters {...props}></Counters>);
		const refreshButton = screen.getByRole('button', { name: 'refresh' });
		userEvent.click(refreshButton);
		expect(screen.getByRole('button', { name: 'refresh' }));
		expect(props.onReset).toHaveBeenCalled();
		userEvent.click(refreshButton);
		expect(props.onReset).toHaveBeenCalledTimes(2);
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
});
