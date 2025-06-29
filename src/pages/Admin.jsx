import ImageUploadForm from "../components/AdminForm"
import ProjectsByCategory from "../components/ProjectsByCategory";


const Admin = () => {

    const categories = ['residential', 'commercial', 'architectural', 'others'];
    return(
    <>
        <div className="w-full p-4 space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto">
                <div className="bg-red-500/90 w-full lg:w-1/2 min-h-[300px] rounded-xl shadow-md p-6 flex items-center justify-center">
                    <h1  className="text-3xl font-bold text-white">hi</h1>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                        <ImageUploadForm/>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-7xl mx-auto space-y-6">
                
                {categories.map((category) => (
                    <ProjectsByCategory 
                        key={category} 
                        category={category} 
                    />
                ))}
            </div>
        </div>
    </>
    )
}

export default Admin;