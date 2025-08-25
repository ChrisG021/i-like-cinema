import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import {IoIosClose} from "react-icons/io"

const GoogleProvider = new GoogleAuthProvider();
export default function Login(){

    const [login, setLogin] = useState(true);
    const [name, setName] =useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if(!(email||password)){
            alert("Todos os dados de login são obrigatórios")
            return ;
        }
        try {
            await signInWithEmailAndPassword(auth,email,password);
            console.log("Logado");
        } catch (e) {
            console.error("Deu b.o no login: "+e);
        }
    }

    const handleRegister = async () => {
        if(!(name||secondName||email||password)){
            alert("Todos os dados de cadastro são obrigatórios")
            return ;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            await updateProfile(userCredential.user,{
                displayName:`${name} ${secondName}`
            });
            console.log("Cadastrado")
        } catch (error) {
            console.error("Deu b.o no cadastro: "+error);
        }
    }

    const handleGoogleLogin =async ()=>{
        try {
            await signInWithPopup(auth,GoogleProvider);
            console.log("logado pelo google");
        } catch (error) {
            console.error("Deu b.o no google:"+error);
        }
    }

    return (
    <>
    <div className="relative w-screen h-screen bg-black flex items-center justify-center bg-gray-800">
            {/* div central */}
        <div className={`z-1 flex flex-col px-8 py-4 text-white bg-white/20 backdrop-blur w-[600px] transition-all duration-400 ${login?"h-[656px]":"h-[520px]"}  rounded-2xl absolute  bg-[linear-gradient(to_top,#475569,#101828,black_60%)] bg-cover shadow-xl overflow-hidden`}>
            <div className="flex justify-between mb-15">
                {/* sign in */}
                <div className="flex flex-row p-1 bg-gray-800 rounded-4xl shadow-[inset_0_6px_6px_rgba(0,0,0,0.5)]">
                    <div className={`w-[120px] h-[39px] absolute z-1 bg-white rounded-4xl transition-transform ease-in-out duration-400 ${login?"transform translate-x-0":"transform translate-x-[120px] tex"}`}></div>
                    <div onClick={()=>setLogin(true)} className={`flex w-[120px] h-[40px] items-center justify-center `}>
                        <span className={`z-2 font-bold transition-all duration-700  ${login?"text-black":"text-white/20"}`}>Inscrever-se</span>
                    </div>

                    <div onClick={()=>setLogin(false)} className="flex w-[120px] h-[40px] items-center justify-center">
                        <span className={`z-2 font-bold transition-all duration-700 ${login?"text-white/20":"text-black"}`}>Entrar</span>
                    </div>

                </div>
                <div className="bg-gray-800 p-1  w-fit rounded-4xl self-center" >
                    <IoIosClose size={30} />
                </div>
            </div>

            <form className="flex flex-col  ">
                
                <div className="mb-5">
                    <h2 className="text-2xl font-bold">{login?"Criar conta":"Entrar"}</h2>
                </div>
                <div className="flex flex-col  gap-2">
                    {login&&(
                        <div className="flex gap-2 flex-col ">
                            <div className="flex gap-2 justify-between">
                                <input required onChange={(e)=>setName(e.target.value)} value={name} className="w-full bg-black/20 rounded-xl border-2 border-white/10 p-4 focus:outline-0 focus:bg-gradient-to-t focus:from-white/10 focus:to-trasparent p-4 rounded-lg" placeholder="Primeiro nome" type="text"/>
                                <input required onChange={(e)=>setSecondName(e.target.value)} value={secondName} className="w-full bg-black/20 rounded-xl border-2 border-white/10 p-4 focus:outline-0 focus:bg-gradient-to-t focus:from-white/10 focus:to-trasparent p-4 rounded-lg" placeholder="Segundo nome" type="text"/>
                            </div>
                        </div>
                    )}
                    <div className="relative flex flex-row bg-black/20 rounded-xl border-2 border-white/10  gap-2">
                        <Mail className="text-white/40 absolute -translate-y-1/2 top-1/2 left-3 absolute"/>
                        <input required onChange={(e)=>setEmail(e.target.value)} value={email} className="w-full focus:outline-0 pl-12 focus:bg-gradient-to-t focus:from-white/10 focus:to-trasparent p-4 rounded-lg" placeholder="Digite seu email" type="email"/>
                    </div>
                    
                    <div className="group relative flex flex-row bg-black/20 rounded-xl border-2 border-white/10 gap-2  " >
                        {/* fiz varios focus para poder ter esse efeito */}
                        <Lock className="absolute -translate-y-1/2 top-1/2 left-3 text-white/40 " size={25}/>
                        <input required onChange={(e)=>setPassword(e.target.value)} value={password} className="w-full focus:outline-0 rounded-lg p-4 pl-12 focus:bg-gradient-to-t focus:from-white/10 focus:to-trasparent " placeholder={"Senha"} type="password"/>
                    </div>
                    <div className="flex justify-center ">
                        <button 
                        onClick={(e)=>{
                            e.preventDefault();
                            login?handleRegister():handleLogin();
                            }}
                        className="cursor-pointer font-bold shadow-lg text-black p-5 rounded-4xl w-full bg-white text-shadow-lg">{login?"Criar conta":"Entrar"} </button>
                    </div>
                    <div className="flex flex-row gap-10 justify-center items-center py-6">
                        <div className="bg-white/40 h-[1px] w-full"/>
                        <p className="whitespace-nowrap">ou {login?"cadastre-se":"entre"} com</p>
                        <div className="bg-white/40 h-[1px] w-full"/>
                    </div>
                    <div onClick={()=>handleGoogleLogin()} className="cursor-pointer bg-white/30 p-3 w-fit rounded-4xl self-center">
                        <FaGoogle/>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
    );
}
