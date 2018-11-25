import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  FormGroup,
  Label,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'styleguide';
import update from 'immutability-helper';
import { graphql } from 'react-apollo';
import join from 'lodash/join';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import map from 'lodash/map';
import slice from 'lodash/slice';
import times from 'lodash/times';
import get from 'lodash/get';
import PopoverItem from '../PopoverItem';
import { CONTACTS } from '../../../../../apollo/queries/contactQuery';
import ContactOptions from '../ContactOptions';
import SendSMS from '../SendSMS';

/* eslint-disable react/jsx-no-bind, react/no-unused-state, react/no-unused-prop-types */

class ContactsTable extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.contacts !== get(props, 'data.Account.contacts.contacts', [])) {
      const { data, limit } = props;
      const contacts = get(data, 'Account.contacts.contacts', []);
      const pages = Math.ceil(contacts.length / limit);
      return {
        pages,
        contacts,
        contactData: contacts,
      };
    }
    if (state.searchText !== props.searchText) {
      const { data, limit } = props;
      const contacts = get(data, 'Account.contacts.contacts', []);
      const newContactData = contacts.filter((col) => {
        if (`${col.firstName || ''} ${col.lastName || ''}`.trim()) {
          return `${col.firstName || ''} ${col.lastName || ''}`.trim().toLowerCase().search(props.searchText.toLowerCase()) !== -1;
        }
        return false;
      });
      const pages = Math.ceil(newContactData.length / limit);
      return {
        contactData: newContactData,
        pages,
      };
    }
    if (state.limit !== props.limit) {
      const { data, limit } = props;
      const contacts = get(data, 'Account.contacts.contacts', []);
      const pages = Math.ceil(contacts.length / limit);
      return {
        contactData: contacts,
        limit,
        pages,
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      contactData: [],
      endLast24Hours: moment().format(),
      limit: props.limit,
      paged: 1,
      pages: 1,
      searchText: '',
      showSendSMS: false,
      selectAll: false,
      checkboxes: [],
      startLast24Hours: moment().subtract(1, 'days').format(),
    };
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePaginate = this.handlePaginate.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.toggleSendSMS = this.toggleSendSMS.bind(this);
  }
  handleCheckAll(e) {
    const { checked, name } = e.target;
    let values = this.state.contactData;
    map(values, (val, key) => {
      values = update(values, {
        [key]: {
          checked: {
            $set: checked,
          },
        },
      });
    });
    this.setState({
      contactData: values,
      [name]: checked,
    });
  }
  handleCheckChange(e) {
    const { checked, name } = e.target;
    const id = name.replace('check-', '');
    const index = findIndex(this.state.contactData, { id });
    if (index < 0) return;
    this.setState(update(this.state, {
      contactData: {
        [index]: {
          checked: {
            $set: checked,
          },
        },
      },
    }));
  }
  handlePrev(e) {
    e.preventDefault();
    this.setState(p => ({ paged: p.paged - 1 }));
  }
  handleNext(e) {
    e.preventDefault();
    this.setState(p => ({ paged: p.paged + 1 }));
  }
  handlePaginate(val, e) {
    e.preventDefault();
    this.setState({ paged: val });
  }
  toggleSendSMS() {
    this.setState(state => ({ showSendSMS: !state.showSendSMS }));
  }
  render() {
    let { contactData } = this.state;
    if (contactData.length < 1) return null;
    const { selectAll, endLast24Hours, startLast24Hours, showSendSMS } = this.state;
    const { paged, pages } = this.state;
    const { data, lastNew24Hours, limit } = this.props;
    const { loading, refetch } = data;
    const offset = (paged - 1) * limit;
    contactData = slice(contactData, offset, offset + limit);
    if (lastNew24Hours) {
      contactData = contactData.filter(({ created }) => moment(created).isBetween(startLast24Hours, endLast24Hours));
    }
    console.log(lastNew24Hours);
    return (
      <React.Fragment>
        <SendSMS
          contactData={contactData}
          show={showSendSMS}
          onCancel={this.toggleSendSMS}
        />
        <Table
          responsive
        >
          <thead>
            <tr>
              <th>
                <FormGroup check>
                  <Label check><Input type="checkbox" onChange={this.handleCheckAll} name="selectAll" checked={selectAll} /></Label>
                </FormGroup>
              </th>
              {
                filter(contactData, ['checked', true]).length > 0 ?
                  <th colSpan={6}>
                    <ContactOptions
                      toggleSendSMS={this.toggleSendSMS}
                      contactData={contactData}
                    />
                  </th>
                  :
                  <React.Fragment>
                    <th>Name</th>
                    <th>Organization</th>
                    <th>Email</th>
                    <th>Tags</th>
                    <th>Source</th>
                    <th>Date Added</th>
                  </React.Fragment>
              }
            </tr>
          </thead>
          <tbody>
            {
              loading &&
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            }
            <React.Fragment>
              {
                contactData
                .map(({ checked, id, firstName, lastName, organization, email, tags, source, created }) => {
                  const fullName = `${firstName || ''} ${lastName || ''}`;
                  return (
                    <tr key={id}>
                      <td>
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" name={`check-${id}`} onChange={this.handleCheckChange} checked={checked || false} />
                          </Label>
                        </FormGroup>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {fullName.trim() ? <Link to={`contacts/${id}`}>{fullName}</Link> : ''}
                          <PopoverItem type="multi" refetch={refetch} id={id} fields={[{ id: 'firstName', label: 'First Name', value: firstName }, { id: 'lastName', label: 'Last Name', value: lastName }]} prefix={this.props.prefix} value={fullName.trim()} />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{organization || ''}</span>
                          <PopoverItem
                            prefix={this.props.prefix}
                            refetch={refetch}
                            name="organization"
                            id={id}
                            value={organization}
                            label="Organization"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link to={`contacts/${id}`}><span>{email || ''}</span></Link>
                          <PopoverItem
                            prefix={this.props.prefix}
                            refetch={refetch}
                            name="email"
                            id={id}
                            value={email}
                            type="email"
                            label="Email"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>{join(tags, ', ')}</span>
                          <PopoverItem
                            prefix={this.props.prefix}
                            name="tags"
                            type="tag"
                            refetch={refetch}
                            id={id}
                            label="Tags"
                            value={map(tags, val => ({ id: val, text: val }))}
                          />
                        </div>
                      </td>
                      <td>{source}</td>
                      <td>{moment(created).format('L')}</td>
                    </tr>
                  );
                })
              }
            </React.Fragment>
          </tbody>
        </Table>
        <div className="d-flex justify-content-center mt-4 mb-3">
          <Pagination>
            <PaginationItem disabled={paged <= 1}>
              <PaginationLink href="#" previous onClick={this.handlePrev} />
            </PaginationItem>
            {
              times(pages, Number).map(val => (
                <PaginationItem active={(paged - 1) === val} key={val}>
                  <PaginationLink href="#" onClick={this.handlePaginate.bind(null, val + 1)}>
                    {val + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            }
            <PaginationItem disabled={paged >= pages}>
              <PaginationLink href="#" next onClick={this.handleNext} />
            </PaginationItem>
          </Pagination>
        </div>
      </React.Fragment>
    );
  }
}
ContactsTable.propTypes = {
  data: PropTypes.object.isRequired,
  lastNew24Hours: PropTypes.bool,
  limit: PropTypes.number,
  prefix: PropTypes.string,
  searchText: PropTypes.string.isRequired,
};

ContactsTable.defaultProps = {
  lastNew24Hours: false,
  limit: 10,
  prefix: 'all',
};

export default graphql(CONTACTS, {
  options: {
    fetchPolicy: 'network-only',
    variables: { token: localStorage.getItem('token') },
  },
})(ContactsTable);
