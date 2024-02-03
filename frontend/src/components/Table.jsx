
export const Table = ({ members, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>

                </tr>
            </thead>
            <tbody>
                {
                    members.map(
                        (o, i) =>
                            <tr key={i}>
                                <td>{o.id}</td>
                                <td>{o.name}</td>
                                <td>
                                    <button onClick={() => onEdit(o.id)}>Edit</button>
                                    <button onClick={() => onDelete(o.id)}>Delete</button>
                                </td>
                            </tr>
                    )
                }
            </tbody>
        </table>
    );
}
