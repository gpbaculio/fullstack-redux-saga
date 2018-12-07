import React from 'react'
import {
  Alert,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import Filter from './Filter'
import AddTodo from "./AddTodo";
import Paginator from './Paginator';
import Search from './Search'
import PageTodos from './PageTodos'

import { clearError } from '../../../actions/todo'

class Home extends React.Component {

  clearError = () => {
    clearError()
  }

  render() {
    const { error, match, confirmed } = this.props
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs="12" md="6">
              {confirmed ? <AddTodo /> : (
                <Alert className="text-center mx-auto mt-4 mb-xs-1 mb-md-5" color="primary">
                  Please confirm your account to Add Todo
            </Alert>
              )}
            </Col>
            <Col xs="12" md="6">
              <Search />
            </Col>
            <Col sm="12">
              <Filter url={match.url} />
            </Col>
            {error && (
              <Col xs="12">
                <Alert color="danger" className="text-center" isOpen={Boolean(error)} toggle={this.clearError}>
                  {error}
                </Alert>
              </Col>
            )}
            <PageTodos />
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <div className="footer d-flex justify-content-center mt-2">
                <Paginator />
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}


Home.propTypes = {
  confirmed: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
}

const mapStateToProps = ({ user, todos }) => ({
  userId: user.id,
  confirmed: user.confirmed,
  error: todos.error
})

export default connect(mapStateToProps, null)(withRouter(Home));