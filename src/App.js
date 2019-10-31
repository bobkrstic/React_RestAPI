import React, { Component } from "react";
// in terminal 'yarn add axios' then import it
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class App extends Component {
  state = {
    books: [],
    newBookData: {
      title: "",
      rating: ""
    },
    editBookData: {
      id: "",
      title: "",
      rating: ""
    },
    newBookModal: false,
    editBookModal: false
  };

  componentWillMount() {
    this._refreshBooks();
  }

  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal
    });
    // this.state.newBookModal = true;
  }

  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal
    });
    // this.state.editBookModal = true;
  }

  addBook() {
    axios
      .post("http://localhost:3000/books", this.state.newBookData)
      .then(response => {
        let { books } = this.state;
        books.push(response.data);
        // update the state and hide the modal window,
        // and reset the modal to be empty when adding a new book
        this.setState({
          books,
          newBookModal: false,
          newBookData: {
            title: "",
            rating: ""
          }
        });
        // console.log(response.data);
      });
  }

  updateBook() {
    let { title, rating } = this.state.editBookData;
    axios
      .put("http://localhost:3000/books/" + this.state.editBookData.id, {
        title,
        rating
      })
      .then(response => {
        this._refreshBooks();
        this.setState({
          editBookModal: false,
          editBookData: {
            id: "",
            title: "",
            rating: ""
          }
        });
        // console.log(response.data);
      });
  }

  editBook(id, title, rating) {
    this.setState({
      editBookData: { id, title, rating },
      editBookModal: !this.state.editBookModal
    });
    // console.log(id, title, rating);
  }

  deleteBook(id) {
    axios.delete("http://localhost:3000/books/" + id).then(response => {
      this._refreshBooks();
    });
  }

  _refreshBooks() {
    axios.get("http://localhost:3000/books").then(response => {
      this.setState({
        books: response.data
      });
    });
  }

  render() {
    let books = this.state.books.map(book => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <td>
            {/* 'bind' parameters will send the data to the 'editBook' function */}
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editBook.bind(
                this,
                book.id,
                book.title,
                book.rating
              )}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={this.deleteBook.bind(this, book.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App container">
        <h1>Books App</h1>
        <Button
          className="my-3"
          color="primary"
          onClick={this.toggleNewBookModal.bind(this)}
        >
          Add Book
        </Button>
        {/* -----------------------------------------New Book Modal---------------------------------------- */}
        <Modal
          isOpen={this.state.newBookModal}
          toggle={this.toggleNewBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
            Add a new book
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.newBookData.title}
                onChange={e => {
                  let { newBookData } = this.state;
                  newBookData.title = e.target.value;

                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                id="rating"
                value={this.state.newBookData.rating}
                onChange={e => {
                  let { newBookData } = this.state;
                  newBookData.rating = e.target.value;
                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>
              Add Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* -----------------------------Edit Book Modal------------------------------------------------- */}
        <Modal
          isOpen={this.state.editBookModal}
          toggle={this.toggleEditBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
            Edit a new book
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                id="title"
                value={this.state.editBookData.title}
                onChange={e => {
                  let { editBookData } = this.state;
                  editBookData.title = e.target.value;

                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input
                id="rating"
                value={this.state.editBookData.rating}
                onChange={e => {
                  let { editBookData } = this.state;
                  editBookData.rating = e.target.value;
                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>
              Update Book
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* -------------------------------------------End of Modal---------------------------------------- */}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{books}</tbody>
        </Table>
      </div>
    );
  }
}

export default App;
