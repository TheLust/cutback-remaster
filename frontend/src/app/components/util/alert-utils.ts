import Swal, {SweetAlertResult} from 'sweetalert2'

export function fireConfirmDialog(title: string,
                                  text: string,
                                  cancelButtonText: string,
                                  confirmButtonText: string): Promise<SweetAlertResult<any>> {
  return Swal.fire({
    title: title,
    text: text,
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: cancelButtonText,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: 'var(--mdc-filled-button-container-color)',
    reverseButtons: true
  });
}
