import { useState } from "react";

export const Form = ({ member, onCreate, onClose }) => {

    const [inputs, setInputs] = useState(member);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(inputs);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    return (
        <div class="formExternal">
            <div class="formInternal">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={inputs.id} />
                    <label htmlFor="name">Name
                        <input type="text"
                            name="name" placeholder="Name"
                            value={inputs.name || ""}
                            onChange={handleChange} />
                    </label>
                    <menu>
                        <input type="submit" value="Create" />
                        <button onClick={() => onClose()}>Cancel</button>
                    </menu>

                </form>
            </div>
        </div>
    )
}
