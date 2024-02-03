import { useEffect, useState } from 'react';
import './App.css';
import { Form } from './components/Form';
import { Table } from './components/Table';
import { NameApi } from './services/NameApi';
import { Logger } from './services/Logger';

function App() {
  const api = new NameApi();
  const [members, setMembers] = useState([]);
  const [reload, setReload] = useState(true);
  const [showForm, setShowForm] = useState(false); ``
  const [currentMember, setCurrentMember] = useState({});
  const [messages, setMessages] = useState({});

  const newMember = () => {
    setCurrentMember({});
    setShowForm(true);
  }

  const onFormSubmit = (member, isEdit) => {
    if (!isEdit) {
      api
        .addMember(member)
        .then((r) => {
          setMessages({ ...messages, modal: "Successfully created member " + r.id })
          setReload(true);
        })
        .catch(err => Logger.log(err))
        .finally(() => setShowForm(false));
        return;
    }
    api
        .editMember(member.id, member)
        .then((r) => {
          setMessages({ ...messages, modal: "Successfully edited member " + r.id })
          setReload(true);
        })
        .catch(err => Logger.log(err))
        .finally(() => setShowForm(false));
        return;

  }

  const onDelete = (id) => {
    api.deleteMember(id)
      .then(r => {
        setMessages({ ...messages, modal: "Successfully deleted member " + r.id });
        setReload(true);
      });
  }

  const onEdit = (id) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setCurrentMember(member);
      setShowForm(true);
    }
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
        onCreate={onFormSubmit}
        onClose={() => setShowForm(false)} />
    }
  </>;


}

export default App
