import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Router from 'react-mock-router';

import {
  BulkConceptsPage,
  mapStateToProps,
} from '../../../components/bulkConcepts/container/BulkConceptsPage';
import concepts from '../../__mocks__/concepts';

describe('Test suite for BulkConceptsPage component', () => {
  it('should render without breaking', () => {
    const props = {
      fetchBulkConcepts: jest.fn(),
      concepts: [],
      loading: true,
      datatypes: [],
      classes: [],
      addToFilterList: jest.fn(),
    };
    const wrapper = mount(<Router>
      <BulkConceptsPage {...props} />
    </Router>);
    expect(wrapper.find('h4').text()).toEqual('Add CIEL concepts');

    expect(wrapper).toMatchSnapshot();
  });
  it('should render without concepts', () => {
    const props = {
      fetchBulkConcepts: jest.fn(),
      concepts: [],
      loading: false,
      datatypes: [],
      classes: [],
      addToFilterList: jest.fn(),
    };
    const wrapper = mount(<Router>
      <BulkConceptsPage {...props} />
    </Router>);
    expect(wrapper.find('#emptyConcept').text()).toEqual('No concepts found');
  });
  it('should render with at least one concept', () => {
    const props = {
      fetchBulkConcepts: jest.fn(),
      concepts: [concepts],
      loading: false,
      datatypes: [],
      classes: [],
      addToFilterList: jest.fn(),
    };
    const wrapper = mount(<Router>
      <BulkConceptsPage {...props} />
    </Router>);
    expect(wrapper.find('#table-body').text()).toBeTruthy();
  });

  it('should filter search result', () => {
    const props = {
      fetchBulkConcepts: jest.fn(),
      concepts: [concepts],
      loading: false,
      datatypes: ['text'],
      classes: ['Diagnosis'],
      addToFilterList: jest.fn(),
    };
    const wrapper = mount(<Router>
      <BulkConceptsPage {...props} />
    </Router>);
    const event = { target: { name: 'Diagnosis, classes', checked: true } };
    const event2 = { target: { name: 'Diagnosis, datatype', checked: true } };
    wrapper.find('#text').simulate('change', event2);
    wrapper.find('#Diagnosis').simulate('change', event);
  });

  it('should test mapStateToProps', () => {
    const initialState = {
      concepts: {
        loading: false,
      },
      bulkConcepts: { bulkConcepts: [], datatypes: [], classes: [] },
    };
    expect(mapStateToProps(initialState).concepts).toEqual([]);
    expect(mapStateToProps(initialState).datatypes).toEqual([]);
    expect(mapStateToProps(initialState).classes).toEqual([]);
    expect(mapStateToProps(initialState).loading).toEqual(false);
  });
});