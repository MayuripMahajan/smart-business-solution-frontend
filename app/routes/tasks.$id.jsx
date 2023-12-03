import { useEffect, useState } from "react"
import styles1 from "../styles/viewProject.css"
import styles from "../styles/style1.css"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
import { postAPI } from "~/utils/api"
import { domain } from "~/utils/domain"
import AddProject from "../components/addproject"
import addProjectStyles from "../styles/addProject.css"
import { getCookie } from "../utils/cookies"
import EditProject from "../components/editProject"
import { useLoaderData, useParams } from "@remix-run/react"


const Projects = () => {


    const loaderData = useLoaderData()

    // const { id } = useParams()

    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [oEmail, setOEmail] = useState("")
    const [currentProject, setCurrentProject] = useState({})
    const [updatedProject, setUpdatedProject] = useState({})

    useEffect(() => {
        userData()
        // allTasks()
    }, [])

    // const allTasks = async () => {
    //     const response = await postAPI(`${domain}/api/task/viewtasksbypid`, JSON.stringify({ pid: id }))
    //     console.log(response)
    // }

    useEffect(() => {
        console.log("Loader Data", loaderData)
        if (loaderData && loaderData?.tasks && loaderData?.tasks.length > 0) {
            setTasks(loaderData.tasks)
        }

    }, [loaderData])

    // useEffect(() => {
    //     setProjects((prev) => {
    //         return prev.map((p) => {
    //             if (p?._id == updatedProject?._id) {
    //                 p = updatedProject
    //             }
    //             return p
    //         })
    //     })
    // }, [updatedProject])

    const userData = async () => {
        await getCookie("UD").then((res) => {
            console.log(JSON.parse(res))
            setOEmail(JSON.parse(res).email)
            allprojects(JSON.parse(res).email)

        })

    }

    // const allprojects = async (e = null) => {

    //     const response = await postAPI(`${domain}/api/project/viewprojects`, JSON.stringify({ email: oEmail || e }))
    //     console.log(response)
    //     setProjects(response?.projects)
    // }

    // const deleteProject = async (pid) => {
    //     if (confirm("Are You Sure?")) {
    //         const response = await postAPI(`${domain}/api/project/deleteprojects`, JSON.stringify({ _id: pid, email: oEmail }))
    //         if (response?.message == "project deleted successfully") {
    //             setProjects((prev) => {
    //                 const updatedProjects = prev.filter((p) => p._id != pid)
    //                 return updatedProjects

    //             })
    //             alert('Successfully Deleted')
    //         } else if (response?.message == "You don't have access to delete") {
    //             alert("You don't have access to delete")
    //         }
    //     }

    // }

    // const [childdata, setchilddata] = useState('');
    // const handleform =(data)=> {
    //     setDataFromChild(data);
    // }




    return (
        <>

            <AddProject showForm={showForm} showFormFunc={setShowForm} setProjects={null} />
            <EditProject showForm={showEditForm} showFormFunc={setShowEditForm} currentProject={currentProject} setUpdatedProject={setUpdatedProject} />

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

                                    {/* <th>Association</th>
                                    <th>Assignee</th>
                                    <th>Due Date</th> */}

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
                                                <td>{task?.title}</td>
                                                <td>{task?.assignTo}</td>
                                                <td>{task?.dueDate}</td>
                                                <td>{task?.isCompleted}</td>
                                                <td>{task?.created_at}</td>
                                                <td>{task?.updated_at}</td>
                                                {/* <td>Ankit</td>
                                                <td>Ankit</td>
                                                <td>28/11/2023</td> */}
                                                <td><button onClick={() => { setShowEditForm(true); setCurrentProject(pro) }}>Edit</button></td>
                                                <td><button onClick={() => deleteProject(pro?._id)}>Delete</button></td>

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