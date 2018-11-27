import React from 'react'
import {
  Alert,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  loadTodosPage,
  setCurrentPage
} from '../../../todosPaginationConfig';
import AddTodo from "./AddTodo";
import Paginator from './Paginator';
import PageTodos from './PageTodos'
import Search from './Search'

class Home extends React.Component {

  componentDidMount = () => {
    const { loadTodosPage: loadTodosPaging } = this.props
    loadTodosPaging(1);
  }

  onSearchPhraseChanged = () => {
    const { setCurrentPage: setCurrentPageAction } = this.props
    setCurrentPageAction(1);
  }

  render() {
    const { confirmed } = this.props
    return (
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
            <Col xs="12" md="6">
              <Search onSearchPhraseChanged={this.onSearchPhraseChanged} />
            </Col>
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
  }
}

Home.propTypes = {
  confirmed: PropTypes.bool.isRequired,
  loadTodosPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  confirmed: state.user.confirmed,
  serverErrors: state.formErrors.signUp,
  loading: state.formErrors.loading
})
const mapDispatchToProps = dispatch => bindActionCreators({
  loadTodosPage,
  setCurrentPage
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home);