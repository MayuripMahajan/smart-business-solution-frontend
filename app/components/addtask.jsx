
import { Editor } from 'primereact/editor';
import { useEffect, useState } from 'react';
import { postAPI } from '~/utils/api';
import { domain } from '~/utils/domain';

const AddTask = ({ showForm, showFormFunc, setTasks }) => {

    const [taskForm, setTaskForm] = useState({
        _id: "",
        pid: "",
        title: "",
        description: "",
        assignTo: "",
        assignBy: "",
        dueDate: "",
        priority: "",
        isCompleted: "",
        comments: [],
        created_at: "",
        updated_at: "",
    })

    const [teamMember, setteamMember] = useState("")

    const addProject = async () => {
        try {
            if (taskForm?.name && taskForm?.owner) {
                const response = await postAPI(`${domain}/api/project/createproject`, JSON.stringify(taskForm))
                if (response?.message == "Project Created Successfully") {

                    setProjects((prev) => {
                        console.log(prev, "prevprev")
                        if (prev) {
                            prev?.unshift(response?.projectDetails)
                        } else {
                            return response?.projectDetails
                        }
                        console.log(prev)
                        return prev
                    })


                    alert("Task Added")
                    setteamMember("");
                    setTaskForm({
                        _id: "",
                        pid: "",
                        title: "",
                        description: "",
                        assignTo: "",
                        assignBy: "",
                        dueDate: "",
                        priority: "",
                        isCompleted: "",
                        comments: [],
                        created_at: "",
                        updated_at: "",
                    })
                    showFormFunc(false)
                }
            }
        } catch (err) {
            console.log("Something went wrong", err);
        }
    }

    useEffect(() => {
        console.log(taskForm)
    }, [taskForm])

    return (
        <div className={showForm ? "add-pro" : " add-pro show-add-pro"} >
            <div className="add-pro-content">


                <h2>New Task</h2>
                <p>Task title</p>
                <input className="inputfield" type="text" placeholder="Enter the title"
                    onChange={(e) => setTaskForm((prev) => {
                        return { ...prev, name: e.target.value };
                    })}
                    value={taskForm?.name}
                /> <br />
                <div className="section">
                    <div>
                        <label htmlFor="">Owner:</label><br />
                        <input className="inputfield" type="text" placeholder="Enter the owner mail"
                            onChange={(e) => setTaskForm((prev) => {
                                return { ...prev, owner: e.target.value };
                            })}
                            value={taskForm?.owner}

                        /> <br />
                    </div>


                    <div>
                        <label htmlFor="">Project Access:</label><br />
                        <select className="design"
                            onChange={(e) => setTaskForm((prev) => {
                                return { ...prev, project_access: e.target.value };
                            })}
                            value={taskForm?.project_access}

                        >
                            <option value="public" >Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                </div>

                <br />
                <br />


                <div className="section">
                    <div>
                        <label htmlFor="">Start Date:</label><br />
                        <input className="date design" type="date"
                            onChange={(e) => setTaskForm((prev) => {
                                return { ...prev, start_date: e.target.value };
                            })}
                            value={taskForm?.start_date}

                        />
                    </div>



                    <div>
                        <label htmlFor="">End Date:</label><br />
                        <input className="date design" type="date"
                            onChange={(e) => setTaskForm((prev) => {
                                return { ...prev, end_date: e.target.value };
                            })}
                            value={taskForm?.end_date}

                        />
                    </div>

                </div>


                <p>Description:
                </p>

                <Editor style={{ height: '320px', border: '1px solid orange' }}
                    onTextChange={(e) => setTaskForm((prev) => {
                        return { ...prev, description: e.htmlValue };
                    })}
                    value={taskForm?.description}
                />


                <div className="addteam">
                    <input className='addt' type="text" placeholder='Add team member'
                        value={teamMember}
                        onChange={(e) => setteamMember(
                            e.target.value
                        )}

                    />
                    <button className='addb' onClick={() => {
                        setTaskForm((prev) => {
                            const newMember = [...prev.project_team, teamMember]
                            return { ...prev, project_team: newMember }
                        })
                        setteamMember("")
                    }}>Add teammate </button>
                </div>

                <div className="displayteam">
                    {
                        taskForm?.project_team.length > 0 ?
                            taskForm.project_team.map((member, i) => {
                                return <span key={i}> {member}</span>
                            })
                            : null
                    }
                </div>


                <div className="btn">
                    <button className="addbtn" onClick={() => addProject()}>Add</button>
                    <button className="cancelbtn" onClick={() => {
                        setTaskForm(
                            {
                                name: "",
                                start_date: "",
                                end_date: "",
                                owner: "",
                                description: "",
                                project_access: "private",
                                project_team: [],
                            }
                        )
                        setteamMember("")
                        showFormFunc(false)
                    }}>Cancel</button>

                </div>







            </div>

        </div>
    )
}

export default AddTask;

// export const links = () => [
//     {
//         rel: "stylesheet",
//         href: styles
//     }
// ]