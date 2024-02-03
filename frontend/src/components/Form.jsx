import { useState } from "react";
import { v4 as uuid } from "uuid";

export const Form = ({ member, onCreate, onClose }) => {
    const editMode = member.id !== undefined;
    const [inputs, setInputs] = useState({...member, id: member.id || uuid()});

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(inputs, editMode);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    return (
        <div className="formExternal">
            <div className="formInternal">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={inputs.id} />
                    <label htmlFor="name">Name
                        <input type="text"
                            name="name" placeholder="Name"
                            value={inputs.name || ""}
                            onChange={handleChange} />
                    </label>
                    <menu>
                        <input type="submit" value={editMode? "Edit": "Create"} />
                        <button onClick={() => onClose()}>Cancel</button>
                    </menu>

                </form>
            </div>
        </div>
    )
}
