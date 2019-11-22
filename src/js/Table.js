import React, { Component } from "react";

const data = [
  {id: 1, name: "Вася", date:"15.06.2018", count: 11},
  {id: 2, name: "Петя", date:"23.11.2018", count: 23},
  {id: 3, name: "Иван", date:"12 марта 2017", count: 3},
  {id: 4, name: "Александр", date: "20/12/2010", count: 1},
  {id: 5, name: "Евгений", date:"12.09.2018", count: 112},
  {id: 6, name: "Мария", date:"1.08.2016", count: 122},
  {id: 7, name: "Анастасия", date:"20.11.2018", count: 34},
  {id: 8, name: "Степан", date:"12.11.2019", count: 10}
  ];

class Controls extends React.Component {
  render () {
    return (
      <div className="modal-table__controls">
        <input className="modal-table__search" type="text" placeholder={this.props.id} onChange={this.props.search}></input>
        <button className="button modal-table__sort-up" aria-label="по возрастанию" onClick={this.props.sortUp}>&#9650;</button>
        <button className="button modal-table__no-sort" aria-label="без сортировки" onClick={this.props.sortOff}>x</button>
        <button className="button modal-table__sort-down" aria-label="по убыванию" onClick={this.props.sortDown}>&#9660;</button>
      </div>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      sort: {
        column: '',
        method: ''
      },
      search: {
        id: '',
        name: '',
        date: '',
        count: ''
      }
    }
  }

  parseDate (date) {
    const months = {
      'янв': 1,
      'фев': 2,
      'мар': 3,
      'апр': 4,
      'мая': 5,
      'июн': 6,
      'июл': 7,
      'авг': 8,
      'сен': 9,
      'окт': 10,
      'ноя': 11,
      'дек': 12
    };

    const parseMonth = (month) => {
      for (let key in months) {
        if (new RegExp(key, 'i').test(month)) {
          return months[key];
        }
      }
      return month;
    };

    const dateArray = date.split(/[ ,.,/]/);
    const day = dateArray[0];
    const month = parseMonth(dateArray[1]);
    const year = dateArray[2];

    return new Date(`${year} ${month} ${day}`);
  }

  compareFunction (id, modifier, user1, user2) {
    const result = (id === 'date') ? (this.parseDate(user1[id]) > this.parseDate(user2[id])) : (user1[id] > user2[id]);

    return result ? modifier * 1 : modifier * (-1);
  }

  sortUp (id) {
    this.setState({
      sort: {column: id, method: 'up'}
    });
  }

  sortDown (id) {
    this.setState({
      sort: {column: id, method: 'down'}
    });
  }

  sortOff () {
    this.setState({
      sort: {id: '', method: ''}
    });
  }

  search (e, id) {
    this.setState({
      search: { ...this.state.search, [id]: e.target.value}
    });
  }

  render() {
    const data = this.state.data.slice();
    const sort = this.state.sort;
    const search = this.state.search;
    const sortModifier = sort.method === 'up' ? 1 : -1;

    const applySearch = user => {
      for (let key in search) {
        if (!new RegExp(search[key], 'i').test(user[key])) {
          return false;
        }
      }
      return true;
    }

    const renderUser = user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.date}</td>
          <td>{user.count}</td>
        </tr>);
    }

    let viewData = sort ? data.sort(this.compareFunction.bind(this, sort.column, sortModifier)) : data;

    viewData = search ? viewData.filter(applySearch) : viewData;

    const table = viewData.map(renderUser);

    return (
      <table className="modal-table">
        <thead>
          <tr>
            <th><Controls id="id" search={(e) => this.search(e, 'id')} sortUp={() => this.sortUp('id')} sortOff={() => this.sortOff('id')} sortDown={() => this.sortDown('id')}/></th>
            <th><Controls id="name" search={(e) => this.search(e, 'name')} sortUp={() => this.sortUp('name')} sortOff={() => this.sortOff('name')} sortDown={() => this.sortDown('name')}/></th>
            <th><Controls id="date" search={(e) => this.search(e, 'date')} sortUp={() => this.sortUp('date')} sortOff={() => this.sortOff('date')} sortDown={() => this.sortDown('date')}/></th>
            <th><Controls id="count" search={(e) => this.search(e, 'count')} sortUp={() => this.sortUp('count')} sortOff={() => this.sortOff('count')} sortDown={() => this.sortDown('count')}/></th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
    );
  }
}

export default Table;