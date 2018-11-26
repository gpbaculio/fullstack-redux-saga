import React from 'react'
import {
  Alert,
  Col,
  Container,
  Row,
  Button,
} from 'reactstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  loadTodosPage,
  setCurrentPage
} from '../../todosPaginationConfig';
import Paginator from './Paginator';
import PageItem from './PageItem'
import Search from './Search'
import { addTodoByUserRequest } from '../../actions/todo'

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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.errors.todoText) {
      return true
    }
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { addTodo, userId } = this.props
    const { todoText } = this.state
    const errors = await this.validate(todoText);
    console.log('errors = ', errors)
    await this.setState({ errors });
    console.log('this.state', this.state)
    if (Object.keys(errors).length === 0) {
      console.log('errors = ', errors)
      await addTodo({ todoText, userId })
      this.setState({ todoText: '' });
    }
  };

  onSearchPhraseChanged = (searchPhrase) => {
    this.props.setCurrentPage(1);
  }

  validate = (todoText) => {
    const errors = {}
    console.log('todoText = ', !todoText)
    if (!todoText) {
      errors.todoText = "Can't be blank";
    }
    return errors;
  };

  render() {
    const { loading, errors, todoText } = this.state
    console.log('errors = ', errors)
    const { confirmed } = this.props
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs="12" md="6">
              {confirmed ? (
                <form
                  className="form-inline justify-content-center mx-auto my-3 align-items-start"
                  onSubmit={this.onSubmit}
                >
                  <div className="form-group form-inline">
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
            <Col xs="12" md="6">
              <Search onSearchPhraseChanged={this.onSearchPhraseChanged} />
            </Col>
            <PageItem />
          </Row>
        </Container>
        <div className="footer">
          <Container>
            <Row>
              <Col>
                <div className="footer d-flex justify-content-center my-1">
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
  addTodo: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  loadTodosPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  confirmed: state.user.confirmed,
  serverErrors: state.formErrors.signUp,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  loadTodosPage,
  addTodo: addTodoByUserRequest,
  setCurrentPage
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home);