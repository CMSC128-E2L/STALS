export default function Login() {    
    return (
        <div className="min-h-full flex content-center justify-center mt-32 py-12 px-4 ">
            <div className="rounded-xl w-1/3 p-20 shadow shadow-gray-400/100">
            <form>
                <div className="flex flex-col space-y-4">
                    <input name="Email" type="email" placeholder="Email" className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"/>
                    <input name="Password" type="password" placeholder="Password" className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"/>
                </div>
            </form>
            <br/>
            <div>
                <button className="rounded-md group relative w-full flex justify-center px-4 py-2 bg-p-dblue text-white">Log In</button>
                <br/>
                <p className="text-center text-gray-400 text-sm">If you are having issues logging in, please contact an administrator.</p>
                <br/>
                <p className="text-center text-gray-400 text-sm">Don't have an account yet? Sign up.</p>
            </div>
            </div>
        </div>
    );

}