export default function LandingPage(){
    return(
        <div className="h-screen bg-[linear-gradient(to_bottom_right,#FBBE16,#EEA228,#FBBE16,#F4C75D)]">
            <h1>Landing Page</h1>
            <div className="flex items-center justify-center w-full">
                <div className="w-1/2 flex items-center justify-center">
                    <h1 className="text-5xl w-[39.5%] font-bold text-[#0A1A6E]">
                        <span className="text-white">Find Your Word!</span> <br/>
                        lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                    </h1>
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center">
                    <h1 className="text-center text-5xl w-1/2 font-medium text-white">
                        <span className="font-black">20K+</span><br /> Vocabularies
                    </h1>
                    <h1 className="text-center text-5xl w-1/2 font-medium text-white">
                        <span className="font-black">10+</span><br /> Language
                    </h1>
                </div>
            </div>
        </div>
    )
}