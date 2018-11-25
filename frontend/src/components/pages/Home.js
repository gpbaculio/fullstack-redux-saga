import React from 'react'
import {
  Alert,
  Col,
  Container,
  Row,
  Button,
} from 'reactstrap';
import Pagination from 'react-js-pagination'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

import {
  getTotalElements,
  ELEMENTS_PER_PAGE,
  getCurrentPage,
  getPage,
  loadTodosPage
} from '../../todosPaginationConfig';

class Home extends React.Component {

  state = {
    todoText: '',
    errors: {},
  }

  componentDidMount = () => {
    const { loadTodosPage: loadTodosPaging } = this.props
    loadTodosPaging(1);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.serverErrors) {
      return {
        errors: nextProps.serverErrors
      }
    }
    return null;
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { submit, userId } = this.props
    const { todoText } = this.state
    const errors = this.validate({ todoText });
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      await submit({ todoText, userId })
      this.setState({ todoText: '' });
    }
  };

  validate = ({ todoText }) => {
    const errors = {}
    if (!todoText) {
      errors.todoText = "Can't be blank";
    }
    return errors;
  };

  onChosenPageChanged = (page) => {
    const { setCurrentPageActionCreator } = this.props;
    setCurrentPageActionCreator(page);
  }

  render() {
    const { todoText, errors } = this.state
    const { confirmed, loading, todos, activePage, totalItemsCount } = this.props;
    const { page } = this.props;
    if (!page) {
      return <div>no data</div>;
    }
    if (page.isFetching) {
      return <div>Loading ...</div>;
    }
    if (page.isSuccess || page.isRefreshing) {
      if (page.elements.length === 0) {
        return <div>elements not found</div>;
      }

      const content = page.elements.map((todo, i) => {
        console.log('x = ', todo)
        return (
          <div key={i} className="col-lg-4 col-md-6 col-sm-12">
            <div className="card mr-auto ml-auto mb-5 w-50">
              <div className="card-body">
                <h5 className="card-title">{todo.text}</h5>
                <p className="card-text">{todo.createdAt === todo.updatedAt ? moment(todo.createdAt).format('LLLL') : `${moment(todo.updatedAt).format('LLLL')} Edited`}</p>
                <a href="/to" className="btn btn-primary btn-block">complete</a>
              </div>
            </div>
          </div>
        )
      });
      return (
        <Container>
          <Row>
            <Col xs="12">
              {confirmed ? (
                <form
                  className="form-inline justify-content-center mx-auto my-5 w-60 align-items-start"
                  onSubmit={this.onSubmit}
                >
                  <div className="form-group form-inline w-50">
                    <input
                      type="text"
                      id="todoText"
                      name="todoText"
                      value={todoText}
                      onChange={this.onChange}
                      className={
                        `w-100 ${errors.todoText ? "form-control is-invalid" : "form-control"}`
                      }
                    />
                    <div className="invalid-feedback">{errors.todoText}</div>
                  </div>
                  <Button type="submit" disabled={loading} color="primary" className="ml-3">Submit</Button>
                </form>
              ) : (
                  <Alert className="text-center" color="primary">
                    Please confirm your account to Add Todo
                  </Alert>
                )}
            </Col>
            {page.isRefreshing && <div>refreshing ...</div>}
            {content}
          </Row>
          <Row>
            <Col>
              <div className="d-flex justify-content-center my-1">
                <Pagination
                  activePage={3}
                  itemsCountPerPage={10}
                  totalItemsCount={21}
                  pageRangeDisplayed={5}
                  onChange={() => console.log('click page')}
                />
              </div>
            </Col>
          </Row>
        </Container>
      );
    }

    if (page.isFailed) {
      return <div>isFailed</div>;
    }
  }
}

Home.propTypes = {
  setCurrentPageActionCreator: PropTypes.func.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  confirmed: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  todos: PropTypes.objectOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  loadTodosPage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const chosenPage = getCurrentPage(state).pageNumber;
  const page = getPage(state, chosenPage);
  return ({
    todos: state.todos,
    userId: state.user.id,
    confirmed: state.user.confirmed,
    loading: state.formErrors.loading,
    serverErrors: state.formErrors.signUp,
    totalItemsCount: getTotalElements(state),
    activePage: getCurrentPage(state).pageNumber,
    chosenPage,
    page
  })
}

export default connect(mapStateToProps, { loadTodosPage })(Home);