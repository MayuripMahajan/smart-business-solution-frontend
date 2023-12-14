import { Editor } from "primereact/editor";
import { useEffect, useState } from "react";
import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";
import Loader from "./loader";

const AddTask = ({
  showForm,
  showFormFunc,
  setTasks,
  projectId,
  setOEmail,
}) => {
  const [taskForm, setTaskForm] = useState({
    _id: "",
    pid: projectId || "",
    title: "",
    description: "",
    assignTo: "",
    assignBy: "",
    dueDate: "",
    priority: "default",
    isCompleted: "default",
    comments: [],
    created_at: "",
    updated_at: "",
  });
  const [isLoader, setIsLoader] = useState(false);

  const [comments, setComments] = useState({ by: "", comment: "" });

  const addTask = async () => {
    try {
      setIsLoader(true);
      if (taskForm?.title && taskForm?.pid) {
        const response = await postAPI(
          `${domain}/api/task/createtask`,
          JSON.stringify(taskForm)
        );
        if (response?.message == "Tasks Created Successfully") {
          setTasks((prev) => {
            console.log(prev, "prevprev");
            if (prev) {
              prev?.unshift(response?.taskDetails);
            } else {
              return response?.taskDetails;
            }
            console.log(prev);
            return prev;
          });

          alert("Task Added");
          setComments({
            by: "",
            comment: "",
          });
          setTaskForm({
            _id: "",
            pid: projectId || "",
            title: "",
            description: "",
            assignTo: "",
            assignBy: "",
            dueDate: "",
            priority: "default",
            isCompleted: "",
            comments: [],
            created_at: "",
            updated_at: "",
          });
          showFormFunc(false);
        }
      } else {
        console.log("Title and pid are required");
      }
      setIsLoader(false);
    } catch (err) {
      console.log("Something went wrong", err);
      setIsLoader(false);
    }
  };

  useEffect(() => {
    setTaskForm((prev) => {
      return {
        ...prev,
        pid: projectId,
      };
    });
  }, []);

  useEffect(() => {
    console.log(taskForm);
  }, [taskForm]);

  return (
    <>
      <Loader isShow={isLoader} />

      <div className={showForm ? "add-pro" : " add-pro show-add-pro"}>
        <div className="add-pro-content">
          <h2>New Task</h2>
          <p>Task title</p>
          <input
            className="inputfield"
            type="text"
            placeholder="Enter the title"
            onChange={(e) =>
              setTaskForm((prev) => {
                return { ...prev, title: e.target.value };
              })
            }
            value={taskForm?.title}
          />{" "}
          <br />
          <p>Description:</p>
          <Editor
            style={{ height: "320px", border: "1px solid black" }}
            onTextChange={(e) =>
              setTaskForm((prev) => {
                return { ...prev, description: e.htmlValue };
              })
            }
            value={taskForm?.description}
          />
          <div className="section">
            <div>
              <label htmlFor="">Assign To:</label>
              <br />
              <input
                className="inputfield"
                type="text"
                placeholder="Enter the owner mail"
                onChange={(e) =>
                  setTaskForm((prev) => {
                    return { ...prev, assignTo: e.target.value };
                  })
                }
                value={taskForm?.assignTo}
              />{" "}
              <br />
            </div>

            <div>
              <label htmlFor="">Assign By:</label>
              <br />
              <input
                className="inputfield"
                type="text"
                placeholder="Enter the owner mail"
                onChange={(e) =>
                  setTaskForm((prev) => {
                    return { ...prev, assignBy: e.target.value };
                  })
                }
                value={taskForm?.assignBy}
              />{" "}
              <br />
            </div>
          </div>
          <div className="section">
            <div>
              <label htmlFor="">Due Date:</label>
              <br />
              <input
                className="date design"
                type="date"
                onChange={(e) =>
                  setTaskForm((prev) => {
                    return { ...prev, dueDate: e.target.value };
                  })
                }
                value={taskForm?.dueDate}
              />
            </div>

            <div>
              <label htmlFor="">Priority:</label>
              <br />
              <select
                className="design"
                onChange={(e) =>
                  setTaskForm((prev) => {
                    return { ...prev, priority: e.target.value };
                  })
                }
                value={taskForm?.priority}
              >
                <option value="Default">Default</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium </option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <label htmlFor="">Status:</label>
          <br />
          <select
            className="inputfield"
            onChange={(e) =>
              setTaskForm((prev) => {
                return { ...prev, isCompleted: e.target.value };
              })
            }
            value={taskForm?.isCompleted}
          >
            <option value="default">Default</option>
            <option value="Completed">Completed</option>
            <option values="In Progress">In Progress </option>
          </select>
          <br />
          <div className="displayteam">
            {taskForm?.comments && taskForm?.comments.length > 0
              ? taskForm.comments.map((comment, i) => {
                  return <span key={i}> {comment?.comment}</span>;
                })
              : null}
          </div>
          <div className="addteam">
            <input
              className="addt"
              type="text"
              placeholder=" Comments"
              value={comments?.comment}
              onChange={(e) =>
                setComments({
                  by: setOEmail,
                  comment: e.target.value,
                })
              }
            />
            <button
              className="addb"
              onClick={() => {
                setTaskForm((prev) => {
                  const newComment = [...prev.comments, comments];
                  return { ...prev, comments: newComment };
                });
                setComments({ by: "", comment: "" });
              }}
            >
              Add Comments{" "}
            </button>
          </div>
          <div className="btn">
            <button className="addbtn" onClick={() => addTask()}>
              Add
            </button>
            <button
              className="cancelbtn"
              onClick={() => {
                setTaskForm({
                  _id: "",
                  pid: projectId || "",
                  title: "",
                  description: "",
                  assignTo: "",
                  assignBy: "",
                  dueDate: "",
                  priority: "default",
                  isCompleted: "",
                  comments: [],
                  created_at: "",
                  updated_at: "",
                });
                setComments({ by: "", comment: "" });
                showFormFunc(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;

// export const links = () => [
//     {
//         rel: "stylesheet",
//         href: styles
//     }
// ]
