import React from 'react'
import {
  Alert,
  Col,
  Container,
  Row,
  Button
} from 'reactstrap';
import Pagination from 'react-js-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { getTotalElements, ELEMENTS_PER_PAGE, setCurrentPage, getCurrentPage } from '../../todosPaginationConfig';
import { addTodoByUserRequest } from '../../actions/todo'

class Home extends React.Component {

  state = {
    todoText: '',
    errors: {},
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
    // if (state.limit !== props.limit) {
    //   const { data, limit } = props;
    //   const contacts = get(data, 'Account.contacts.contacts', []);
    //   const pages = Math.ceil(contacts.length / limit);
    //   return {
    //     contactData: contacts,
    //     limit,
    //     pages,
    //   };
    // }
    console.log('activePage = ', activePage)
    console.log('totalItemsCount = ', totalItemsCount)
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
          {_.values(todos).map(todo => (
            <div key={todo._id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card mr-auto ml-auto mb-2" style={{ width: '10rem' }}>
                <img className="card-img-top" src=".../100px180/" alt="Card cap" />
                <div className="card-body">
                  <h5 className="card-title">{todo.text}<p>{todo.complete}</p></h5>
                  <p className="card-text">{todo.createdAt === todo.updatedAt ? todo.createdAt : `${todo.updatedAt} Edited`}</p>
                  <a href="/to" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          ))}
          <Pagination
            activePage={activePage}
            itemsCountPerPage={ELEMENTS_PER_PAGE}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={3}
            onChange={this.onChosenPageChanged}
          />
        </Row>
      </Container>
    )
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
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  userId: state.user.id,
  confirmed: state.user.confirmed,
  loading: state.formErrors.loading,
  serverErrors: state.formErrors.signUp,
  totalItemsCount: getTotalElements(state),
  activePage: getCurrentPage(state).pageNumber,
})

const mapDispatchToProps = () => ({
  submit: addTodoByUserRequest,
  setCurrentPageActionCreator: setCurrentPage
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);