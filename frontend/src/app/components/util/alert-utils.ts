import Swal, {SweetAlertResult} from 'sweetalert2'
import { translate } from "@ngneat/transloco";

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

export function fireNonFatalError(text: string) {
  return Swal.fire({
    title: translate('error.error'),
    text: text,
    position: 'top-end',
    timer: 10000,
    timerProgressBar: true,
    showConfirmButton: false
  });
}
