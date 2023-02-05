import { useToast } from "primevue/usetoast";

export const ErrorToastFn = (error) => {
    const toast = useToast()
    console.log("Creating Toast(s)")
    console.log(error.response.data.message)
    toast.add({ severity: 'error', summary: 'Error Message', detail: error.message, life: 3000 });
}

