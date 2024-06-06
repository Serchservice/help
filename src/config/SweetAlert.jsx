import { enqueueSnackbar } from "notistack";

/// success, error, warning, info
function SweetAlert(message = '', status = 'success', duration = 6000) {
    return enqueueSnackbar(message, {
        preventDuplicate: false,
        variant: status,
        autoHideDuration: duration,
        anchorOrigin: {
            horizontal: "right",
            vertical: "top"
        }
    })
}

export default SweetAlert;