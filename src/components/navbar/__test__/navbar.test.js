import NavBar from '../navbar';

import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('Navbar', () => {
	test(`Testing Component doesn't Crash`, () => {
		const props = { totalCounters: 5 };
		const container = document.createElement('div');
		ReactDOM.render(<NavBar {...props}></NavBar>, container);
		const unmounted = ReactDOM.unmountComponentAtNode(container);
		expect(unmounted).toBe(true);
	});
	test('Checks the amount of counters', () => {
		const props = { totalCounters: 5 };
		render(<NavBar {...props}></NavBar>);
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(screen.getByText('Items')).toBeInTheDocument();
	});
});
