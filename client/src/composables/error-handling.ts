import axios from "axios";

export function useErrorHandling() {
  const errorMsg = ref("");

  function handleError(err: unknown) {
    if (axios.isAxiosError(err)) {
      errorMsg.value = err.response?.data.msg as string;
    } else {
      console.error(err);
      errorMsg.value = "Unexpected Error!";
    }
  }

  return { errorMsg, handleError };
}
