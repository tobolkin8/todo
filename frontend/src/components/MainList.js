import React from 'react';
import AllTodo from '../components/AllTodo';


class MainList extends React.Component {
    state = {
        newVal: '',
        title: '',
        allowSave: true,
        allowSaveList: false
    }
    AddNewListm = (e) => {
        if (e.target.value !== '') {
            this.setState({ title: e.target.value, allowSaveList: true })
        }
        else this.setState({ allowSaveList: false })
    }
    addNewList = (e) => {
        e.preventDefault();
        this.props.addNewList(this.state)
        this.mainInput.value = "";
    }
    assignVal = (e) => {
        if (e.target.value !== '') this.setState({ newVal: e.target.value })
        else this.setState({ allowSave: false })

    }
    render() {
        return (
            <div>


                <div >
                    <form onSubmit={this.addNewList} style={newInDiv}>
                        <input style={stylesINNew} ref={(ref) => this.mainInput = ref} onChange={this.AddNewListm} type="text" placeholder="add new list" />
                        {(this.state.allowSaveList) ?
                            <input style={{ flex: 1 }} type="submit" value="Add" /> : ''
                        }

                    </form>

                </div>

                {this.props.mainList.map((list) => (
                    <div>

                        <input style={deleteIn}
                            onClick={this.props.deleteList.bind(this, list.id)}
                            type="submit" value="X" />
                        {
                            (!list.editMe) ? React.createElement("h2", { value: list.name, onClick: this.props.changeEdit.bind(this, list.id, this.state.newVal) }, list.name) :
                                React.createElement("input", { placeholder: list.name, type: "text", onChange: this.assignVal })
                        }
                        {(list.editMe && this.state.newVal) ? <input onClick={this.props.changeEdit.bind(this, list.id, this.state.newVal)} type="button" value="Save" /> : ''
                        }

                        <AllTodo
                            alltodo={list.items}
                            key={list.id}
                            addNewToTheList={this.props.addNewToTheList}
                            listId={list.id}
                            markComplete={this.props.markComplete}
                            deleteItem={this.props.deleteItem}
                        />

                    </div>

                ))}



            </div>






        )

    }
}


const deleteIn = {
    float: "left",
    marginRight: "10px",
    color: "red",
    border: "2px solid red",
    borderRadius: "10px 5px"
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

export default MainList;
