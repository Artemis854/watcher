import React, { Component } from "react";

import Map from './components/Map.jsx';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';

// import Tooltip from 'rc-tooltip';
// import Slider from 'rc-slider';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'rc-slider/assets/index.css';

export default class App extends Component {
  state = {
    location: {
      latitude: 43.75,
      longitude: -79.25
    },
    severity: 20,
    description: ""
  }

  setLocation = (lat, lng) => {
    this.setState({
      location: {
        latitude: lat,
        longitude: lng
      }
    })
  }

  setSeverity = (event, value) => {
    this.setState({
      severity: value
    })
  }

  setDescription = (event) => {
    this.setState({
      description: event.target.value
    })  
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Map setLocation={this.setLocation.bind(this)} />
        </Row>
        <Row>
          <Container>
            <Form className="incident-form">
              <h1>Report an Incident</h1>
              <Row>
                <Col sm={6}>
                  <h2>Location (Click map to record)</h2>
                  <p>You can move around the map by dragging or using the search bar</p>
                  <Form.Group as={Row} controlId="incident.location">
                    <Col sm="4">
                      <Form.Label>Latitude: </Form.Label>
                      <Form.Control plaintext readOnly defaultValue={this.state.location.latitude} />
                    </Col>
                    <Col sm="4">
                      <Form.Label>Longitude: </Form.Label>
                      <Form.Control plaintext readOnly defaultValue={this.state.location.longitude} />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <h2>Severity</h2>
                  <br />
                  <Form.Group as={Row} controlId="incident.severity">
                    <Col sm="2">
                      <p>Not Severe</p>
                    </Col>
                    <Col sm="8">
                      <Slider
                        defaultValue={this.state.severity}
                        aria-labelledby="discrete-slider-always"
                        step={20}
                        marks={[{ value: 0 }, { value: 20 }, { value: 40 }, { value: 60 }, { value: 80 }, { value: 100 }
                        ]}
                        valueLabelDisplay="on"
                        value={this.state.severity}
                        onChangeCommitted={this.setSeverity}
                      />
                    </Col>
                    <Col sm="2">
                      <p>Critically Severe</p>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <Form.Group controlId="incident.description">
                    <h2>Description of Incident</h2>
                    <Form.Control as="textarea" rows="3" onChange={this.setDescription}/>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Button type="submit">Submit</Button>
          </Container>
        </Row>
      </Container>
    );
  }
}
