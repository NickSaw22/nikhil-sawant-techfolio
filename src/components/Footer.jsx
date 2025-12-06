import React from "react";

function Footer() {
    return (
        <div className="w-full pt-32 bg-zinc-900">
            <div className="max-w-screen-xl mx-auto py-10 flex gap-32">
                <div className="basis-1/2 flex flex-col justify-between">
                    <h1 className="text-[11.5rem] font-semibold leading-none tracking-tight mb-5">
                        techFolio.
                    </h1>
                    <div className="flex gap-7 text-zinc-600 mt-5">
                        <a >Privacy policy</a>
                        <a> Cookie Policy </a>
                        <a>Impressum</a>
                        <a>Terms</a>
                    </div>

                </div>
                <div className="basis-1/2 flex gap-5">
                    <div className="basis-1/3 ">
                        <h1 className="mb-8">socials</h1>
                        {["instagram", "twitter (x?)", "LinkedIn"].map((item, index) => (
                            <a key={index} className="block mt-3 text-zinc-600 capitalize">{item}</a>
                        ))}
                    </div>
                    <div className="basis-1/3 ">
                        <h1 className="mb-8">Stamp</h1>
                        {["home", "work", "career", "contact"].map((item, index) => (
                            <a key={index} className="block mt-3 text-zinc-600 capitalize">{item}</a>
                        ))}
                    </div>
                    <div className="basis-1/2 ">
                        <p className="text-right">Refokus is a pioneering digital agency driven by design and empowered by technology</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;