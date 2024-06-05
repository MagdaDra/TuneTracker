import Navbar from "./Navbar";
import Footer from "./Footer";

export const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}