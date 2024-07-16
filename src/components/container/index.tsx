import { ReactNode } from "react";

export default function Container({ children }: {children: ReactNode}) {
    return (
        <section className="max-w-screen-xl mx-auto px-3">
           {children}
        </section>
    )
}