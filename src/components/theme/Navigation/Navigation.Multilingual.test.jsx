import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { settings } from '~/config';
import Navigation from './Navigation';

beforeAll(() => {
  settings.isMultilingual = true;
});

afterAll(() => {
  settings.isMultilingual = false;
});

const mockStore = configureStore();

describe('Navigation Multilingual', () => {
  it('renders a navigation component without active items', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Home', url: '/en' },
          { title: 'Blog', url: '/en/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/bla' }]}>
          <Navigation getNavigation={() => {}} pathname="/en/bla" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a navigation component with an active item', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Home', url: '/en' },
          { title: 'Blog', url: '/en/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog' }]}>
          <Navigation getNavigation={() => {}} pathname="/en/blog" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a navigation component with an active item when its subchildren are accessed', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Home', url: '/en' },
          { title: 'Blog', url: '/en/blog' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog/2017/12/27' }]}>
          <Navigation getNavigation={() => {}} pathname="/en/blog/2017/12/27" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a navigation component with only one active item even if there are similar item names', () => {
    const store = mockStore({
      navigation: {
        items: [
          { title: 'Home', url: '/en' },
          { title: 'Blog', url: '/en/blog' },
          { title: 'Blog of mine', url: '/en/blog-of-mine' },
          { title: 'Users', url: '/users' },
        ],
      },
      userSession: { token: '1234' },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/en/blog' }]}>
          <Navigation getNavigation={() => {}} pathname="/en/blog" />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
