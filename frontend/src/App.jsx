import { useEffect, useState } from 'react';
import './App.css';
import { Form } from './components/Form';
import { Table } from './components/Table';
import { NameApi } from './services/NameApi';
import { Logger } from './services/Logger';
import { v4 as uuidv4 } from 'uuid';
import { Transition } from 'react-transition-group';

function App() {

  const createNewMember = () => ({ id: uuidv4() });

  const api = new NameApi();
  const [members, setMembers] = useState([]);
  const [reload, setReload] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentMember, setCurrentMember] = useState(createNewMember());
  const [messages, setMessages] = useState({});

  const newMember = () => {
    setCurrentMember(createNewMember());
    setShowForm(true);
  }

  const submit = (member) => {
    api
      .addMember(member)
      .then((r) => {
        setMessages({ ...messages, modal: "Successfully created member " + r.id })
        setReload(true);
      })
      .catch(err => Logger.log(err))
      .finally(() => setShowForm(false));
  }

  const onDelete = (id) => {
    api.deleteMember(id)
      .then(r => {
        setMessages({ ...messages, modal: "Successfully deleted member " + r.id });
        setReload(true);
      });
  }

  const onEdit = (id) => {

  }

  useEffect(() => {
    if (reload) {
      api.getMembers()
        .then(response => setMembers(response))
        .catch(err => Logger.log(err))
        .finally(() => setReload(false));
    }
  }, [reload]);

  return <>
    <header>
      <button onClick={newMember}>New Member</button>
    </header>
    <main>
      <Table members={members} onDelete={onDelete} onEdit={onEdit} />
    </main>
    {showForm &&
      <Form member={currentMember}
        onCreate={submit}
        onClose={() => setShowForm(false)} />
    }
  </>;


}

export default App
