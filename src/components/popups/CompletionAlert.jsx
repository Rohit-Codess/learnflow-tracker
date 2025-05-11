import Swal from 'sweetalert2';

const CompletionAlert = (taskTitle) => {
  Swal.fire({
    title: '🎉 Good Progress!',
    text: `You completed "${taskTitle}" successfully.`,
    icon: 'success',
    confirmButtonText: 'Great!',
  });
};

export default CompletionAlert;
