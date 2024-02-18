import { Navigate } from "react-router-dom";
import { useStateContext } from "./ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useState } from "react";
import "./Todolist.css";

export default function ToDoList() {
    const { user, token, setUser } = useStateContext();

    const [title, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [due_date, setdue_date] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [is_completed, _setIsComplited] = useState(0);
    const [id, setId] = useState("");
    const [todos, setTodos] = useState([]);
    const [Completed, setCompleted] = useState([]);
    const [NotCompleted, setNotCompleted] = useState([]);
    const [Missed, setMissed] = useState([]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        (async () => await loadTodos(user.id))();
    }, [user]);

    //load all todos
    async function loadTodos(id) {
        const { data } = await axiosClient.get("/todos/index/" + id);
        data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        setTodos(data);
        setCompleted(data.filter((todo) => todo.is_completed));
        setNotCompleted(
            data.filter(
                (todo) =>
                    !todo.is_completed && new Date(todo.due_date) >= new Date()
            )
        );
        setMissed(
            data.filter(
                (todo) =>
                    new Date(todo.due_date) < new Date() && !todo.is_completed
            )
        );
    }

    //create a new todo
    async function save(event) {
        event.preventDefault();
        const todo = {
            title,
            description,
            due_date,
            is_completed,
            user_id: user.id,
        };
        await axiosClient.post("/todos", todo).then((response) => {
            if (response.status === 201) {
                loadTodos(user.id);
                setTopic("");
                setDescription("");
                setdue_date(new Date().toISOString().split("T")[0]);
            } else {
                console.log("error");
            }
        });
    }

    //update a todo
    async function update(event) {
        event.preventDefault();
        const todo = {
            title,
            description,
            due_date,
            is_completed,
            user_id: user.id,
            id,
        };

        await axiosClient.put("/todos/update/" + id, todo).then((response) => {
            if (response.status === 201) {
                loadTodos(user.id);
                setTopic("");
                setDescription("");
                setdue_date(new Date().toISOString().split("T")[0]);
            } else {
                console.log("error");
            }
        });
    }

    //load a todo to edit
    function editTodo(todos) {
        setTopic(todos.title),
            setDescription(todos.description),
            setdue_date(todos.due_date);
        setId(todos.id);
        document.getElementById("updateBtn").style.display = "block";
        document.getElementById("addBtn").style.display = "none";
    }

    //delete a todo
    async function delate(id) {
        await axiosClient.delete("/todos/delete/" + id);
        await loadTodos(user.id);
    }

    //set a todo as completed or not
    async function setIsComplited(id) {
        const todo = todos.find((todo) => todo.id === id);
        todo.is_completed = !todo.is_completed;

        await axiosClient.put("/todos/update/" + id, todo);
        await loadTodos(user.id);
    }

    return (
        <>
            <div className="container ">
                <div className="row">
                    <div className="col-md-12 col-lg-10 m-auto align-right">
                        {/* /* add todo button */}
                        <button
                            id="addTodoBtn"
                            type="button"
                            className="btn "
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                                setTopic("");
                                setDescription("");
                                setdue_date(
                                    new Date().toISOString().split("T")[0]
                                );
                                document.getElementById(
                                    "updateBtn"
                                ).style.display = "none";
                                document.getElementById(
                                    "addBtn"
                                ).style.display = "block";
                            }}
                        >
                            <i className="material-symbols-outlined size ">
                                add
                            </i>
                            Add Todo
                        </button>

                        {/* /* modal for adding and editing todo */}
                        <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1
                                            className="modal-title fs-5"
                                            id="exampleModalLabel"
                                        >
                                            ToDo
                                        </h1>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <form>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="topic">
                                                    Topic
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="topic"
                                                    value={title}
                                                    onChange={(Event) => {
                                                        setTopic(
                                                            Event.target.value
                                                        );
                                                    }}
                                                ></input>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="description">
                                                    Description
                                                </label>
                                                <textarea
                                                    rows="10"
                                                    className="form-control"
                                                    id="description"
                                                    value={description}
                                                    onChange={(Event) => {
                                                        setDescription(
                                                            Event.target.value
                                                        );
                                                    }}
                                                ></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="dueDate">
                                                    Due Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="dueDate"
                                                    value={due_date}
                                                    onChange={(Event) => {
                                                        setdue_date(
                                                            Event.target.value
                                                        );
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="btn btn-primary "
                                                onClick={save}
                                                id="addBtn"
                                            >
                                                Add
                                            </button>
                                            <button
                                                className="btn btn-secondary "
                                                onClick={update}
                                                id="updateBtn"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row " id="tabs">
                    {/*   tab item */}
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="complete-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#complete-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="complete-tab-pane"
                                aria-selected="false"
                            >
                                Completed
                                <span id="completeNum">
                                    {Completed.length}
                                </span>{" "}
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="Todo-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#Todo-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="Todo-tab-pane"
                                aria-selected="true"
                            >
                                Todo{" "}
                                <span id="notCompNum">
                                    {NotCompleted.length}
                                </span>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link"
                                id="Missed-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#Missed-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="Missed-tab-pane"
                                aria-selected="false"
                            >
                                Missed{" "}
                                <span id="missedNum">{Missed.length}</span>
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">
                        <div
                            className="tab-pane fade show active"
                            id="complete-tab-pane"
                            role="tabpanel"
                            aria-labelledby="completed-tab"
                            tabIndex="0"
                        >
                            {/* complite todo list */}
                            {Completed.map((todo) => {
                                return (
                                    <div
                                        className="card"
                                        key={todo.id}
                                        id="completeCard"
                                    >
                                        <div className="card-header">
                                            completed{" "}
                                            <small>
                                                due date : {todo.due_date}{" "}
                                                <a
                                                    href="#"
                                                    className="btn  "
                                                    onClick={() =>
                                                        setIsComplited(todo.id)
                                                    }
                                                    id="incomplete"
                                                >
                                                    {" "}
                                                    <span className="material-symbols-outlined">
                                                        remove_done
                                                    </span>
                                                </a>
                                            </small>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {todo.title}{" "}
                                            </h5>

                                            <a
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                href="#"
                                                onClick={() => {
                                                    setTopic(todo.title);
                                                    setDescription(
                                                        todo.description
                                                    );
                                                    setdue_date(todo.due_date);
                                                    setId(todo.id);
                                                    document.getElementById(
                                                        "updateBtn"
                                                    ).style.display = "none";
                                                    document.getElementById(
                                                        "addBtn"
                                                    ).style.display = "none";
                                                }}
                                            >
                                                <p className="card-text">
                                                    {todo.description.slice(
                                                        0,
                                                        50
                                                    )}{" "}
                                                </p>
                                            </a>

                                            <a
                                                href="#"
                                                className="btn "
                                                onClick={() => delate(todo.id)}
                                                id="deleteBtn"
                                            >
                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>
                                            </a>
                                            <button
                                                className="btn "
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => editTodo(todo)}
                                                id="editBtn"
                                            >
                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>{" "}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            // not complite todo list
                            className="tab-pane fade"
                            id="Todo-tab-pane"
                            role="tabpanel"
                            aria-labelledby="Todo-tab"
                            tabIndex="0"
                        >
                            {NotCompleted.map((todo) => {
                                return (
                                    <div
                                        className="card"
                                        key={todo.id}
                                        id="TodoCard"
                                    >
                                        <div className="card-header">
                                            completed{" "}
                                            <small>
                                                due date : {todo.due_date}{" "}
                                                <a
                                                    href="#"
                                                    className="btn  "
                                                    onClick={() =>
                                                        setIsComplited(todo.id)
                                                    }
                                                    id="incomplete"
                                                >
                                                    {" "}
                                                    <span className="material-symbols-outlined">
                                                        task_alt
                                                    </span>
                                                </a>
                                            </small>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {todo.title}{" "}
                                            </h5>

                                            <a
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                href="#"
                                                onClick={() => {
                                                    setTopic(todo.title);
                                                    setDescription(
                                                        todo.description
                                                    );
                                                    setdue_date(todo.due_date);
                                                    setId(todo.id);
                                                    document.getElementById(
                                                        "updateBtn"
                                                    ).style.display = "none";
                                                    document.getElementById(
                                                        "addBtn"
                                                    ).style.display = "none";
                                                }}
                                            >
                                                <p className="card-text">
                                                    {todo.description.slice(
                                                        0,
                                                        50
                                                    )}{" "}
                                                </p>
                                            </a>

                                            <a
                                                href="#"
                                                className="btn "
                                                onClick={() => delate(todo.id)}
                                                id="deleteBtn"
                                            >
                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>
                                            </a>
                                            <button
                                                className="btn "
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => editTodo(todo)}
                                                id="editBtn"
                                            >
                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            // missed todo list

                            className="tab-pane fade"
                            id="Missed-tab-pane"
                            role="tabpanel"
                            aria-labelledby="Missed-tab"
                            tabIndex="0"
                        >
                            {Missed.map((todo) => {
                                return (
                                    <div
                                        className="card"
                                        key={todo.id}
                                        id="MissCard"
                                    >
                                        <div className="card-header">
                                            completed{" "}
                                            <small>
                                                due date : {todo.due_date}{" "}
                                                <a
                                                    href="#"
                                                    className="btn  "
                                                    onClick={() =>
                                                        setIsComplited(todo.id)
                                                    }
                                                    id="incomplete"
                                                >
                                                    {" "}
                                                    <span className="material-symbols-outlined">
                                                        task_alt
                                                    </span>
                                                </a>
                                            </small>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {todo.title}{" "}
                                            </h5>

                                            <a
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                href="#"
                                                onClick={() => {
                                                    setTopic(todo.title);
                                                    setDescription(
                                                        todo.description
                                                    );
                                                    setdue_date(todo.due_date);
                                                    setId(todo.id);
                                                    document.getElementById(
                                                        "updateBtn"
                                                    ).style.display = "none";
                                                    document.getElementById(
                                                        "addBtn"
                                                    ).style.display = "none";
                                                }}
                                            >
                                                <p className="card-text">
                                                    {todo.description.slice(
                                                        0,
                                                        50
                                                    )}{" "}
                                                </p>
                                            </a>

                                            <a
                                                href="#"
                                                className="btn "
                                                onClick={() => delate(todo.id)}
                                                id="deleteBtn"
                                            >
                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>
                                            </a>
                                            <button
                                                className="btn "
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => editTodo(todo)}
                                                id="editBtn"
                                            >
                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
