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


const Projects = () => {

    const [projects, setProjects] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [oEmail, setOEmail] = useState("")
    const [currentProject, setCurrentProject] = useState({})

    useEffect(() => {
        allprojects()
        getCookie("UD").then((res) => {
            console.log(JSON.parse(res))
            setOEmail(JSON.parse(res).email)
        })

    }, [])

    const allprojects = async () => {

        const response = await postAPI(`${domain}/api/project/allprojects`, "")
        console.log(response)
        setProjects(response?.projects)
    }

    const deleteProject = async (pid) => {
        if (confirm("Are You Sure?")) {
            const response = await postAPI(`${domain}/api/project/deleteprojects`, JSON.stringify({ _id: pid, email: oEmail }))
            if (response?.message == "project deleted successfully") {
                setProjects((prev) => {
                    const updatedProjects = prev.filter((p) => p._id != pid)
                    return updatedProjects

                })
                alert('Successfully Deleted')
            }
        }

    }

    // const [childdata, setchilddata] = useState('');
    // const handleform =(data)=> {
    //     setDataFromChild(data);
    // }




    return (
        <>

            <AddProject showForm={showForm} showFormFunc={setShowForm} setProjects={setProjects} />
            <EditProject showForm={showEditForm} showFormFunc={setShowEditForm} currentProject={currentProject} setProjectFunc={setCurrentProject} />

            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="table-header">
                    <button onClick={() => setShowForm(!showForm)}>Add Project</button>


                    <h3 className="title">Table Data </h3>


                    <div className="table-content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Projects</th>
                                    <th>Owner</th>
                                    <th>Access</th>
                                    <th>Start date</th>
                                    <th>End Date</th>
                                    {/* <th>Association</th>
                                    <th>Assignee</th>
                                    <th>Due Date</th> */}

                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects?.length > 0 ?
                                        projects.map((pro) => {
                                            return <tr key={pro?._id}>
                                                <td>{pro?.name}</td>
                                                <td>{pro?.owner}</td>
                                                <td>{pro?.project_access}</td>
                                                <td>{pro?.created_at}</td>
                                                <td>{pro?.updated_at}</td>
                                                {/* <td>Ankit</td>
                                                <td>Ankit</td>
                                                <td>28/11/2023</td> */}
                                                <td><button onClick={() => { setShowEditForm(true); setCurrentProject(pro) }}>Edit</button></td>
                                                <td><button onClick={() => deleteProject(pro?._id)}>Delete</button></td>

                                            </tr>
                                        })
                                        :
                                        <tr>No Projects Found</tr>
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