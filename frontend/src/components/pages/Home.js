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
    const errors = this.validate({ todoText });
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      await addTodo({ todoText, userId })
      this.setState({ todoText: '' });
    }
  };

  onSearchPhraseChanged = () => {
    const { setCurrentPage: setCurrentPageAction } = this.props
    setCurrentPageAction(1);
  }

  validate = ({ todoText }) => {
    const errors = {}
    if (!todoText) {
      errors.todoText = "Can't be blank";
    }
    return errors;
  };

  render() {
    const { loading, errors, todoText } = this.state
    const { confirmed } = this.props
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col xs="12" md="6">
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