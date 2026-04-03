import { createClient } from "../../../../lib/SupabseServerClient";
import { NextResponse } from "next/server";

export async function POST(requset){

    try{
        const {email, password} = await requset.json();
        
        const supabase = await createClient();
        
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
    
        if(error){
            return NextResponse.json({message: "Email or password is incorrect"}, {status: 401});
        }
    
        return NextResponse.json({message: "success"}, {status: 200});
    }catch(err){
        return NextResponse.json({message: "internal server error"}, {status: 500});
    }

}