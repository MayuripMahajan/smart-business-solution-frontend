import styles1 from "../styles/viewProject.css"
import styles from "../styles/style1.css"



const viewProject = () => {
    return (
        <>
            <div className="table-header">
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
                                <th>Assign</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                    </table>

                </div>
            </div>

        </>
    )
}

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    },{
        rel: "stylesheet",
        href: styles1
    }
]