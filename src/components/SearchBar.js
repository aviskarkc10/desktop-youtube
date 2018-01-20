import React, { Component } from 'react';

import { Button, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  handleSubmit = (event) => {
    this.props.handleSubmit(event, this.state.query);
  }

  render() {

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="text" bsSize="large">
            <FormControl
              type="text"
              name="query"
              onChange={this.handleChange}
              value={this.state.query}
              placeholder="Search"
            />
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default SearchBar;