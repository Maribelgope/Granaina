import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)

    return (<><h2>{error.status}</h2>
        <h4>{error.statusText}</h4></>)
}