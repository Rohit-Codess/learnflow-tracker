import Swal from 'sweetalert2';

const ConfirmDeleteModal = async (title = "Are you sure?", text = "This task will be permanently deleted.") => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  return result.isConfirmed;
};

export default ConfirmDeleteModal;
