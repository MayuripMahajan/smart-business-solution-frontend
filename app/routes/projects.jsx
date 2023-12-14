import { useEffect, useState } from "react";
import styles1 from "../styles/viewProject.css";
import styles from "../styles/style1.css";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { postAPI } from "~/utils/api";
import { domain } from "~/utils/domain";
import AddProject from "../components/addproject";
import addProjectStyles from "../styles/addProject.css";
import { getCookie } from "../utils/cookies";
import EditProject from "../components/editProject";
import { useNavigate } from "@remix-run/react";
import Loader from "../components/loader";
import loaderCss from "../styles/loader.css";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [oEmail, setOEmail] = useState("");
  const [currentProject, setCurrentProject] = useState({});
  const [updatedProject, setUpdatedProject] = useState({});
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    userData();
  }, []);

  useEffect(() => {
    setProjects((prev) => {
      return prev.map((p) => {
        if (p?._id == updatedProject?._id) {
          p = updatedProject;
        }
        return p;
      });
    });
  }, [updatedProject]);

  const userData = async () => {
    await getCookie("UD").then((res) => {
      console.log(JSON.parse(res));
      setOEmail(JSON.parse(res).email);
      allprojects(JSON.parse(res).email);
    });
  };

  const allprojects = async (e = null) => {
    try {
      const response = await postAPI(
        `${domain}/api/project/viewprojects`,
        JSON.stringify({ email: oEmail || e })
      );
      console.log(response);
      setProjects(response?.projects);
      setIsLoader(false);
    } catch (err) {
      console.log("Something went wrong");
      setIsLoader(false);
    }
  };

  const deleteProject = async (pid) => {
    try {
      if (confirm("Are You Sure?")) {
        setIsLoader(true);
        const response = await postAPI(
          `${domain}/api/project/deleteprojects`,
          JSON.stringify({ _id: pid, email: oEmail })
        );
        if (response?.message == "project deleted successfully") {
          setProjects((prev) => {
            const updatedProjects = prev.filter((p) => p._id != pid);
            return updatedProjects;
          });
          setIsLoader(false);

          alert("Successfully Deleted");
        } else if (response?.message == "You don't have access to delete") {
          alert("You don't have access to delete");
          setIsLoader(false);
        }
        setIsLoader(false);
      }
      setIsLoader(false);
    } catch (err) {
      console.log("something went wrong");
      setIsLoader(false);
    }
  };

  return (
    <>
      <Loader isShow={isLoader} />

      <AddProject
        oEmail={oEmail}
        showForm={showForm}
        showFormFunc={setShowForm}
        setProjects={setProjects}
      />
      <EditProject
        showForm={showEditForm}
        showFormFunc={setShowEditForm}
        currentProject={currentProject}
        setUpdatedProject={setUpdatedProject}
      />

      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="table-header">
          <button onClick={() => setShowForm(!showForm)}>Add Project</button>

          <div className="table-content">
            <table>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Projects</th>
                  <th>Status</th>
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
                {projects?.length > 0 ? (
                  projects.map((pro, i) => {
                    return (
                      <tr key={pro?._id}>
                        <td>{i + 1}</td>
                        <td
                          onClick={() => {
                            setIsLoader(true);
                            navigate(`../tasks/${pro?._id}`, {
                              state: { pid: pro?._id },
                            });
                          }}
                        >
                          {pro?.name}
                        </td>
                        <td>{pro?.status}</td>
                        <td>{pro?.owner}</td>
                        <td>{pro?.project_access}</td>
                        <td>{pro?.created_at}</td>
                        <td>{pro?.updated_at}</td>
                        {/* <td>Ankit</td>
                                                <td>Ankit</td>
                                                <td>28/11/2023</td> */}
                        <td>
                          <button
                            onClick={() => {
                              setShowEditForm(true);
                              setCurrentProject(pro);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteProject(pro?._id)}
                            style={{ background: "#f92e2e" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>No Projects Found</tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: styles1,
  },
  {
    rel: "stylesheet",
    href: addProjectStyles,
  },

  {
    rel: "stylesheet",
    href: loaderCss,
  },
];
