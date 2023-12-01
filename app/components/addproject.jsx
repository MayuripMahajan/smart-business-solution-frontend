
import { Editor } from 'primereact/editor';
import { useState } from 'react';

const AddProject = ({ showForm, showFormFunc }) => {

    return (
        <div className={showForm ? "add-pro" : " add-pro show-add-pro"} >
            <div className="add-pro-content">

                <h2>New Project</h2>
                <p>Project title</p>
                <input className="inputfield" type="text" placeholder="Enter the title" /> <br />
                <div className="section">
                    <div>
                        <label htmlFor="">Owner:</label><br />
                        <select className="design">
                            <option>option 1</option>
                            <option value="">option 2</option>
                        </select>
                    </div>


                    <div>
                        <label htmlFor="">Template:</label><br />
                        <select className="design">
                            <option >option 1</option>
                            <option value="">option 2</option>
                        </select>
                    </div>
                </div>

                <br />
                <br />


                <div className="section">
                    <div>
                        <label htmlFor="">Start Date:</label><br />
                        <input className="date design" type="date" />
                    </div>



                    <div>
                        <label htmlFor="">End Date:</label><br />
                        <input className="date design" type="date" />
                    </div>

                </div>


                <p>Description:</p>

                <Editor style={{ height: '320px', border: '1px solid orange' }} />

                <div className="btn">
                    <button className="addbtn">Add</button>
                    <button className="cancelbtn" onClick={() => showFormFunc(false)}>Cancel</button>

                </div>





            </div>

        </div>
    )
}

export default AddProject;

// export const links = () => [
//     {
//         rel: "stylesheet",
//         href: styles
//     }
// ]