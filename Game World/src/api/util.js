// Function for handling form submissions.
export function createSubmitHandler(ctx, handler) {
    return function (event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        handler(ctx, formData, event);
    };
}