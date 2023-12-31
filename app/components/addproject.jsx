import { Editor } from "primereact/editor";
import { useEffect, useState } from "react";
import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";
import Loader from "./loader";

const AddProject = ({ showForm, showFormFunc, setProjects, oEmail }) => {
  const [projectForm, setProjectForm] = useState({
    name: "",
    start_date: "",
    end_date: "",
    owner: oEmail,
    description: "",
    project_access: "private",
    project_team: [],
    status: "",
  });
  const [teamMember, setteamMember] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setProjectForm((prev) => {
      return {
        ...prev,
        owner: oEmail,
      };
    });
  }, [oEmail]);

  const addProject = async () => {
    try {
      setIsLoader(true);
      if (projectForm?.name && projectForm?.owner) {
        const response = await postAPI(
          `${domain}/api/project/createproject`,
          JSON.stringify(projectForm)
        );
        if (response?.message == "Project Created Successfully") {
          setProjects((prev) => {
            console.log(prev, "prevprev");
            if (prev) {
              prev?.unshift(response?.projectDetails);
            } else {
              return response?.projectDetails;
            }
            console.log(prev);
            return prev;
          });

          alert("Project Added");
          setteamMember("");
          setProjectForm({
            name: "",
            start_date: "",
            end_date: "",
            owner: oEmail,
            description: "",
            project_access: "private",
            project_team: [],
            status: "",
          });
          showFormFunc(false);
        }
      }
      setIsLoader(false);
    } catch (err) {
      setIsLoader(false);

      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    console.log(projectForm);
  }, [projectForm]);

  return (
    <>
      <Loader isShow={isLoader} />
      <div className={showForm ? "add-pro" : " add-pro show-add-pro"}>
        <div className="add-pro-content">
          <h2>New Project</h2>
          <p>Project title</p>
          <input
            className="inputfield"
            type="text"
            placeholder="Enter the title"
            onChange={(e) =>
              setProjectForm((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
            value={projectForm?.name}
          />{" "}
          <br />
          <div className="section">
            <div>
              <label htmlFor="">Owner:</label>
              <br />
              <input
                className="inputfield"
                type="text"
                placeholder="Enter the owner mail"
                value={projectForm?.owner || oEmail}
                onChange={(e) =>
                  setProjectForm((prev) => {
                    return { ...prev, owner: e.target.value };
                  })
                }
              />{" "}
              <br />
            </div>

            <div>
              <label htmlFor="">Project Access:</label>
              <br />
              <select
                className="design"
                onChange={(e) =>
                  setProjectForm((prev) => {
                    return { ...prev, project_access: e.target.value };
                  })
                }
                value={projectForm?.project_access}
              >
                <option value="public">Private</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>
          <br />
          <br />
          <div className="section">
            <div>
              <label htmlFor="">Start Date:</label>
              <br />
              <input
                className="date design"
                type="date"
                onChange={(e) =>
                  setProjectForm((prev) => {
                    return { ...prev, start_date: e.target.value };
                  })
                }
                value={projectForm?.start_date}
              />
            </div>

            <div>
              <label htmlFor="">End Date:</label>
              <br />
              <input
                className="date design"
                type="date"
                onChange={(e) =>
                  setProjectForm((prev) => {
                    return { ...prev, end_date: e.target.value };
                  })
                }
                value={projectForm?.end_date}
              />
            </div>
          </div>
          <label htmlFor="">Status:</label>
          <br />
          <select
            className="inputfield"
            onChange={(e) =>
              setProjectForm((prev) => {
                return { ...prev, status: e.target.value };
              })
            }
            value={projectForm?.status}
          >
            <option values="In Progress">Default </option>
            <option values="In Progress">In Progress </option>
            <option value="Completed">Completed</option>
          </select>
          <br />
          <p>Description:</p>
          <Editor
            style={{ height: "320px", border: "1px solid black" }}
            onTextChange={(e) =>
              setProjectForm((prev) => {
                return { ...prev, description: e.htmlValue };
              })
            }
            value={projectForm?.description}
          />
          <div className="addteam">
            <input
              className="addt"
              type="text"
              placeholder="Add team member"
              value={teamMember}
              onChange={(e) => setteamMember(e.target.value)}
            />
            <button
              className="addb"
              onClick={() => {
                setProjectForm((prev) => {
                  const newMember = [...prev.project_team, teamMember];
                  return { ...prev, project_team: newMember };
                });
                setteamMember("");
              }}
            >
              Add teammate{" "}
            </button>
          </div>
          <div className="displayteam">
            {projectForm?.project_team.length > 0
              ? projectForm.project_team.map((member, i) => {
                  return <span key={i}> {member}</span>;
                })
              : null}
          </div>
          <div className="btn">
            <button className="addbtn" onClick={() => addProject()}>
              Add
            </button>
            <button
              className="cancelbtn"
              onClick={() => {
                setProjectForm({
                  name: "",
                  start_date: "",
                  end_date: "",
                  owner: oEmail,
                  description: "",
                  project_access: "private",
                  project_team: [],
                  status: "",
                });
                setteamMember("");
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

export default AddProject;

// export const links = () => [
//     {
//         rel: "stylesheet",
//         href: styles
//     }
// ]
