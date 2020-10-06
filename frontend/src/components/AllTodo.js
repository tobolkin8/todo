
import React from 'react'
//import Todo from './Todo';

class AllTodo extends React.Component {
    state = {
        title: '',
        listId: this.props.listId,
        allowSave: true
    }
    AddNewItem = (e) => {
        if (e.target.value !== '') {
            this.setState({ title: e.target.value, allowSave: true })
        }
        else this.setState({ allowSave: false })
    }
    addNewToTheList = (e) => {
        e.preventDefault();
        this.props.addNewToTheList(this.state)
        this.mainInput.value = "";
    }
    getStyle(key) {
        let it;
        let myItem = this.props.alltodo.map((val) => {
            if (val.id === key) it = val;
            return val;
        });
        return {
            background: "#f3f3f3",
            padding: "8px",
            borderBottom: "1px solid #ccc",
            textDecoration: it.completed ? "line-through" : 'none',
        }
    }

    render() {
        return (
            <div>
                { this.props.alltodo.map((item) => (
                    <div style={this.getStyle(item.id)}>
                        <input style={deleteIn}
                            onClick={this.props.deleteItem.bind(this, item.id)}
                            type="submit" value="X" />

                        <input checked={item.completed} onChange={this.props.markComplete.bind(this, item.id)} style={itemCheckbox} type="checkbox" />
                        <span>{item.title}</span>


                    </div>
                )
                )}

                <div >
                    <form onSubmit={this.addNewToTheList} style={newInDiv}>
                        <input style={stylesINNew} ref={(ref) => this.mainInput = ref} onChange={this.AddNewItem} type="text" placeholder="add new item" />
                        {(this.state.allowSave) ?
                            <input style={{ flex: 1 }} type="submit" value="Add" /> : ''
                        }

                    </form>

                </div>
            </div>

        );
    }
}

const itemCheckbox = {
    float: "left",
}
const deleteIn = {
    float: "right",
}
const stylesINNew = {
    alignItems: 'stretch',
    flex: "10"
}
const newInDiv = {
    paddingTop: "10px",
    paddingBottom: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}
export default AllTodo;
