import { redirect } from "next/navigation";
import * as api from "../api/server";

const Page = async () => {
    
    const logged = await api.pingAdmin();
    if(!logged) return redirect("/admin/login");   
    
    return (
        <div>
            <h1 className="text-center text-4xl my-3">Home - Secret Friend</h1>
        </div>
      )  
}

export default Page;