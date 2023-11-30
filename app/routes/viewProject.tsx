import styles1 from "../styles/viewProject.css"
import styles from "../styles/style1.css"
import Sidebar from "../components/sidebar"
import Header from "../components/header"





const viewProject = () => {
    return (
        <>
            <Sidebar />
            <div className="main-content">

            

            <Header />

            <div className="table-header">
            <h3 className="title">Table Data</h3>
            <div className="table-content">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Reporter</th>
                            <th>Creater</th>
                            <th>Status</th>
                            <th>Tags</th>
                            <th>Association</th>
                            <th>Assignee</th>
                            <th>Due Date</th>
                            <th>Services</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Project 1</td>
                            <td>Ankit</td>
                            <td>John Doe</td>
                            <td>active</td>
                            <td>a</td>
                            <td>Ankit</td>
                            <td>Ankit</td>
                            <td>28/11/2023</td>
                            <td><button>Edit</button></td>
                        </tr>


                        <tr>
                            <td>Project 1</td>
                            <td>Ankit</td>
                            <td>John Doe</td>
                            <td>active</td>
                            <td>a</td>
                            <td>Ankit</td>
                            <td>Ankit</td>
                            <td>28/11/2023</td>
                            <td><button>Edit</button></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
        </div>

        </>
    )
}

export default viewProject

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    }, {
        rel: "stylesheet",
        href: styles1
    }
]