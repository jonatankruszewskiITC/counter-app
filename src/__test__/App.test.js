import App from '../App';

import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

describe('App', () => {
	const { reload } = window.location;
	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			writable: true,
			value: { reload: jest.fn() },
		});
	});

	afterAll(() => {
		window.location.reload = reload;
	});

	test(`Testing Component doesn't Crash`, () => {
		const container = document.createElement('div');
		ReactDOM.render(<App></App>, container);
		const unmounted = ReactDOM.unmountComponentAtNode(container);
		expect(unmounted).toBe(true);
	});

	test('Renders 4 counters upon start', () => {
		render(<App></App>);
		expect(screen.getAllByTestId('counter')).toHaveLength(4);
	});

	test('Adding to the first Counter', () => {
		render(<App></App>);
		expect(screen.getAllByRole('button', { name: 'increment' })).toHaveLength(4);
		const incrementCounter01 = screen.getAllByRole('button', { name: 'increment' })[0];
		const counterDisplayCounter01 = screen.getAllByTestId('counterDisplay')[0];

		userEvent.click(incrementCounter01);
		expect(counterDisplayCounter01).toHaveTextContent('1');
		userEvent.click(incrementCounter01);
		expect(counterDisplayCounter01).toHaveTextContent('2');
	});

	test('Extracting to the second Counter', () => {
		render(<App></App>);
		expect(screen.getAllByRole('button', { name: 'increment' })).toHaveLength(4);
		const incrementCounter02 = screen.getAllByRole('button', { name: 'increment' })[1];
		const decrementCounter02 = screen.getAllByRole('button', { name: 'Minus Button' })[1];
		const counterDisplayCounter02 = screen.getAllByTestId('counterDisplay')[1];

		userEvent.click(incrementCounter02);
		expect(counterDisplayCounter02).toHaveTextContent('1');
		userEvent.click(decrementCounter02);
		expect(counterDisplayCounter02).toHaveTextContent('Zero');
	});

	test('Deleting a counter', () => {
		render(<App></App>);
		const deleteCounterButtons = screen.getAllByRole('button', { name: 'delete' });
		expect(deleteCounterButtons).toHaveLength(4);
		const deleteCounter04 = deleteCounterButtons[3];
		fireEvent.click(deleteCounter04);
		expect(screen.getAllByTestId('counter')).toHaveLength(3);
	});

	test('Cart Amount gets updated', () => {
		render(<App></App>);
		const incrementButtons = screen.getAllByRole('button', { name: 'increment' });
		expect(incrementButtons).toHaveLength(4);
		for (let element of incrementButtons) fireEvent.click(element);
		expect(screen.getByTestId('cart')).toHaveTextContent('4');
	});

	test('Resets all Counters', () => {
		render(<App></App>);
		const resetButton = screen.getByRole('button', { name: 'refresh' });
		const incrementButtons = screen.getAllByRole('button', { name: 'increment' });
		for (const button of incrementButtons) fireEvent.click(button);
		fireEvent.click(resetButton);
		expect(screen.queryAllByTestId('counter')).toHaveLength(4);
	});

	test('Refresh', () => {
		render(<App></App>);
		const resetButton = screen.getByRole('button', { name: 'restart' });
		const deleteButtons = screen.getAllByRole('button', { name: 'delete' });
		for (const button of deleteButtons) fireEvent.click(button);
		expect(screen.queryAllByTestId('counter')).toHaveLength(0);
		fireEvent.click(resetButton);
		expect(window.location.reload).toHaveBeenCalled();
	});
});
