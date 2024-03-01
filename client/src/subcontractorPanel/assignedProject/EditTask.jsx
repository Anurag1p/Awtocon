// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import { Button, TextField } from '@mui/material';
// import axios from 'axios';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '60%',
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 4,
// };

// const EditTask = ({ taskData, onUpdate }) => {
//     const [open, setOpen] = useState(false);
//     const [editedTask, setEditedTask] = useState({ ...taskData });

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const handleEdit = (e) => {
//         const { name, value } = e.target;
//         setEditedTask((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`/api/update_task/${editedTask.id}`, editedTask);
//             onUpdate(response.data.updatedTask);
//             handleClose();
//         } catch (error) {
//             console.error('Error updating task:', error);
//         }
//     };

//     return (
//         <>
//             <Button onClick={handleOpen}>Edit Task</Button>
//             <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
//                 <Box sx={style}>
//                     <form onSubmit={handleSubmit}>
//                         <TextField
//                             label="Task Name"
//                             name="name"
//                             value={editedTask.name}
//                             onChange={handleEdit}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             label="Task Value"
//                             name="value"
//                             type="number"
//                             value={editedTask.value}
//                             onChange={handleEdit}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             label="Task Start Date"
//                             name="startDate"
//                             type="date"
//                             value={editedTask.startDate}
//                             onChange={handleEdit}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             label="Task End Date"
//                             name="endDate"
//                             type="date"
//                             value={editedTask.endDate}
//                             onChange={handleEdit}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             label="Task Project Lead"
//                             name="projectLead"
//                             value={editedTask.projectLead}
//                             onChange={handleEdit}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <TextField
//                             label="Task Description"
//                             name="description"
//                             multiline
//                             rows={4}
//                             value={editedTask.description}
//                             onChange={handleEdit}
//                             fullWidth
//                             margin="normal"
//                         />
//                         <Button type="submit">Update Task</Button>
//                         <Button onClick={handleClose}>Cancel</Button>
//                     </form>
//                 </Box>
//             </Modal>
//         </>
//     );
// };

// export default EditTask;
