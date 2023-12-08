import { useEffect, useState } from "react"
import styles1 from "../styles/viewProject.css"
import styles from "../styles/style1.css"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
import { postAPI } from "~/utils/api"
import { domain } from "~/utils/domain"
import addProjectStyles from "../styles/addProject.css"
import { getCookie } from "../utils/cookies"
import EditProject from "../components/editProject"
import { useLoaderData, useParams } from "@remix-run/react"
import AddTask from "../components/addtask"
import EditTask from "../components/editTask"

const Projects = () => {
    const loaderData = useLoaderData()

    const { id } = useParams()

    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [oEmail, setOEmail] = useState("")
    const [currentTask, setcurrentTask] = useState({})
    const [updatedTask, setUpdatedTask] = useState({})

    useEffect(() => {
        userData()
        // allTasks()
        console.log(id)
    }, [])

    useEffect(() => {
        console.log("Loader Data", loaderData)
        if (loaderData && loaderData?.tasks && loaderData?.tasks.length > 0) {
            setTasks(loaderData.tasks)
        }

    }, [loaderData])

    useEffect(() => {
        setTasks((prev) => {
            return prev.map((p) => {
                if (p?._id == updatedTask?._id) {
                    p = updatedTask
                }
                return p
            })
        })
    }, [updatedTask])

    const userData = async () => {
        await getCookie("UD").then((res) => {
            console.log(JSON.parse(res))
            setOEmail(JSON.parse(res).email)
            // allprojects(JSON.parse(res).email)

        })
    }

    const deleteTask = async (id, pid) => {
        if (confirm("Are You Sure?")) {
            const response = await postAPI(`${domain}/api/task/deletetask`, JSON.stringify({ _id: id, pid: pid }))
            if (response?.message == "Task Deleted Successfully") {
                setTasks((prev) => {
                    const updatedTasks = prev.filter((t) => t._id != id)
                    return updatedTasks
                })
                alert('Successfully Deleted')
            } else if (response?.message == "You don't have access to delete") {
                alert("You don't have access to delete")
            } else {
                alert("Something went wrong ")
            }
        }

    }

    return (
        <>

            <AddTask setOEmail={oEmail} projectId={id} showForm={showForm} showFormFunc={setShowForm} setTasks={setTasks} />
            <EditTask showForm={showEditForm} projectId={id} showFormFunc={setShowEditForm} currentTask={currentTask} setUpdatedTask={setUpdatedTask} />

            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="table-header">
                    <button onClick={() => setShowForm(!showForm)}>Add Task</button>
                    <h3 className="title">Tasks </h3>
                    <div className="table-content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Title</th>
                                    <th>Assign To</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks?.length > 0 ?
                                        tasks.map((task, i) => {
                                            return <tr key={task?._id}>
                                                <td>{i + 1}</td>
                                                <td onClick={() => { setShowEditForm(true); setcurrentTask(task) }}>{task?.title}</td>
                                                <td>{task?.assignTo}</td>
                                                <td>{task?.dueDate}</td>
                                                <td>{task?.isCompleted}</td>
                                                <td>{task?.created_at}</td>
                                                <td>{task?.updated_at}</td>
                                                <td><button onClick={() => { setShowEditForm(true); setcurrentTask(task) }}>Edit</button></td>
                                                <td><button onClick={() => deleteTask(task?._id, task?.pid)}>Delete</button></td>

                                            </tr>
                                        })
                                        :
                                        <tr>No Tasks Found</tr>
                                }
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>

        </>
    )
}

export default Projects

export const loader = async ({ params }) => {
    try {
        const id = params.id;
        console.log(JSON.stringify({ pid: id }))
        const response = await postAPI(`${domain}/api/task/viewtasksbypid`, JSON.stringify({ pid: id }))
        return response;
    } catch (err) {
        console.log(err);
        return { message: "Something went wrong" };
    }
};

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    }, {
        rel: "stylesheet",
        href: styles1
    },
    {
        rel: "stylesheet",
        href: addProjectStyles
    }
]