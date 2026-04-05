import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/SupabseServerClient";


export async function POST(request){
    try{
        const {email, password, comfPassword} = await request.json();

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!regex.test(email)){
            return NextResponse.json({message: "email is not valid"}, {status: 400});
        }

        if(password !== comfPassword){
            return NextResponse.json({message: "password are not the same"}, {status: 400});           
        }

        const supabase = await createClient();

        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if(error){
            console.error("Supabase signUp error:", error.message);
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({success: true, message: "Váš účet byl úspěšně vytvořen."}, {status: 200});

    }catch(e){
        return NextResponse.json({message: "internal server error"}, {status: 500});
    }
}