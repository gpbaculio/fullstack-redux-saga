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

const Home = ({ confirmed }) => (
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
          <Filter />
        </Col>
        {/* <Col xs="12" md="6">
              <Search onSearchPhraseChanged={this.onSearchPhraseChanged} />
                </Col> */}
        <PageTodos />
      </Row>
    </Container>
    <div className="footer">
      <Container>
        <Row>
          <Col>
            <div className="footer d-flex justify-content-center mt-4">
              <Paginator />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
);

Home.propTypes = {
  confirmed: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  confirmed: state.user.confirmed,
  serverErrors: state.formErrors.signUp,
  loading: state.formErrors.loading
})
// const mapDispatchToProps = dispatch => bindActionCreators({
//   loadTodosPage,
//   setCurrentPage
// }, dispatch)
export default connect(mapStateToProps, null)(Home);