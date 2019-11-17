import React, { Component } from "react";

import Map from './components/Map.jsx';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import { StaticMap, Marker } from 'react-map-gl';

import 'bootstrap/dist/css/bootstrap.min.css';

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoia2F1c2hhbDE5NyIsImEiOiJjazMzYjkxZjEwc3R5M2hwYTlvdjNpbHR0In0.gROryKsqwukLN_91-lktHQ";

export default class App extends Component {
  state = {
    location: {
      latitude: 43.75,
      longitude: -79.25
    },
    severity: 20,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    comments: [
      {
        user: "person1932",
        comment: "I just saw this happen, the police has been notified"
      },
      {
        user: "person153",
        comment: "Please be safe everyone"
      }
    ],
    user: "person428",
    comment: "",
    trust: 15,
    distrust: 2,
    opinion: "",
    form: true
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

  setComment = (event) => {
    this.setState({
      comment: event.target.value
    })
  }

  addComment = () => {
    const comment = {
      user: this.state.user,
      comment: this.state.comment
    }

    this.setState({
      comments: this.state.comments.concat(comment),
      comment: ""
    })
  }

  submitForm = () => {
    this.setState({
      form: false
    })
  }

  toggleTrust = () => {
    switch (this.state.opinion) {
      case "trust":
        this.setState({
          trust: this.state.trust - 1,
          opinion: ""
        })
        break;
      case "distrust":
        this.setState({
          trust: this.state.trust + 1,
          distrust: this.state.distrust - 1,
          opinion: "trust"
        })
      default:
        this.setState({
          trust: this.state.trust + 1,
          opinion: "trust"
        })
        break;
    }
  }

  toggleDistrust = () => {
    switch (this.state.opinion) {
      case "distrust":
        this.setState({
          distrust: this.state.distrust - 1,
          opinion: ""
        })
        break;
      case "trust":
        this.setState({
          distrust: this.state.distrust + 1,
          trust: this.state.trust - 1,
          opinion: "distrust"
        })
      default:
        this.setState({
          distrust: this.state.distrust + 1,
          opinion: "distrust"
        })
        break;
    }
  }

  renderMap = () => {
    if (this.state.form == true) {
      return (
        <Map setLocation={this.setLocation.bind(this)} />
      )
    } else {
      return (
        <StaticMap
          width={window.innerWidth}
          height={450}
          latitude={this.state.location.latitude}
          longitude={this.state.location.longitude}
          zoom={15}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >

          <Marker key={1} latitude={this.state.location.latitude} longitude={this.state.location.longitude} offsetLeft={-100} offsetTop={-40}>
            <button className="marker">
              <img src="/mark.svg" alt="" />
            </button>
          </Marker>
        </StaticMap>
      )
    }
  }

  renderPage = () => {
    if (this.state.form == true) {
      return (
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
                    <Form.Control plaintext readOnly value={parseFloat(Math.round(this.state.location.latitude * 10000) / 10000).toFixed(4)} />
                  </Col>
                  <Col sm="4">
                    <Form.Label>Longitude: </Form.Label>
                    <Form.Control plaintext readOnly value={parseFloat(Math.round(this.state.location.longitude * 10000) / 10000).toFixed(4)} />
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
                  <Form.Control as="textarea" rows="3" onChange={this.setDescription} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Button type="submit" onClick={this.submitForm}>Submit</Button>
        </Container>
      )
    } else {
      return (
        <Container>
          <Row>
            <p>{this.state.description}</p>
          </Row>
          <Row>
            <p>Severity: {this.state.severity}</p>
          </Row>
          <Row>
            <Col sm="3">
              <Form.Label>Trust: {this.state.trust}</Form.Label>
            </Col>
            <Col sm="3">
              <Form.Label>Distrust: {this.state.distrust}</Form.Label>
            </Col>
            <Col sm="6">
              <Button type="button" variant={this.state.opinion == "trust"? "success" : "outline-success"} onClick={this.toggleTrust}>Trust</Button>
              <Button type="button" variant={this.state.opinion == "distrust"? "danger" : "outline-danger"} onClick={this.toggleDistrust}>Distrust</Button>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Form.Group controlId="incident.comment">
                <h2>Comment</h2>
                <Form.Control as="textarea" rows="3" onChange={this.setComment} value={this.state.comment} />
              </Form.Group>
            </Col>
            <Button type="submit" onClick={this.addComment}>Submit</Button>
          </Row>
          <Row>
            {this.state.comments.map(comment => (
              <Col sm="12">
                <h3>{comment.user}</h3>
                <p>{comment.comment}</p>
              </Col>
            ))}
          </Row>
        </Container>
      )
    }
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          {this.renderMap()}
        </Row>
        <Row>
          {this.renderPage()}
        </Row>
      </Container>
    );
  }
}
