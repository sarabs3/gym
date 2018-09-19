import ReactTable from "react-table";
import React from 'react';
import 'react-table/react-table.css'
import moment from 'moment';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import {Link} from 'react-router-dom'


class Datalist extends React.Component {
    render() {
        const data = [{
          name: 'Tanner Linsley',
          age: 26,
          friend: {
            name: 'Jason Maurer',
            age: 23,
          },
          value:{
            firstname: 'sarab'
          }
        }]

        const columns = [{
          Header: 'Title',
          accessor: 'value.title' // String-based value accessors!
        }, {
          Header: 'Date',
          id:'Date',
          accessor: d => moment(d.value.date).format('MMM Do YYYY'),
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
          id: 'amount', // Required because our accessor is not a string
          Header: 'Amount',
          accessor: d => d.value.amount // Custom value accessors!
        }, {
          Header: props => <span>Category</span>, // Custom header components!
          accessor: 'value.category'
        },
        {
          Header: 'Notes',
          accessor: 'value.notes' // String-based value accessors!
        }]
        return (
          <React.Fragment>
            <ul>
              <li>
                  <Link to='/'>Add</Link>
              </li>
              <li>
                  <Link to='page2'>List</Link>
              </li>
            </ul>
            <ReactTable data={this.props.data} columns={columns} />
          </React.Fragment>
        )
    }
}

export default compose(firebaseConnect(['data']),connect(({firebase}) => ({data: firebase.ordered.data})))(Datalist);