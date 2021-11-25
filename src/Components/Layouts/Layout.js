import Boxes from "../Boxes.js";

export default function Layout({ children }) {
    return (
        <>
            <Boxes />
            <div className="container p-4">
                {children}
            </div>
        </>
    )
}
