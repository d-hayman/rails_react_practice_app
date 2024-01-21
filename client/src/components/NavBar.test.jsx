import { describe } from "node:test";
import NavBar from "./NavBar";
import { render } from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render and componentDidMount
  act(() => {
    createRoot(container).render(<NavBar />);
  });
});