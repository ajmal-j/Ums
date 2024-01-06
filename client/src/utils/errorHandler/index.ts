import { ZodError } from "zod";

export const handleError = (error: any) => {
  if (error instanceof ZodError) {
    error.errors.forEach((err) => {
      if (typeof err.path[0] === "string") {
        const element = document.getElementById(err.path[0]);
        const errSpan = element?.nextSibling as HTMLElement;
        if (errSpan) errSpan.innerText = err.message;
      }
    });
  } else {
    // @ts-ignore
    toast.error(error.message);
  }
};
