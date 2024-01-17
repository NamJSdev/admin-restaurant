'use client'
import { useEffect } from 'react'
import '../../public/css/bootstrap.min.css'
import '../../public/auth/css/style.css'
const AuthLayout = (props: {
    children: React.ReactNode
}) => {

    useEffect(() => {
        const jquery = document.createElement('script');
        const popper = document.createElement('script');
        const main = document.createElement('script');

        jquery.src = "/auth/js/jquery.min.js";
        jquery.async = true;

        popper.src = "/auth/js/popper.js";
        popper.async = true;

        main.src = "/auth/js/main.js";
        main.async = true;

        document.body.appendChild(jquery);
        document.body.appendChild(popper);
        document.body.appendChild(main);

        return () => {
            document.body.removeChild(jquery);
            document.body.removeChild(popper);
            document.body.removeChild(main);
        }
    })

    return (
        <div>{props.children}</div>
    )
}

export default AuthLayout;