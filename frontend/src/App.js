import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import uuid from 'react-uuid';
import MainList from './components/MainList';
import Header from './components/Header';
import About from './pages/About';
import ReactDOM from 'react-dom';

// import socket class
import Socket from './socket';


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
    connected: false,
  }
  // componentDidMount is a react life-cycle method that runs after the component 
  //   has mounted.
  componentDidMount() {
    // establish websocket connection to backend server.
    let ws = new WebSocket('ws://localhost:4000');

    // create and assign a socket to a variable.
    let socket = this.socket = new Socket(ws);

    // handle connect and discconnect events.
    socket.on('connect', this.onConnect);
    socket.on('disconnect', this.onDisconnect);

    /* EVENT LISTENERS */
    // event listener to handle 'hello' from a server
    socket.on('helloFromServer', this.helloFromServer);
  }

  // onConnect sets the state to true indicating the socket has connected 
  //    successfully.
  onConnect = () => {
    this.setState({ connected: true });
  }

  // onDisconnect sets the state to false indicating the socket has been 
  //    disconnected.
  onDisconnect = () => {
    this.setState({ connected: false });
  }

  // helloFromClient is an event emitter that sends a hello message to the backend 
  //    server on the socket.
  helloFromClient = () => {
    console.log('saying hello...');
    this.socket.emit('helloFromClient', 'hello server!');
  }

  // helloFromServer is an event listener/consumer that handles hello messages 
  //    from the backend server on the socket.
  helloFromServer = (data) => {
    console.log('hello from server! message:', data);
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
