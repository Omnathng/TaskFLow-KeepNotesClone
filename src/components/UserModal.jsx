import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCollaborators, getAllUsers } from '../Services/allAPI';

function UserModal({ id }) {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // selected badges
  const [selectedBadge, setSelectedBadge] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  const getUsers = async () => {
    try {
      const result = await getAllUsers();
      setAllUsers(result.data);
      setLoaded(true);
    } catch (error) {
      console.log('Error calling API to getAllUsers', error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setLoaded(false); // Reset loaded state when opening the modal
    getUsers();
    setShow(true);
  };

  const addCollaborator = async () => {
    const noteId = id;
    console.log(selectedBadge);
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  
      try {
        if (loaded) {
          const selectedUsers = allUsers.filter((user) => selectedBadge.includes(user._id));
  
          if (selectedUsers.length > 0) {
            const collaboratorsArray = selectedUsers.map((user) => ({
              userId: user._id,
              username: user.username,
            }));
  
            const result = await addCollaborators(noteId, { collaborators: collaboratorsArray }, reqHeader);
            console.log('Result from API call:', result);
  
            if (result.status === 200) {
              console.log('Collaborator added successfully');
              // You can update the UI or perform other actions as needed
              handleClose()
            } else {
              console.log('Error adding collaborator:', result.message);
            }
          } else {
            console.log('No user selected');
          }
        } else {
          console.log('Data is still loading. Please wait.');
        }
      } catch (error) {
        console.log('Error calling API to add collaborator:', error);
      }
    }
  };
  

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className='btn'>
        <i className='fa-solid fa-user-plus' onClick={handleShow}></i>
      </div>

      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Collaborators</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ position: 'relative' }}>
          <div className='pt-2 pb-2 ps-3 pe-3 d-flex' style={{ border: '1px solid #ccc', borderRadius: '25px' }}>
            <input
              type='text'
              style={{ width: '400px', border: '0', outline: '0', background: 'transparent' }}
              placeholder='Search'
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <div className='icn'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </div>
          </div>

          {allUsers && allUsers.length > 0
            ? allUsers
                .filter((item) => item.username.toLowerCase().includes(searchUser.toLowerCase()))
                .map((item) => (
                  <Button
                    bg='secondary'
                    className={`btn shadow m-2 ${selectedBadge.includes(item.userId) ? 'selected' : ''}`}
                    key={item.userId}
                    onClick={() => setSelectedBadge((prevSelected) => [...prevSelected, item._id])}
                  >
                    {item.username}
                  </Button>
                ))
            : null}
        </Modal.Body>
        <Modal.Footer variant='tertiary'>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={addCollaborator}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserModal;
