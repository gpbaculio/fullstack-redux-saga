import React from 'react'
import {
  Alert,
  Col,
  Container,
  Row,
  Button
} from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { addTodoRequest } from '../../actions/todo'

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

  render() {
    const { todoText, errors } = this.state
    const { confirmed, loading, todos } = this.props;
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
        </Row>
      </Container>
    )
  }
}

Home.propTypes = {
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
  serverErrors: state.formErrors.signUp
})

const mapDispatchToProps = {
  submit: addTodoRequest
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);