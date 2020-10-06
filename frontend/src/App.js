import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import uuid from 'react-uuid';
import MainList from './components/MainList';
import Header from './components/Header';
import About from './pages/About';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeEdit = this.changeEdit.bind(this);
    this.addNewToTheList = this.addNewToTheList.bind(this);

  }
  state = {
    Lists: [
      {
        id: uuid(),
        name: "list 1",
        editMe: false,
        items: [
          {
            id: uuid(),
            title: "do something list 1",
            completed: true
          },
          {
            id: uuid(),
            title: "do something again list 1",
            completed: false
          }
        ]
      },
      {
        id: uuid(),
        name: "list 2",
        editMe: false,
        items: [
          {
            id: uuid(),
            title: "do something list 2",
            completed: false
          },
          {
            id: uuid(),
            title: "do something again list 2",
            completed: false
          }
        ]
      }
    ],
  }
  addNewList = (item) => {
    this.setState({
      Lists: [...this.state.Lists, {
        id: uuid(),
        name: item.title,
        editMe: false,
        items: [

        ]
      }]
    })
  }
  addNewToTheList = (item) => {
    this.setState({
      Lists: this.state.Lists.map((lis) => {
        if (item.listId === lis.id) {
          lis.items = [...lis.items, {
            id: uuid(),
            title: item.title,
            completed: false,
          }]
        }
        return lis;
      })
    })
  }

  //mark item as done
  markComplete = (id) => {
    this.setState({
      Lists: this.state.Lists.map((lis) => {
        lis.items.map((it) => {
          if (id === it.id) it.completed = !it.completed;
          return it;
        })
        return lis;
      })
    })
  }

  //delete whole list
  deleteList = (listId) => {
    this.setState({
      Lists: this.state.Lists.filter(function (list) {
        return list.id !== listId
      }
      )
    })
  }

  //delete item inside list
  deleteItem = (id) => {
    this.setState({
      Lists: this.state.Lists.filter(function (lis) {
        lis.items = lis.items.filter(function (item) {
          return id !== item.id
        })
        return lis;
      }
      )
    })
  }

  //edit list name
  changeEdit = (id, val) => {
    console.log('innn', val)
    this.setState({
      Lists: this.state.Lists.map((lis) => {
        if (lis.id === id) {
          if (lis.editMe) lis.name = val

          lis.editMe = !lis.editMe

        }
        return lis;
      })
    })

  }


  render() {
    return (
      <HashRouter>
        <div id="app">
          <Header />
          <Route exact path="/" render={props => (
            <MainList
              ListName={this.ListName}
              addNewList={this.addNewList}
              addNewToTheList={this.addNewToTheList}
              changeEdit={this.changeEdit}
              mainList={this.state.Lists}
              markComplete={this.markComplete}
              deleteList={this.deleteList}
              deleteItem={this.deleteItem}
            />
          )} />
          <Route path="/about" component={About} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
