// import React, { useState } from 'react';
// import Modal from '../../components/Modal';

// const TaskCreationModal = ({ isOpen, onClose, onSubmit }) => {
//   // Define fields for the task creation modal
//   const fields = [
//     { name: 'taskName', label: 'Task Name', type: 'text' },
//     { name: 'taskValue', label: 'Task Value', type: 'text' },
//     { name: 'startDate', label: 'Start Date', type: 'date' },
//     { name: 'endDate', label: 'End Date', type: 'date' },
//     { name: 'taskLead', label: 'Task Lead', type: 'text' }
//   ];

//   // Function to handle form submission
//   const handleSubmit = (formData) => {
//     // Call the onSubmit function passed as prop
//     onSubmit(formData);
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} fields={fields} onSubmit={handleSubmit}  style={{ zIndex: 9999999 }}/>
//   );
// };

// export default TaskCreationModal;
