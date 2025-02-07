import Link from "next/link";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
            <div className="container-fluid">
                <Link
                    href={"/"}
                    className="navbar-brand"
                >
                <Image
                src={'vercel.svg'}
                alt={"vercel"}
                height={30}
                width={30}
                >
                </Image>
                    test
                </Link>

            </div>
        </nav>
    )
}