import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const spanRef = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        if (passwords) {
            setPasswordArray(passwords)
        }
    }

    useEffect(() => {
        getPasswords()
    }, [])


    const showPassword = () => {
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eye-crossed.png"
            ref.current.width = "20"
            spanRef.current.className = "absolute right-3 top-[7px] cursor-pointer"
            passwordRef.current.type = "text"

        }
        else {
            ref.current.src = "icons/eye.png"
            ref.current.width = "45"
            spanRef.current.className = "absolute right-0 top-[-5px] cursor-pointer"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])

            await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "content-Type": "application/json" }, body: JSON.stringify({ ...form, id: form.id })
            })

            await fetch("http://localhost:3000/", {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })

            setForm({ site: "", username: "", password: "" })
            toast.success('Password saved', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            toast.error('Please fill all fields', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    const deletePassword = async (id) => {
        console.log("Deleting Password with id " + id)
        let con = confirm("Are you sure you want to Delete the Password?")
        if (con) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let req = await fetch("http://localhost:3000/", {
                method: "DELETE", headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...form, id: id })
            })
        }
        toast.success('Password Deleted', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    const editPassword = (id) => {
        console.log("Editing Password with id " + id)
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast.success('Copied to Clipboard', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className='p-2 md:p-0 md:my-container text-black py-10'>
                <div className='text-4xl font-bold text-center mt-5'>
                    <span className='text-green-600'>&lt;</span>
                    Secure
                    <span className='text-green-600'>X/&gt;</span>
                </div>
                <p className='text-center text-green-800 text-lg'>Your own Password Manager</p>
                <div className='flex flex-col gap-8 md:px-20 py-5 items-center'>
                    <input name='site' onChange={handleChange} value={form.site} placeholder='Enter website URL' className='bg-white rounded-full border border-green-400 w-full px-4 py-1' type="text" />
                    <div className='flex flex-col md:flex-row justify-between w-full gap-8'>
                        <input name='username' onChange={handleChange} value={form.username} placeholder='Enter Username' className='bg-white rounded-full border border-green-400 w-full px-4 py-1' type="text" />

                        <div className='relative md:w-1/2'>
                            <input ref={passwordRef} name='password' onChange={handleChange} value={form.password} placeholder='Enter Password' className='bg-white rounded-full border border-green-400 w-full px-4 py-1' type="password" />
                            <span ref={spanRef} onClick={showPassword} className='absolute right-0 top-[-5px] cursor-pointer'>
                                <img ref={ref} width={45} src="icons/eye.png" alt="eye" />
                            </span>

                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 px-4 py-2 rounded-full w-fit hover:bg-green-400'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords flex flex-col md:px-20">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length !== 0 &&

                        <table className="table-fixed w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr className='text-center'>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Usename</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index} className='text-center'>
                                        <td className='border border-white py-2'>
                                            <div className=' flex justify-center items-center' onClick={() => copyText(item.site)}>
                                                <a className='px-2' target='_blank' href={item.site}>{item.site}</a>
                                                <img className='cursor-pointer' width={25} src="icons/copy.png" alt="copy" />
                                            </div>
                                        </td>

                                        <td className='border border-white py-2'>
                                            <div className=' flex justify-center items-center' onClick={() => copyText(item.username)}>
                                                <span className='px-2'>{item.username}</span>
                                                <img className='cursor-pointer' width={25} src="icons/copy.png" alt="copy" />
                                            </div>
                                        </td>

                                        <td className='border border-white py-2'>
                                            <div className=' flex justify-center items-center' onClick={() => copyText(item.password)}>
                                                <span className='px-2'>{"*".repeat(item.password.length)}</span>
                                                <img className='cursor-pointer' width={25} src="icons/copy.png" alt="copy" />
                                            </div>
                                        </td>
                                        <td className='border border-white py-2'>
                                            <div className=' flex justify-center items-center gap-2'>
                                                <img onClick={() => { editPassword(item.id) }} className='cursor-pointer' width={23} src="icons/edit.png" alt="copy" />
                                                <span onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xyfswyxf.json"
                                                        trigger="hover"
                                                        style={{ "width": "27px", "height": "27px" }}>
                                                    </lord-icon>

                                                </span>
                                            </div>
                                        </td>

                                    </tr>

                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>

        </>
    )
}

export default Manager
