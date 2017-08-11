import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@blueprintjs/core';

import queryString from 'query-string';
import { debounce, isEqual, pickBy } from 'lodash';

import SearchFilterEntities from './SearchFilterEntities';

import './SearchFilter.css';

const VALID_PARAMS = [
  'q',
  'filter:schema'
];

class SearchFilter extends Component {
  constructor(props)  {
    super(props);

    const params = queryString.parse(props.location.search);
    this.state = {
      params: Object.assign({}, ...VALID_PARAMS.map(param => ({[param]: params[param]})))
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onEntityChange = this.onEntityChange.bind(this);

    this.debouncedUpdate = debounce(this.updateLocation, 250);
  }

  updateLocation() {
    const { history, location } = this.props;
    const nonEmptyParams = pickBy(this.state.params, v => !!v);

    history.push({
      pathname: location.pathname,
      search: queryString.stringify(nonEmptyParams)
    });
  }

  componentWillUpdate(nextProps, { params }) {
    if (!isEqual(params, this.state.params)) {
      this.debouncedUpdate();
    }
  }

  handleParamChange(param, newValue) {
    this.setState({
      params: {
        ...this.state.params,
        [param]: newValue
      }
    });
  }

  onTextChange(e) {
    this.handleParamChange('q', e.target.value);
  }

  onEntityChange(type) {
    this.handleParamChange('filter:schema', type);
  }

  render() {
    const { params } = this.state;
    const { result } = this.props;

    return (
      <div className="search-filter">
        <div className="search-query">
          <div className="search-query__text pt-input-group pt-large">
            <span className="pt-icon pt-icon-search"/>
            <input className="pt-input" type="search" onChange={this.onTextChange}
              value={params.q}/>
          </div>
          <div className="pt-large">
            <Button rightIconName="caret-down">
              <FormattedMessage id="search.collections" defaultMessage="Collections"/>
              {' '}(55)
            </Button>
          </div>
        </div>
        { result.total > 0 &&
          <SearchFilterEntities onChange={this.onEntityChange} result={result}
            value={params['filter:schema']} /> }
      </div>
    );
  }
}

export default SearchFilter;
