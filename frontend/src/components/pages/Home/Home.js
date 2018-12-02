import React from 'react'
import {
  Alert,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Filter from './Filter'
import AddTodo from "./AddTodo";
import Paginator from './Paginator';
import PageTodos from './PageTodos'

const Home = ({ confirmed, match }) => (
  <React.Fragment>
    <Container>
      <Row>
        <Col xs="12" md="6">
          {confirmed ? <AddTodo /> :
            (
              <Alert className="text-center" color="primary">
                Please confirm your account to Add Todo
            </Alert>
            )}
        </Col>
        <Col sm="12">
          <Filter url={match.url} />
        </Col>
        {/* <Col xs="12" md="6">
            <Search onSearchPhraseChanged={this.onSearchPhraseChanged} />
              </Col> */}
        <PageTodos />
      </Row>
    </Container>
    <Container>
      <Row>
        <Col>
          <div className="footer d-flex justify-content-center mt-4">
            <Paginator />
          </div>
        </Col>
      </Row>
    </Container>
  </React.Fragment>
);

Home.propTypes = {
  confirmed: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = ({ user, formErrors }) => ({
  userId: user.id,
  confirmed: user.confirmed,
  serverErrors: formErrors.signUp,
  loading: formErrors.loading
})

export default connect(mapStateToProps, null)(Home);